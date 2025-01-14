import React, { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function Dashboard() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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
                console.log(data.data.recipes);
                setRecipes(data.data.recipes || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch recipes");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const viewRecipe = (id: number) => {
        navigate(`/app/${id}`);
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

    const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);

    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-center text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Favorites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteRecipes.length > 0 ? (
                    favoriteRecipes.map((recipe: any) => (
                        <div
                            key={recipe.id}
                            className="border-2 border-gray-300 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl"
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
                    <p className="text-gray-500 text-lg">No recipes found.</p>
                )}
            </div>
        </div>
    );
}
