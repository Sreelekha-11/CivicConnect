import {
    ArrowRight, MapPin, ShieldCheck, Users, ClipboardCheck, Search, MessageSquareText, MoveRight,
    Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
    const features = [
        {
            icon: MapPin,
            title: "Report Local Issues",
            description:
                "Easily report potholes, garbage, water leaks, broken streetlights and other neighbourhood problems.",
            color: "bg-[#DCEAE9] text-[#28566B]",
        },
        {
            icon: ClipboardCheck,
            title: "Track Your Progress",
            description:
                "Stay informed about your submitted complaints and follow their status from submission to resolution.",
            color: "bg-[#E0EAF0] text-[#347B82]",
        },
        {
            icon: Users,
            title: "Build Better Communities",
            description:
                "Take an active role in improving your neighbourhood by bringing community concerns together.",
            color: "bg-[#E6E5F0] text-[#70649A]",
        },
    ];

    const steps = [
        {
            number: "01",
            icon: MessageSquareText,
            title: "Submit a Complaint",
            description:
                "Describe the local issue, add its location and submit your report.",
        },
        {
            number: "02",
            icon: Search,
            title: "Review and Assignment",
            description:
                "Administrators review submitted complaints and can assign them to staff.",
        },
        {
            number: "03",
            icon: Activity,
            title: "Follow the Progress",
            description:
                "Citizens can check complaint status and view progress updates shared by staff.",
        },
    ];

    return (
        <main className="overflow-hidden bg-[#F3F5F0]">

            {/* HERO SECTION */}
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#28566B] via-[#347B82] to-[#5A9B8D] px-5 pt-10 pb-14 text-center text-white md:pt-14 md:pb-20">

                <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border-[40px] border-white/5" />

                <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

                <div className="pointer-events-none absolute right-[15%] top-[35%] h-32 w-32 rounded-full bg-teal-200/10 blur-2xl" />

                <div className="relative mx-auto max-w-4xl animate-slide-up">

                    <span className="inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#D8EEE7] backdrop-blur-sm">
                        Welcome to CivicConnect
                    </span>

                    <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                        Small Actions.
                        <span className="mt-2 block text-[#C8F0DF]">
                            Better Communities.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#E0EFEB] md:text-base">
                        Your neighbourhood deserves attention.
                        Report local issues, track complaint progress
                        and take a step towards a cleaner, safer
                        community with CivicConnect.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                        <Link
                            to="/login?redirect=/report"
                            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#D2EDE3] px-7 py-3.5 font-bold text-[#234B59] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                        >
                            Report an Issue

                            <ArrowRight
                                size={19}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            to="/issues"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                        >
                            Explore Issues
                            <MoveRight size={19} />
                        </Link>

                    </div>

                    <div className="mt-9 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 text-sm text-[#E0EFEB]">

                        <span className="flex items-center gap-2">
                            <ShieldCheck size={18} className="text-[#C8F0DF]" />
                            Transparent Tracking
                        </span>

                        <span className="flex items-center gap-2">
                            <Users size={18} className="text-[#C8F0DF]" />
                            Community Driven
                        </span>

                    </div>

                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="bg-[#F3F5F0] px-5 py-16 md:px-10 md:py-20">

                <div className="mx-auto max-w-[1200px]">

                    <div className="mx-auto max-w-2xl text-center">

                        <span className="text-sm font-bold uppercase tracking-[3px] text-[#347B82]">
                            What We Do
                        </span>

                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#234B59] md:text-4xl">
                            Everything Starts With
                            <span className="text-[#5A9B8D]"> Your Voice</span>
                        </h2>

                        <p className="mt-4 leading-7 text-[#718383]">
                            CivicConnect makes it easier for citizens to report
                            community concerns and follow their progress.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-7 md:grid-cols-3">

                        {features.map((feature, index) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    style={{
                                        animationDelay: `${index * 120}ms`,
                                    }}
                                    className="group animate-slide-up rounded-2xl border border-[#DCE6E1] bg-[#F0F2EF] p-7 shadow-[0_5px_20px_rgba(35,75,89,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#A9CEC2] hover:shadow-xl md:p-8"
                                >

                                    <div
                                        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                                    >
                                        <Icon size={29} strokeWidth={2} />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold text-[#234B59] transition-colors duration-300 group-hover:text-[#347B82]">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-[#718383]">
                                        {feature.description}
                                    </p>

                                </div>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="bg-[#E6EEEA] px-5 py-16 md:px-10 md:py-20">

                <div className="mx-auto max-w-[1200px]">

                    <div className="mx-auto max-w-2xl text-center">

                        <span className="text-sm font-bold uppercase tracking-[3px] text-[#347B82]">
                            Simple Process
                        </span>

                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#234B59] md:text-4xl">
                            How CivicConnect Works
                        </h2>

                        <p className="mt-4 leading-7 text-[#718383]">
                            Three simple steps to report local concerns
                            and follow their progress.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-7 md:grid-cols-3">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    style={{
                                        animationDelay: `${index * 150}ms`,
                                    }}
                                    className="group animate-slide-up relative rounded-2xl border border-[#D5E2DE] bg-[#F0F2EF] p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#A9CEC2] hover:shadow-xl md:p-8"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#28566B] to-[#5A9B8D] text-white shadow-md transition-all duration-300 group-hover:scale-110">
                                            <Icon size={26} />
                                        </div>

                                        <span className="text-4xl font-extrabold text-[#D5E2DE] transition-colors duration-300 group-hover:text-[#A9CEC2]">
                                            {step.number}
                                        </span>

                                    </div>

                                    <h3 className="mt-7 text-xl font-bold text-[#234B59] transition-colors duration-300 group-hover:text-[#347B82]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-[#718383]">
                                        {step.description}
                                    </p>

                                </div>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* CALL TO ACTION SECTION */}
            <section className="bg-[#F3F5F0] px-5 py-16 md:px-10 md:py-20">

                <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] bg-gradient-to-r from-[#28566B] via-[#347B82] to-[#5A9B8D] px-7 py-14 text-center text-white shadow-xl md:px-16 md:py-16">

                    <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />

                    <div className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative">

                        <span className="text-sm font-bold uppercase tracking-[3px] text-[#D2EDE3]">
                            Be the Change
                        </span>

                        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight md:text-4xl">
                            Your Community.
                            <span className="block text-[#C8F0DF]">
                                Your Responsibility.
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#E0EFEB] md:text-base">
                            Join CivicConnect and take the first step
                            towards a better neighbourhood. Your voice
                            can help bring attention to local issues.
                        </p>

                        <Link
                            to="/register"
                            className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#D2EDE3] px-7 py-4 font-bold text-[#234B59] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                        >
                            Join CivicConnect

                            <ArrowRight
                                size={19}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                    </div>
                </div>
            </section>

        </main>
    );
}

export default Home;
