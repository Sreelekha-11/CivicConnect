import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Eye, EyeOff, CheckCircle2, Circle, } from "lucide-react";
import { useAuth } from "../Context/AuthContext";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const passwordRules = [
        {
            label: "At least 8 characters",
            valid: formData.password.length >= 8,
        },
        {
            label: "One uppercase letter (A-Z)",
            valid: /[A-Z]/.test(formData.password),
        },
        {
            label: "One lowercase letter (a-z)",
            valid: /[a-z]/.test(formData.password),
        },
        {
            label: "One number (0-9)",
            valid: /[0-9]/.test(formData.password),
        },
        {
            label: "One special character (@, #, $, !)",
            valid: /[^A-Za-z0-9]/.test(formData.password),
        },
    ];

    const isPasswordStrong = passwordRules.every(
        (rule) => rule.valid
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!isPasswordStrong) {
            setError(
                "Please create a strong password using all the required rules."
            );
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);

            const result = await registerUser({
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            });

            if (!result.success) {
                setError(result.message);
                return;
            }

            navigate("/login", {
                state: {
                    registered: true,
                    email: formData.email.trim().toLowerCase(),
                },
            });

        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-[calc(100dvh-72px)] w-full flex items-center justify-center overflow-hidden px-4 bg-gradient-to-br from-[#28566B] via-[#347B82] to-[#5A9B8D]">

            <div className="w-full max-w-[420px]">

                <div className="rounded-3xl bg-[#F0F2EF] px-6 py-3.5 sm:px-8 shadow-2xl shadow-black/20 border border-white/20">

                    {/* Heading */}
                    <div className="text-center mb-3.5">

                        <h1 className="text-[27px] font-bold text-[#183F54]">
                            Create Account
                        </h1>

                        <p className="mt-1 text-sm text-[#667A7B]">
                            Join CivicConnect and help improve your community.
                        </p>

                    </div>

                    {/* Registration Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-2.5"
                    >

                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-semibold text-[#294B55]"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full rounded-xl border border-[#D5DFDA] bg-white px-4 py-2 text-sm text-[#183F54] outline-none transition placeholder:text-[#A0AEAA] focus:border-[#28776E] focus:ring-4 focus:ring-[#28776E]/10"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-semibold text-[#294B55]"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full rounded-xl border border-[#D5DFDA] bg-white px-4 py-2 text-sm text-[#183F54] outline-none transition placeholder:text-[#A0AEAA] focus:border-[#28776E] focus:ring-4 focus:ring-[#28776E]/10"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-semibold text-[#294B55]"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a strong password"
                                    required
                                    className="w-full rounded-xl border border-[#D5DFDA] bg-white px-4 py-2 pr-12 text-sm text-[#183F54] outline-none transition placeholder:text-[#A0AEAA] focus:border-[#28776E] focus:ring-4 focus:ring-[#28776E]/10"
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
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                            {/* Password Checklist */}
                            {formData.password.length > 0 && (
                                <div className="mt-1.5 rounded-xl border border-[#DCE3DE] bg-white/70 p-2">

                                    <p className="mb-1.5 text-xs font-semibold text-[#294B55]">
                                        Password must contain:
                                    </p>

                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">

                                        {passwordRules.map((rule, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center gap-1.5 text-[10px] ${rule.valid
                                                    ? "text-[#24766D]"
                                                    : "text-[#718184]"
                                                    }`}
                                            >
                                                {rule.valid ? (
                                                    <CheckCircle2 size={12} className="shrink-0" />
                                                ) : (
                                                    <Circle size={12} className="shrink-0" />
                                                )}

                                                <span>{rule.label}</span>
                                            </div>
                                        ))}

                                    </div>

                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1 block text-sm font-semibold text-[#294B55]"
                            >
                                Confirm Password
                            </label>

                            <div className="relative">

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    required
                                    className="w-full rounded-xl border border-[#D5DFDA] bg-white px-4 py-2 pr-12 text-sm text-[#183F54] outline-none transition placeholder:text-[#A0AEAA] focus:border-[#28776E] focus:ring-4 focus:ring-[#28776E]/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#789091] hover:text-[#183F54]"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                                {error}
                            </p>
                        )}

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#183F54] to-[#28776E] py-2.5 text-sm font-bold text-white shadow-lg shadow-[#183F54]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <UserPlus size={18} />
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    {/* Login Link */}
                    <div className="mt-3.5 border-t border-[#DCE3DE] pt-3.5 text-center">

                        <p className="text-sm text-[#667A7B]">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-bold text-[#24766D] transition hover:text-[#183F54] hover:underline"
                            >
                                Login
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Register;
