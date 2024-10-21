import { fileUrl } from "../config";


export const handleImageError = (event) => {
    event.target.src = `${fileUrl}/placeholder-product-img.jpg` ;
    event.target.onerror = null;
    event.target.alt = "Not Found";
};
