import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, FileText, ArrowRight, ClipboardList, Plus, Filter, CalendarDays, X, } from "lucide-react";
import { useComplaints } from "../Context/ComplaintContext";
import { useAuth } from "../Context/AuthContext";

function MyComplaints() {
    const { complaints } = useComplaints();
    const { user } = useAuth();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    // Get only complaints submitted by the logged-in citizen
    const myComplaints = complaints.filter(
        (complaint) =>
            complaint.submittedByEmail?.toLowerCase() ===
            user?.email?.toLowerCase()
    );

    // Apply search and status filter
    const filteredComplaints = myComplaints.filter((complaint) => {
        const matchesSearch =
            complaint.title.toLowerCase().includes(search.toLowerCase()) ||
            complaint.id.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" || complaint.status === filter;

        return matchesSearch && matchesFilter;
    });

    // Status badge styles
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

    const filterOptions = [
        { label: "All Complaints", value: "All", count: myComplaints.length },
        {
            label: "Pending",
            value: "Pending",
            count: myComplaints.filter((item) => item.status === "Pending").length,
        },
        {
            label: "In Progress",
            value: "In Progress",
            count: myComplaints.filter((item) => item.status === "In Progress").length,
        },
        {
            label: "Resolved",
            value: "Resolved",
            count: myComplaints.filter((item) => item.status === "Resolved").length,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F3F7F6] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#5A9B8D] px-6 py-8 shadow-lg sm:px-9 sm:py-10">

                    <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

                    <div className="pointer-events-none absolute -bottom-32 right-52 h-64 w-64 rounded-full bg-white/5" />

                    <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                                <ClipboardList size={14} />
                                Citizen Portal
                            </div>

                            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                                My Complaints
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                                View your reported issues, monitor their status
                                and stay updated on their progress.
                            </p>
                        </div>

                        <Link
                            to="/report"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#28566B] shadow-md transition hover:-translate-y-0.5 hover:bg-[#F0F2EF]"
                        >
                            <Plus size={19} />
                            Report an Issue
                            <ArrowRight size={17} />
                        </Link>

                    </div>
                </div>

                {/* Complaint Summary */}
                <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {filterOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setFilter(option.value)}
                            className={`rounded-2xl border p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${filter === option.value
                                ? "border-[#347B82] bg-[#EAF3F1] shadow-sm"
                                : "border-[#E3ECE9] bg-white shadow-sm"
                                }`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-gray-500">
                                    {option.label}
                                </span>

                                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${filter === option.value
                                    ? "bg-white text-[#347B82]"
                                    : "bg-[#F0F5F3] text-[#347B82]"
                                    }`}>
                                    <FileText size={19} />
                                </span>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-[#243E46]">
                                {option.count}
                            </p>
                        </button>
                    ))}
                </div>

                {/* Search and Filter Section */}
                <div className="mb-7 rounded-2xl border border-[#E3ECE9] bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-4 flex items-center gap-2">
                        <Filter size={19} className="text-[#347B82]" />

                        <h2 className="font-bold text-[#243E46]">
                            Find Your Complaints
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row">

                        {/* Search */}
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={19}
                            />

                            <input
                                type="text"
                                placeholder="Search by complaint title or ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-[#DCE7E3] bg-[#FAFCFB] py-3.5 pl-11 pr-11 text-sm text-[#243E46] outline-none transition placeholder:text-gray-400 focus:border-[#347B82] focus:ring-2 focus:ring-[#347B82]/10"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                                    aria-label="Clear search"
                                >
                                    <X size={17} />
                                </button>
                            )}
                        </div>

                        {/* Status Filter */}
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="rounded-xl border border-[#DCE7E3] bg-[#FAFCFB] px-4 py-3.5 text-sm font-medium text-[#344F55] outline-none transition focus:border-[#347B82] focus:ring-2 focus:ring-[#347B82]/10 md:min-w-[190px]"
                        >
                            <option value="All">All Complaints</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>

                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs text-gray-500">
                            Showing <span className="font-semibold text-[#347B82]">{filteredComplaints.length}</span> of {myComplaints.length} complaints
                        </p>

                        {(search || filter !== "All") && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setFilter("All");
                                }}
                                className="text-xs font-semibold text-[#347B82] transition hover:text-[#28566B]"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                </div>

                {/* Complaints List */}
                <div>

                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-[#243E46]">
                                Your Submitted Issues
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Track the latest updates on your complaints.
                            </p>
                        </div>
                    </div>

                    {filteredComplaints.length === 0 ? (

                        <div className="rounded-2xl border border-[#E3ECE9] bg-white px-5 py-14 text-center shadow-sm sm:py-16">

                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EAF3F1]">
                                <ClipboardList
                                    size={36}
                                    className="text-[#347B82]"
                                />
                            </div>

                            <h2 className="text-lg font-bold text-[#243E46]">
                                {myComplaints.length === 0
                                    ? "No complaints submitted yet"
                                    : "No matching complaints found"}
                            </h2>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                {myComplaints.length === 0
                                    ? "You haven't reported any civic issues yet. Submit your first complaint to get started."
                                    : "We couldn't find any complaints matching your search or selected filter. Try changing them."}
                            </p>

                            {myComplaints.length === 0 ? (
                                <Link
                                    to="/report"
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#347B82] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#28566B]"
                                >
                                    <Plus size={17} />
                                    Report Your First Issue
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setFilter("All");
                                    }}
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#347B82] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#28566B]"
                                >
                                    <X size={16} />
                                    Clear Filters
                                </button>
                            )}

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {filteredComplaints.map((complaint) => (

                                <div
                                    key={complaint.id}
                                    className="group rounded-2xl border border-[#E3ECE9] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#C7DDD6] hover:shadow-md sm:p-6"
                                >

                                    <div className="flex flex-col justify-between gap-5 lg:flex-row">

                                        {/* Complaint Information */}
                                        <div className="min-w-0 flex-1">

                                            <div className="mb-3 flex flex-wrap items-center gap-3">
                                                <span className="rounded-lg bg-[#EAF3F1] px-3 py-1.5 text-xs font-bold text-[#347B82]">
                                                    #{complaint.id}
                                                </span>

                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(complaint.status)}`}>
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {complaint.status}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-[#243E46] transition group-hover:text-[#347B82] sm:text-xl">
                                                {complaint.title}
                                            </h3>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Category: <span className="font-medium text-[#42646A]">{complaint.category}</span>
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">

                                                <span className="flex items-center gap-2 text-sm text-gray-500">
                                                    <MapPin
                                                        size={16}
                                                        className="shrink-0 text-[#5A9B8D]"
                                                    />
                                                    {complaint.location}
                                                </span>

                                                <span className="flex items-center gap-2 text-sm text-gray-500">
                                                    <CalendarDays
                                                        size={16}
                                                        className="shrink-0 text-[#5A9B8D]"
                                                    />
                                                    Submitted: {complaint.submittedAt}
                                                </span>

                                            </div>

                                        </div>

                                        {/* View Details */}
                                        <div className="flex shrink-0 items-center lg:justify-end">

                                            <Link
                                                to={`/complaint/${complaint.id}`}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#347B82] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#28566B] sm:w-auto"
                                            >
                                                View Details
                                                <ArrowRight size={17} />
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>
        </div>
    );
}

export default MyComplaints;
