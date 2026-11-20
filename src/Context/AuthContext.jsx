
import {
    createContext,
    useContext,
    useState,
    useCallback,
} from "react";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    const [users, setUsers] = useState([]);

    // Fetch all registered users from MongoDB (Admin only)
    const fetchUsers = useCallback(async () => {
        const currentToken = localStorage.getItem("token");

        if (!currentToken) {
            return {
                success: false,
                message: "Please log in first."
            };
        }

        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${currentToken}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to fetch users.");
            }

            setUsers(data.users || []);

            return {
                success: true,
                users: data.users || []
            };

        } catch (error) {
            console.error("Fetch Users Error:", error);

            return {
                success: false,
                message: error.message
            };
        }
    }, []);

    // Login
    const login = (userData, authToken = null) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        if (authToken) {
            setToken(authToken);
            localStorage.setItem("token", authToken);
        }
    };

    // Register using Backend API
    const registerUser = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed."
                );
            }

            return {
                success: true,
                message: data.message || "Registration successful."
            };

        } catch (error) {
            console.error("Registration Error:", error);

            return {
                success: false,
                message: error.message || "Unable to connect to the server."
            };
        }
    };

    // Logout
    const logout = () => {
        setUser(null);
        setToken(null);
        setUsers([]);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                users,
                login,
                logout,
                registerUser,
                fetchUsers
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
