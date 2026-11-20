import { Link } from "react-router-dom";
import {
    MapPin,
    ArrowUp,
    Heart,
    Home,
    Info,
    AlertCircle,
    LogIn,
} from "lucide-react";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="relative mt-10 overflow-hidden bg-[#102A43] text-white">

            <div className="relative mx-auto max-w-[1400px] px-6 pb-5 pt-9 md:px-10">

                {/* Main Footer */}
                <div className="grid gap-8 border-b border-white/10 pb-7 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-700 transition duration-300 hover:rotate-[-6deg]">
                                <MapPin size={23} strokeWidth={2.5} />
                            </div>

                            <span className="text-xl font-extrabold tracking-tight">
                                Civic<span className="text-teal-400">Connect</span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                            Together, let's build a better community.
                            Report local issues and track their progress
                            for cleaner, safer neighbourhoods.
                        </p>

                        <Link
                            to="/issues"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-teal-400"
                        >
                            Explore Issues
                            <span>→</span>
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:translate-x-1 hover:text-teal-400">
                                    <Home size={15} />
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/about" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:translate-x-1 hover:text-teal-400">
                                    <Info size={15} />
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link to="/issues" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:translate-x-1 hover:text-teal-400">
                                    <AlertCircle size={15} />
                                    Reported Issues
                                </Link>
                            </li>

                            <li>
                                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:translate-x-1 hover:text-teal-400">
                                    <LogIn size={15} />
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mission */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold text-white">
                            Our Mission
                        </h3>

                        <p className="text-sm leading-6 text-slate-300">
                            Empowering citizens to raise local concerns
                            and follow their progress through a transparent
                            community reporting platform.
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-teal-400">
                            <Heart size={15} fill="currentColor" />
                            Better Communities Together
                        </div>
                    </div>
                </div>

                {/* Copyright - Centered */}
                <div className="relative flex min-h-[55px] items-center justify-center pt-4">

                    <p className="text-center text-xs text-slate-400">
                        © {new Date().getFullYear()} CivicConnect.
                        All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="absolute right-0 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:bg-teal-500"
                    >
                        <ArrowUp size={18} />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
