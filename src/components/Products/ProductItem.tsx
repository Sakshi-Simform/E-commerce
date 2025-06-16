import type { ProductImage } from "@/types/product";

export const ProductImageWithSpinner = ({ thumbnail, title, isLoading }: ProductImage) => {
    if (isLoading) {
        return (
            <div className="w-full md:w-[500px] h-[600px] flex justify-center items-center rounded-lg overflow-hidden bg-gray-100">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full md:w-[500px] h-[600px] flex justify-center items-center rounded-lg overflow-hidden bg-gray-100">
            <img src={thumbnail} alt={title} className="w-full h-full object-contain" />
        </div>
    );
};