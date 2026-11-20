import { useState } from "react";
import { Link, useNavigate, useSearchParams, useLocation, } from "react-router-dom";
import { Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import { useAuth } from "../Context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const registered = location.state?.registered;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim().toLowerCase(),
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid email or password."
                );
            }

            login(data.user, data.token);

            if (data.user.role === "admin") {
                navigate("/admin-dashboard");
            } else if (data.user.role === "staff") {
                navigate("/staff-dashboard");
            } else {
                navigate(
                    searchParams.get("redirect") || "/dashboard",
                    { replace: true }
                );
            }
        } catch (err) {
            setError(
                err.message || "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-[calc(100dvh-72px)] w-full flex items-center justify-center overflow-hidden px-4 bg-gradient-to-br from-[#28566B] via-[#347B82] to-[#5A9B8D]">

            <div className="w-full max-w-md">

                <div className="rounded-3xl bg-[#F0F2EF] px-7 py-5 sm:px-9 shadow-2xl shadow-black/20 border border-white/20">

                    {/* Heading */}
                    <div className="text-center mb-6">

                        <h1 className="text-3xl font-bold text-[#183F54]">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-[#667A7B]">
                            Sign in to continue to CivicConnect
                        </p>

                    </div>

                    {/* Registration Success */}
                    {registered && (
                        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
                            Account created successfully! Please log in.
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                        autoComplete="off"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-[#294B55]"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="login-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                autoComplete="off"
                                required
                                className="w-full rounded-xl border border-[#D5DFDA] bg-white px-4 py-2.5 text-sm text-[#183F54] outline-none transition placeholder:text-[#A0AEAA] focus:border-[#28776E] focus:ring-4 focus:ring-[#28776E]/10"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-[#294B55]"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="login-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    required
                                    className="w-full rounded-xl border border-[#D5DFDA] bg-white px-4 py-2.5 pr-12 text-sm text-[#183F54] outline-none transition placeholder:text-[#A0AEAA] focus:border-[#28776E] focus:ring-4 focus:ring-[#28776E]/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#789091] hover:text-[#183F54]"
                                    aria-label={
                                        showPassword ? "Hide password" : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>

                            </div>
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-between gap-3 pt-1">

                            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#596D70]">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 cursor-pointer rounded accent-[#28776E]"
                                />
                                Remember me
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-sm font-semibold text-[#24766D] transition hover:text-[#183F54] hover:underline"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#183F54] to-[#28776E] py-2.5 text-sm font-bold text-white shadow-lg shadow-[#183F54]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <LogIn size={19} />
                                    Sign In
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </>
                            )}
                        </button>

                    </form>

                    {/* Create Account */}
                    <div className="mt-6 border-t border-[#DCE3DE] pt-5 text-center">

                        <p className="text-sm text-[#667A7B]">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-bold text-[#24766D] transition hover:text-[#183F54] hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
