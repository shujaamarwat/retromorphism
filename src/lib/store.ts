import { create } from 'zustand';
import { User, Virtua, Task, Quest } from './supabase';

interface AppState {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Virtuas
  virtuas: Virtua[];
  selectedVirtua: Virtua | null;
  setVirtuas: (virtuas: Virtua[]) => void;
  setSelectedVirtua: (virtua: Virtua | null) => void;
  
  // Tasks
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  
  // Quests
  quests: Quest[];
  setQuests: (quests: Quest[]) => void;
  addQuest: (quest: Quest) => void;
  updateQuest: (id: string, updates: Partial<Quest>) => void;
  
  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Auth
  user: null,
  setUser: (user) => set({ user }),
  
  // Virtuas
  virtuas: [],
  selectedVirtua: null,
  setVirtuas: (virtuas) => set({ virtuas }),
  setSelectedVirtua: (virtua) => set({ selectedVirtua: virtua }),
  
  // Tasks
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task => task.id === id ? { ...task, ...updates } : task)
  })),
  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  
  // Quests
  quests: [],
  setQuests: (quests) => set({ quests }),
  addQuest: (quest) => set((state) => ({ quests: [...state.quests, quest] })),
  updateQuest: (id, updates) => set((state) => ({
    quests: state.quests.map(quest => quest.id === id ? { ...quest, ...updates } : quest)
  })),
  
  // UI State
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  darkMode: false,
  setDarkMode: (dark) => set({ darkMode: dark }),
}));