import {UserDto} from "@/types/userDto";
import {API_BASE_URL} from "@/config";
import axios from "axios";
import {GetUserByIdResponse} from "@/types/getUserByIdResponse";

const apiConnector = {
    getUser: async (): Promise<UserDto[]> => {
        const response = await fetch(`${API_BASE_URL}/EternalEchoesStore/user`,{
            next: { revalidate: 10 },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        return data.userDtos ?? [];
    },
    createUser: async (user: UserDto): Promise<void> => {
        await axios.post<number>(`${API_BASE_URL}/EternalEchoesStore/user`, user);
    },

    editUser: async (user: UserDto): Promise<void> => {
        await axios.put<number>(`${API_BASE_URL}/EternalEchoesStore/user/${user.id}`, user);

    },
    deleteUser: async (userId: number): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/EternalEchoesStore/user/${userId}`);
    },
    getUserById: async (userId: number): Promise<UserDto | undefined> => {
        const response = await axios.get<GetUserByIdResponse>(`${API_BASE_URL}/EternalEchoesStore/user/${userId}`);
        return response.data.userDto;
    },
    login: async (email: string, password: string): Promise<string> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/EternalEchoesStore/user`, { email, password });
            const token = response.data.token; 
            localStorage.setItem("authToken", token);
            return token;
        } catch (error) {
            console.error(error.response || error);
            throw new Error("Login failed");
        }
    },
    logout: (): void => {
        localStorage.removeItem("authToken");
    },
    // getAuthenticatedUser: async (): Promise<UserDto | undefined> => {
    //     const token = localStorage.getItem("authToken");
    //     if (!token) {
    //         throw new Error("User not authenticated");
    //     }
    //
    //     try {
    //         const response = await axios.get(`${API_BASE_URL}/EternalEchoesStore/auth/me`, {
    //             headers: { Authorization: `Bearer ${token}` }, 
    //         });
    //         return response.data.user;
    //     } catch (error) {
    //         throw new Error("Failed to fetch authenticated user");
    //     }
    // },
}
export default apiConnector;