import { Target, Eye, HeartHandshake, Users, ShieldCheck, CheckCircle, ArrowRight, } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
    const features = [
        {
            icon: Target,
            title: "Our Mission",
            description:
                "To make reporting public issues simple, transparent, and accessible to every citizen.",
            color: "bg-[#E0EFEB]",
            iconColor: "text-[#347B82]",
        },
        {
            icon: Eye,
            title: "Our Vision",
            description:
                "To build cleaner, safer, and better communities through technology and collective action.",
            color: "bg-[#E9E5F4]",
            iconColor: "text-[#7663A6]",
        },
        {
            icon: HeartHandshake,
            title: "Our Values",
            description:
                "We believe in citizen participation, responsibility, accountability, and transparency.",
            color: "bg-[#F8EDD9]",
            iconColor: "text-[#B77928]",
        },
    ];

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#E8F0ED] via-[#F3F5F0] to-[#E1ECE8] px-4 py-12 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">

                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#5A9B8D] px-6 py-14 text-center text-white shadow-lg sm:px-12 sm:py-20">

                    <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/5" />
                    <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5" />

                    <div className="relative z-10">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                            <Users size={32} />
                        </div>

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-white/75">
                            Together for a Better Community
                        </p>

                        <h1 className="text-3xl font-bold sm:text-5xl">
                            About CivicConnect
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                            CivicConnect is a community-driven platform that connects citizens and authorities to report public problems, track complaints, and create positive change in our communities.
                        </p>

                    </div>
                </div>

                {/* Introduction */}
                <div className="mx-auto mt-12 max-w-3xl text-center">

                    <h2 className="text-2xl font-bold text-[#294F51] sm:text-3xl">
                        Making Communities Better, Together
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-[#718783] sm:text-base">
                        We believe every citizen deserves a clean, safe, and well-maintained environment. CivicConnect makes it easier for people to raise concerns, share information, and stay informed about the progress of reported issues.
                    </p>

                </div>

                {/* Mission Vision Values */}
                <div className="mt-12 grid gap-6 md:grid-cols-3">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="rounded-2xl border border-white bg-[#F0F2EF] p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8"
                            >
                                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color}`}>
                                    <Icon
                                        size={31}
                                        className={feature.iconColor}
                                    />
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-[#294F51]">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-[#718783]">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}

                </div>

                {/* Why CivicConnect */}
                <div className="mt-12 grid items-center gap-8 rounded-3xl border border-white bg-[#F0F2EF] p-7 shadow-sm sm:p-10 md:grid-cols-2">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#438C83]">
                            Why CivicConnect?
                        </p>

                        <h2 className="mt-3 text-2xl font-bold leading-snug text-[#294F51] sm:text-3xl">
                            Every Report Matters. Every Action Counts.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#718783]">
                            Public issues affect everyone. Our platform provides a simple way to report problems and follow their progress, encouraging stronger communication between citizens and the people responsible for resolving them.
                        </p>
                    </div>

                    <div className="space-y-5">

                        {[
                            "Easy reporting of public issues",
                            "Transparent complaint tracking",
                            "Better coordination with responsible staff",
                            "A stronger and more responsible community",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#DFF1E7] text-[#39846B]">
                                    <CheckCircle size={19} />
                                </div>

                                <p className="text-sm font-medium text-[#42615C]">
                                    {item}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#5A9B8D] px-6 py-10 text-center text-white shadow-md sm:px-10">

                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                        <ShieldCheck size={25} />
                    </div>

                    <h2 className="text-2xl font-bold">
                        Be a Part of the Change
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80">
                        Your voice can make a difference. Report public issues and help build a better community.
                    </p>

                    <Link
                        to="/report"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F0F2EF] px-6 py-3 text-sm font-semibold text-[#28566B] shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                    >
                        Report an Issue
                        <ArrowRight size={17} />
                    </Link>

                </div>

            </div>
        </section>
    );
}

export default About;
