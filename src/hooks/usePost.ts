import prisma from "@/lib/dbPrisma";

async function fetchPosts(
  filter?: object,
  orderBy?: object,
  take: number = 10,
  skip: number = 0
) {
  try {
    return await prisma.post.findMany({
      where: filter,
      orderBy,
      take,
      skip,
      select: {
        id: true,
        userId: true,
        title: true,
        body: true,
        likes: true,
        dislikes: true,
        createdAt: true,
        comments: {
          select: {
            id: true,
            userId: true,
            createdAt: true,
            content: true,
            postId: true,
            likes: true,
            dislikes: true,
            Reply: {
              select: {
                id: true,
                userId: true,
                cretedAt: true,
                body: true,
                commentId: true,
                likes: true,
                dislikes: true,
                user: {
                  select: {
                    id: true,
                    userName: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
            user: {
              select: {
                id: true,
                userName: true,
                email: true,
                image: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            userName: true,
            email: true,
            image: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
}

export const usePost = () => {
  const getAllPosts = async () => {
    try {
      return await fetchPosts({}, { id: "asc" }, 10);
    } catch (error) {
      console.error("Error getting posts:", error);
      throw new Error("Failed to get posts");
    }
  };

  const showMorePosts = async (
    take: number,
    search?: string,
    order?: string
  ) => {
    try {
      return await fetchPosts(
        { title: { contains: search } },
        { id: order },
        take
      );
    } catch (error) {
      console.error("Error getting posts:", error);
      throw new Error("Failed to get posts");
    }
  };

  const getComments = async () => {
    try {
      return await prisma.comment.findMany({
        select: {
          id: true,
          userId: true,
          createdAt: true,
          content: true,
          postId: true,
          user: {
            select: {
              id: true,
              userName: true,
              email: true,
              image: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error getting comments:", error);
      throw new Error("Failed to get comments");
    }
  };

  return {
    getAllPosts,
    showMorePosts,
    getComments,
  };
};
