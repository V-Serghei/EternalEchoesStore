// src/components/product/ViewProduct.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDto } from '../../models/productDto';
import apiConnector from "../../api/apiConnector.ts";

const ViewProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDto | null>(null);

     useEffect(() => {
         const fetchProduct = async () => {
             const fetchedProduct = await apiConnector.getProductById(Number(id));
             setProduct(fetchedProduct || null);
         };
         fetchProduct().then(r => r);
     }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <img src={product.imageUrl} alt={product.title} />
            <p>Category: {product.category}</p>
            <p>Subcategory: {product.subCategory}</p>
            <p>Created At: {product.createdAt}</p>
        </div>
    );
};

export default ViewProduct;
