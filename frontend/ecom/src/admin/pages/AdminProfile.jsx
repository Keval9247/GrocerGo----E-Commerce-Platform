import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiClock, FiUser, FiMail, FiShield, FiToggleRight } from "react-icons/fi";

const AdminProfile = () => {
    const [profileData, setProfileData] = useState({
        fullName: "John Anderson",
        email: "john.anderson@admin.com",
        role: "System Administrator",
        password: "",
        notifications: true,
        accountStatus: true
    });

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [userDetails, setUserDetails] = useState({});
    console.log("🚀🚀 Your selected text is => userDetails: ", userDetails);
    const [errorMessage, setErrorMessage] = useState("");



    const activityLog = [
        { id: 1, action: "System Login", timestamp: "2024-01-10 09:30 AM" },
        { id: 2, action: "Updated Product Inventory", timestamp: "2024-01-10 10:15 AM" },
        { id: 3, action: "Modified User Permissions", timestamp: "2024-01-10 11:45 AM" },
        { id: 4, action: "Generated Sales Report", timestamp: "2024-01-10 02:30 PM" }
    ];

    const fetchAdminDetails = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/admin", { withCredentials: true });
            setUserDetails(response.data);
        } catch (error) {
            setErrorMessage("Failed to fetch admin details.");
            console.error("Error fetching admin details:", error);
        }
    };
    useEffect(() => {
        fetchAdminDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                {/* <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Profile</h1> */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Overview */}
                    <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-center mb-6">
                            <div className="relative">
                                {userDetails.profilePic ? (
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_URL}${userDetails.profilePic}`}
                                        alt="Admin Profile"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="Admin Profile"
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                )}
                                {/* <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="Admin Profile"
                                    className="w-32 h-32 rounded-full object-cover"
                                    }}                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

                                /> */}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <FiUser className="text-gray-700" />
                                <span className="text-gray-900 font-bold">{userDetails.name}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FiMail className="text-gray-700" />
                                <span className="text-gray-900 font-bold">{userDetails.email}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FiShield className="text-gray-700" />
                                <span className="text-gray-900 font-bold">
                                    {userDetails?.role?.charAt(0).toUpperCase() + userDetails?.role?.slice(1)}
                                    <span className="text-sm font-normal text-gray-700"> ( System Administrator )</span>
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Profile Settings */}
                    <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={profileData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="notifications"
                                    name="notifications"
                                    checked={profileData.notifications}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    disabled={!isEditing}
                                />
                                <label htmlFor="notifications" className="text-sm text-gray-700">
                                    Enable Email Notifications
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                    <input
                                        type="checkbox"
                                        id="accountStatus"
                                        name="accountStatus"
                                        checked={profileData.accountStatus}
                                        onChange={handleInputChange}
                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        disabled={!isEditing}
                                    />
                                    <label
                                        htmlFor="accountStatus"
                                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                    ></label>
                                </div>
                                <span className="text-sm text-gray-700">Account Status (Active)</span>
                            </div>

                            {message.text && (
                                <div
                                    className={`p-4 rounded-md ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <div className="flex space-x-4">
                                {!isEditing ? (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Activity Log */}
                    <div className="col-span-1 md:col-span-3 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Activity Log</h2>
                        <div className="space-y-4">
                            {activityLog.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
                                >
                                    <div className="flex items-center space-x-3">
                                        <FiClock className="text-gray-500" />
                                        <span className="text-gray-700">{activity.action}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{activity.timestamp}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;