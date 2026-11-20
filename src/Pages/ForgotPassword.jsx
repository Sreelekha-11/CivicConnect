
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, KeyRound, CheckCircle, AlertCircle, Loader } from "lucide-react";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.trim().toLowerCase()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            setMessage(data.message);
            setEmail("");

        } catch (error) {
            setError(
                error.message || "Unable to send reset link. Please try again."
            );
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
                            Forgot Password?
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-[#667A7B]">
                            No worries! Enter your registered email address
                            and we'll help you reset your password.
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-[#294B55]"
                            >
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#789091]"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setMessage("");
                                        setError("");
                                    }}
                                    placeholder="Enter your registered email"
                                    autoComplete="email"
                                    required
                                    className="w-full rounded-xl border border-[#D5DFDA] bg-white py-3 pl-11 pr-4 text-sm text-[#183F54] outline-none transition placeholder:text-[#A0AEAA] focus:border-[#28776E] focus:ring-4 focus:ring-[#28776E]/10"
                                />

                            </div>
                        </div>

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
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#183F54] to-[#28776E] py-3 text-sm font-bold text-white shadow-lg shadow-[#183F54]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader size={18} className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Reset Link
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </>
                            )}
                        </button>

                    </form>

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

export default ForgotPassword;
