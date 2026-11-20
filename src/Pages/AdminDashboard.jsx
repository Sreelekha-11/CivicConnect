import { FileText, Clock, LoaderCircle, CheckCircle, MapPin, ShieldCheck, ClipboardList, } from "lucide-react";
import { useComplaints } from "../Context/ComplaintContext";

function AdminDashboard() {
    const { complaints } = useComplaints();

    const total = complaints.length;

    const pending = complaints.filter(
        (item) => item.status === "Pending"
    ).length;

    const inProgress = complaints.filter(
        (item) => item.status === "In Progress"
    ).length;

    const resolved = complaints.filter(
        (item) => item.status === "Resolved"
    ).length;

    const stats = [
        {
            title: "Total Complaints",
            value: total,
            icon: FileText,
            color: "text-[#347B82]",
            bg: "bg-[#E0EFEB]",
        },
        {
            title: "Pending",
            value: pending,
            icon: Clock,
            color: "text-[#B77928]",
            bg: "bg-[#F8EDD9]",
        },
        {
            title: "In Progress",
            value: inProgress,
            icon: LoaderCircle,
            color: "text-[#7663A6]",
            bg: "bg-[#ECE8F7]",
        },
        {
            title: "Resolved",
            value: resolved,
            icon: CheckCircle,
            color: "text-[#39846B]",
            bg: "bg-[#E0F0E8]",
        },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-[#FFF2D9] text-[#A66B18]";

            case "In Progress":
                return "bg-[#ECE8F7] text-[#705B9F]";

            case "Resolved":
                return "bg-[#DFF1E7] text-[#347A5D]";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F0ED] via-[#F3F5F0] to-[#E1ECE8] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#5A9B8D] p-7 text-white shadow-lg sm:p-9">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                                <ShieldCheck size={17} />
                                Administration Panel
                            </div>

                            <h1 className="text-3xl font-bold sm:text-4xl">
                                Admin Dashboard
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                                Monitor complaints, track issue progress and manage community reports from one place.
                            </p>
                        </div>

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                            <ClipboardList size={32} />
                        </div>
                    </div>
                </div>

                { /* Statistics */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-white bg-[#F0F2EF] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-[#718783]">
                                            {stat.title}
                                        </p>

                                        <h2 className="mt-3 text-3xl font-bold text-[#294F51]">
                                            {stat.value}
                                        </h2>
                                    </div>

                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                                        <Icon size={24} className={stat.color} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* All Complaints */}
                <div className="mt-9 overflow-hidden rounded-2xl border border-white bg-[#F0F2EF] shadow-sm">

                    <div className="flex flex-col gap-2 border-b border-[#DCE5E0] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                        <div>
                            <h2 className="text-xl font-bold text-[#294F51]">
                                All Complaints
                            </h2>

                            <p className="mt-1 text-sm text-[#82938E]">
                                Complete overview of reported community issues
                            </p>
                        </div>

                        <div className="w-fit rounded-lg bg-[#E0EFEB] px-3 py-2 text-sm font-semibold text-[#347B70]">
                            {total} {total === 1 ? "Complaint" : "Complaints"}
                        </div>
                    </div>

                    {complaints.length === 0 ? (
                        <div className="px-5 py-16 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E3ECE7] text-[#78958B]">
                                <FileText size={30} />
                            </div>

                            <p className="font-semibold text-[#42615C]">
                                No complaints available
                            </p>

                            <p className="mt-1 text-sm text-[#91A29D]">
                                Submitted complaints will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px] text-left">
                                <thead>
                                    <tr className="border-b border-[#DCE5E0] bg-[#E8EFEB] text-xs font-semibold uppercase tracking-wide text-[#718783]">
                                        <th className="px-5 py-4">Complaint ID</th>
                                        <th className="px-5 py-4">Title</th>
                                        <th className="px-5 py-4">Category</th>
                                        <th className="px-5 py-4">Location</th>
                                        <th className="px-5 py-4">Date</th>
                                        <th className="px-5 py-4">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {complaints.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-[#E1E8E3] text-sm text-[#49615D] transition hover:bg-[#E9F0EC] last:border-0"
                                        >
                                            <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#347B82]">
                                                #{item.id}
                                            </td>

                                            <td className="max-w-[220px] px-5 py-4 font-medium text-[#294F51]">
                                                {item.title}
                                            </td>

                                            <td className="px-5 py-4">
                                                {item.category}
                                            </td>

                                            <td className="max-w-[190px] px-5 py-4">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin
                                                        size={15}
                                                        className="shrink-0 text-[#438C83]"
                                                    />
                                                    {item.location}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                {item.submittedAt}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
