import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const password_confirmation = formData.get("password_confirmation") as string;

        setLoading(true);
        try {
            const response = await fetch("http://localhost/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password,
                    password_confirmation,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al registrarse");
            }

            alert("Registro exitoso");
            navigate("/login");
        } catch (error: any) {
            alert(error.message || "Error al registrarse");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Registro</h1>
                <form method="post" onSubmit={handleSubmit} className="space-y-4">
                    {/* Name input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* UserName input */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Email input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Correo electrónico"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Password input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Password confirmation input */}
                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Confirmar contraseña"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        {loading ? "Cargando..." : "Registrarse"}
                    </button>
                </form>

                {/* Login link */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}
