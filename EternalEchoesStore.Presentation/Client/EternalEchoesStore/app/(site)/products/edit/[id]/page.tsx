"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiConnector from "@/api/product/apiConnector";
import { ProductDto } from "@/types/productDto";

interface EditProductProps {
    params: { id: string }; 
}

const EditProductPage = ({ params }: EditProductProps) => {
    const { id } = params; 
    const router = useRouter(); 

    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await apiConnector.getProductById(Number(id));
                setProduct(fetchedProduct || null);
            } catch (error) {
                console.error("Error fetching product:", error);
                setError("Ошибка при загрузке данных продукта.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct().then(r => r);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        setSaving(true);
        setError(null);

        try {
            await apiConnector.editProduct(product); 
            router.push("/products"); 
        } catch (error) {
            console.error("Error updating product:", error);
            setError("Ошибка при сохранении продукта.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p className="text-center text-lg">Загрузка...</p>;
    }

    if (!product) {
        return <p className="text-center text-lg text-red-600">Продукт не найден</p>;
    }

    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <section className="py-20">
                <div className="container mx-auto max-w-3xl">
                    <h1 className="text-3xl font-bold mb-6">Редактирование продукта</h1>

                    {error && <p className="mb-4 text-red-600">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Название</label>
                            <input
                                type="text"
                                name="title"
                                value={product.title}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Описание</label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                rows={4}
                                required
                                className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">URL изображения</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={product.imageUrl || ""}
                                onChange={handleChange}
                                className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Цена</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price || ""}
                                    onChange={handleChange}
                                    step="0.01"
                                    required
                                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Количество</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={product.quantity || ""}
                                    onChange={handleChange}
                                    required
                                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Категория</label>
                            <input
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Подкатегория</label>
                            <input
                                type="text"
                                name="subCategory"
                                value={product.subCategory || ""}
                                onChange={handleChange}
                                className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={saving}
                            className={`w-full py-2 px-4 rounded-md shadow text-white ${
                                saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {saving ? "Сохранение..." : "Сохранить изменения"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default EditProductPage;
