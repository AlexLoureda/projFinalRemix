import React, { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function RecipeView() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recipes, setRecipes] = useState<any[]>([]);
    const [editForm, setEditForm] = useState({
        username: "",
        email: "",
        name: "",
        password: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost/api/user`, {
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
                setUser(data);
                setEditForm({
                    username: data.username || "",
                    email: data.email || "",
                    name: data.name || "",
                    password: "",
                });
            } catch (err: any) {
                setError(err.message || "Failed to fetch the user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`http://localhost/api/recipesForUser`, {
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
                setRecipes(data.data.recipes || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch the recipes");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const viewRecipe = (recipeId: number) => {
        navigate(`/app/${recipeId}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost/api/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(editForm),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            alert("User updated successfully!");
        } catch (err: any) {
            alert(err.message || "Failed to update the user");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-center">
                <p className="text-gray-500 text-lg">Loading...</p>
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
        <div className="container mx-auto px-6 py-8">
            {/* Header del usuario  mostrara quadros para esitar los parametros del usuario junto con la informasion ya existente exeptuando el password*/}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    User Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p>
                            Username;
                        </p>
                        <input
                            type="text"
                            name="username"
                            value={editForm.username}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <p>
                            Gmail;
                        </p>
                        <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <p>
                            Name;
                        </p>
                        <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <p>
                            Password;
                        </p>
                        <input
                            type="password"
                            name="password"
                            value={editForm.password}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 hover:bg-blue-600"
                    >
                        Update
                    </button>
                </div>
            </div>

            {/* Grid de recetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {recipes.length > 0 ? (
                    recipes.map((recipe: any) => (
                        <div
                            key={recipe.id}
                            className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="flex flex-col space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
                                <p className="text-gray-600 text-sm">{recipe.description}</p>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => viewRecipe(recipe.id)}
                                        className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 hover:bg-blue-600"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-lg text-center col-span-full">
                        No recipes found.
                    </p>
                )}
            </div>
        </div>
    );
}
