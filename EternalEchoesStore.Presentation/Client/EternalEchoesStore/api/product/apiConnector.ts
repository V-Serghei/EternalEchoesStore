import {ProductDto} from "@/types/productDto";
import axios, {AxiosResponse} from "axios";
import {GetProductsResponse} from "@/types/getProductsResponse";
import {API_BASE_URL} from "@/config";
import {GetProductByIdResponse} from "@/types/getProductByIdResponse";

const apiConnector = {
    getProduct: async () => {
        const response = await fetch(`${API_BASE_URL}/EternalEchoesStore`, {
            next: { revalidate: 10 }, 
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        return data.productDtos ?? [];
    },


    createProduct: async (product: ProductDto): Promise<void> => {
            await axios.post<number>(`${API_BASE_URL}/EternalEchoesStore`, product);
    },

    editProduct : async (product: ProductDto) : Promise<void> => {
                await axios.put<number>(`${API_BASE_URL}/EternalEchoesStore/${product.id}`, product);

        },
    deleteProduct: async (productId: number): Promise<void> => {
            await axios.delete(`${API_BASE_URL}/EternalEchoesStore/${productId}`);
    },
    getProductById: async (productId: number): Promise<ProductDto | undefined> => {
            const response = await axios.get<GetProductByIdResponse>(`${API_BASE_URL}/EternalEchoesStore/${productId}`);
            return response.data.productDto; 
    }

}
export default apiConnector;