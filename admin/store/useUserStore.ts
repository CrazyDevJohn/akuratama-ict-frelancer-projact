import axios from "axios";
import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: Boolean;
}

interface UserStore {
  users: User[] | null;
  getUsers: () => Promise<void>;
  setUser: (id: string, data: Partial<User>) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: null,
  getUsers: async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`,
      {
        withCredentials: true,
      },
    );

    const users = await res.data.users;

    console.log(users);
    set({ users });
  },
  setUser: (id, data) => {},
  logout: () => set({ users: null }),
}));

export default useUserStore;
