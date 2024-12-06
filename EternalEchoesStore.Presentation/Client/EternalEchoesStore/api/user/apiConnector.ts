import {UserDto} from "@/types/userDto";
import {API_BASE_URL} from "@/config";
import axios from "axios";
import {GetUserByIdResponse} from "@/types/getUserByIdResponse";

const apiConnector = {
    getUser: async (): Promise<UserDto[]> => {
        const authToken = localStorage.getItem("authToken");
        
        const response = await fetch(`${API_BASE_URL}/EternalEchoesStore/user`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            },
            next: { revalidate: 10 },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        return data.userDtos ?? [];
    },
    createUser: async (user: UserDto): Promise<string> => {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.post(`${API_BASE_URL}/EternalEchoesStore/user`, user);
        const token = response.data;
        localStorage.setItem("authToken", token);
        return token;
        
    },

    editUser: async (user: UserDto): Promise<void> => {
        const authToken = localStorage.getItem("authToken");
        await axios.put<number>(`${API_BASE_URL}/EternalEchoesStore/user/${user.id}`, user,
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }
            });

    },
    deleteUser: async (userId: number): Promise<void> => {
        const authToken = localStorage.getItem("authToken");
        await axios.delete(`${API_BASE_URL}/EternalEchoesStore/user/${userId}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        });
        
    },
    getUserById: async (userId: number): Promise<UserDto | undefined> => {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get<GetUserByIdResponse>(`${API_BASE_URL}/EternalEchoesStore/user/${userId}`
            , {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response.data.userDto;
    },
    login: async (email: string, password: string): Promise<string> => {
        const authToken = localStorage.getItem("authToken");
        try {
            const response = await axios.put(`${API_BASE_URL}/EternalEchoesStore/user`, { email, password });
            const token = response.data; 
            localStorage.setItem("authToken", token);
            return token;
        } catch (error) {
            console.error(error.response || error);
            throw new Error("Login failed");
        }
    },
    logout: (): void => {
        const authToken = localStorage.getItem("authToken");
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("authToken");
        window.location.reload();
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