"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "@/components/Product/ProductItem";
import apiConnector from "@/api/product/apiConnector";
import { ProductDto } from "@/types/productDto";

const ProductsPage = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Строка поиска
    const [sortCriteria, setSortCriteria] = useState<string>(""); // Критерий сортировки
    const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]); // Отфильтрованные продукты

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await apiConnector.getProduct();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let result = [...products];

        if (searchTerm) {
            result = result.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortCriteria) {
            result.sort((a, b) => {
                if (sortCriteria === "price-asc") return (a.price ?? 0) - (b.price ?? 0);
                if (sortCriteria === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
                if (sortCriteria === "rating-asc") return (a.rating ?? 0) - (b.rating ?? 0);
                if (sortCriteria === "rating-desc") return (b.rating ?? 0) - (a.rating ?? 0);
                return 0;
            });

        }

        setFilteredProducts(result);
    }, [searchTerm, sortCriteria, products]);

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <section className="py-20">
                {/* Панель поиска и сортировки */}
                <div className="container mx-auto mb-6 flex flex-col md:flex-row items-center gap-4">
                    <input
                        type="text"
                        placeholder="Поиск по названию"
                        className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="w-full md:w-1/4 px-4 py-2 border rounded-md shadow"
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                    >
                        <option value="">Сортировать</option>
                        <option value="price-asc">Цена: по возрастанию</option>
                        <option value="price-desc">Цена: по убыванию</option>
                        <option value="rating-asc">Рейтинг: по возрастанию</option>
                        <option value="rating-desc">Рейтинг: по убыванию</option>
                    </select>
                </div>

                {/* Список продуктов */}
                <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="text-center col-span-full">Продукты не найдены.</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProductsPage;
