"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiConnector from "@/api/product/apiConnector";
import { ProductDto } from "@/types/productDto";
import {FiDelete, FiEdit2} from "react-icons/fi"; // Иконка редактирования
import { FaStar } from "react-icons/fa";
import {FcDeleteDatabase} from "react-icons/fc"; // Иконки звезд

interface ProductDetailsProps {
    params: { id: string };
}

const ProductDetailsPage = ({ params }: ProductDetailsProps) => {
    const { id } = params;
    const router = useRouter();

    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [userRating, setUserRating] = useState<number | null>(null); // Оценка пользователя
    const [isSubmitting, setIsSubmitting] = useState(false); // Статус отправки

    useEffect(() => {
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
    }, [id]);

    const handleRatingSubmit = async (rating: number) => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await apiConnector.submitRating(Number(id), rating); 
            setUserRating(rating);

            
            const updatedProduct = await apiConnector.getProductById(Number(id));
            setProduct(updatedProduct || null);
        } catch (error) {
            console.error("Error submitting rating:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleDelete = async () => {
        try {
            await apiConnector.deleteProduct(Number(id));
            router.push("/products");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
    if (loading) {
        return <p className="text-center text-lg">Загрузка...</p>;
    }

    if (!product) {
        return <p className="text-center text-lg text-red-600">Продукт не найден</p>;
    }

    return (
        <>
            <br />
            <br />
            <br />
            <br />

            <section className="py-20">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Изображение */}
                        <div className="flex justify-center items-center">
                            <img
                                src={product.imageUrl || "/placeholder.png"}
                                alt={product.title}
                                className="rounded-lg shadow-lg w-full max-w-md"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between right mb-6">
                                <h1 className="text-4xl font-bold">{product.title}</h1>
                                <div className="flex flex-col items-end gap-4 mb-6">
                                    <button
                                        onClick={() => router.push(`/products/edit/${id}`)}
                                        className="flex items-center gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow hover:bg-gray-300"
                                    >
                                        <FiEdit2 size={20} /> {/* Иконка редактирования */}
                                        Редактировать
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDelete();
                                            router.push("/products");
                                        }}
                                        className="flex items-center gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow hover:bg-gray-300"
                                    >
                                        <FcDeleteDatabase size={20} /> {/* Иконка удаления */}
                                        Удалить
                                    </button>
                                </div>


                            </div>
                            
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>

                            <div className="space-y-2 text-gray-700 dark:text-gray-400">
                                <p>
                                    <strong>Категория:</strong> {product.category}
                                </p>
                                <p>
                                    <strong>Подкатегория:</strong> {product.subCategory ?? "Нет данных"}
                                </p>
                                <p>
                                    <strong>Подкатегория 2:</strong> {product.subSubCategory ?? "Нет данных"}
                                </p>
                                <p>
                                    <strong>Цена:</strong> ${product.price?.toFixed(2) ?? "N/A"}
                                </p>
                                <p>
                                    <strong>Рейтинг:</strong> {product.rating?.toFixed(1) ?? "Нет данных"}
                                </p>
                                <p>
                                    <strong>Количество на складе:</strong> {product.quantity ?? "Нет данных"}
                                </p>
                                <p>
                                    <strong>Дата добавления:</strong> {product.createdAt ?? "Неизвестно"}
                                </p>
                                <p>
                                    <strong>Доступно:</strong> {product.isAvailable ? "Да" : "Нет"}
                                </p>
                                <p>
                                    <strong>Скидка:</strong> {product.discount ? `${product.discount}%` : "Нет данных"}
                                </p>
                                <p>
                                    <strong>SKU:</strong> {product.SKU ?? "Нет данных"}
                                </p>
                            </div>

                            {/* Компонент рейтинга */}
                            <div className="mt-6">
                                <p className="mb-2 text-lg font-semibold">Оцените продукт:</p>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => handleRatingSubmit(star)}
                                            disabled={isSubmitting}
                                            className={`${
                                                userRating && userRating >= star
                                                    ? "text-yellow-500"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            <FaStar size={24}/>
                                        </button>
                                    ))}
                                </div>
                                {userRating && (
                                    <p className="mt-2 text-green-600">
                                        Спасибо за вашу оценку: {userRating} звезда(ы)!
                                    </p>
                                )}
                            </div>

                            <button
                                className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md shadow hover:bg-blue-700"
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
