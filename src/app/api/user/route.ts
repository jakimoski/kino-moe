import prisma from "@/lib/dbPrisma";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, userName, image, comments, watchLists } = body;

    const checkExistingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (checkExistingUser) {
      return NextResponse.json(
        { user: null, message: "User already exists" },
        { status: 400 }
      );
    }
    console.log("newUser");

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userName,
        watchLists,
        comments,
        image,
      },
    });

    console.log(newUser);

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!", err },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
