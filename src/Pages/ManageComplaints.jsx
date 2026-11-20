import { useState, useEffect } from "react";
import { Search, FileText, MapPin, Filter, UserCheck, ClipboardList, Users, RefreshCw, } from "lucide-react";
import { useComplaints } from "../Context/ComplaintContext";
import { useAuth } from "../Context/AuthContext";

function ManageComplaints() {
    const {
        complaints,
        updateComplaintStatus,
        assignComplaint,
    } = useComplaints();

    const { token } = useAuth();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const [staffMembers, setStaffMembers] = useState([]);
    const [loadingStaff, setLoadingStaff] = useState(true);
    const [staffError, setStaffError] = useState("");

    // Fetch actual Staff accounts from MongoDB
    useEffect(() => {
        const fetchStaffMembers = async () => {
            try {
                setLoadingStaff(true);
                setStaffError("");

                const response = await fetch(
                    "http://localhost:5000/api/complaints/staff",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch Staff accounts."
                    );
                }

                setStaffMembers(data.staffMembers || []);

            } catch (error) {
                console.error("Fetch Staff Error:", error);
                setStaffError(error.message);

            } finally {
                setLoadingStaff(false);
            }
        };

        if (token) {
            fetchStaffMembers();
        }
    }, [token]);

    // Search and filter complaints
    const filteredComplaints = complaints.filter((item) => {
        const matchesSearch =
            (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
            String(item.id || "").toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" || item.status === filter;

        return matchesSearch && matchesFilter;
    });

    // Status styling
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

    // Assign complaint to selected Staff member
    const handleAssignStaff = async (complaintId, staffEmail) => {
        if (!staffEmail) {
            return;
        }

        const selectedStaff = staffMembers.find(
            (staff) => staff.email === staffEmail
        );

        if (!selectedStaff) {
            return;
        }

        const success = await assignComplaint(
            complaintId,
            selectedStaff.email,
            selectedStaff.name
        );

        if (!success) {
            alert("Failed to assign Staff. Please try again.");
        }
    };

    const selectClass =
        "rounded-lg border border-[#D5DFDC] bg-white px-3 py-2.5 text-sm text-[#42615C] outline-none transition focus:border-[#438C83] focus:ring-2 focus:ring-[#438C83]/15 disabled:cursor-not-allowed disabled:bg-[#EDF1EE]";

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F0ED] via-[#F3F5F0] to-[#E1ECE8] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#5A9B8D] p-7 text-white shadow-lg sm:p-9">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                                <ClipboardList size={17} />
                                Administration Panel
                            </div>

                            <h1 className="text-3xl font-bold sm:text-4xl">
                                Manage Complaints
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                                Review community complaints, assign staff members and monitor issue progress.
                            </p>
                        </div>

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                            <FileText size={32} />
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="mb-7 rounded-2xl border border-white bg-[#F0F2EF] p-5 shadow-sm sm:p-6">
                    <div className="mb-4">
                        <h2 className="font-semibold text-[#294F51]">
                            Find Complaints
                        </h2>

                        <p className="mt-1 text-sm text-[#82938E]">
                            Search by complaint title or ID and filter by status.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">

                        <div className="relative flex-1">
                            <Search
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8AA19A]"
                            />

                            <input
                                type="text"
                                placeholder="Search by complaint title or ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-[#D5DFDC] bg-white py-3 pl-11 pr-4 text-sm text-[#294F51] outline-none transition placeholder:text-[#9AAEAA] focus:border-[#438C83] focus:ring-2 focus:ring-[#438C83]/15"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter
                                size={19}
                                className="shrink-0 text-[#438C83]"
                            />

                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className={`${selectClass} min-w-[175px]`}
                            >
                                <option value="All">All Complaints</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Complaints Table */}
                <div className="overflow-hidden rounded-2xl border border-white bg-[#F0F2EF] shadow-sm">

                    <div className="flex flex-col gap-3 border-b border-[#DCE5E0] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                        <div>
                            <h2 className="text-xl font-bold text-[#294F51]">
                                All Complaints
                            </h2>

                            <p className="mt-1 text-sm text-[#82938E]">
                                Review, assign and update reported issues.
                            </p>
                        </div>

                        <div className="flex w-fit items-center gap-2 rounded-lg bg-[#E0EFEB] px-3 py-2 text-sm font-semibold text-[#347B70]">
                            <FileText size={16} />
                            {filteredComplaints.length} Complaints
                        </div>
                    </div>

                    {/* Staff Error */}
                    {staffError && (
                        <div className="mx-5 mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:mx-7">
                            <RefreshCw size={17} className="mt-0.5 shrink-0" />

                            <p>
                                Unable to load Staff accounts: {staffError}
                            </p>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredComplaints.length === 0 ? (
                        <div className="px-5 py-16 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E3ECE7] text-[#78958B]">
                                <FileText size={30} />
                            </div>

                            <p className="font-semibold text-[#42615C]">
                                No complaints found
                            </p>

                            <p className="mt-2 text-sm text-[#91A29D]">
                                Try another search or filter.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1150px] text-left">

                                <thead className="bg-[#E8EFEB]">
                                    <tr className="text-xs font-semibold uppercase tracking-wide text-[#718783]">
                                        <th className="px-4 py-4">Complaint ID</th>
                                        <th className="px-4 py-4">Title</th>
                                        <th className="px-4 py-4">Category</th>
                                        <th className="px-4 py-4">Location</th>
                                        <th className="px-4 py-4">Date</th>
                                        <th className="px-4 py-4">Status</th>
                                        <th className="px-4 py-4">Assign Staff</th>
                                        <th className="px-4 py-4">Update Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredComplaints.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-[#E1E8E3] text-sm text-[#49615D] transition hover:bg-[#E9F0EC]"
                                        >
                                            <td className="whitespace-nowrap px-4 py-5 font-semibold text-[#347B82]">
                                                #{item.id}
                                            </td>

                                            <td className="max-w-[200px] px-4 py-5 font-medium text-[#294F51]">
                                                {item.title}
                                            </td>

                                            <td className="px-4 py-5">
                                                {item.category}
                                            </td>

                                            <td className="max-w-[180px] px-4 py-5">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin
                                                        size={15}
                                                        className="shrink-0 text-[#438C83]"
                                                    />
                                                    {item.location}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-5">
                                                {item.submittedAt}
                                            </td>

                                            {/* Current Status */}
                                            <td className="px-4 py-5">
                                                <span
                                                    className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(item.status)}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>

                                            {/* Assign Staff */}
                                            <td className="px-4 py-5">
                                                <div className="flex items-center gap-2">
                                                    <UserCheck
                                                        size={17}
                                                        className="shrink-0 text-[#438C83]"
                                                    />

                                                    <select
                                                        value={item.assignedTo || ""}
                                                        disabled={
                                                            loadingStaff ||
                                                            staffMembers.length === 0
                                                        }
                                                        onChange={(e) =>
                                                            handleAssignStaff(
                                                                item.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`${selectClass} max-w-[175px]`}
                                                    >
                                                        <option value="">
                                                            {loadingStaff
                                                                ? "Loading Staff..."
                                                                : staffMembers.length === 0
                                                                    ? "No Staff Available"
                                                                    : "Unassigned"}
                                                        </option>

                                                        {staffMembers.map((staff) => (
                                                            <option
                                                                key={staff._id}
                                                                value={staff.email}
                                                            >
                                                                {staff.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Update Status */}
                                            <td className="px-4 py-5">
                                                <select
                                                    value={item.status}
                                                    onChange={(e) =>
                                                        updateComplaintStatus(
                                                            item.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className={selectClass}
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
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}
                </div>

                {/* Footer Information */}
                <div className="mt-5 flex items-center gap-2 px-1 text-xs text-[#82938E]">
                    <Users size={15} />
                    <p>
                        Staff assignment and complaint status changes are managed through your existing system.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default ManageComplaints;
