import { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
    user: { name: string; avatar?: string } | null;
    setUser: Dispatch<SetStateAction<{ name: string; avatar?: string } | null>>;
}
