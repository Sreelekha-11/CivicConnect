const Complaint = require("../models/Complaint");
const User = require("../models/User");

// Submit a new complaint
const createComplaint = async (req, res) => {
    try {
        const { title, category, description, location, imageName, imageData
        } = req.body;

        if (!title || !category || !description || !location) {
            return res.status(400).json({
                message: "Please provide all required complaint details."
            });
        }

        const submittedByEmail = req.user.email;
        const submittedById = req.user.id;

        const complaintId = `CC${Date.now()}`;

        const newComplaint = new Complaint({
            id: complaintId,
            title,
            category,
            description,
            location,
            submittedByEmail,
            submittedById,
            imageName: imageName || "",
            imageData: imageData || "",
            status: "Pending"
        });

        await newComplaint.save();

        res.status(201).json({
            message: "Complaint submitted successfully!",
            complaint: newComplaint
        });

    } catch (error) {
        console.error("Complaint Submission Error:", error);

        res.status(500).json({
            message: "Server error while submitting complaint."
        });
    }
};


// Get complaints submitted by the logged-in citizen
const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            submittedById: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Complaints retrieved successfully!",
            count: complaints.length,
            complaints
        });

    } catch (error) {
        console.error("Fetch Complaints Error:", error);

        res.status(500).json({
            message: "Server error while retrieving complaints."
        });
    }
};


// Get all complaints (Admin only)
const getAllComplaints = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin permission required."
            });
        }

        const complaints = await Complaint.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            message: "All complaints retrieved successfully!",
            count: complaints.length,
            complaints
        });

    } catch (error) {
        console.error("Fetch All Complaints Error:", error);

        res.status(500).json({
            message: "Server error while retrieving all complaints."
        });
    }
};


// Get all Staff accounts (Admin only)
const getAllStaff = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin permission required."
            });
        }

        const staffMembers = await User.find({
            role: "staff"
        })
            .select("_id name email role")
            .sort({ name: 1 });

        res.status(200).json({
            message: "Staff members retrieved successfully!",
            count: staffMembers.length,
            staffMembers
        });

    } catch (error) {
        console.error("Fetch Staff Error:", error);

        res.status(500).json({
            message: "Server error while retrieving staff members."
        });
    }
};


// Update complaint status (Admin only)
const updateComplaintStatus = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin permission required."
            });
        }

        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "In Progress",
            "Resolved"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid complaint status."
            });
        }

        const complaint = await Complaint.findOneAndUpdate(
            { id: req.params.id },
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found."
            });
        }

        res.status(200).json({
            message: "Complaint status updated successfully!",
            complaint
        });

    } catch (error) {
        console.error("Update Complaint Status Error:", error);

        res.status(500).json({
            message: "Server error while updating complaint status."
        });
    }
};


// Assign complaint to a valid Staff member (Admin only)
const assignComplaint = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin permission required."
            });
        }

        const staffEmail = req.body.staffEmail?.trim().toLowerCase();

        if (!staffEmail) {
            return res.status(400).json({
                message: "Please provide a staff email."
            });
        }

        // Verify that the account exists and has the Staff role
        const staffMember = await User.findOne({
            email: staffEmail,
            role: "staff"
        }).select("name email");

        if (!staffMember) {
            return res.status(404).json({
                message: "Staff account not found. Please select a valid Staff member."
            });
        }

        const complaint = await Complaint.findOneAndUpdate(
            { id: req.params.id },
            {
                assignedTo: staffMember.email,
                assignedStaffName: staffMember.name
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found."
            });
        }

        res.status(200).json({
            message: "Staff assigned successfully!",
            complaint
        });

    } catch (error) {
        console.error("Assign Complaint Error:", error);

        res.status(500).json({
            message: "Server error while assigning staff."
        });
    }
};


// Get complaints assigned to the logged-in Staff member
const getAssignedComplaints = async (req, res) => {
    try {
        if (req.user.role !== "staff") {
            return res.status(403).json({
                message: "Access denied. Staff permission required."
            });
        }

        const complaints = await Complaint.find({
            assignedTo: req.user.email
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Assigned complaints retrieved successfully!",
            count: complaints.length,
            complaints
        });

    } catch (error) {
        console.error("Get Assigned Complaints Error:", error);

        res.status(500).json({
            message: "Server error while retrieving assigned complaints."
        });
    }
};


// Update complaint work details (Assigned Staff only)
const updateComplaintWorkDetails = async (req, res) => {
    try {
        if (req.user.role !== "staff") {
            return res.status(403).json({
                message: "Access denied. Staff permission required."
            });
        }

        const {
            progressNotes,
            resolutionRemarks,
            resolutionImageData,
            resolutionImageName,
            status
        } = req.body;

        if (
            progressNotes !== undefined &&
            !Array.isArray(progressNotes)
        ) {
            return res.status(400).json({
                message: "Progress notes must be an array."
            });
        }

        if (
            resolutionRemarks !== undefined &&
            typeof resolutionRemarks !== "string"
        ) {
            return res.status(400).json({
                message: "Resolution remarks must be text."
            });
        }

        const allowedStatuses = [
            "Pending",
            "In Progress",
            "Resolved"
        ];

        if (
            status !== undefined &&
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                message: "Invalid complaint status."
            });
        }

        const complaint = await Complaint.findOne({
            id: req.params.id,
            assignedTo: req.user.email
        });

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found or not assigned to you."
            });
        }

        if (progressNotes !== undefined) {
            complaint.progressNotes = progressNotes;
        }

        if (resolutionRemarks !== undefined) {
            complaint.resolutionRemarks = resolutionRemarks;
        }

        if (resolutionImageData !== undefined) {
            complaint.resolutionImageData = resolutionImageData;
        }

        if (resolutionImageName !== undefined) {
            complaint.resolutionImageName = resolutionImageName;
        }

        if (status !== undefined) {
            complaint.status = status;
        }

        await complaint.save();

        res.status(200).json({
            message: "Complaint work details updated successfully!",
            complaint
        });

    } catch (error) {
        console.error("Update Complaint Work Details Error:", error);

        res.status(500).json({
            message: "Server error while updating complaint work details."
        });
    }
};


// Export controller functions
module.exports = {
    createComplaint, getMyComplaints, getAllComplaints, getAllStaff,
    updateComplaintStatus, assignComplaint, getAssignedComplaints, updateComplaintWorkDetails
};
