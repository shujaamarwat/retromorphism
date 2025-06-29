import React, { useEffect, useRef } from 'react';
import { Task } from '@/lib/supabase';

interface DependencyGraphProps {
  tasks: Task[];
  onSelectTask?: (taskId: string) => void;
}

interface GraphNode {
  id: string;
  title: string;
  completed: boolean;
  x: number;
  y: number;
  dependencies: string[];
}

export const DependencyGraph: React.FC<DependencyGraphProps> = ({ 
  tasks, 
  onSelectTask 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    drawGraph();
  }, [tasks]);

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

    // Create nodes
    const nodes: GraphNode[] = tasks.map((task, index) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      x: 100,
      y: 60 + index * 80,
      dependencies: task.dependencies || []
    }));

    // Simple layout: arrange nodes vertically
    // In a real implementation, you'd use a proper graph layout algorithm
    const nodeMap = new Map(nodes.map(node => [node.id, node]));

    // Draw connections first (so they appear behind nodes)
    ctx.strokeStyle = '#001428';
    ctx.lineWidth = 2;
    
    nodes.forEach(node => {
      node.dependencies.forEach(depId => {
        const depNode = nodeMap.get(depId);
        if (depNode) {
          ctx.beginPath();
          ctx.moveTo(depNode.x + 120, depNode.y + 20);
          ctx.lineTo(node.x - 10, node.y + 20);
          ctx.stroke();
          
          // Draw arrow
          const arrowSize = 8;
          ctx.beginPath();
          ctx.moveTo(node.x - 10, node.y + 20);
          ctx.lineTo(node.x - 10 - arrowSize, node.y + 20 - arrowSize);
          ctx.moveTo(node.x - 10, node.y + 20);
          ctx.lineTo(node.x - 10 - arrowSize, node.y + 20 + arrowSize);
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    nodes.forEach(node => {
      // Node background
      ctx.fillStyle = node.completed ? '#22C55E' : '#FFDD00';
      ctx.strokeStyle = '#001428';
      ctx.lineWidth = 2;
      
      const nodeWidth = 200;
      const nodeHeight = 40;
      
      // Draw rounded rectangle
      const radius = 8;
      ctx.beginPath();
      ctx.roundRect(node.x, node.y, nodeWidth, nodeHeight, radius);
      ctx.fill();
      ctx.stroke();

      // Node text
      ctx.fillStyle = node.completed ? '#FFFFFF' : '#001428';
      ctx.font = '14px Inter';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      
      // Truncate long titles
      let displayTitle = node.title;
      if (displayTitle.length > 25) {
        displayTitle = displayTitle.substring(0, 22) + '...';
      }
      
      ctx.fillText(displayTitle, node.x + 10, node.y + nodeHeight / 2);

      // Completion indicator
      if (node.completed) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(node.x + nodeWidth - 20, node.y + nodeHeight / 2, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Checkmark
        ctx.strokeStyle = '#22C55E';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x + nodeWidth - 24, node.y + nodeHeight / 2);
        ctx.lineTo(node.x + nodeWidth - 20, node.y + nodeHeight / 2 + 3);
        ctx.lineTo(node.x + nodeWidth - 16, node.y + nodeHeight / 2 - 3);
        ctx.stroke();
      }
    });
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !onSelectTask) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is on any node
    tasks.forEach((task, index) => {
      const nodeX = 100;
      const nodeY = 60 + index * 80;
      const nodeWidth = 200;
      const nodeHeight = 40;

      if (x >= nodeX && x <= nodeX + nodeWidth && y >= nodeY && y <= nodeY + nodeHeight) {
        onSelectTask(task.id);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-title-18 font-title-18-black text-black-100">
          Task Dependencies
        </h3>
        <div className="flex items-center gap-4 text-caption-11-reg font-caption-11-reg text-black-60">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primarysolid-50 rounded border border-black-100"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success-50 rounded border border-black-100"></div>
            <span>Completed</span>
          </div>
        </div>
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

      {tasks.length > 0 && (
        <div className="text-caption-11-reg font-caption-11-reg text-black-60">
          <p>
            Click on any task node to select it. Lines show task dependencies - 
            tasks must be completed in order from top to bottom.
          </p>
        </div>
      )}
    </div>
  );
};