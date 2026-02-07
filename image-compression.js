/**
 * MODULE: Image Optimization Config
 * TASK: Fix blurry uploads by adjusting compression quality.
 * CONTEXT: Initially, 'quality' was set to 40, causing OCR failures.
 */

const sharp = require('sharp');

const processImageUpload = async (fileBuffer) => {
    
    // OLD CONFIGURATION (Caused Issues)
    // const qualitySetting = 40; 
    
    // NEW CONFIGURATION (The Fix)
    // Increased quality to 80 to ensure OCR can read handwritten text
    const qualitySetting = 80; 

    return await sharp(fileBuffer)
        .resize(1200, null, { // Resize width to 1200px, maintain aspect ratio
            withoutEnlargement: true
        })
        .jpeg({ 
            quality: qualitySetting, // <--- This is the parameter I tuned
            progressive: true 
        })
        .toBuffer();
};

module.exports = processImageUpload;