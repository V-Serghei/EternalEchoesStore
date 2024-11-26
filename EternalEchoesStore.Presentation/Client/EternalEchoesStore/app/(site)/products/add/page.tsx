"use client";

import { useState } from "react";
import apiConnector from "@/api/product/apiConnector"; 
import { ProductDto } from "@/types/productDto";

const AddProductPage = () => {
    const [formData, setFormData] = useState<ProductDto>({
        id: 0,
        title: '',
        description: '',
        createdAt: '',
        imageUrl: '',
        category: '',
        subCategory: '',
        rating: 0,
        price: 0,
        quantity: 0,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await apiConnector.createProduct(formData);
            setMessage("Продукт успешно добавлен!");
            setFormData({
                id: 0,
                title: '',
                description: '',
                createdAt: '',
                imageUrl: '',
                category: '',
                subCategory: '',
                rating: 0,
                price: 0,
                quantity: 0,
            });
        } catch (error) {
            console.error(error);
            setMessage("Произошла ошибка при добавлении продукта.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <div className="max-w-2xl mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-6">Добавить продукт</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Название
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Описание
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Категория
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                            Подкатегория
                        </label>
                        <input
                            type="text"
                            id="subCategory"
                            name="subCategory"
                            value={formData.subCategory}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Изображение
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Цена
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Количество
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Добавление..." : "Добавить продукт"}
                    </button>
                </form>

                {message && <p className="mt-4 text-center text-green-600">{message}</p>}
            </div>
        </div>
    );
};

export default AddProductPage;
