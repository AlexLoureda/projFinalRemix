import React, { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function Dashboard() {
    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [userData, setUserData] = useState<number | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost/api/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setUsers(data.data.users || []);
                setFilteredUsers(data.data.users || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Token not found. Please log in.");
                }

                const response = await fetch("http://localhost/api/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const data = await response.json();
                setUserData(data.data.user.role);
            } catch (error: any) {
                console.error("Error fetching user profile:", error.message);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const viewUser = (id: number) => {
        navigate(`/app/user/${id}`);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                user.username.toLowerCase().includes(query)
            );
            setFilteredUsers(filtered);
        }
    };

    const promoteUser = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost/api/promote/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // Recargar los usuarios después de promocionar
            setUsers((prevUsers) => {
                return prevUsers.map((user) =>
                    user.id === userId ? { ...user, role: 1 } : user
                );
            });
            setFilteredUsers((prevFiltered) => {
                return prevFiltered.map((user) =>
                    user.id === userId ? { ...user, role: 1 } : user
                );
            });
        } catch (err: any) {
            setError(err.message || "Failed to promote user");
        }
    };

    const deleteUser = async (userId: number) => {
        try {
            const response = await fetch(`http://localhost/api/deluser/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // Eliminar usuario del estado local
            setUsers((prev) => prev.filter((user) => user.id !== userId));
            setFilteredUsers((prev) => prev.filter((user) => user.id !== userId));

            alert("User deleted successfully!");
        } catch (err: any) {
            setError(err.message || "Failed to delete user");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-center">
                <p className="text-gray-500 text-lg">Loading Users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-center">
                <p className="text-red-500 text-lg">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Título */}
            <h2 className="text-center text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
                Users
            </h2>

            {/* Barra de búsqueda */}
            <div className="max-w-4xl mx-auto mb-10">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Contenedor de Usuarios */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user: any) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="flex flex-col space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
                                <div className="mt-4 flex justify-between items-center">
                                    <button
                                        onClick={() => viewUser(user.id)}
                                        className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 hover:bg-blue-600"
                                    >
                                        View
                                    </button>
                                    {userData === 1 && (
                                        <>
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="bg-red-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                            {user.role === 0 && (
                                                <button
                                                    onClick={() => promoteUser(user.id)}
                                                    className="bg-green-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 hover:bg-green-600"
                                                >
                                                    Promote
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-lg text-center col-span-full">
                        No Users found.
                    </p>
                )}
            </div>
        </div>
    );
}
