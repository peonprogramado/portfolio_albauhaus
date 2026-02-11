const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Imágenes a convertir con alta calidad
const imagesToConvert = [
  // PiLab5
  { input: 'public/images/Free1_Outdoor_Banner_Mockup.jpg', output: 'public/images/Free1_Outdoor_Banner_Mockup.webp' },
  { input: 'public/images/Billboard_Mockup_2.jpg', output: 'public/images/Billboard_Mockup_2.webp' },
  { input: 'public/images/bus-stop-mockup.jpg', output: 'public/images/bus-stop-mockup.webp' },
  { input: 'public/images/pilab5/postssinstagram.jpg', output: 'public/images/pilab5/postssinstagram.webp' },
  { input: 'public/images/pilab5/157.png', output: 'public/images/pilab5/157.webp' },
  
  // Dune Infografía
  { input: 'public/images/mockupinfografiadune.jpg', output: 'public/images/mockupinfografiadune.webp' },
  { input: 'public/images/graficacomplementaria_af.jpg', output: 'public/images/graficacomplementaria_af.webp' },
  
  // Otras imágenes pesadas
  { input: 'public/images/imagenlinkedin1.jpg', output: 'public/images/imagenlinkedin1.webp' },
  { input: 'public/images/mockuppantallatren.jpg', output: 'public/images/mockuppantallatren.webp' },
  { input: 'public/images/mockupposterbus.jpg', output: 'public/images/mockupposterbus.webp' },
  { input: 'public/images/siiiduneinfografia.png', output: 'public/images/siiiduneinfografia.webp' },
];

async function convertToWebP() {
  console.log('🚀 Iniciando conversión a WebP con alta calidad...\n');
  
  for (const image of imagesToConvert) {
    try {
      const inputPath = path.join(__dirname, '..', image.input);
      const outputPath = path.join(__dirname, '..', image.output);
      
      // Verificar si el archivo existe
      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Archivo no encontrado: ${image.input}`);
        continue;
      }
      
      // Obtener tamaño original
      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024 / 1024).toFixed(2);
      
      console.log(`📸 Convirtiendo: ${image.input}`);
      console.log(`   Tamaño original: ${originalSize} MB`);
      
      // Convertir a WebP con calidad 95 (alta calidad, sin pérdida perceptible)
      await sharp(inputPath)
        .webp({ 
          quality: 95,
          effort: 6 // Máximo esfuerzo de compresión (0-6)
        })
        .toFile(outputPath);
      
      // Obtener tamaño nuevo
      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`   ✅ Nuevo tamaño: ${newSize} MB (${reduction}% reducción)`);
      console.log('');
      
    } catch (error) {
      console.error(`❌ Error convirtiendo ${image.input}:`, error.message);
    }
  }
  
  console.log('✨ Conversión completada!');
}

convertToWebP();
