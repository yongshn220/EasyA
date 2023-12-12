import imageCompression from "browser-image-compression";

export const ResolutionType = {
  LOW: 'resolutionTypeLow',
  HIGH: 'resolutionTypeHigh',
}

export function compressAndSetImage(file, imageId, updateImageState) {
  if (file) {
    // Compress and set low-res image
    compressImage(file, ResolutionType.LOW).then(lowResImage => {
      readImage(lowResImage).then(lowResUrl => {
        updateImageState(imageId, lowResUrl, ResolutionType.LOW);
      });
    });

    // Compress and set high-res image
    compressImage(file, ResolutionType.HIGH).then(highResImage => {
      readImage(highResImage).then(highResUrl => {
        updateImageState(imageId, highResUrl, ResolutionType.HIGH);
      });
    });
  }
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function compressImage(file, resolutionType = ResolutionType.LOW) {
  const options = resolutionType === ResolutionType.HIGH ?
    { maxSizeMB: 1, maxWidthOrHeight: 1200 } : // High-res settings
    { maxSizeMB: 0.3, maxWidthOrHeight: 200 }; // Low-res settings

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error in compressing image: ", error);
    throw error;
  }
}
