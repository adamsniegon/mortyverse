import fs from "fs/promises";

export const checkDirectory = async (directory: string) =>
  fs.mkdir(directory, { recursive: true });
