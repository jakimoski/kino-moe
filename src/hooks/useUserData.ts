import prisma from "@/lib/dbPrisma";
import { TUser } from "@/types/types";

export function useUserData() {
  const updateUser = async (email: string, data: any) => {
    await prisma.user.update({
      where: {
        email,
      },
      data,
    });
  };

  const getUser = async (id: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        userName: true,
        image: true,
        bio: true,
        cultures: true,
        interests: true,
        preferences: true,
        recommendations: true,
        showMeAround: true,
        accountType: true,
        Post: true,
        watchLists: true,
        type: true,
      },
    });

    return user;
  };

  const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        userName: true,
        image: true,
        bio: true,
        cultures: true,
        interests: true,
        preferences: true,
        recommendations: true,
        showMeAround: true,
        accountType: true,
        Post: true,
        watchLists: true,
        type: true,
      },
    });

    return user;
  };

  return {
    updateUser,
    getUser,
    getUserByEmail,
  };
}
