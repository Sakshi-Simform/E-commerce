import type { ProductInfoProps } from "@/types/product";
const discountedPrice = (price: number, discount: number) =>
    (price - (price * discount) / 100).toFixed(2);

export const ProductInfo = ({
    title,
    description,
    price,
    discountPercentage,
    brand,
    category,
    stock,
}: ProductInfoProps) => {
    return (
        <div className="flex flex-col gap-6 w-full md:w-[55%]">
            <h2 className="text-4xl font-bold mt-3">{title}</h2>
            <p className="text-gray-700 text-lg">{description}</p>

            <div className="text-3xl font-semibold flex items-center gap-3">
                <span className="line-through text-gray-400">${price}</span>
                <span>${discountedPrice(price, discountPercentage)}</span>
                <span className="text-base text-green-600 font-medium">
                    -{discountPercentage}%
                </span>
            </div>

            <p className="text-gray-600 text-lg mb-3">
                Brand: <span className="font-semibold">{brand}</span>
            </p>
            <p className="text-gray-600 text-lg mb-3">
                Category: <span className="font-semibold">{category}</span>
            </p>
            <p className="text-gray-600 text-lg mb-3">
                Stock available: <span className="font-semibold">{stock}</span>
            </p>
        </div>
    );
};