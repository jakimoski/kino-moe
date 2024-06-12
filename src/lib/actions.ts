"use server";
import { revalidatePath } from "next/cache";
import { hash } from "bcrypt";
import prisma from "./dbPrisma";
import { saveImage } from "./saveImage";

export async function setProfileInfo(formData: FormData) {
  const user = {
    image: formData.get("image") as File,
    name: formData.get("name") as string,
  };

  saveImage(user.image, user.name);
}

// export async function updateUser() {
//   await prisma.user.update({
//     where: {
//       email: "vlatko@vlatko.com",
//     },
//     data: {
//       userName: "Viola the Magnificent",
//     },
//   });
// }

export async function hashPassword(password: string) {
  return await hash(password, 10);
}

export const createReply = async (formData: FormData) => {
  await prisma.comment.create({
    data: {
      content: formData.get("content") as string,
      userId: Number(formData.get("userId")),
      postId: Number(formData.get("postId")),

      type: "post",
    },
  });

  revalidatePath("/community", "page");
};

export const createPost = async (formData: FormData) => {
  await prisma.post.create({
    data: {
      body: formData.get("body") as string,
      userId: Number(formData.get("userId")),
      title: formData.get("title") as string,
    },
  });
  revalidatePath("/community", "page");
};

export default async function revalidateCommunity() {
  revalidatePath("/community", "page");
}
