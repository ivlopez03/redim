import * as vscode from 'vscode';
import { optimizeImage } from './utils/optimizeUtil';


const optimizeImageExplorer = vscode.commands.registerCommand('redim.optimizeImageWithOptions', async (uri: vscode.Uri) => {
    const inputPath = uri.fsPath; // Get the path of the selected file

    // Define default values
    
    const defaultQuality = 80; // Default quality

    // Prompt the user to select the output format
    const format = await vscode.window.showQuickPick(['jpeg', 'webp', 'avif'], {
        placeHolder: 'Select the output format',
       
    });

    if (!format) {
        return; // Exit if no format is selected
    }

    // Prompt the user to enter the quality
    const quality = await vscode.window.showInputBox({
        prompt: 'Enter the quality (1-100)',
        value: defaultQuality.toString(), // Pre-fill with the default quality
    });

    if (!quality || isNaN(+quality) || +quality < 1 || +quality > 100) {
        vscode.window.showErrorMessage('Invalid quality value. Please enter a number between 1 and 100.');
        return;
    }

    // Generate the output path
    const outputPath = inputPath.replace(/\.[^/.]+$/, `.${format}`);

    // Show a progress indicator while optimizing the image
    vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'Optimizing image...',
            cancellable: false,
        },
        async () => {
            await optimizeImage(inputPath, outputPath, Number(+quality), format as 'jpeg' | 'webp' | 'avif', uri.fsPath);
            vscode.window.showInformationMessage(`Image optimized and saved to: ${outputPath}`);
        }
    );
});

export { optimizeImageExplorer };