import * as vscode from 'vscode';
import sharp from 'sharp';
import fs from 'fs';




type ImageFormat = 'jpeg' | 'webp' | 'avif';


export async function optimizeImage(
    inputPath: string,
    outputPath: string,
    quality: number,
    format: ImageFormat = 'jpeg' ,
    filename: string
): Promise<void> {

    try {
        // Optimize the image using sharp
        const image_path = sharp(inputPath);

        switch (format) {
            case 'jpeg':
                await image_path.jpeg({ quality, mozjpeg: true }).toFile(outputPath);
                break;
            case 'webp':
                await image_path.webp({ quality }).toFile(outputPath);
                break;
            case 'avif':
                await image_path.avif({ quality}).toFile(outputPath);
                break;
            default:
                throw new Error('Invalid image format');
        }


        // Check the file size
        const originalSize: number = fs.statSync(inputPath).size;
        const optimizedSize: number = fs.statSync(outputPath).size;

        vscode.window.showInformationMessage(
            `Image ${filename} optimized successfully! Optimized size: ${optimizedSize} bytes`);

        console.log(`Original size: ${originalSize} bytes`);
        console.log(`Optimized size: ${optimizedSize} bytes`);
    } catch (error) {
        console.error('Error optimizing image:', error);
    }
    
}




