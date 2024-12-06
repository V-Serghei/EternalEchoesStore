import {ProductDto} from "@/types/productDto";
import axios, {AxiosResponse} from "axios";
import {GetProductsResponse} from "@/types/getProductsResponse";
import {API_BASE_URL} from "@/config";
import {GetProductByIdResponse} from "@/types/getProductByIdResponse";

const apiConnector = {
    
    getProduct: async () => {
        const authToken = localStorage.getItem("authToken");

        const response = await fetch(`${API_BASE_URL}/EternalEchoesStore/product`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            },
            next: { revalidate: 10 },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        return data.productDtos ?? [];
    },


    createProduct: async (product: ProductDto): Promise<void> => {
            const authToken = localStorage.getItem("authToken");
            await axios.post<number>(`${API_BASE_URL}/EternalEchoesStore/product`, product,{method: "POST",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }});
    },

    editProduct : async (product: ProductDto) : Promise<void> => {
                await axios.put<number>(`${API_BASE_URL}/EternalEchoesStore/product/${product.id}`, product, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json"
                    }
                });

        },
    deleteProduct: async (productId: number): Promise<void> => {
        const authToken = localStorage.getItem("authToken");
            await axios.delete(`${API_BASE_URL}/EternalEchoesStore/product/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }
            });
    },
    getProductById: async (productId: number): Promise<ProductDto | undefined> => {
            const authToken = localStorage.getItem("authToken");
            const response = await axios.get<GetProductByIdResponse>(`${API_BASE_URL}/EternalEchoesStore/product/${productId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data.productDto; 
    },

    submitRating: async (number: number, rating: number): Promise<void> => {
        const authToken = localStorage.getItem("authToken");
        await axios.post(`${API_BASE_URL}/EternalEchoesStore/product/${number}/rating?rating=${rating}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        });


    }
}
export default apiConnector;