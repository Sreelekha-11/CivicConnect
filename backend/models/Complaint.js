const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        // Existing CivicConnect complaint ID
        id: {
            type: String,
            required: true,
            unique: true
        },

        // Complaint information
        title: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },

        // Citizen information
        submittedByEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        submittedById: {
            type: String,
            required: true
        },

        // Uploaded complaint image
        imageName: {
            type: String,
            default: ""
        },
        imageData: {
            type: String,
            default: ""
        },

        // Complaint management
        status: {
            type: String,
            default: "Pending"
        },
        assignedTo: {
            type: String,
            default: ""
        },
        assignedStaffName: {
            type: String,
            default: ""
        },

        // Staff progress updates
        progressNotes: {
            type: [mongoose.Schema.Types.Mixed],
            default: []
        },

        // Resolution information
        resolutionRemarks: {
            type: String,
            default: ""
        },
        resolutionImageData: {
            type: String,
            default: ""
        },
        resolutionImageName: {
            type: String,
            default: ""
        },

        // Submission date
        submittedAt: {
            type: String,
            default: () => new Date().toLocaleDateString()
        }
    },
    {
        timestamps: true
    }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
