// Cloudinary configuration and helpers
export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || "dfxheaozx",
  baseUrl: "https://res.cloudinary.com",
};

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: "auto" | number;
  format?: "auto" | "webp" | "jpg" | "png";
  crop?: "fill" | "fit" | "scale" | "crop";
  gravity?: "auto" | "face" | "center";
}

/**
 * Generate optimized Cloudinary URL
 * @param publicId - The Cloudinary public ID (e.g., 'recipes/einstein-toastie')
 * @param options - Transformation options
 */
export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const {
    width = 800,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
    gravity = "auto",
  } = options;

  const transformations = [
    quality !== "auto" ? `q_${quality}` : "q_auto",
    format !== "auto" ? `f_${format}` : "f_auto",
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    crop ? `c_${crop}` : null,
    gravity !== "center" ? `g_${gravity}` : null,
  ]
    .filter(Boolean)
    .join(",");

  return `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformations}/${publicId}`;
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(publicId: string) {
  return {
    mobile: getCloudinaryUrl(publicId, { width: 400, height: 300 }),
    tablet: getCloudinaryUrl(publicId, { width: 600, height: 400 }),
    desktop: getCloudinaryUrl(publicId, { width: 800, height: 500 }),
    large: getCloudinaryUrl(publicId, { width: 1200, height: 800 }),
  };
}
