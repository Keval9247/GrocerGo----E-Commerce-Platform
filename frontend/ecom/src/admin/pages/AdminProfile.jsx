import React, { useState, useEffect } from "react";
import { FiUser, FiEdit, FiTrash2, FiPlusCircle, FiCheckCircle } from "react-icons/fi";
import axios from "axios";

const AdminProfile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [editing, setEditing] = useState(false);
    const [additionalDetails, setAdditionalDetails] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch admin details from API
    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/user/admin", { withCredentials: true });
                console.log("🚀🚀 Your selected text is response: ", response);
                setUserDetails(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch admin details.");
                console.error("Error fetching admin details:", error);
            }
        };

        fetchAdminDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Here you can call an API to save the updated details
        setEditing(false);
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 5000);
    };

    const handleAddDetail = () => {
        setAdditionalDetails([...additionalDetails, { label: "", value: "" }]);
    };

    const handleDynamicChange = (index, field, value) => {
        const updatedDetails = [...additionalDetails];
        updatedDetails[index][field] = value;
        setAdditionalDetails(updatedDetails);
    };

    const handleRemoveDetail = (index) => {
        setAdditionalDetails(additionalDetails.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-8">
                    <div className="w-24 h-24 mx-auto bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                        <FiUser size={50} />
                    </div>
                    <h1 className="text-3xl font-bold mt-4">Admin Profile</h1>
                    <p className="text-gray-200">Manage your account details and preferences</p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={userDetails.name || ""}
                                onChange={handleInputChange}
                                disabled={!editing}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${editing
                                    ? "focus:ring-2 focus:ring-blue-500"
                                    : "bg-gray-100"
                                    }`}
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email || ""}
                                onChange={handleInputChange}
                                disabled={!editing}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${editing
                                    ? "focus:ring-2 focus:ring-blue-500"
                                    : "bg-gray-100"
                                    }`}
                            />
                        </div>
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={userDetails.phone || ""}
                                onChange={handleInputChange}
                                disabled={!editing}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${editing
                                    ? "focus:ring-2 focus:ring-blue-500"
                                    : "bg-gray-100"
                                    }`}
                            />
                        </div>
                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={userDetails.address || ""}
                                onChange={handleInputChange}
                                disabled={!editing}
                                rows="3"
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${editing
                                    ? "focus:ring-2 focus:ring-blue-500"
                                    : "bg-gray-100"
                                    }`}
                            />
                        </div>
                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Role
                            </label>
                            <input
                                type="text"
                                name="role"
                                value={userDetails.role || ""}
                                disabled
                                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center bg-gray-100 px-6 py-4">
                        {editing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                                >
                                    <FiCheckCircle className="mr-2" />
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditing(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                            >
                                <FiEdit className="mr-2" />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
                        Profile updated successfully!
                    </div>
                )}
                {/* Error Message */}
                {errorMessage && (
                    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
