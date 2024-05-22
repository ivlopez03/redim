
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';


/**
 * This function calls getAllFiles() passing the workspace path as argument to get an array with the name of the files with supported extension(.jpg, .png, .ico ...)
 * @returns Array of file names with supported extensions in the workspace you are currently working on
 */
export function getWorkspaceFiles(): string[] {
    const workspace_path = vscode.workspace.workspaceFolders;

    if (workspace_path && workspace_path.length > 0) {
        const ws_path = workspace_path[0].uri.fsPath; 
        return getAllFiles(ws_path);
    }

    return [];
}




/**
 * Recursive function that gets all the files in the workspace
 * @param dir_path 
 * @param array_files 
 * @param array_path_files 
 * @returns 
 */
function getAllFiles(dir_path: string, array_files: string[] = [],array_path_files: string[] = []): string[] {
    const files = fs.readdirSync(dir_path);

    files.forEach((file) => {
        const file_path = path.join(dir_path, file);
        if (fs.statSync(file_path).isDirectory()) {
            getAllFiles(file_path, array_files);
        } else {
            array_path_files.push(file_path);
            array_files.push(path.basename(file_path));
        }
    });

    return filterFileExtension(array_files);
}



/**
 * This function filters the files with supported extensions(.jpg, .png, .ico ...) from the array of files
 * @param files_list Array of file names
 * @returns Array of file names with supported extensions
 */

function filterFileExtension(files_list: string[]): string[] {
    const allowedExtensions = ['.png', '.jpg', '.ico', '.svg', '.webp'];
    return files_list.filter(file => {
        const extension = path.extname(file);
        return allowedExtensions.includes(extension);
    });
}








