import { promises as fs } from "fs";

export const getFileContent = async (file: string) => {
    file = file.replace(/^[~]/, process.env.HOME);
    const content = await fs.readFile(file);
    return content.toString();
}