
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';


// get workspace and filter path and transform to Uri
export function getWorkspace(): string[] {
    const ws_folder = vscode.workspace.workspaceFolders;

    if (ws_folder && ws_folder.length > 0) {
        const ws_path = ws_folder[0].uri.fsPath; // Use fsPath instead of path
        return getAllFiles(ws_path);
    }

    return [];
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = [],arrayOfPathfiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, arrayOfFiles);
        } else {
            arrayOfPathfiles.push(filePath);
            arrayOfFiles.push(path.basename(filePath));
        }
    });

    return filterFiles(arrayOfFiles);;
}

function filterFiles(arrayOfFiles: string[]): string[] {
    const allowedExtensions = ['.png', '.jpg', '.ico', '.svg', '.webp'];
    return arrayOfFiles.filter(file => {
        const extension = path.extname(file);
        return allowedExtensions.includes(extension);
    });
}








