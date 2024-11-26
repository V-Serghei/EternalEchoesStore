"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiConnector from "@/api/product/apiConnector";
import { ProductDto } from "@/types/productDto";

interface ProductDetailsProps {
    params: { id: string }; // Доступ к параметру маршрута
}

const ProductDetailsPage = ({ params }: ProductDetailsProps) => {
    const { id } = params; // Получаем ID из параметров
    const router = useRouter(); // Для навигации

    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const fetchedProduct = await apiConnector.getProductById(Number(id));
                    setProduct(fetchedProduct || null);
                } catch (error) {
                    console.error("Error fetching product:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (!product) {
        return <p>Продукт не найден</p>;
    }

    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <section className="py-20">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex items-center justify-center">
                            <img
                                src={product.imageUrl || "/placeholder.png"} 
                                alt={product.title}
                                className="rounded-md shadow-lg"
                            />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <div className="mb-6">
                                <p>
                                    <strong>Категория:</strong> {product.category}
                                </p>
                                <p>
                                    <strong>Подкатегория:</strong> {product.subCategory}
                                </p>
                            </div>
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700"
                                onClick={() => router.push("/products")} 
                            >
                                Назад к продуктам
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetailsPage;
