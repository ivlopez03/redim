import * as vscode from 'vscode';
import { getImageFiles } from './utils/getImageFilesUtil';
import { optimizeImage } from './utils/optimizeUtil';




export async function optimizeAllFiles(context: vscode.ExtensionContext) {
	
	const imageFiles = await getImageFiles();
	
	if (imageFiles.length === 0) {
		vscode.window.showInformationMessage('No image files found in the workspace.');
		return;
	}

	const format = await vscode.window.showQuickPick(['jpeg', 'webp', 'avif'], {
		placeHolder: 'Select image format to optimize',
	});

	if (!format) {
		return; // exit if no format is selected 
	}

	const quality = await vscode.window.showInputBox({
		placeHolder: 'Enter image quality (1-100)',
		validateInput: (text: string) => {
			const quality = parseInt(text);
			if (isNaN(quality) || quality < 1 || quality > 100) {
				return 'Quality must be a number between 1 and 100';
			}
			return null;
		},
	});

	// Filter out files that already have the selected format
    const filteredFiles = imageFiles.filter((file) => {
        const fileExtension = file.path.split('.').pop()?.toLowerCase(); // Get the file extension
        return fileExtension !== format; // Exclude files with the same format
    });

    if (filteredFiles.length === 0) {
        vscode.window.showInformationMessage('No files to optimize. All files already have the selected format.');
        return;
    }

	vscode.window.withProgress(
		{
			location: vscode.ProgressLocation.Notification,
			title: 'Optimizing all images...',
			cancellable: false,
		},
		async (progress) => {
			for (let i = 0; i < filteredFiles.length; i++) {
				const file = filteredFiles[i];
				const inputPath = file.path;
				const outputPath = inputPath.replace(/\.[^/.]+$/, `.${format}`); // Save with the same name but new format


				// Update progress
				progress.report({
					message: `Optimizing ${file.filename} (${i + 1}/${filteredFiles.length})`,
					increment: (i / filteredFiles.length) * 100,
				});

				// Optimize the image
				await optimizeImage(inputPath, outputPath,Number(quality), format as 'jpeg' | 'webp' | 'avif', file.filename);
			}

			vscode.window.showInformationMessage(`All ${filteredFiles.length} images optimized successfully!`);
		}
	);


}

