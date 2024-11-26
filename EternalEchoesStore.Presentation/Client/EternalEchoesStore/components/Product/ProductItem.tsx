"use client";
import { ProductDto } from "@/types/productDto";
import { motion } from "framer-motion";
import Link from "next/link";

const ProductItem = ({ product }: { product: ProductDto }) => {
    const { id, imageUrl, title, description, price, rating, quantity } = product;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
        >
            <Link href={`/products/${id}`} className="relative block aspect-[4/3]">
                <img
                    src={imageUrl || "/placeholder.png"}
                    alt={title}
                    className="rounded-t-lg object-cover"
                />
            </Link>

            <div className="px-4">
                <h3 className="mt-4 text-lg font-semibold text-black dark:text-white">
                    <Link href={`/products/${id}`}>{title}</Link>
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-blue-600">${price?.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                        Рейтинг: <span className="font-semibold">{rating ?? "N/A"}</span>
                    </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                    Количество на складе: {quantity ?? "Нет данных"}
                </p>
            </div>
        </motion.div>
    );
};

export default ProductItem;
