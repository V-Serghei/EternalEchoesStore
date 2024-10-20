import {ProductDto} from "../models/productDto.ts";
import axios, {AxiosResponse} from "axios";
import {GetProductsResponse} from "../models/getProductsResponse.ts";
import {API_BASE_URL} from "../../config.ts";
import {GetProductByIdResponse} from "../models/getProductByIdResponse.ts";

const apiConnector = {
    getProduct: async (): Promise<ProductDto[]> => {
            const response: AxiosResponse<GetProductsResponse> = await axios.get(`${API_BASE_URL}/EternalEchoesStore`);

            if (response.data && Array.isArray(response.data.productDtos)) {
                return response.data.productDtos.map(product => ({
                    ...product,
                    createdAt: product.createdAt?.slice(0, 10) ?? ""
                }));
            } else {
                console.error('Invalid data format:', response.data);
                return []; 
            }
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