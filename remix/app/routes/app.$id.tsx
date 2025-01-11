import React, { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";

export default function RecipeView() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<any[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [activeSubComment, setActiveSubComment] = useState<number | null>(null);
    const [subComment, setSubComment] = useState<string>("");
    const [reloadComments, setReloadComments] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost/api/recipe/${id}`, {
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
                console.log(data.data)
                setIsFavorite(data.data.isFavorite)
                setRating(data.data.isRating.rating || 0)
                setRecipe(data.data.recipe);
            } catch (err: any) {
                setError(err.message || "Failed to fetch the recipe");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            setCommentsLoading(true);
            try {
                const response = await fetch(`http://localhost/api/comments/${id}`, {
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
                console.log(data);
                setComments(data.data.comments || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch recipes");
            } finally {
                setCommentsLoading(false);
            }
        };

        fetchComments();
    }, [id, reloadComments]);

    const toggleFavorite = async () => {
        try {
            const response = await fetch(`http://localhost/api/favorite/${id}`, {
                method: isFavorite ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            setIsFavorite(!isFavorite);
        } catch (err: any) {
            setError(err.message || "Failed to update favorite status");
        }
    };


    const handleRatingClick = async (value: number) => {
        try {
            const response = await fetch(`http://localhost/api/rating/${id}`, {
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

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim()) {
            return;
        }

        try {
            const response = await fetch(`http://localhost/api/newcomment/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ comment }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // Limpiar el comentario después de enviarlo
            setComment("");

            setReloadComments(prev => !prev);
        } catch (err: any) {
            setError(err.message || "Failed to post the comment");
        }
    };

    const handleSubCommentSubmit = async (commentId: number) => {
        if (!subComment.trim()) {
            return;
        }

        try {
            const response = await fetch(`http://localhost/api/newsubcomment/${commentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ subComment: subComment }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            setSubComment("");
            setReloadComments(prev => !prev);
        } catch (err: any) {
            setError(err.message || "Failed to post the subcomment");
        }
    };

    const toggleSubComment = (index: number) => {
        setActiveSubComment((prev) => (prev === index ? null : index));
    };


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-center">
                <p className="text-gray-500 text-lg">Loading recipe...</p>
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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-center text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    {recipe.title}
                </h2>
                <button
                    onClick={toggleFavorite}
                    className={`px-4 py-2 rounded-md ${isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-black"
                        }`}
                >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-gray-600 text-lg">{recipe.description}</p>
                <h3 className="text-xl font-bold mt-4">Ingredients:</h3>
                <p className="text-gray-700">{recipe.ingredients}</p>
                <h3 className="text-xl font-bold mt-4">Instructions:</h3>
                <p className="text-gray-700">{recipe.instructions}</p>

                {/* Sección para valorar con estrellas */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Rate this Recipe:</h3>
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

                {/* Sección para añadir comentario */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>

                    {/* Cuadro de texto para comentario */}
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        rows={3}
                        className="w-full p-4 border border-gray-300 rounded-md"
                        placeholder="Write your comment..."
                    />

                    {/* Botón para enviar el comentario */}
                    <button
                        onClick={handleCommentSubmit}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Post Comment
                    </button>
                </div>
            </div>

            {/* Sección para mostrar los comentarios */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                <div className="space-y-6">
                    {commentsLoading ? (
                        <p className="text-gray-500">Loading comments...</p>
                    ) : comments.length > 0 ? (
                        comments
                            .slice()
                            .reverse()
                            .map((comment: any) => (
                                <div key={comment.id} className="p-4 bg-white rounded-lg shadow">
                                    <p className="text-gray-600 mb-2">{comment.comment}</p>
                                    <p className="text-sm text-gray-500">
                                        Posted on: {formatDate(comment.created_at)}
                                    </p>
                                    {/* Subcomentarios */}
                                    {activeSubComment === comment.id && (
                                        <div className="ml-4 mt-2 space-y-2">
                                            {comment.subcomments.map((subcomment: any) => (
                                                <div
                                                    key={subcomment.id}
                                                    className="p-2 bg-gray-100 rounded-md"
                                                >
                                                    <p className="text-gray-600">{subcomment.comment}</p>
                                                    <p className="text-sm text-gray-500">
                                                        Posted on: {formatDate(subcomment.created_at)}
                                                    </p>
                                                </div>
                                            ))}

                                            {/* Cuadro de texto para subcomentarios */}
                                            <textarea
                                                rows={3}
                                                value={subComment}
                                                className="w-full p-4 border border-gray-300 rounded-md"
                                                placeholder="Write your reply..."
                                                onChange={(event) => setSubComment(event.target.value)}
                                            />
                                            <button
                                                onClick={() => handleSubCommentSubmit(comment.id)}
                                                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md"
                                            >
                                                Post Reply
                                            </button>
                                        </div>
                                    )}

                                    {/* Botón para mostrar/ocultar subcomentarios */}
                                    <button
                                        onClick={() => toggleSubComment(comment.id)}
                                        className="mt-2 px-4 py-2 text-blue-500 underline"
                                    >
                                        {activeSubComment === comment.id ? "Hide Reply" : "Reply"}
                                    </button>
                                </div>

                            ))
                    ) : (
                        <p className="text-gray-500">No comments yet.</p>
                    )}
                </div>

            </div>
        </div >
    );
}
