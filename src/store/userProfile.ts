import { create } from "zustand";

type TUserData = {
  email?: string;
  userName?: string;
  password?: string;
  image?: string;
  accountType?: string;
  bio?: string;
  type?: string;
  cultures?: string[];
  interests?: string[];
  preferences?: string[];
  recommendations?: string[];
  showMeAround?: boolean;
  notifications?: string[];
  privacy?: string;
  account?: "free" | "paid" | "points";
};

type TUserProfile = {
  user: TUserData | null;
  setUser: (userPayload: TUserData) => void;
};

export const useUserProfile = create<TUserProfile>((set) => ({
  user: null,
  setUser: (userPayload) =>
    set((state) => ({
      ...state.user,
      user: userPayload,
    })),
}));

type TStep = {
  step: number;
  increaseStep: () => void;
  decreaseStep: () => void;
};

export const useSetStep = create<TStep>((set) => ({
  step: 1,
  increaseStep: () => set((state) => ({ step: state.step + 1 })),
  decreaseStep: () => set((state) => ({ step: state.step - 1 })),
}));
