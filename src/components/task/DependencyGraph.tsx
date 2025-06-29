import React, { useEffect, useRef, useState } from 'react';
import { Task, TaskDependency } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Plus, Link, Unlink } from 'lucide-react';

interface DependencyGraphProps {
  tasks: Task[];
  dependencies?: TaskDependency[];
  onSelectTask?: (taskId: string) => void;
  onAddDependency?: (taskId: string, dependsOnId: string) => void;
  onRemoveDependency?: (dependencyId: string) => void;
  editable?: boolean;
}

interface GraphNode {
  id: string;
  title: string;
  completed: boolean;
  blocked: boolean;
  x: number;
  y: number;
  dependencies: string[];
  level: number;
}

export const DependencyGraph: React.FC<DependencyGraphProps> = ({ 
  tasks, 
  dependencies = [],
  onSelectTask,
  onAddDependency,
  onRemoveDependency,
  editable = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [connectingMode, setConnectingMode] = useState(false);

  useEffect(() => {
    drawGraph();
  }, [tasks, dependencies, selectedTask]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = Math.max(400, tasks.length * 80);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (tasks.length === 0) {
      // Draw empty state
      ctx.fillStyle = '#4C5784';
      ctx.font = '16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('No tasks to display', canvas.width / 2, canvas.height / 2);
      return;
    }

    // Create dependency map
    const depMap = new Map<string, string[]>();
    dependencies.forEach(dep => {
      if (!depMap.has(dep.task_id)) {
        depMap.set(dep.task_id, []);
      }
      depMap.get(dep.task_id)!.push(dep.depends_on_task_id);
    });

    // Calculate levels using topological sort
    const levels = calculateLevels(tasks, depMap);

    // Create nodes with positions
    const nodes: GraphNode[] = tasks.map((task, index) => {
      const level = levels.get(task.id) || 0;
      return {
        id: task.id,
        title: task.title,
        completed: task.completed,
        blocked: task.dependency_status === 'blocked',
        x: 50 + level * 200,
        y: 60 + index * 80,
        dependencies: depMap.get(task.id) || [],
        level
      };
    });

    // Adjust Y positions to avoid overlaps within levels
    const levelGroups = new Map<number, GraphNode[]>();
    nodes.forEach(node => {
      if (!levelGroups.has(node.level)) {
        levelGroups.set(node.level, []);
      }
      levelGroups.get(node.level)!.push(node);
    });

    levelGroups.forEach(levelNodes => {
      levelNodes.forEach((node, index) => {
        node.y = 60 + index * 100;
      });
    });

    const nodeMap = new Map(nodes.map(node => [node.id, node]));

    // Draw connections first (so they appear behind nodes)
    ctx.strokeStyle = '#001428';
    ctx.lineWidth = 2;
    
    dependencies.forEach(dep => {
      const fromNode = nodeMap.get(dep.depends_on_task_id);
      const toNode = nodeMap.get(dep.task_id);
      
      if (fromNode && toNode) {
        // Draw arrow
        drawArrow(ctx, fromNode.x + 200, fromNode.y + 20, toNode.x - 10, toNode.y + 20, dep.dependency_type);
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const isSelected = selectedTask === node.id;
      
      // Node background
      let bgColor = '#FFFFFF';
      let borderColor = '#001428';
      
      if (node.completed) {
        bgColor = '#22C55E';
      } else if (node.blocked) {
        bgColor = '#EF4444';
      } else if (isSelected) {
        bgColor = '#FFDD00';
      }
      
      ctx.fillStyle = bgColor;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      
      const nodeWidth = 180;
      const nodeHeight = 40;
      
      // Draw rounded rectangle
      drawRoundedRect(ctx, node.x, node.y, nodeWidth, nodeHeight, 8);
      ctx.fill();
      ctx.stroke();

      // Node text
      ctx.fillStyle = node.completed || node.blocked ? '#FFFFFF' : '#001428';
      ctx.font = '14px Inter';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      
      // Truncate long titles
      let displayTitle = node.title;
      if (displayTitle.length > 20) {
        displayTitle = displayTitle.substring(0, 17) + '...';
      }
      
      ctx.fillText(displayTitle, node.x + 10, node.y + nodeHeight / 2);

      // Status indicator
      if (node.completed) {
        drawCheckmark(ctx, node.x + nodeWidth - 20, node.y + nodeHeight / 2);
      } else if (node.blocked) {
        drawBlockIcon(ctx, node.x + nodeWidth - 20, node.y + nodeHeight / 2);
      }
    });
  };

  const calculateLevels = (tasks: Task[], depMap: Map<string, string[]>) => {
    const levels = new Map<string, number>();
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (taskId: string): number => {
      if (visiting.has(taskId)) {
        // Circular dependency detected, assign level 0
        return 0;
      }
      
      if (visited.has(taskId)) {
        return levels.get(taskId) || 0;
      }

      visiting.add(taskId);
      
      const deps = depMap.get(taskId) || [];
      let maxDepLevel = -1;
      
      deps.forEach(depId => {
        const depLevel = visit(depId);
        maxDepLevel = Math.max(maxDepLevel, depLevel);
      });
      
      const level = maxDepLevel + 1;
      levels.set(taskId, level);
      visited.add(taskId);
      visiting.delete(taskId);
      
      return level;
    };

    tasks.forEach(task => visit(task.id));
    return levels;
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, type: string) => {
    // Line style based on dependency type
    if (type === 'suggests') {
      ctx.setLineDash([5, 5]);
    } else {
      ctx.setLineDash([]);
    }
    
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // Arrow head
    const arrowSize = 8;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - arrowSize * Math.cos(angle - Math.PI / 6),
      toY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - arrowSize * Math.cos(angle + Math.PI / 6),
      toY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
    
    ctx.setLineDash([]);
  };

  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const drawCheckmark = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 6, y);
    ctx.lineTo(x - 2, y + 4);
    ctx.lineTo(x + 6, y - 4);
    ctx.stroke();
  };

  const drawBlockIcon = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 4, y - 4);
    ctx.lineTo(x + 4, y + 4);
    ctx.moveTo(x + 4, y - 4);
    ctx.lineTo(x - 4, y + 4);
    ctx.stroke();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is on any node
    tasks.forEach((task, index) => {
      const nodeX = 50 + (index % 3) * 200; // Simplified positioning
      const nodeY = 60 + Math.floor(index / 3) * 80;
      const nodeWidth = 180;
      const nodeHeight = 40;

      if (x >= nodeX && x <= nodeX + nodeWidth && y >= nodeY && y <= nodeY + nodeHeight) {
        if (connectingMode && selectedTask && selectedTask !== task.id) {
          // Create dependency
          onAddDependency?.(task.id, selectedTask);
          setConnectingMode(false);
          setSelectedTask(null);
        } else {
          setSelectedTask(task.id);
          onSelectTask?.(task.id);
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-title-18 font-title-18-black text-black-100">
          Task Dependencies
        </h3>
        {editable && (
          <div className="flex items-center gap-2">
            <Button
              variant={connectingMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setConnectingMode(!connectingMode)}
              className="gap-2"
            >
              <Link size={14} />
              {connectingMode ? 'Cancel' : 'Add Dependency'}
            </Button>
          </div>
        )}
      </div>

      <div 
        ref={containerRef}
        className="bg-white-100 rounded-2xl border-2 border-black-100 p-4 overflow-auto"
        style={{ minHeight: '400px' }}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="cursor-pointer"
          style={{ display: 'block' }}
        />
      </div>

      <div className="flex items-center gap-4 text-caption-11-reg font-caption-11-reg text-black-60">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white-100 rounded border-2 border-black-100"></div>
          <span>Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-success-50 rounded border-2 border-black-100"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-error-50 rounded border-2 border-black-100"></div>
          <span>Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primarysolid-50 rounded border-2 border-black-100"></div>
          <span>Selected</span>
        </div>
      </div>

      {connectingMode && selectedTask && (
        <div className="p-3 bg-info-10 rounded-xl border border-info-50">
          <p className="text-caption-11-reg font-caption-11-reg text-black-60">
            Click on another task to create a dependency. The selected task will depend on the clicked task.
          </p>
        </div>
      )}

      {tasks.length > 0 && (
        <div className="text-caption-11-reg font-caption-11-reg text-black-60">
          <p>
            Tasks are arranged by dependency level. Solid lines show blocking dependencies, 
            dashed lines show suggestions. Click tasks to select them.
          </p>
        </div>
      )}
    </div>
  );
};