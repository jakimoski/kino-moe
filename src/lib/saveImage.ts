import fs from "node:fs";
import path from "node:path";

export async function saveImage(image: File, name: string) {
  const extension = image.name.split(".").pop();
  const imageName = name.replace(/@/g, ".");
  const fileName = `${imageName}.${extension}`;
  const directory = path.join(process.cwd(), "/assets/users");

  // Ensure the directory exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const filePath = path.join(directory, fileName);
  const stream = fs.createWriteStream(filePath);

  try {
    const bufferedImage = await image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage));
    stream.end();
  } catch (error) {
    stream.destroy();
    throw new Error("Saving image failed!");
  }
}
