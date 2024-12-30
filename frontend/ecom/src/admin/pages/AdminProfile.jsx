import React, { useState, useEffect } from "react";
import { FiUser, FiEdit, FiTrash2, FiPlusCircle, FiCheckCircle, FiPlus } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const AdminProfile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [editing, setEditing] = useState(false);
    const [additionalDetails, setAdditionalDetails] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    successMessage && toast.success("Profile updated successfully!");
    errorMessage && toast.error(errorMessage);

    // Fetch admin details from API
    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/user/admin", { withCredentials: true });
                setUserDetails(response.data);
                setAdditionalDetails(response.data.additionalDetails || []);
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

    const handleSave = async () => {
        try {
            const updatedData = { ...userDetails, additionalDetails };
            await axios.put("http://localhost:4000/api/user/admin", updatedData, { withCredentials: true });
            setEditing(false);
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 5000);
        } catch (error) {
            setErrorMessage("Failed to save profile.");
            console.error("Error saving profile:", error);
        }
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
                    <div className="relative w-24 h-24 mx-auto bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
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
                            <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={userDetails.name || ""}
                                onChange={handleInputChange}
                                disabled={!editing}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
                                    }`}
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email || ""}
                                onChange={handleInputChange}
                                disabled={!editing}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={userDetails.phone || ""}
                                onChange={handleInputChange}
                                disabled={!editing}
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-200 ${editing
                                    ? "focus:ring-2 focus:ring-indigo-500"
                                    : "bg-gray-100"
                                    }`}
                            />
                        </div>
                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={userDetails.address || ""}
                                onChange={handleInputChange}
                                disabled={!editing}
                                rows="3"
                                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-200 ${editing
                                    ? "focus:ring-2 focus:ring-indigo-500"
                                    : "bg-gray-100"
                                    }`}
                            />
                        </div>
                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <input
                                type="text"
                                name="role"
                                value={userDetails.role || ""}
                                disabled
                                className="w-full px-4 py-2 border rounded-lg bg-gray-100 shadow-sm"
                            />
                        </div>
                        {/* Additional Details */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Additional Details</label>
                            {additionalDetails.map((detail, index) => (
                                <div key={index} className="flex gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        value={detail.label}
                                        onChange={(e) => handleDynamicChange(index, "label", e.target.value)}
                                        disabled={!editing}
                                        className={`w-1/2 px-4 py-2 border rounded-md focus:outline-none ${editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
                                            }`}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={detail.value}
                                        onChange={(e) => handleDynamicChange(index, "value", e.target.value)}
                                        disabled={!editing}
                                        className={`w-1/2 px-4 py-2 border rounded-md focus:outline-none ${editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
                                            }`}
                                    />
                                    {editing && (
                                        <button
                                            onClick={() => handleRemoveDetail(index)}
                                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {editing && (
                                <button
                                    onClick={handleAddDetail}
                                    className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
                                >
                                    <FiPlusCircle className="mr-2" />
                                    Add Detail
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-10 items-center px-6 py-4">
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

                {/* Error Message */}
                {/* {errorMessage && (
                    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
                        {errorMessage}
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default AdminProfile;
