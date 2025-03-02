import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Supported image file extensions
const SUPPORTED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg','.svg', '.webp', '.avif', '.gif', '.tiff'];

// Function to get all image files in the workspace
export async function getImageFiles(): Promise<{ path: string; filename: string }[]> {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder is open.');
        return [];
    }

    const imageFiles: { path: string; filename: string }[] = [];

    // Recursively search for image files in the workspace
    for (const folder of workspaceFolders) {
        const folderPath = folder.uri.fsPath;
        await findImageFiles(folderPath, imageFiles);
    }

    return imageFiles;
}

// Helper function to recursively find image files
async function findImageFiles(dir: string, imageFiles: { path: string; filename: string }[]) {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            // Recursively search subdirectories
            await findImageFiles(fullPath, imageFiles);
        } else if (file.isFile()) {
            // Check if the file is an image
            const ext = path.extname(file.name).toLowerCase();
            if (SUPPORTED_IMAGE_EXTENSIONS.includes(ext)) {
                imageFiles.push({
                    path: fullPath,
                    filename: file.name,
                });
            }
        }
    }
}