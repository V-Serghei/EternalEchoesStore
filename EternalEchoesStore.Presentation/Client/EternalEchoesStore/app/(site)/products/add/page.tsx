"use client";

import { useState } from "react";
import apiConnector from "@/api/product/apiConnector";
import { ProductDto } from "@/types/productDto";

const AddProductPage = () => {
    const [formData, setFormData] = useState<ProductDto>({
        id: undefined,
        title: '',
        description: '',
        createdAt: '',
        imageUrl: '',
        category: '',
        subCategory: '',
        subSubCategory: '',
        price: undefined,
        quantity: undefined,
        rating: undefined,
        isAvailable: true,
        discount: undefined,
        SKU: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        // Если поле - это checkbox, используем checked
        const newValue = type === "checkbox" ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await apiConnector.createProduct(formData);
            setMessage("Продукт успешно добавлен!");
            setFormData({
                id: undefined,
                title: '',
                description: '',
                createdAt: '',
                imageUrl: '',
                category: '',
                subCategory: '',
                subSubCategory: '',
                price: undefined,
                quantity: undefined,
                rating: undefined,
                isAvailable: true,
                discount: undefined,
                SKU: '',
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
                        />
                    </div>

                    <div>
                        <label htmlFor="subSubCategory" className="block text-sm font-medium text-gray-700">
                            Подкатегория 2
                        </label>
                        <input
                            type="text"
                            id="subSubCategory"
                            name="subSubCategory"
                            value={formData.subSubCategory}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Цена
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Количество
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>

                   

                    <div>
                        <label htmlFor="isAvailable" className="block text-sm font-medium text-gray-700">
                            Доступность
                        </label>
                        <input
                            type="checkbox"
                            id="isAvailable"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                            Скидка
                        </label>
                        <input
                            type="number"
                            id="discount"
                            name="discount"
                            value={formData.discount || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            min={0}
                            max={100}
                        />
                    </div>

                    <div>
                        <label htmlFor="SKU" className="block text-sm font-medium text-gray-700">
                            SKU
                        </label>
                        <input
                            type="text"
                            id="SKU"
                            name="SKU"
                            value={formData.SKU || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
};

export default AddProductPage;
