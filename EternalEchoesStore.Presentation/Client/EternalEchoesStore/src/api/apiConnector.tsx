import {ProductDto} from "../models/productDto.ts";
import axios, {AxiosResponse} from "axios";
import {GetProductRespons} from "../models/getProductRespons.tsx";
import {API_BASE_URL} from "../../config.ts";
import {GetProductByIdRespons} from "../models/getProductByIdRespons.tsx";

const apiConnector = {
        getProduct: async (): Promise<ProductDto[]> => {
            try {
                const response: AxiosResponse<GetProductRespons> = await axios.get(`${API_BASE_URL}/EternalEchoesStore`);
                const product = response.data.productDtos.map(product => ({
                    ...product,
                    createDate: product.CreatedAt?.slice(0, 10) ?? ""
                }));
                return product;
            } catch (error) {
                console.log('Error fetching product: ', error);
                throw error;
            }
        },
        createProduct:async (product : ProductDto):Promise<void> => {
            try {
                await axios.post<number>(`${API_BASE_URL}/EternalEchoesStore`, product);
                
            }catch (error){
                console.log(error);
                throw error;
                
            }
        },
        editProduct : async (product: ProductDto) : Promise<void> => {
            try {
                await axios.put<number>(`${API_BASE_URL}/EternalEchoesStore`, product);
    
            }catch (error){
                console.log(error);
                throw error;
    
            }
        },
        deleteProduct : async (productId : number): Promise<void> => {
            try {
                await axios.put<number>(`${API_BASE_URL}/EternalEchoesStore/${productId}`);
    
            }catch (error){
                console.log(error);
                throw error;
    
            }
        },
        getProductById : async (productId : number): Promise<ProductDto|undefined> => {
            
            
            try {
                const response = await
                    axios.get<GetProductByIdRespons>('${API_BASE_URL}/EternalEchoesStore/${productId}');
                return response.data.productDto;

            }catch (error){
                console.log(error);
                throw error;

            }
        }
}
export default apiConnector;