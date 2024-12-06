"use client";

import { useEffect } from "react";

export default function useAuth() {
    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        if (token) {
            fetch("/api/auth/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            })
                .then((res) => {
                    if (!res.ok) {
                        console.error("Token validation failed");
                    }
                })
                .catch((err) => console.error("Error validating token:", err));
        }
    }, []);
}
