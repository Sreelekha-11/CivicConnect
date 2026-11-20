
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useAuth } from "./AuthContext";

const ComplaintContext = createContext();

export function ComplaintProvider({ children }) {
    const { user, token } = useAuth();

    const [complaints, setComplaints] = useState(() => {
        const savedComplaints = localStorage.getItem("complaints");
        return savedComplaints ? JSON.parse(savedComplaints) : [];
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:5000/api/complaints";

    // Fetch complaints submitted by the logged-in citizen
    const fetchMyComplaints = async () => {
        if (!token || user?.role !== "citizen") return;

        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/my`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to retrieve complaints."
                );
            }

            setComplaints(data.complaints || []);

        } catch (err) {
            console.error("Fetch My Complaints Error:", err);
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    // Fetch all complaints for Admin
    const fetchAllComplaints = async () => {
        if (!token || user?.role !== "admin") return;

        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/all`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to retrieve all complaints."
                );
            }

            setComplaints(data.complaints || []);

        } catch (err) {
            console.error("Fetch All Complaints Error:", err);
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    // Fetch complaints assigned to Staff
    const fetchAssignedComplaints = async () => {
        if (!token || user?.role !== "staff") return;

        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/assigned`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to retrieve assigned complaints."
                );
            }

            setComplaints(data.complaints || []);

        } catch (err) {
            console.error("Fetch Assigned Complaints Error:", err);
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    // Fetch complaints according to logged-in user's role
    useEffect(() => {
        if (!token || !user?.role) return;

        setComplaints([]);

        if (user.role === "citizen") {
            fetchMyComplaints();

        } else if (user.role === "admin") {
            fetchAllComplaints();

        } else if (user.role === "staff") {
            fetchAssignedComplaints();
        }
    }, [user?.id, user?.role, token]);

    // Keep a local copy of complaints
    useEffect(() => {
        localStorage.setItem(
            "complaints",
            JSON.stringify(complaints)
        );
    }, [complaints]);

    // Add a new complaint (existing frontend function)
    const addComplaint = (complaintData) => {
        const newComplaint = {
            id: `CC${Date.now()}`,
            ...complaintData,
            status: "Pending",
            assignedTo: "",
            assignedStaffName: "",
            progressNotes: [],
            resolutionRemarks: "",
            resolutionImageData: "",
            resolutionImageName: "",
            submittedAt: new Date().toLocaleDateString(),
        };

        setComplaints((previousComplaints) => [
            newComplaint,
            ...previousComplaints,
        ]);
    };

    // Update complaint status
    // Admin uses the Admin API; Staff uses the Staff work API
    const updateComplaintStatus = async (id, newStatus) => {
        if (!token || !["admin", "staff"].includes(user?.role)) {
            setError("You are not authorized to update complaint status.");
            return false;
        }

        try {
            setError("");

            const endpoint =
                user.role === "staff"
                    ? `${API_URL}/${id}/work`
                    : `${API_URL}/${id}/status`;

            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update complaint status."
                );
            }

            setComplaints((previousComplaints) =>
                previousComplaints.map((complaint) =>
                    complaint.id === id ? data.complaint : complaint
                )
            );

            console.log("Complaint status updated successfully!");
            return true;

        } catch (err) {
            console.error("Update Status Error:", err);
            setError(err.message);
            return false;
        }
    };

    // Assign complaint to Staff (Admin only)
    const assignComplaint = async (id, staffEmail, staffName) => {
        if (!token || user?.role !== "admin") {
            setError("Only Admin can assign staff.");
            return false;
        }

        try {
            setError("");

            const response = await fetch(`${API_URL}/${id}/assign`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    staffEmail,
                    staffName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to assign staff."
                );
            }

            setComplaints((previousComplaints) =>
                previousComplaints.map((complaint) =>
                    complaint.id === id ? data.complaint : complaint
                )
            );

            console.log("Staff assigned successfully!");
            return true;

        } catch (err) {
            console.error("Assign Staff Error:", err);
            setError(err.message);
            return false;
        }
    };

    // Save Staff work details in MongoDB
    const updateComplaintWorkDetails = async (
        id,
        progressNotes,
        resolutionRemarks,
        resolutionImageData = "",
        resolutionImageName = ""
    ) => {
        if (!token || user?.role !== "staff") {
            setError("Only Staff can update complaint work details.");
            return false;
        }

        try {
            setError("");

            const response = await fetch(`${API_URL}/${id}/work`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    progressNotes,
                    resolutionRemarks,
                    resolutionImageData,
                    resolutionImageName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to save work details."
                );
            }

            // Update frontend state after MongoDB confirms success
            setComplaints((previousComplaints) =>
                previousComplaints.map((complaint) =>
                    complaint.id === id ? data.complaint : complaint
                )
            );

            console.log("Staff work details saved successfully!");
            return true;

        } catch (err) {
            console.error("Update Work Details Error:", err);
            setError(err.message);
            return false;
        }
    };

    return (
        <ComplaintContext.Provider
            value={{
                complaints,
                loading,
                error,
                fetchMyComplaints,
                fetchAllComplaints,
                fetchAssignedComplaints,
                addComplaint,
                updateComplaintStatus,
                assignComplaint,
                updateComplaintWorkDetails,
            }}
        >
            {children}
        </ComplaintContext.Provider>
    );
}

export function useComplaints() {
    return useContext(ComplaintContext);
}
