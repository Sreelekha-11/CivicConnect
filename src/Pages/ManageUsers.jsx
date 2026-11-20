import { useState, useEffect } from "react";
import { Search, Users, User, ShieldCheck, Calendar, UserRound, RefreshCw, UsersRound, } from "lucide-react";
import { useAuth } from "../Context/AuthContext";

function ManageUsers() {
    const { users, fetchUsers } = useAuth();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch latest users from MongoDB
    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            setError("");

            const result = await fetchUsers();

            if (!result.success) {
                setError(result.message || "Unable to load users.");
            }

            setLoading(false);
        };

        loadUsers();
    }, [fetchUsers]);

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            (user.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (user.email || "").toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" || user.role === filter;

        return matchesSearch && matchesFilter;
    });

    // Format MongoDB registration date
    const formatDate = (date) => {
        if (!date) return "Not available";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Role styling
    const getRoleStyle = (role) => {
        switch (role) {
            case "admin":
                return "bg-[#ECE8F7] text-[#705B9F]";

            case "staff":
                return "bg-[#E0EFEB] text-[#347B70]";

            case "citizen":
                return "bg-[#DFF1E7] text-[#347A5D]";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const handleRetry = async () => {
        setLoading(true);
        setError("");

        try {
            const result = await fetchUsers();

            if (!result.success) {
                setError(result.message || "Unable to load users.");
            }
        } catch (err) {
            setError(err.message || "Unable to load users.");
        } finally {
            setLoading(false);
        }
    };

    const citizensCount = users.filter(
        (user) => user.role === "citizen"
    ).length;

    const selectClass =
        "rounded-xl border border-[#D5DFDC] bg-white px-4 py-3 text-sm text-[#42615C] outline-none transition focus:border-[#438C83] focus:ring-2 focus:ring-[#438C83]/15";

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
                                Manage Users
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                                View registered CivicConnect users and monitor their account details and roles.
                            </p>
                        </div>

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                            <UsersRound size={32} />
                        </div>
                    </div>
                </div>

                {/* User Statistics */}
                <div className="mb-8 grid gap-5 sm:grid-cols-2">

                    <div className="rounded-2xl border border-white bg-[#F0F2EF] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#718783]">
                                    Total Registered Users
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-[#294F51]">
                                    {users.length}
                                </h2>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E0EFEB]">
                                <Users size={25} className="text-[#347B82]" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white bg-[#F0F2EF] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#718783]">
                                    Registered Citizens
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-[#294F51]">
                                    {citizensCount}
                                </h2>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DFF1E7]">
                                <UserRound size={25} className="text-[#39846B]" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Search and Filter */}
                <div className="mb-7 rounded-2xl border border-white bg-[#F0F2EF] p-5 shadow-sm sm:p-6">

                    <div className="mb-4">
                        <h2 className="font-semibold text-[#294F51]">
                            Find Users
                        </h2>

                        <p className="mt-1 text-sm text-[#82938E]">
                            Search by name or email and filter by account role.
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
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-[#D5DFDC] bg-white py-3 pl-11 pr-4 text-sm text-[#294F51] outline-none transition placeholder:text-[#9AAEAA] focus:border-[#438C83] focus:ring-2 focus:ring-[#438C83]/15"
                            />
                        </div>

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className={`${selectClass} min-w-[175px]`}
                        >
                            <option value="All">All Users</option>
                            <option value="citizen">Citizens</option>
                            <option value="admin">Admins</option>
                            <option value="staff">Staff</option>
                        </select>

                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden rounded-2xl border border-white bg-[#F0F2EF] shadow-sm">

                    <div className="flex flex-col gap-2 border-b border-[#DCE5E0] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                        <div>
                            <h2 className="text-xl font-bold text-[#294F51]">
                                Registered Users
                            </h2>

                            <p className="mt-1 text-sm text-[#82938E]">
                                Overview of registered CivicConnect accounts.
                            </p>
                        </div>

                        <div className="w-fit rounded-lg bg-[#E0EFEB] px-3 py-2 text-sm font-semibold text-[#347B70]">
                            {filteredUsers.length} Users
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-16 text-center">
                            <RefreshCw
                                size={28}
                                className="mx-auto mb-3 animate-spin text-[#438C83]"
                            />

                            <p className="text-sm font-medium text-[#718783]">
                                Loading registered users...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="px-5 py-16 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <RefreshCw size={25} />
                            </div>

                            <p className="font-medium text-red-600">
                                {error}
                            </p>

                            <button
                                onClick={handleRetry}
                                className="mt-5 rounded-xl bg-gradient-to-r from-[#28566B] to-[#438C83] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="px-5 py-16 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E3ECE7] text-[#78958B]">
                                <Users size={30} />
                            </div>

                            <p className="font-semibold text-[#42615C]">
                                No users found
                            </p>

                            <p className="mt-2 text-sm text-[#91A29D]">
                                Try another search or filter.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[750px] text-left">

                                <thead className="bg-[#E8EFEB]">
                                    <tr className="text-xs font-semibold uppercase tracking-wide text-[#718783]">
                                        <th className="px-5 py-4">User ID</th>
                                        <th className="px-5 py-4">Name</th>
                                        <th className="px-5 py-4">Email</th>
                                        <th className="px-5 py-4">Role</th>
                                        <th className="px-5 py-4">Registered Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredUsers.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-[#E1E8E3] text-sm text-[#49615D] transition hover:bg-[#E9F0EC]"
                                        >
                                            <td className="whitespace-nowrap px-5 py-5 font-semibold text-[#347B82]">
                                                {String(item.id).slice(-8)}
                                            </td>

                                            <td className="px-5 py-5">
                                                <span className="flex items-center gap-2 font-medium text-[#294F51]">
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E0EFEB] text-[#438C83]">
                                                        <User size={16} />
                                                    </span>

                                                    {item.name}
                                                </span>
                                            </td>

                                            <td className="px-5 py-5">
                                                {item.email}
                                            </td>

                                            <td className="px-5 py-5">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getRoleStyle(item.role)}`}>
                                                    {item.role === "admin" ? (
                                                        <ShieldCheck size={14} />
                                                    ) : (
                                                        <User size={14} />
                                                    )}

                                                    {item.role}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-5">
                                                <span className="flex items-center gap-2">
                                                    <Calendar
                                                        size={15}
                                                        className="text-[#438C83]"
                                                    />

                                                    {formatDate(item.createdAt)}
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

export default ManageUsers;
