// src/components/product/AddProductForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductDto } from '../../models/productDto';
import apiConnector from "../../api/apiConnector.ts";

const AddProductForm: React.FC = () => {
    const [product, setProduct] = useState<ProductDto>({
        id: 0,
        title: '',
        description: '',
        createdAt: '',
        imageUrl: '',
        category: '',
        subCategory: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        
        await apiConnector.createProduct(product);

        navigate(`/viewProduct/${product.id}`);
    };

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={product.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={product.imageUrl}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="subCategory"
                    placeholder="Subcategory"
                    value={product.subCategory}
                    onChange={handleChange}
                />
                <button type="submit">Save Product</button>
            </form>
        </div>
    );
};

export default AddProductForm;
