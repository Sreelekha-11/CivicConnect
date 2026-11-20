import {
    FileText, Clock, LoaderCircle, CheckCircle, MapPin, ArrowRight, Plus, ClipboardList, Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useComplaints } from "../Context/ComplaintContext";

function Dashboard() {
    const { user } = useAuth();
    const { complaints } = useComplaints();

    // Get only the logged-in citizen's complaints
    const myComplaints = complaints.filter(
        (complaint) =>
            complaint.submittedByEmail?.toLowerCase() ===
            user?.email?.toLowerCase()
    );

    // Calculate statistics
    const totalComplaints = myComplaints.length;

    const pendingComplaints = myComplaints.filter(
        (complaint) => complaint.status === "Pending"
    ).length;

    const inProgressComplaints = myComplaints.filter(
        (complaint) => complaint.status === "In Progress"
    ).length;

    const resolvedComplaints = myComplaints.filter(
        (complaint) => complaint.status === "Resolved"
    ).length;

    const stats = [
        {
            title: "Total Complaints",
            value: totalComplaints,
            icon: FileText,
            color: "text-[#347B82]",
            bg: "bg-[#E5F1EF]",
            border: "border-[#D4E8E4]",
        },
        {
            title: "Pending",
            value: pendingComplaints,
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-100",
        },
        {
            title: "In Progress",
            value: inProgressComplaints,
            icon: LoaderCircle,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
        },
        {
            title: "Resolved",
            value: resolvedComplaints,
            icon: CheckCircle,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
        },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-amber-50 text-amber-700 border-amber-200";

            case "In Progress":
                return "bg-blue-50 text-blue-700 border-blue-200";

            case "Resolved":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";

            default:
                return "bg-gray-100 text-gray-600 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F7F6] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Welcome Section */}
                <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#5A9B8D] px-6 py-8 shadow-lg sm:px-9 sm:py-10">

                    <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

                    <div className="pointer-events-none absolute -bottom-32 right-52 h-64 w-64 rounded-full bg-white/5" />

                    <div className="relative z-10 flex flex-col justify-between gap-7 sm:flex-row sm:items-center">

                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                                <Activity size={14} />
                                Citizen Dashboard
                            </div>

                            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                                Welcome back, {user?.name || user?.email || "Citizen"}!
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                                Stay updated on your reported issues and track
                                the progress of your complaints.
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

                {/* Statistics Section */}
                <div className="mb-9">
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-[#243E46]">
                            Overview
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            A quick summary of your reported complaints.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className={`rounded-2xl border ${stat.border} bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md`}
                                >
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                {stat.title}
                                            </p>

                                            <h2 className="mt-3 text-3xl font-bold text-[#243E46]">
                                                {stat.value}
                                            </h2>
                                        </div>

                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                                            <Icon
                                                size={23}
                                                className={stat.color}
                                            />
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Complaints Section */}
                <div className="overflow-hidden rounded-2xl border border-[#E3ECE9] bg-white shadow-sm">

                    <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:px-7">

                        <div>
                            <h2 className="text-xl font-bold text-[#243E46]">
                                Recent Complaints
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Track and manage your submitted issues.
                            </p>
                        </div>

                        <Link
                            to="/my-complaints"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#347B82] transition hover:text-[#28566B]"
                        >
                            View All
                            <ArrowRight size={16} />
                        </Link>

                    </div>

                    {myComplaints.length === 0 ? (

                        <div className="px-5 py-14 text-center sm:py-16">

                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EAF3F1]">
                                <ClipboardList
                                    size={36}
                                    className="text-[#347B82]"
                                />
                            </div>

                            <h3 className="text-lg font-bold text-[#243E46]">
                                No complaints yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                You haven't submitted any complaints.
                                Report a civic issue and track its progress here.
                            </p>

                            <Link
                                to="/report"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#347B82] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#28566B]"
                            >
                                <Plus size={17} />
                                Report Your First Issue
                            </Link>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px] text-left">

                                <thead>
                                    <tr className="bg-[#F7FAF9] text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        <th className="px-6 py-4">
                                            Complaint ID
                                        </th>

                                        <th className="px-6 py-4">
                                            Title
                                        </th>

                                        <th className="px-6 py-4">
                                            Category
                                        </th>

                                        <th className="px-6 py-4">
                                            Location
                                        </th>

                                        <th className="px-6 py-4">
                                            Date
                                        </th>

                                        <th className="px-6 py-4">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {[...myComplaints]
                                        .reverse()
                                        .map((complaint) => (

                                            <tr
                                                key={complaint.id}
                                                className="border-t border-gray-100 text-sm text-gray-600 transition hover:bg-[#F8FBFA]"
                                            >
                                                <td className="px-6 py-5 font-semibold text-[#347B82]">
                                                    #{complaint.id}
                                                </td>

                                                <td className="max-w-[200px] px-6 py-5 font-medium text-[#243E46]">
                                                    {complaint.title}
                                                </td>

                                                <td className="px-6 py-5">
                                                    {complaint.category}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin
                                                            size={15}
                                                            className="shrink-0 text-[#5A9B8D]"
                                                        />
                                                        {complaint.location}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-5">
                                                    {complaint.submittedAt}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(complaint.status)}`}>
                                                        {complaint.status}
                                                    </span>
                                                </td>
                                            </tr>

                                        ))}
                                </tbody>

                            </table>
                        </div>

                    )}

                </div>

                {/* Bottom Note */}
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#DDEBE7] bg-[#EAF3F1] px-5 py-4">
                    <CheckCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-[#347B82]"
                    />

                    <p className="text-sm leading-6 text-[#42646A]">
                        Your complaints are important to us. Keep checking
                        your dashboard for the latest status updates.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
