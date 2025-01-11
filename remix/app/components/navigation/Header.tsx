import React, { useEffect, useState } from "react";
import { NavLink } from "@remix-run/react";

const NavigationMenu: React.FC = () => {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
        setUserData(data.data.user);
      } catch (error: any) {
        console.error("Error fetching user profile:", error.message);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      const response = await fetch("http://localhost/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Error during logout:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      const response = await fetch("http://localhost/api/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Error during logout:", error.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Navigation Links */}
          <div className="md:flex space-x-6">
            <NavLink
              to="/app/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-md transition ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/users"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-md transition ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600"
                }`
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/app/view"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-md transition ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600"
                }`
              }
            >
              My Recipes
            </NavLink>
            <NavLink
              to="/app/new"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-md transition ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600"
                }`
              }
            >
              New Recipe
            </NavLink>
          </div>

          {/* User Menu */}
          <div className="relative">
            {userData ? (
              <div>
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                >
                  {userData.name}
                  <svg
                    className={`ml-1 h-4 w-4 transform transition-transform ${menuOpen ? "rotate-180" : ""
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <NavLink
                      to="/app/favorites"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Favorites
                    </NavLink>

                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Profile
                    </NavLink>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Logout
                    </button>

                    <button
                      onClick={handleDelete}
                      className="block w-full text-left px-4 py-2 text-sm bg-red-300 text-gray-800 dark:text-gray-300 hover:bg-red-500 dark:hover:bg-gray-600"
                    >
                      Delete Acount
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-gray-500">No user data available</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;