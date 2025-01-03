// import React, { useState, useEffect } from "react";
// import { FiUser, FiEdit, FiTrash2, FiPlusCircle, FiCheckCircle, FiPlus } from "react-icons/fi";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Tooltip from '@mui/material/Tooltip';

// const AdminProfile = () => {
//     const [userDetails, setUserDetails] = useState({});
//     const [editing, setEditing] = useState(false);
//     const [additionalDetails, setAdditionalDetails] = useState([]);
//     const [successMessage, setSuccessMessage] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [blobURL, setBlobURL] = useState(null)
//     const [imageName, setImageName] = useState();

//     successMessage && toast.success("Profile updated successfully!");
//     errorMessage && toast.error(errorMessage);

//     // Fetch admin details from API
//     const fetchAdminDetails = async () => {
//         try {
//             const response = await axios.get("http://localhost:4000/api/user/admin", { withCredentials: true });
//             setUserDetails(response.data);
//             setAdditionalDetails(response.data.additionalDetails || []);
//         } catch (error) {
//             setErrorMessage("Failed to fetch admin details.");
//             console.error("Error fetching admin details:", error);
//         }
//     };
//     useEffect(() => {
//         fetchAdminDetails();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserDetails((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleProfilePictureChange = (event) => {
//         event.preventDefault();

//         const file = event.target.files[0];
//         file && setImageName(file);
//         if (!file) {
//             console.error("No file selected");
//             return;
//         }
//         const blobUrl = URL.createObjectURL(file);
//         setBlobURL(blobUrl);
//     };


//     const handleSave = async () => {
//         try {
//             const updatedData = { ...userDetails };
//             const formData = new FormData();
//             if (imageName instanceof File) {
//                 formData.append("profilePic", imageName);
//             } else {
//                 console.error("Image is not a File object");
//             }
//             formData.append("name", userDetails.name || "");
//             formData.append("address", userDetails.address || "");
//             formData.append("phone", userDetails.phone || "");

//             // for (let pair of formData.entries()) {
//             //     console.log(`${pair[0]}: ${pair[1]}`);
//             // }

//             const response = await axios.put(`http://localhost:4000/api/user/admin/update/${userDetails?._id}`, formData, { withCredentials: true });
//             setEditing(false);
//             setSuccessMessage(true);
//             setTimeout(() => setSuccessMessage(false), 5000);
//         } catch (error) {
//             setErrorMessage("Failed to save profile.");
//             console.error("Error saving profile:", error);
//         }
//     };

//     const handleAddDetail = () => {
//         setAdditionalDetails([...additionalDetails, { label: "", value: "" }]);
//     };

//     const handleDynamicChange = (index, field, value) => {
//         const updatedDetails = [...additionalDetails];
//         updatedDetails[index][field] = value;
//         setAdditionalDetails(updatedDetails);
//     };

//     const handleRemoveDetail = (index) => {
//         setAdditionalDetails(additionalDetails.filter((_, i) => i !== index));
//     };

//     return (
//         <div className="min-h-screen ">
//             <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//                 {/* Header Section */}
//                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-10 px-4">
//                     <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
//                         {blobURL ? (
//                             <img
//                                 src={blobURL}
//                                 alt="Profile"
//                                 className="object-cover w-full h-full"
//                             />
//                         ) : (
//                             <img
//                                 src={`${import.meta.env.VITE_BACKEND_URL}${userDetails?.profilePic}`}
//                                 alt="Profile"
//                                 className="object-cover w-full h-full"
//                             />
//                         )}
//                         {editing && (
//                             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
//                                 <Tooltip title="Change Profile Picture" arrow placement="top">
//                                     <label
//                                         htmlFor="upload-profile-picture"
//                                         className="text-white text-sm flex items-center"
//                                     >
//                                         <FiEdit size={24} />
//                                         <span className="ml-2">Change</span>
//                                         <input
//                                             id="upload-profile-picture"
//                                             type="file"
//                                             accept="image/*"
//                                             className="hidden"
//                                             onChange={handleProfilePictureChange}
//                                         />
//                                     </label>
//                                 </Tooltip>
//                             </div>
//                         )}
//                     </div>

//                     <h1 className="text-3xl font-bold mt-6">Admin Profile</h1>
//                     <p className="text-gray-200 mt-2">Manage your account details and preferences</p>
//                 </div>
//                 {/* Form Section */}
//                 <div className="p-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Name */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={userDetails.name || ""}
//                                 onChange={handleInputChange}
//                                 disabled={!editing}
//                                 className={`w-full px-4 py-2 border rounded-md focus:outline-none ${editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
//                                     }`}
//                             />
//                         </div>
//                         {/* Email */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
//                             <Tooltip title="This field is not editable" content="email" placement="top" arrow>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={userDetails.email || ""}
//                                     onChange={handleInputChange}
//                                     disabled={true}
//                                     className={`w-full hover:cursor-pointer px-4 py-2 border rounded-md focus:outline-none ${editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"}`}
//                                 />
//                             </Tooltip>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Phone Number
//                             </label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 value={userDetails.phone || ""}
//                                 onChange={handleInputChange}
//                                 disabled={!editing}
//                                 className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-200 ${editing
//                                     ? "focus:ring-2 focus:ring-indigo-500"
//                                     : "bg-gray-100"
//                                     }`}
//                             />
//                         </div>
//                         {/* Address */}
//                         <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Address
//                             </label>
//                             <textarea
//                                 name="address"
//                                 value={userDetails.address || ""}
//                                 onChange={handleInputChange}
//                                 disabled={!editing}
//                                 rows="3"
//                                 className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-200 ${editing
//                                     ? "focus:ring-2 focus:ring-indigo-500"
//                                     : "bg-gray-100"
//                                     }`}
//                             />
//                         </div>
//                         {/* Role */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Role
//                             </label>
//                             <input
//                                 type="text"
//                                 name="role"
//                                 value={userDetails.role || ""}
//                                 disabled
//                                 className="w-full px-4 py-2 border rounded-lg bg-gray-100 shadow-sm"
//                             />
//                         </div>
//                         {/* Additional Details */}
//                         {/* <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-600 mb-2">Additional Details</label>
//                             {additionalDetails.map((detail, index) => (
//                                 <div key={index} className="flex gap-4 mb-4">
//                                     <input
//                                         type="text"
//                                         placeholder="Label"
//                                         value={detail.label}
//                                         onChange={(e) => handleDynamicChange(index, "label", e.target.value)}
//                                         disabled={!editing}
//                                         className={`w-1/2 px-4 py-2 border rounded-md focus:outline-none ${editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
//                                             }`}
//                                     />
//                                     <input
//                                         type="text"
//                                         placeholder="Value"
//                                         value={detail.value}
//                                         onChange={(e) => handleDynamicChange(index, "value", e.target.value)}
//                                         disabled={!editing}
//                                         className={`w-1/2 px-4 py-2 border rounded-md focus:outline-none ${editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
//                                             }`}
//                                     />
//                                     {editing && (
//                                         <button
//                                             onClick={() => handleRemoveDetail(index)}
//                                             className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
//                                         >
//                                             <FiTrash2 />
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                             {editing && (
//                                 <button
//                                     onClick={handleAddDetail}
//                                     className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
//                                 >
//                                     <FiPlusCircle className="mr-2" />
//                                     Add Detail
//                                 </button>
//                             )}
//                         </div> */}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex justify-center gap-10 items-center px-6 py-4">
//                         {editing ? (
//                             <>
//                                 <button
//                                     onClick={handleSave}
//                                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
//                                 >
//                                     <FiCheckCircle className="mr-2" />
//                                     Save Changes
//                                 </button>
//                                 <button
//                                     onClick={() => setEditing(false)}
//                                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>
//                             </>
//                         ) : (
//                             <button
//                                 onClick={() => setEditing(true)}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
//                             >
//                                 <FiEdit className="mr-2" />
//                                 Edit Profile
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Error Message */}
//                 {/* {errorMessage && (
//                     <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
//                         {errorMessage}
//                     </div>
//                 )} */}
//             </div>
//         </div>
//     );
// };

// export default AdminProfile;




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
    console.log("🚀🚀 Your selected text is userDetails: ", userDetails);
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