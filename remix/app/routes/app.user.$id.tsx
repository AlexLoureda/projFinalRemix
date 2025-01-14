import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "@remix-run/react";

export default function RecipeView() {
    const { id } = useParams();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rating, setRating] = useState(0);
    const [recipes, setRecipes] = useState<any[]>([]);
    const [isFollow, setIsFollow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost/api/user/${id}`, {
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
                setIsFollow(data.data.isFollow)
                setRating(data.data.isRating.rating || 0);
                setUser(data.data.user);
            } catch (err: any) {
                setError(err.message || "Failed to fetch the user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`http://localhost/api/recipesForUser/${id}`, {
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
    }, [id]);

    const viewRecipe = (recipeId: number) => {
        navigate(`/app/${recipeId}`);
    };

    const handleRatingClick = async (value: number) => {
        try {
            const response = await fetch(`http://localhost/api/ratingUser/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ rating: value }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            setRating(value); // Actualiza la valoración localmente
        } catch (err: any) {
            setError(err.message || "Failed to submit the rating");
        }
    };

    const toggleFollow = async () => {
        try {
            const response = await fetch(`http://localhost/api/follow/${id}`, {
                method: isFollow ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            setIsFollow(!isFollow);
        } catch (err: any) {
            setError(err.message || "Failed to update Follow status");
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
            {/* Header del usuario */}
            <div className=" flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    {user?.username || "User"}
                </h2>
                <button
                    onClick={toggleFollow}
                    className={`px-4 py-2 rounded-md ${isFollow ? "bg-red-500 text-white" : "bg-gray-200 text-black"
                        }`}
                >
                    {isFollow ? "Remove from Follows" : "Add to Follows"}
                </button>
                {/* Sección para valorar con estrellas */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Rate this User:</h3>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRatingClick(star)}
                                className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-400"
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid de recetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {recipes.length > 0 ? (
                    recipes.map((recipe: any) => (
                        <div
                            key={recipe.id}
                            className="border-2 border-gray-300 bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
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
