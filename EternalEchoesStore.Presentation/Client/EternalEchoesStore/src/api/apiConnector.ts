import {ProductDto} from "../models/productDto.ts";
import axios, {AxiosResponse} from "axios";
import {GetProductsResponse} from "../models/getProductsResponse.ts";
import {API_BASE_URL} from "../../config.ts";
import {GetProductByIdResponse} from "../models/getProductByIdResponse.ts";
import {GetUsersResponse} from "../models/getUsersResponse.ts";
import {GetUserByIdResponse} from "../models/getUserByIdResponse.ts";
import {UserDto} from "../models/userDto.ts";

const apiConnector = {
    getProduct: async (): Promise<ProductDto[]> => {
            const response: AxiosResponse<GetProductsResponse> = await axios.get(`${API_BASE_URL}/EternalEchoesStore/product`);

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
            await axios.post<number>(`${API_BASE_URL}/EternalEchoesStore/product`, product);
    },

    editProduct : async (product: ProductDto) : Promise<void> => {
                await axios.put<number>(`${API_BASE_URL}/EternalEchoesStore/product/${product.id}`, product);

        },
    deleteProduct: async (productId: number): Promise<void> => {
            await axios.delete(`${API_BASE_URL}/EternalEchoesStore/product/${productId}`);
    },
    getProductById: async (productId: number): Promise<ProductDto | undefined> => {
            const response = await axios.get<GetProductByIdResponse>(`${API_BASE_URL}/EternalEchoesStore/product/${productId}`);
            return response.data.productDto; 
    },
    //User System
    getUser: async (): Promise<UserDto[]> => {
        const response: AxiosResponse<GetUsersResponse> = await axios.get(`${API_BASE_URL}/EternalEchoesStore/user`);

        if (response.data && Array.isArray(response.data.userDtos)) {
            return response.data.userDtos.map(user => ({
                ...user,
                createdAt: user.createdAt?.slice(0, 10) ?? ""
            }));
        } else {
            console.error('Invalid data format:', response.data);
            return [];
        }
    },
    createUser: async (user: UserDto): Promise<void> => {
        await axios.post<number>(`${API_BASE_URL}/EternalEchoesStore/user`, user);
    },

    editUser : async (user: UserDto) : Promise<void> => {
        await axios.put<number>(`${API_BASE_URL}/EternalEchoesStore/user/${user.id}`, user);

    },
    deleteUser: async (userId: number): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/EternalEchoesStore/user/${userId}`);
    },
    getUserById: async (userId: number): Promise<UserDto | undefined> => {
        const response = await axios.get<GetUserByIdResponse>(`${API_BASE_URL}/EternalEchoesStore/user/${userId}`);
        return response.data.userDto;
    }

}
export default apiConnector;