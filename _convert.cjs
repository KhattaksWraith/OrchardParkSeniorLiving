const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');

async function convert() {
    const files = fs.readdirSync(imagesDir);
    const pngFiles = files.filter(f => path.extname(f).toLowerCase() === '.png');
    const jpgFiles = files.filter(f => path.extname(f).toLowerCase() === '.jpg');
    
    for (const file of pngFiles) {
        const inputPath = path.join(imagesDir, file);
        const outputPath = path.join(imagesDir, path.basename(file, '.png') + '.webp');
        
        try {
            const info = await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
            console.log(`OK ${file} -> ${path.basename(outputPath)} (${(info.size/1024).toFixed(0)} KB)`);
        } catch (err) {
            console.error(`FAIL ${file}: ${err.message}`);
        }
    }
    
    for (const file of jpgFiles) {
        const inputPath = path.join(imagesDir, file);
        const outputPath = path.join(imagesDir, path.basename(file, '.jpg') + '.webp');
        
        try {
            const info = await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
            console.log(`OK ${file} -> ${path.basename(outputPath)} (${(info.size/1024).toFixed(0)} KB)`);
        } catch (err) {
            console.error(`FAIL ${file}: ${err.message}`);
        }
    }
    
    console.log('\nDone!');
}

convert();
