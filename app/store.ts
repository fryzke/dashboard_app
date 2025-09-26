import { create } from "zustand";
import { fetchCompanies, fetchPosts, createOrUpdatePost } from "./lib/api";

interface GhgEmission {
  yearMonth: string;
  source: string;
  emissions: number;
}

interface Company {
  id: string;
  name: string;
  country: string;
  emissions: GhgEmission[];
}

export interface Post {
  id: string;
  title: string;
  resourceUid: string;
  dateTime: string;
  content: string;
}

interface CompanyState {
  companies: Company[];
  loading: boolean;
  fetchAll: () => Promise<void>;
  setCompanies: (companies: Company[]) => void;
}

interface UIState {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

interface AppState {
  companies: Company[];
  posts: Post[];
  loading: boolean;
  fetchData: () => Promise<void>;
  savePost: (post: Omit<Post, "id"> & { id?: string }) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  companies: [],
  posts: [],
  loading: true,
  fetchData: async () => {
    try {
      const companies = await fetchCompanies();
      const posts = await fetchPosts();
      set({ companies, posts, loading: false });
    } catch (e) {
      console.error("Error fetching data:", e);
      set({ loading: false });
    }
  },
  savePost: async (post) => {
    try {
      const saved = await createOrUpdatePost(post);
      set((state) => {
        const exists = state.posts.some((p) => p.id === saved.id);
        return {
          posts: exists
            ? state.posts.map((p) => (p.id === saved.id ? saved : p))
            : [...state.posts, saved],
        };
      });
    } catch (e) {
      console.error("Error saving post:", e);
    }
  },
}));

export const useUIStore = create<UIState>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));

export const useCompanyStore = create<CompanyState>((set) => ({
  companies: [],
  loading: false,
  fetchAll: async () => {
    set({ loading: true });
    try {
      const data = await fetchCompanies();
      set({ companies: data, loading: false });
    } catch (err) {
      console.error("Failed to fetch companies:", err);
      set({ loading: false });
    }
  },
  setCompanies: (companies) => set({ companies }),
}));
