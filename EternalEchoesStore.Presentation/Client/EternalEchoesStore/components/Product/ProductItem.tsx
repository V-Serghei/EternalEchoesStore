"use client";
import { ProductDto } from "@/types/productDto";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ProductItem = ({ product }: { product: ProductDto }) => {
    const { id, imageUrl, title, description } = product;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
        >
            <Link href={`/products/${id}`} className="relative block aspect-[4/3]">
                <img src={imageUrl || ''} alt={title}  className="rounded-t-lg object-cover" />
            </Link>

            <div className="px-4">
                <h3 className="mt-4 text-lg font-semibold text-black dark:text-white">
                    <Link href={`/products/${id}`}>{title}</Link>
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>
            </div>
        </motion.div>
    );
};

export default ProductItem;
