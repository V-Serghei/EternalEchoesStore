import {ProductDto} from "../../models/productDto.ts";
import {useEffect, useState} from "react";
import apiConnector from "../../api/apiConnector.ts";
import {Button, Container} from "semantic-ui-react";
import ProductTableItem from "./ProductTableItem.tsx";
import {NavLink} from "react-router-dom";
export default function ProductTable(){
    
    
    const [products, setProducts] = useState<ProductDto[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedProducts = await apiConnector.getProduct();

                
                if (fetchedProducts.length === 0) {
                    console.warn('No products found');
                }

                setProducts(fetchedProducts);
            } catch (error) {
                console.log('Error fetching product: ', error);
            }
        };

        fetchData().then(r => r);
    }, []);
    
    return (
        <>
            <Container className="container-style">
                <table className="ui inverted table">
                    <thead style={{textAlign: "center"}}>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>CreatedAt</th>
                        <th>ImageUrl</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.length !== 0 && (
                        products.map((product, index) => (
                            <ProductTableItem key={index} product={product} />
                        ))
                    )}
                    </tbody>
                    
                </table>
                <Button as={NavLink} to="createProduct" floated='right' type='button' content='Create Product' positive/>
                
            </Container>
        </>
    )
}