
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    MapPin,
    Menu,
    X,
    Home,
    Info,
    AlertCircle,
    LayoutDashboard,
    ClipboardList,
    Users,
    LogIn,
    UserPlus,
    LogOut,
    ChevronRight,
} from "lucide-react";

import { useAuth } from "../Context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate("/");
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 rounded-xl px-2.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${isActive
            ? "bg-teal-50 text-teal-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
        }`;

    const navigationLinks = [
        { to: "/", label: "Home", icon: Home, end: true },
        { to: "/about", label: "About", icon: Info },
        { to: "/issues", label: "Issues", icon: AlertCircle },
    ];

    if (user?.role === "citizen") {
        navigationLinks.push(
            { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { to: "/my-complaints", label: "My Complaints", icon: ClipboardList }
        );
    }

    if (user?.role === "admin") {
        navigationLinks.push(
            {
                to: "/admin-dashboard",
                label: "Admin Dashboard",
                icon: LayoutDashboard,
            },
            {
                to: "/manage-complaints",
                label: "Manage Complaints",
                icon: ClipboardList,
            },
            { to: "/manage-users", label: "Manage Users", icon: Users }
        );
    }

    if (user?.role === "staff") {
        navigationLinks.push({
            to: "/staff-dashboard",
            label: "Staff Dashboard",
            icon: LayoutDashboard,
        });
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-xl">

            <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-7">

                {/* LOGO */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="group flex shrink-0 items-center gap-2.5"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#102A43] to-[#0D9488] text-white shadow-lg shadow-teal-900/15 transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
                        <MapPin size={25} strokeWidth={2.5} />
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-[#102A43] sm:text-2xl">
                            Civic<span className="text-[#0D9488]">Connect</span>
                        </h1>

                        <p className="hidden text-[10px] font-semibold tracking-[2px] text-slate-400 sm:block">
                            BETTER COMMUNITY TOGETHER
                        </p>
                    </div>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
                    {navigationLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={linkClass}
                            >
                                <Icon size={16} className="shrink-0" />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </div>

                {/* DESKTOP AUTHENTICATION */}
                <div className="hidden shrink-0 items-center gap-2 lg:flex">
                    {user ? (
                        <>
                            <div className="hidden items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2 2xl:flex">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-bold uppercase text-teal-800">
                                    {user.name?.charAt(0) || "U"}
                                </div>

                                <div>
                                    <p className="max-w-24 truncate text-sm font-bold text-slate-800">
                                        {user.name}
                                    </p>

                                    <p className="text-xs capitalize text-slate-500">
                                        {user.role}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex shrink-0 items-center gap-2 rounded-xl border border-red-100 px-3 py-2.5 text-sm font-semibold text-red-600 transition-all duration-300 hover:border-red-200 hover:bg-red-50"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-[#102A43] transition-all duration-300 hover:bg-slate-100"
                            >
                                <LogIn size={17} />
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#102A43] to-[#0D9488] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <UserPlus size={17} />
                                Get Started
                                <ChevronRight size={15} />
                            </Link>
                        </>
                    )}
                </div>

                {/* RESPONSIVE MENU BUTTON */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#102A43] transition-all duration-300 hover:border-teal-200 hover:bg-teal-50 lg:hidden"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={23} /> : <Menu size={23} />}
                </button>

            </div>

            {/* RESPONSIVE NAVIGATION MENU */}
            {menuOpen && (
                <div className="animate-slide-up max-h-[75vh] overflow-y-auto border-t border-slate-100 bg-white px-5 py-5 shadow-xl lg:hidden">

                    <div className="mx-auto flex max-w-2xl flex-col gap-2">

                        {/* USER DETAILS */}
                        {user && (
                            <div className="mb-3 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#102A43] to-[#0D9488] p-4 text-white">

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-lg font-bold uppercase">
                                    {user.name?.charAt(0) || "U"}
                                </div>

                                <div>
                                    <p className="font-bold">
                                        {user.name}
                                    </p>

                                    <p className="text-sm capitalize text-white/75">
                                        {user.role}
                                    </p>
                                </div>

                            </div>
                        )}

                        {/* ALL NAVIGATION LINKS */}
                        {navigationLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    onClick={closeMenu}
                                    className={linkClass}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </NavLink>
                            );
                        })}

                        <div className="my-2 border-t border-slate-100" />

                        {/* AUTHENTICATION LINKS */}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-left font-semibold text-red-600 transition hover:bg-red-100"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">

                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 font-bold text-[#102A43] transition hover:bg-slate-50"
                                >
                                    <LogIn size={17} />
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#102A43] to-[#0D9488] px-3 py-3 font-bold text-white transition hover:shadow-lg"
                                >
                                    <UserPlus size={17} />
                                    Register
                                </Link>

                            </div>
                        )}

                    </div>
                </div>
            )}

        </nav>
    );
}

export default Navbar;
