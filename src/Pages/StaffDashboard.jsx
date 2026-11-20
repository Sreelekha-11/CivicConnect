import { useState } from "react";
import {
    FileText, Clock, LoaderCircle, CheckCircle, MapPin, Eye, X, Calendar, Tag, Image as ImageIcon, ClipboardList,
    Save,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useComplaints } from "../Context/ComplaintContext";

function StaffDashboard() {
    const { user } = useAuth();

    const { complaints, updateComplaintStatus, updateComplaintWorkDetails, } = useComplaints();

    const [filter, setFilter] = useState("All");
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [workComplaint, setWorkComplaint] = useState(null);
    const [newNote, setNewNote] = useState("");
    const [resolutionRemarks, setResolutionRemarks] = useState("");

    const [resolutionImageData, setResolutionImageData] = useState("");
    const [resolutionImageName, setResolutionImageName] = useState("");
    const [imageError, setImageError] = useState("");

    const [savingWork, setSavingWork] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [saveSuccess, setSaveSuccess] = useState("");

    // Get complaints assigned to logged-in staff
    const assignedComplaints = complaints.filter(
        (complaint) => complaint.assignedTo === user?.email
    );

    const filteredComplaints =
        filter === "All"
            ? assignedComplaints
            : assignedComplaints.filter(
                (complaint) => complaint.status === filter
            );

    // Statistics
    const pending = assignedComplaints.filter(
        (item) => item.status === "Pending"
    ).length;

    const inProgress = assignedComplaints.filter(
        (item) => item.status === "In Progress"
    ).length;

    const resolved = assignedComplaints.filter(
        (item) => item.status === "Resolved"
    ).length;

    const stats = [
        {
            title: "Assigned Complaints",
            count: assignedComplaints.length,
            icon: FileText,
            color: "text-[#28566B]",
            bg: "bg-[#DCEAE9]",
        },
        {
            title: "Pending",
            count: pending,
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-100",
        },
        {
            title: "In Progress",
            count: inProgress,
            icon: LoaderCircle,
            color: "text-violet-600",
            bg: "bg-violet-100",
        },
        {
            title: "Resolved",
            count: resolved,
            icon: CheckCircle,
            color: "text-emerald-600",
            bg: "bg-emerald-100",
        },
    ];

    // Status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-amber-100 text-amber-700";
            case "In Progress":
                return "bg-violet-100 text-violet-700";
            case "Resolved":
                return "bg-emerald-100 text-emerald-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Open work update popup
    const openWorkUpdate = (complaint) => {
        setWorkComplaint(complaint);
        setNewNote("");
        setResolutionRemarks(complaint.resolutionRemarks || "");
        setResolutionImageData(complaint.resolutionImageData || "");
        setResolutionImageName(complaint.resolutionImageName || "");
        setImageError("");
        setSaveError("");
        setSaveSuccess("");
    };

    // Handle resolution image upload
    const handleResolutionImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setImageError("Please select a valid image.");
            e.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setImageError("Image size must be less than 2 MB.");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setResolutionImageData(reader.result);
            setResolutionImageName(file.name);
            setImageError("");
        };

        reader.onerror = () => {
            setImageError("Unable to read this image. Please try again.");
        };

        reader.readAsDataURL(file);
    };

    // Remove selected resolution image
    const removeResolutionImage = () => {
        setResolutionImageData("");
        setResolutionImageName("");
        setImageError("");
    };

    // Save work update in MongoDB
    const handleSaveWork = async () => {
        if (!workComplaint || savingWork) return;

        if (imageError) {
            setSaveError("Please correct the image error before saving.");
            return;
        }

        setSavingWork(true);
        setSaveError("");
        setSaveSuccess("");

        const updatedNotes = [
            ...(workComplaint.progressNotes || []),
        ];

        if (newNote.trim()) {
            updatedNotes.push({
                text: newNote.trim(),
                date: new Date().toLocaleString(),
            });
        }

        try {
            const success = await updateComplaintWorkDetails(
                workComplaint.id,
                updatedNotes,
                resolutionRemarks.trim(),
                resolutionImageData,
                resolutionImageName
            );

            if (!success) {
                setSaveError(
                    "Unable to save work updates. Please try again."
                );
                return;
            }

            setSaveSuccess("Work updates saved successfully!");

            setWorkComplaint(null);
            setNewNote("");
            setResolutionRemarks("");
            setResolutionImageData("");
            setResolutionImageName("");
            setImageError("");
            setSaveError("");

        } catch (error) {
            console.error("Save Work Error:", error);
            setSaveError("Something went wrong while saving. Please try again.");

        } finally {
            setSavingWork(false);
        }
    };

    const inputStyle =
        "rounded-xl border border-[#D5E2DE] bg-white px-4 py-2.5 text-sm text-[#234B59] outline-none focus:border-[#347B82] focus:ring-2 focus:ring-[#347B82]/15 transition";

    const buttonStyle =
        "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition";

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F0ED] via-[#F3F5F0] to-[#E1ECE8] p-5 sm:p-8">

            {/* Header */}
            <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#5A9B8D] p-7 sm:p-9 shadow-lg">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#D2E9E2]">
                            Staff Workspace
                        </p>

                        <h1 className="text-2xl font-bold text-white sm:text-3xl">
                            Department Staff Dashboard
                        </h1>

                        <p className="mt-3 text-sm text-[#E0EFEB] sm:text-base">
                            Welcome, {user?.name || "Staff Member"}!
                            Manage your assigned community complaints.
                        </p>
                    </div>

                    <div className="hidden h-20 w-20 items-center justify-center rounded-2xl bg-white/15 sm:flex">
                        <ClipboardList size={42} className="text-white" />
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={index}
                            className="group rounded-2xl border border-[#DCE6E1] bg-[#F0F2EF] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#718383]">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-3 text-3xl font-bold text-[#234B59]">
                                        {stat.count}
                                    </h2>
                                </div>

                                <div className={`rounded-2xl p-4 ${stat.bg} transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon size={27} className={stat.color} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Complaints Table */}
            <div className="mt-9 overflow-hidden rounded-2xl border border-[#DCE6E1] bg-[#F0F2EF] shadow-sm">

                <div className="flex flex-col gap-4 border-b border-[#DCE6E1] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>
                        <h2 className="text-xl font-bold text-[#234B59]">
                            My Assigned Complaints
                        </h2>

                        <p className="mt-1 text-sm text-[#718383]">
                            Track and manage your assigned issues
                        </p>
                    </div>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={inputStyle}
                    >
                        <option value="All">All Complaints</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>

                {filteredComplaints.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DCEAE9]">
                            <FileText size={32} className="text-[#347B82]" />
                        </div>

                        <h3 className="text-lg font-semibold text-[#234B59]">
                            No Assigned Complaints
                        </h3>

                        <p className="mt-2 text-sm text-[#718383]">
                            Complaints assigned to you will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left">
                            <thead>
                                <tr className="border-b border-[#DCE6E1] bg-[#E4ECE8] text-xs uppercase tracking-wide text-[#617979]">
                                    <th className="p-4">Complaint ID</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Update Status</th>
                                    <th className="p-4">Details</th>
                                    <th className="p-4">Work Update</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredComplaints.map((complaint) => (
                                    <tr
                                        key={complaint.id}
                                        className="border-b border-[#E2EAE5] text-sm transition-colors hover:bg-[#E9F0EC]"
                                    >
                                        <td className="p-4 font-semibold text-[#347B82]">
                                            {complaint.id}
                                        </td>

                                        <td className="p-4 font-semibold text-[#234B59]">
                                            {complaint.title}
                                        </td>

                                        <td className="p-4 text-[#718383]">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={15} className="shrink-0 text-[#5A9B8D]" />
                                                {complaint.location}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(complaint.status)}`}>
                                                {complaint.status}
                                            </span>
                                        </td>

                                        {/* Update Status */}
                                        <td className="p-4">
                                            <select
                                                value={complaint.status}
                                                onChange={(e) =>
                                                    updateComplaintStatus(
                                                        complaint.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border border-[#D5E2DE] bg-white px-3 py-2 text-xs text-[#234B59] outline-none focus:border-[#347B82]"
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="In Progress">
                                                    In Progress
                                                </option>
                                                <option value="Resolved">
                                                    Resolved
                                                </option>
                                            </select>
                                        </td>

                                        {/* View Details */}
                                        <td className="p-4">
                                            <button
                                                onClick={() =>
                                                    setSelectedComplaint(complaint)
                                                }
                                                className={`${buttonStyle} bg-[#DCEAE9] text-[#28566B] hover:bg-[#C8DFD9]`}
                                            >
                                                <Eye size={16} />
                                                View
                                            </button>
                                        </td>

                                        {/* Update Work */}
                                        <td className="p-4">
                                            <button
                                                onClick={() =>
                                                    openWorkUpdate(complaint)
                                                }
                                                className={`${buttonStyle} bg-[#E8E2F4] text-[#7254A1] hover:bg-[#DDD3EF]`}
                                            >
                                                <ClipboardList size={16} />
                                                Update Work
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Complaint Details Modal */}
            {selectedComplaint && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#173B46]/65 p-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#DCE6E1] bg-[#F0F2EF] p-5 shadow-2xl sm:p-7">

                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-[#5A9B8D]">
                                    Complaint Information
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-[#234B59]">
                                    Complaint Details
                                </h2>

                                <p className="mt-1 text-sm text-[#718383]">
                                    ID: {selectedComplaint.id}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedComplaint(null)}
                                className="rounded-xl p-2 text-[#617979] transition hover:bg-[#DCEAE9] hover:text-[#234B59]"
                            >
                                <X size={23} />
                            </button>
                        </div>

                        <div className="space-y-5">

                            <div>
                                <label className="text-sm font-semibold text-[#718383]">
                                    Complaint Title
                                </label>

                                <h3 className="mt-1 text-lg font-bold text-[#234B59]">
                                    {selectedComplaint.title}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-[#718383]">
                                        <Tag size={16} />
                                        Category
                                    </label>

                                    <p className="mt-2 text-[#234B59]">
                                        {selectedComplaint.category || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-[#718383]">
                                        <Calendar size={16} />
                                        Submitted Date
                                    </label>

                                    <p className="mt-2 text-[#234B59]">
                                        {selectedComplaint.submittedAt || "Not available"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#718383]">
                                    <MapPin size={16} />
                                    Location
                                </label>

                                <p className="mt-2 text-[#234B59]">
                                    {selectedComplaint.location || "Not provided"}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-[#718383]">
                                    Complaint Description
                                </label>

                                <p className="mt-2 rounded-xl border border-[#DCE6E1] bg-white p-4 leading-relaxed text-[#526D6D]">
                                    {selectedComplaint.description || "No description provided."}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-[#718383]">
                                    Current Status
                                </label>

                                <div className="mt-3">
                                    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(selectedComplaint.status)}`}>
                                        {selectedComplaint.status}
                                    </span>
                                </div>
                            </div>

                            {/* Reported Image */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#718383]">
                                    <ImageIcon size={16} />
                                    Reported Image
                                </label>

                                {selectedComplaint.imageData ? (
                                    <div className="mt-3">
                                        <img
                                            src={selectedComplaint.imageData}
                                            alt="Reported issue"
                                            className="h-64 w-full max-w-md rounded-2xl border border-[#DCE6E1] object-cover"
                                        />

                                        <p className="mt-2 text-sm text-[#718383]">
                                            {selectedComplaint.imageName}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mt-2 text-sm text-[#91A2A0]">
                                        No image uploaded.
                                    </p>
                                )}
                            </div>

                            {/* Work Progress Notes */}
                            <div>
                                <label className="text-sm font-semibold text-[#718383]">
                                    Work Progress Notes
                                </label>

                                <div className="mt-3 space-y-2">
                                    {(selectedComplaint.progressNotes || []).length > 0 ? (
                                        selectedComplaint.progressNotes.map((note, index) => (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-[#DCE6E1] bg-white p-4"
                                            >
                                                <p className="text-sm text-[#526D6D]">
                                                    {note.text}
                                                </p>

                                                <p className="mt-2 text-xs text-[#91A2A0]">
                                                    {note.date}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-[#91A2A0]">
                                            No work notes added yet.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Resolution Remarks */}
                            <div>
                                <label className="text-sm font-semibold text-[#718383]">
                                    Resolution Remarks
                                </label>

                                <p className="mt-2 rounded-xl border border-[#DCE6E1] bg-white p-4 text-sm text-[#526D6D]">
                                    {selectedComplaint.resolutionRemarks || "No resolution remarks yet."}
                                </p>
                            </div>

                            {/* Resolution Evidence */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#718383]">
                                    <ImageIcon size={16} />
                                    Resolution Evidence
                                </label>

                                {selectedComplaint.resolutionImageData ? (
                                    <div className="mt-3">
                                        <img
                                            src={selectedComplaint.resolutionImageData}
                                            alt="Resolution evidence"
                                            className="h-64 w-full max-w-md rounded-2xl border border-[#DCE6E1] object-cover"
                                        />

                                        <p className="mt-2 text-sm text-[#718383]">
                                            {selectedComplaint.resolutionImageName || "Resolution image"}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mt-2 text-sm text-[#91A2A0]">
                                        No resolution image uploaded.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setSelectedComplaint(null)}
                                className={`${buttonStyle} bg-gradient-to-r from-[#28566B] to-[#347B82] px-7 text-white shadow-md hover:from-[#234B59] hover:to-[#28566B]`}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Work Update Modal */}
            {workComplaint && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#173B46]/65 p-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#DCE6E1] bg-[#F0F2EF] p-5 shadow-2xl sm:p-7">

                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-[#5A9B8D]">
                                    Work Management
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-[#234B59]">
                                    Update Work
                                </h2>

                                <p className="mt-1 text-sm text-[#718383]">
                                    {workComplaint.title}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    if (!savingWork) {
                                        setWorkComplaint(null);
                                    }
                                }}
                                disabled={savingWork}
                                className="rounded-xl p-2 text-[#617979] transition hover:bg-[#DCEAE9] disabled:opacity-50"
                            >
                                <X size={23} />
                            </button>
                        </div>

                        {/* Previous Notes */}
                        <div className="mb-6">
                            <h3 className="mb-3 font-semibold text-[#234B59]">
                                Previous Progress Notes
                            </h3>

                            <div className="space-y-2">
                                {(workComplaint.progressNotes || []).length > 0 ? (
                                    workComplaint.progressNotes.map((note, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-[#DCE6E1] bg-white p-4"
                                        >
                                            <p className="text-sm text-[#526D6D]">
                                                {note.text}
                                            </p>

                                            <p className="mt-2 text-xs text-[#91A2A0]">
                                                {note.date}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-[#91A2A0]">
                                        No previous notes.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Add Progress Note */}
                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-semibold text-[#234B59]">
                                Add Work Progress Note
                            </label>

                            <textarea
                                rows="4"
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Describe the work completed or current progress..."
                                className="w-full rounded-xl border border-[#D5E2DE] bg-white p-3 text-sm text-[#234B59] outline-none transition focus:border-[#347B82] focus:ring-2 focus:ring-[#347B82]/15"
                            />
                        </div>

                        {/* Resolution Remarks */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-semibold text-[#234B59]">
                                Resolution Remarks
                            </label>

                            <textarea
                                rows="3"
                                value={resolutionRemarks}
                                onChange={(e) => setResolutionRemarks(e.target.value)}
                                placeholder="Enter final remarks after resolving the complaint..."
                                className="w-full rounded-xl border border-[#D5E2DE] bg-white p-3 text-sm text-[#234B59] outline-none transition focus:border-[#347B82] focus:ring-2 focus:ring-[#347B82]/15"
                            />
                        </div>

                        {/* Upload Resolution Evidence */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-semibold text-[#234B59]">
                                Upload After-Repair Photo
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleResolutionImage}
                                className="w-full rounded-xl border border-[#D5E2DE] bg-white p-3 text-sm text-[#526D6D] file:mr-3 file:rounded-lg file:border-0 file:bg-[#DCEAE9] file:px-3 file:py-2 file:font-semibold file:text-[#28566B]"
                            />

                            <p className="mt-2 text-xs text-[#91A2A0]">
                                Accepted: image files up to 2 MB.
                            </p>

                            {imageError && (
                                <p className="mt-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                    {imageError}
                                </p>
                            )}

                            {resolutionImageData && (
                                <div className="mt-4 rounded-xl border border-[#DCE6E1] bg-white p-3">
                                    <img
                                        src={resolutionImageData}
                                        alt="Resolution preview"
                                        className="h-56 w-full max-w-md rounded-xl object-cover"
                                    />

                                    <p className="mt-2 text-sm text-[#718383]">
                                        {resolutionImageName}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={removeResolutionImage}
                                        className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Save Error */}
                        {saveError && (
                            <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                                {saveError}
                            </p>
                        )}

                        {/* Save Success */}
                        {saveSuccess && (
                            <p className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
                                {saveSuccess}
                            </p>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-wrap justify-end gap-3">
                            <button
                                onClick={() => setWorkComplaint(null)}
                                disabled={savingWork}
                                className={`${buttonStyle} border border-[#D5E2DE] bg-white text-[#617979] hover:bg-[#E9F0EC] disabled:opacity-50`}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSaveWork}
                                disabled={
                                    savingWork ||
                                    (
                                        !newNote.trim() &&
                                        resolutionRemarks.trim() === (workComplaint.resolutionRemarks || "") &&
                                        resolutionImageData === (workComplaint.resolutionImageData || "") &&
                                        resolutionImageName === (workComplaint.resolutionImageName || "")
                                    )
                                }
                                className={`${buttonStyle} bg-gradient-to-r from-[#28566B] to-[#347B82] text-white shadow-md hover:from-[#234B59] hover:to-[#28566B] disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                <Save size={17} />
                                {savingWork ? "Saving..." : "Save Updates"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default StaffDashboard;
