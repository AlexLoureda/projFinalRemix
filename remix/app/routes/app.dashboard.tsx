import React, { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function Dashboard() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [userData, setUserData] = useState<number | null>(null);
    

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("http://localhost/api/recipes", {
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
                setFilteredRecipes(data.data.recipes || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch recipes");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
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
                console.log(data.data.user.role);
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

    const viewRecipe = (id: number) => {
        navigate(`/app/${id}`);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredRecipes(recipes);
        } else {
            const filtered = recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(query)
            );
            setFilteredRecipes(filtered);
        }
    };

    const deleteRecipe = async (recipeId: number) => {
        try {
            const response = await fetch(`http://localhost/api/delrecipes/${recipeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // Eliminar receta del estado local
            setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
            alert("Recipe deleted successfully!");
        } catch (err: any) {
            setError(err.message || "Failed to delete recipe");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-center">
                <p className="text-gray-500 text-lg">Loading recipes...</p>
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
            <h2 className="text-center text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
                Recipes
            </h2>

            <div className="max-w-4xl mx-auto mb-10">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe: any) => (
                        <div
                            key={recipe.id}
                            className="border-2 border-gray-300 bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="flex flex-col space-y-4 ">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {recipe.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{recipe.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <button
                                        onClick={() => viewRecipe(recipe.id)}
                                        className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 hover:bg-blue-600"
                                    >
                                        View
                                    </button>
                                    {userData === 1 && (
                                        <button
                                            onClick={() => deleteRecipe(recipe.id)}
                                            className="bg-red-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    )}
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