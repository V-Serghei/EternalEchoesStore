"use client";

import SidebarLink from "@/components/Docs/SidebarLink";
import {UserDto} from "@/types/userDto";
import apiConnector from "@/api/user/apiConnector";
import {useEffect, useState} from "react";
export default function ProfilePage() {
    let id: any;
    id = Number (localStorage.getItem("id"));
    
    const [user, setUser] = useState<UserDto| null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id) {
            const fetchUsers = async () => {
                try {
                    const userInfo = await apiConnector.getUserById(Number(id));
                    setUser(userInfo || null);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
            fetchUsers();
        }
    }, [id]);
    

    if (!user) {
        return <p>Продукт не найден</p>;
    }
    return (
        <>
            <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        {/* Sidebar */}
                        <div className="w-full px-4 lg:w-1/4">
                            <div className="sticky top-[74px] rounded-lg border border-white p-4 shadow-solid-4 transition-all dark:border-strokedark dark:bg-blacksection">
                                <ul className="space-y-2">
                                    <SidebarLink />
                                </ul>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="w-full px-4 lg:w-3/4">
                            <div className="shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <div className="flex items-center space-x-4 mb-8">
                                    <img
                                        src={user.photo}
                                        alt={`${user.name} ${user.surname}`}
                                        className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700"
                                    />
                                    <div>
                                        <h1 className="text-2xl font-bold">{`${user.name} ${user.surname}`}</h1>
                                    </div>
                                </div>

                                <div className="text-base text-body-color dark:text-body-color-dark space-y-4">
                                    <p>
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <p>
                                        <strong>Account Created:</strong>{" "}
                                        {new Date(user.createdAt || "").toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
