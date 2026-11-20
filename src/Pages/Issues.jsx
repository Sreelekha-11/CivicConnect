import { Construction, Trash2, Droplets, Lightbulb, Waves, TreePine, ArrowUpRight, } from "lucide-react";

function Issues() {
    const issueCategories = [
        {
            title: "Road Damage",
            description: "Report potholes and damaged roads.",
            icon: Construction,
        },
        {
            title: "Garbage",
            description: "Report waste dumping and unclean areas.",
            icon: Trash2,
        },
        {
            title: "Water Leakage",
            description: "Report leaking pipes and water wastage.",
            icon: Droplets,
        },
        {
            title: "Street Lights",
            description: "Report broken or non-working street lights.",
            icon: Lightbulb,
        },
        {
            title: "Drainage",
            description: "Report blocked drains and drainage problems.",
            icon: Waves,
        },
        {
            title: "Public Spaces",
            description: "Report damaged parks and public spaces.",
            icon: TreePine,
        },
    ];

    return (
        <section className="bg-gradient-to-br from-[#E8F0ED] via-[#F3F5F0] to-[#E1ECE8] px-6 sm:px-8 py-20">

            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto">
                    <span className="inline-block px-4 py-2 rounded-full bg-[#D4E7E1] text-[#28566B] text-sm font-semibold mb-5">
                        OUR SERVICES
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-bold text-[#234B59]">
                        Explore Public Issues
                    </h2>

                    <p className="text-[#647B7B] mt-4 text-base sm:text-lg leading-relaxed">
                        Choose an issue category to help improve your
                        community. Your report can make a real difference.
                    </p>
                </div>

                {/* Issue Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">

                    {issueCategories.map((issue, index) => {
                        const Icon = issue.icon;

                        return (
                            <div
                                key={index}
                                className="group bg-[#F0F2EF] p-8 rounded-2xl border border-[#D7E3DE] shadow-[0_5px_20px_rgba(35,75,89,0.06)] hover:shadow-[0_12px_30px_rgba(35,75,89,0.13)] hover:-translate-y-2 transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#28566B] to-[#5A9B8D] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <Icon
                                        size={32}
                                        className="text-white"
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-[#234B59] mt-7">
                                    {issue.title}
                                </h3>

                                <p className="text-[#687D7D] mt-3 leading-relaxed min-h-[52px]">
                                    {issue.description}
                                </p>

                                {/* Learn More */}
                                <div className="flex items-center gap-2 text-[#347B82] font-semibold mt-6 group-hover:text-[#234B59] transition-colors">
                                    <span>Learn More</span>
                                    <ArrowUpRight
                                        size={18}
                                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                    />
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* Bottom Message */}
                <div className="mt-14 text-center">
                    <p className="text-[#647B7B] text-sm sm:text-base">
                        Together, we can build a cleaner, safer and better
                        community.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Issues;
