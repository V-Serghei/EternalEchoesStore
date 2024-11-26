"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "@/components/Product/ProductItem";
import apiConnector from "@/api/product/apiConnector";
import { ProductDto } from "@/types/productDto";

const ProductsPage = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await apiConnector.getProduct();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts().then(r => r);
    }, []);

    return (
        <section className="py-20">
            <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductsPage;
