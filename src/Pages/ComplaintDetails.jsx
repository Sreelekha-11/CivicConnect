
import { useParams, Link } from "react-router-dom";
import {
    ArrowLeft, MapPin, Calendar, FileText, CheckCircle, Clock, LoaderCircle, Image as ImageIcon,
    ClipboardList, Wrench, AlertCircle,
} from "lucide-react";

import { useComplaints } from "../Context/ComplaintContext";

function ComplaintDetails() {
    const { id } = useParams();
    const { complaints } = useComplaints();

    const complaint = complaints.find(
        (item) => item.id === id
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "border-amber-200 bg-amber-50 text-amber-700";

            case "In Progress":
                return "border-blue-200 bg-blue-50 text-blue-700";

            case "Resolved":
                return "border-emerald-200 bg-emerald-50 text-emerald-700";

            default:
                return "border-gray-200 bg-gray-100 text-gray-600";
        }
    };

    if (!complaint) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F3F7F6] px-6">
                <div className="w-full max-w-md rounded-3xl border border-[#E3ECE9] bg-white px-7 py-12 text-center shadow-sm">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EAF3F1]">
                        <FileText size={36} className="text-[#347B82]" />
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-[#243E46]">
                        Complaint Not Found
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        The complaint you're looking for may not exist
                        or may have been removed.
                    </p>

                    <Link
                        to="/my-complaints"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#347B82] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#28566B]"
                    >
                        <ArrowLeft size={17} />
                        Back to My Complaints
                    </Link>

                </div>
            </div>
        );
    }

    const steps = [
        {
            title: "Complaint Submitted",
            description: "Your complaint has been submitted successfully.",
            icon: FileText,
        },
        {
            title: "In Progress",
            description: "The complaint is being processed.",
            icon: LoaderCircle,
        },
        {
            title: "Resolved",
            description: "The complaint has been resolved.",
            icon: CheckCircle,
        },
    ];

    const statusOrder = ["Pending", "In Progress", "Resolved"];
    const currentStep = statusOrder.indexOf(complaint.status);

    const progressNotes = complaint.progressNotes || [];

    return (
        <div className="min-h-screen bg-[#F3F7F6] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Back Navigation */}
                <Link
                    to="/my-complaints"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#347B82] transition hover:text-[#28566B]"
                >
                    <ArrowLeft size={18} />
                    Back to My Complaints
                </Link>

                {/* Page Header */}
                <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#5A9B8D] px-6 py-8 shadow-lg sm:px-9 sm:py-10">

                    <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

                    <div className="relative z-10">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                            <ClipboardList size={14} />
                            Complaint Tracking
                        </div>

                        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                            Complaint Details
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                            Track your reported issue, monitor its progress
                            and view the latest updates.
                        </p>
                    </div>
                </div>

                {/* Complaint Information */}
                <div className="mb-7 overflow-hidden rounded-2xl border border-[#E3ECE9] bg-white shadow-sm">

                    <div className="flex flex-col justify-between gap-5 border-b border-gray-100 px-5 py-6 sm:flex-row sm:items-start sm:px-7">

                        <div className="min-w-0">
                            <span className="inline-flex rounded-lg bg-[#EAF3F1] px-3 py-1.5 text-xs font-bold text-[#347B82]">
                                #{complaint.id}
                            </span>

                            <h2 className="mt-4 break-words text-xl font-bold text-[#243E46] sm:text-2xl">
                                {complaint.title}
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Category: <span className="font-medium text-[#42646A]">{complaint.category}</span>
                            </p>
                        </div>

                        <span className={`inline-flex h-fit w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyle(complaint.status)}`}>
                            <span className="h-2 w-2 rounded-full bg-current" />
                            {complaint.status}
                        </span>

                    </div>

                    <div className="p-5 sm:p-7">

                        {/* Description */}
                        <div>
                            <h3 className="flex items-center gap-2 font-bold text-[#243E46]">
                                <FileText size={19} className="text-[#347B82]" />
                                Complaint Description
                            </h3>

                            <p className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-[#F7FAF9] p-4 text-sm leading-7 text-gray-600 sm:p-5">
                                {complaint.description || "No description provided."}
                            </p>
                        </div>

                        {/* Location and Date */}
                        <div className="mt-7 grid gap-4 sm:grid-cols-2">

                            <div className="flex items-start gap-3 rounded-xl border border-[#E3ECE9] bg-white p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3F1]">
                                    <MapPin size={19} className="text-[#347B82]" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-500">
                                        Location
                                    </p>

                                    <p className="mt-1 break-words text-sm font-semibold text-[#243E46]">
                                        {complaint.location}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-xl border border-[#E3ECE9] bg-white p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3F1]">
                                    <Calendar size={19} className="text-[#347B82]" />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-gray-500">
                                        Submitted Date
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[#243E46]">
                                        {complaint.submittedAt}
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Original Reported Image */}
                        <div className="mt-8 border-t border-gray-100 pt-7">

                            <h3 className="flex items-center gap-2 font-bold text-[#243E46]">
                                <ImageIcon size={20} className="text-[#347B82]" />
                                Reported Issue Image
                            </h3>

                            {complaint.imageData ? (
                                <div className="mt-4 rounded-xl border border-[#E3ECE9] bg-[#F7FAF9] p-3 sm:p-4">

                                    <img
                                        src={complaint.imageData}
                                        alt="Original reported issue"
                                        className="max-h-96 w-full rounded-lg object-contain"
                                    />

                                    {complaint.imageName && (
                                        <p className="mt-3 break-all text-sm text-gray-500">
                                            {complaint.imageName}
                                        </p>
                                    )}

                                </div>
                            ) : (
                                <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#F7FAF9] p-4">
                                    <ImageIcon size={20} className="text-gray-400" />

                                    <p className="text-sm text-gray-500">
                                        No image was uploaded with this complaint.
                                    </p>
                                </div>
                            )}

                        </div>

                    </div>
                </div>

                {/* Complaint Progress Timeline */}
                <div className="mb-7 rounded-2xl border border-[#E3ECE9] bg-white p-5 shadow-sm sm:p-7">

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3F1]">
                            <Clock size={21} className="text-[#347B82]" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#243E46]">
                                Complaint Progress
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Follow the progress of your reported issue.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 space-y-7">

                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const completed = index <= currentStep;

                            return (
                                <div key={step.title} className="relative flex gap-4">

                                    {/* Timeline Connector */}
                                    {index !== steps.length - 1 && (
                                        <div className={`absolute left-5 top-12 h-[calc(100%+12px)] w-0.5 ${index < currentStep
                                            ? "bg-[#5A9B8D]"
                                            : "bg-gray-200"
                                            }`} />
                                    )}

                                    <div className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${completed
                                        ? "bg-[#E1F1EB] text-[#347B82]"
                                        : "bg-gray-100 text-gray-400"
                                        }`}>
                                        <Icon size={21} />
                                    </div>

                                    <div className="pt-1">
                                        <h3 className={`font-bold ${completed
                                            ? "text-[#243E46]"
                                            : "text-gray-400"
                                            }`}>
                                            {step.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-500">
                                            {step.description}
                                        </p>

                                        {index === currentStep && currentStep >= 0 && (
                                            <span className="mt-2 inline-flex rounded-full bg-[#EAF3F1] px-3 py-1 text-xs font-semibold text-[#347B82]">
                                                Current Stage
                                            </span>
                                        )}
                                    </div>

                                </div>
                            );
                        })}

                        {currentStep === -1 && (
                            <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
                                <AlertCircle size={19} className="shrink-0" />
                                Current complaint status is not available in the progress timeline.
                            </div>
                        )}

                    </div>
                </div>

                {/* Staff Work Progress */}
                <div className="mb-7 rounded-2xl border border-[#E3ECE9] bg-white p-5 shadow-sm sm:p-7">

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3F1]">
                            <ClipboardList size={21} className="text-[#347B82]" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#243E46]">
                                Staff Work Progress
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Updates shared by the assigned staff.
                            </p>
                        </div>
                    </div>

                    {progressNotes.length > 0 ? (

                        <div className="mt-6 space-y-4">

                            {progressNotes.map((note, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-[#E3ECE9] bg-[#F7FAF9] p-4 sm:p-5"
                                >

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E1F1EB] text-[#347B82]">
                                            <Wrench size={19} />
                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#42646A]">
                                                {note.text}
                                            </p>

                                            <p className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                                                <Clock size={14} />
                                                {note.date}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    ) : (

                        <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#F7FAF9] p-4">
                            <Clock size={19} className="mt-0.5 shrink-0 text-gray-400" />

                            <p className="text-sm leading-6 text-gray-500">
                                Staff has not added any work progress updates yet.
                            </p>
                        </div>

                    )}

                </div>

                {/* Resolution Information */}
                <div className="mb-7 rounded-2xl border border-[#E3ECE9] bg-white p-5 shadow-sm sm:p-7">

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                            <CheckCircle size={21} className="text-emerald-600" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#243E46]">
                                Resolution Details
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Final updates and resolution evidence.
                            </p>
                        </div>
                    </div>

                    {/* Resolution Remarks */}
                    <div className="mt-6">

                        <h3 className="font-semibold text-[#243E46]">
                            Resolution Remarks
                        </h3>

                        <p className="mt-3 whitespace-pre-wrap break-words rounded-xl border border-[#E3ECE9] bg-[#F7FAF9] p-4 text-sm leading-7 text-gray-600">
                            {complaint.resolutionRemarks ||
                                "Staff has not added resolution remarks yet."}
                        </p>

                    </div>

                    {/* After Repair Image */}
                    <div className="mt-7">

                        <h3 className="flex items-center gap-2 font-semibold text-[#243E46]">
                            <ImageIcon size={20} className="text-emerald-600" />
                            After-Repair Image
                        </h3>

                        {complaint.resolutionImageData ? (

                            <div className="mt-4 rounded-xl border border-[#DCEDE4] bg-[#F6FAF7] p-3 sm:p-4">

                                <img
                                    src={complaint.resolutionImageData}
                                    alt="After repair evidence"
                                    className="max-h-96 w-full rounded-lg object-contain"
                                />

                                {complaint.resolutionImageName && (
                                    <p className="mt-3 break-all text-sm text-gray-500">
                                        {complaint.resolutionImageName}
                                    </p>
                                )}

                            </div>

                        ) : (

                            <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#F7FAF9] p-4">
                                <ImageIcon size={20} className="text-gray-400" />

                                <p className="text-sm text-gray-500">
                                    No after-repair image uploaded yet.
                                </p>
                            </div>

                        )}

                    </div>

                </div>

                {/* Back Button */}
                <div className="pb-4">
                    <Link
                        to="/my-complaints"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#D5E5DF] bg-white px-5 py-3 text-sm font-semibold text-[#347B82] shadow-sm transition hover:bg-[#EAF3F1]"
                    >
                        <ArrowLeft size={17} />
                        Back to My Complaints
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default ComplaintDetails;
