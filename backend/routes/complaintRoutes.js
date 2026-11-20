const express = require("express");

const { createComplaint, getMyComplaints, getAllComplaints, getAllStaff, updateComplaintStatus, assignComplaint, getAssignedComplaints,
    updateComplaintWorkDetails
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Submit a complaint
router.post("/", protect, createComplaint);

// Get citizen's complaints
router.get("/my", protect, getMyComplaints);

// Get all complaints (Admin only)
router.get("/all", protect, getAllComplaints);

// Get all Staff accounts (Admin only)
router.get("/staff", protect, getAllStaff);

// Get complaints assigned to logged-in Staff
router.get("/assigned", protect, getAssignedComplaints);

// Update complaint status (Admin only)
router.patch("/:id/status", protect, updateComplaintStatus);

// Assign complaint to Staff (Admin only)
router.patch("/:id/assign", protect, assignComplaint);

// Update complaint work details (Assigned Staff only)
router.patch("/:id/work", protect, updateComplaintWorkDetails);

module.exports = router;
