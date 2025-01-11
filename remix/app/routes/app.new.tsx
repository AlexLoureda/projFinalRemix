import React from "react";
import { useNavigate } from "@remix-run/react";

export default function NewRecipe() {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title");
        const description = formData.get("description");
        const ingredients = formData.get("ingredients");
        const instructions = formData.get("instructions");
        

        try {
            const response = await fetch("http://localhost/api/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                body: JSON.stringify({
                    title,
                    description,
                    ingredients,
                    instructions,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                throw new Error(errorData.message || "Failed to submit recipe");
            }

            alert("Recipe added successfully!");
            navigate("/app"); // Redirigir al layout principal

        } catch (error) {
            console.error("Error adding recipe:", error);
            alert("Failed to add recipe. Please try again.");
        }
    };

    return (
        <main className="py-3 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <section className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
                        New Recipe
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-3xl mx-auto"
                        aria-label="Create a new recipe"
                    >
                        {/* Title */}
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                                aria-required="true"
                                placeholder="Enter the recipe title"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                                aria-required="true"
                                placeholder="Provide a brief description of the recipe"
                            ></textarea>
                        </div>

                        {/* Ingredients */}
                        <div className="mb-4">
                            <label
                                htmlFor="ingredients"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                            >
                                Ingredients
                            </label>
                            <textarea
                                id="ingredients"
                                name="ingredients"
                                rows={4}
                                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                                aria-required="true"
                                placeholder="List the ingredients"
                            ></textarea>
                        </div>

                        {/* Instructions */}
                        <div className="mb-4">
                            <label
                                htmlFor="instructions"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                            >
                                Instructions
                            </label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                rows={5}
                                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                                aria-required="true"
                                placeholder="Provide the step-by-step instructions"
                            ></textarea>
                        </div>

                        {/* Submit button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                            >
                                Add Recipe
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
