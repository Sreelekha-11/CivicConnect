import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { KeyRound, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle, Loader } from "lucide-react";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!token) {
            setError("Invalid password reset link.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/reset-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to reset password.");
            }

            setMessage(data.message);

            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-[calc(100dvh-72px)] w-full flex items-center justify-center overflow-hidden px-4 bg-gradient-to-br from-[#28566B] via-[#347B82] to-[#5A9B8D]">

            <div className="w-full max-w-md">

                <div className="rounded-3xl border border-white/20 bg-[#F0F2EF] px-7 py-6 sm:px-9 shadow-2xl shadow-black/20">

                    {/* Icon */}
                    <div className="mb-5 flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#183F54] to-[#28776E] text-white shadow-lg">
                            <KeyRound size={27} />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mb-6 text-center">

                        <h1 className="text-3xl font-bold text-[#183F54]">
                            Reset Password
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-[#667A7B]">
                            Create a new strong password for your
                            CivicConnect account.
                        </p>

                    </div>

                    {!token ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            Invalid password reset link. Please request a new link.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* New Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-[#294B55]"
                                >
                                    New Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#789091]"
                                    />

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError("");
                                        }}
                                        placeholder="Enter new password"
                                        autoComplete="new-password"
                                        required
                                        className="w-full rounded-xl border border-[#D5DFDA] bg-white py-3 pl-11 pr-12 text-sm text-[#183F54] outline-none transition placeholder:text-[#A0AEAA] focus:border-[#28776E] focus:ring-4 focus:ring-[#28776E]/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#789091]"
                                    >
                                        {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                    </button>

                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-semibold text-[#294B55]"
                                >
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#789091]"
                                    />

                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setError("");
                                        }}
                                        placeholder="Confirm new password"
                                        autoComplete="new-password"
                                        required
                                        className="w-full rounded-xl border border-[#D5DFDA] bg-white py-3 pl-11 pr-12 text-sm text-[#183F54] outline-none transition placeholder:text-[#A0AEAA] focus:border-[#28776E] focus:ring-4 focus:ring-[#28776E]/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#789091]"
                                    >
                                        {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                    </button>

                                </div>
                            </div>

                            {/* Password Requirements */}
                            <p className="text-xs leading-5 text-[#667A7B]">
                                Password must contain at least 8 characters,
                                one uppercase letter, one lowercase letter,
                                one number and one special character.
                            </p>

                            {/* Success Message */}
                            {message && (
                                <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                    <CheckCircle size={18} className="mt-0.5 shrink-0" />
                                    <p>{message}</p>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#183F54] to-[#28776E] py-3 text-sm font-bold text-white shadow-lg shadow-[#183F54]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Loader size={18} className="animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        Reset Password
                                        <KeyRound size={18} />
                                    </>
                                )}
                            </button>

                        </form>
                    )}

                    {/* Back to Login */}
                    <div className="mt-6 border-t border-[#DCE3DE] pt-5 text-center">

                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#24766D] transition hover:text-[#183F54] hover:underline"
                        >
                            <ArrowLeft size={17} />
                            Back to Login
                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default ResetPassword;
