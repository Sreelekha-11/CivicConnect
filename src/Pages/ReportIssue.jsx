import { useState } from "react";
import { Send, Upload, MapPin, X, FileText, Image as ImageIcon, AlertCircle, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ReportIssue() {
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        location: "",
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle image upload and preview
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        setError("");

        if (!selectedImage) return;

        if (!selectedImage.type.startsWith("image/")) {
            setError("Please select a valid image.");
            e.target.value = "";
            return;
        }

        // Limit image size to 2 MB
        if (selectedImage.size > 2 * 1024 * 1024) {
            setError("Image size must be less than 2 MB.");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setImage({
                name: selectedImage.name,
                data: reader.result,
            });

            setImagePreview(reader.result);
        };

        reader.onerror = () => {
            setError("Unable to read the selected image.");
        };

        reader.readAsDataURL(selectedImage);
    };

    // Remove selected image
    const removeImage = () => {
        setImage(null);
        setImagePreview("");
    };

    // Submit complaint to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!user?.email || !token) {
            setError("Please log in before submitting a complaint.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch(
                "http://localhost:5000/api/complaints",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...formData,
                        imageName: image ? image.name : "",
                        imageData: image ? image.data : "",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to submit complaint."
                );
            }

            alert("Complaint submitted successfully!");

            // Clear form after successful submission
            setFormData({
                title: "",
                category: "",
                description: "",
                location: "",
            });

            setImage(null);
            setImagePreview("");

            navigate("/dashboard");
        } catch (err) {
            console.error("Complaint Submission Error:", err);

            if (err.message === "Failed to fetch") {
                setError(
                    "Unable to connect to the server. Please try again."
                );
            } else {
                setError(err.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-[#D5DFDC] bg-white px-4 py-3 text-sm text-[#263F43] outline-none transition placeholder:text-[#9AAEAA] focus:border-[#438C83] focus:ring-2 focus:ring-[#438C83]/15";

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#E8F0ED] via-[#F3F5F0] to-[#E1ECE8] px-4 py-10 sm:px-6 sm:py-14">

            <div className="mx-auto max-w-3xl">

                {/* Heading */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D5E8E1] text-[#347B70] shadow-sm">
                        <FileText size={27} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-[#244B50] sm:text-4xl">
                        Report a Public Issue
                    </h1>

                    <p className="mt-3 text-sm text-[#718783] sm:text-base">
                        Help improve your community by reporting a problem.
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-white/80 bg-[#F0F2EF] p-5 shadow-[0_15px_45px_rgba(37,78,75,0.10)] sm:p-8"
                >

                    <div className="mb-7 flex items-center gap-3 border-b border-[#DCE5E0] pb-5">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCEBE5] text-[#347B70]">
                            <FileText size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-[#294F51]">
                                Issue Details
                            </h2>

                            <p className="text-xs text-[#81938E]">
                                Provide the necessary information below
                            </p>
                        </div>

                    </div>

                    <div className="space-y-5">

                        {/* Issue Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#365B59]">
                                Issue Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Example: Road damaged near main street"
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#365B59]">
                                Issue Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                <option value="">Select a category</option>
                                <option value="Road Damage">Road Damage</option>
                                <option value="Garbage">Garbage</option>
                                <option value="Water Leakage">Water Leakage</option>
                                <option value="Street Lights">Street Lights</option>
                                <option value="Drainage">Drainage</option>
                                <option value="Public Spaces">Public Spaces</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#365B59]">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the issue in detail..."
                                rows="5"
                                required
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#365B59]">
                                <MapPin
                                    size={16}
                                    className="mr-1.5 inline text-[#438C83]"
                                />
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter the issue location"
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#365B59]">
                                Upload Issue Photo
                                <span className="ml-2 font-normal text-[#91A29D]">
                                    (Optional)
                                </span>
                            </label>

                            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B9D0C8] bg-[#E9F0EC] px-5 py-8 transition hover:border-[#438C83] hover:bg-[#E3EEE8]">

                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#438C83] shadow-sm transition group-hover:scale-105">
                                    <Upload size={23} />
                                </div>

                                <span className="text-sm font-semibold text-[#426763]">
                                    {image
                                        ? image.name
                                        : "Click to upload an image"}
                                </span>

                                <span className="mt-2 text-xs text-[#91A29D]">
                                    PNG, JPG or JPEG (Maximum 2 MB)
                                </span>

                                <input
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                            </label>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="relative mt-4 w-fit">

                                    <img
                                        src={imagePreview}
                                        alt="Selected issue"
                                        className="h-48 w-64 rounded-xl border border-[#D5DFDC] object-cover shadow-sm"
                                    />

                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#D95B5B] text-white shadow-md transition hover:bg-[#BD4545]"
                                        aria-label="Remove image"
                                    >
                                        <X size={16} />
                                    </button>

                                </div>
                            )}

                            {!imagePreview && (
                                <p className="mt-2 flex items-center gap-1.5 text-xs text-[#91A29D]">
                                    <ImageIcon size={13} />
                                    Adding a photo helps explain the issue clearly.
                                </p>
                            )}

                        </div>

                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                            <AlertCircle
                                size={17}
                                className="mt-0.5 shrink-0"
                            />

                            <p>{error}</p>

                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#438C83] py-3.5 font-semibold text-white shadow-md shadow-[#347B82]/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#347B82]/25 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Submitting..."
                            : "Submit Complaint"}

                        {!isSubmitting && <Send size={18} />}
                    </button>

                    <p className="mt-4 text-center text-xs text-[#91A29D]">
                        Your report helps make the community a better place.
                    </p>

                </form>

            </div>

        </section>
    );
}

export default ReportIssue;