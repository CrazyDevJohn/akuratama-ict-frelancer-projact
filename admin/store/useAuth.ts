import { AutStoreInterface } from "@/types";
import axios from "axios";
import { redirect } from "next/navigation";
import { create } from "zustand";

export const useAuthStore = create<AutStoreInterface>((set, get) => ({
  user: null,
  allUsers: [],
  login: async (email: string, pass: string) => {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        email,
        password: pass,
      },
      {
        withCredentials: true,
      },
    );

    const user = await res.data;
    if (user) {
      set(() => ({ user: user }));
      redirect("/");
    } else {
      set(() => ({ user: null }));
    }
  },
  checkAuth: async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
      {
        withCredentials: true,
      },
    );
    const user = await res.data;
    if (user) {
      set(() => ({ user: user }));
      redirect("/");
    } else {
      set(() => ({ user: null }));
    }
  },
  logout: async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/loguot`, {});
    set(() => ({ user: null }));
    redirect("/");
  },

  getAllUsers: async () => { 
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/get-all`, {withCredentials:true})
    const users = await res.data;
    console.log(users)

    set((state) => ({ allUsers: users }));
    
  },
  getUserById: async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${id}`, { withCredentials: true });
    const user = await res.data.user
    console.log(user);
    return user;

  }


}));
