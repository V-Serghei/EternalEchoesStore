import {ProductDto} from "../models/productDto.ts";
import axios, {AxiosResponse} from "axios";
import {GetProductsResponse} from "../models/getProductsResponse.ts";
import {API_BASE_URL} from "../../config.ts";
import {GetProductByIdResponse} from "../models/getProductByIdResponse.ts";

const apiConnector = {
    getProduct: async (): Promise<ProductDto[]> => {
        try {
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
        } catch (error) {
            console.log('Error fetching product: ', error);
            throw error; 
        }
    },


    createProduct: async (product: ProductDto): Promise<void> => {
        try {
            await axios.post<number>(`${API_BASE_URL}/EternalEchoesStore`, product);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    editProduct : async (product: ProductDto) : Promise<void> => {
            try {
                await axios.put<number>(`${API_BASE_URL}/EternalEchoesStore/${product.id}`, product);

            }catch (error){
                console.log(error);
                throw error;
    
            }
        },
    deleteProduct: async (productId: number): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}/EternalEchoesStore/${productId}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getProductById: async (productId: number): Promise<ProductDto | undefined> => {
        try {
            const response = await axios.get<GetProductByIdResponse>(`${API_BASE_URL}/EternalEchoesStore/${productId}`);
            return response.data.productDto; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}
export default apiConnector;