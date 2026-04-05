/**
 * Lee un archivo tipo File (Imagen), lo redimensiona y reduce su calidad
 * para retornar un String Base64 ultra rápido y proteger el servidor MongoDB.
 */
export const compressImageToBase64 = (file, maxW = 800, maxH = 800) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");
    
    // Verificamos que sea imagen
    if (!file.type.startsWith('image/')) {
       return reject("El archivo debe ser una imagen válida.");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let { width, height } = img;

        // Mantener Aspect Ratio si sobrepasa límites
        if (width > maxW || height > maxH) {
          const ratio = Math.min(maxW / width, maxH / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Forzar exportación a JPEG comprimido al 75%
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject("Falló la renderización de la imagen.");
    };
    reader.onerror = (error) => reject("Falló la lectura del archivo.");
  });
};
