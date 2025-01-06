import React from "react";

const UserDetailsModal = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 transform transition-all scale-100 hover:scale-105 duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">User Details</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center justify-center mb-6 flex-col gap-3">
                    <img
                        src={user?.profilePic ? `${import.meta.env.VITE_BACKEND_URL}${user?.profilePic}` : '/images/userBlueShadow.jpeg'}
                        alt="Profile Image"
                        className="w-24 h-24 object-cover rounded-full border-4 border-blue-300 shadow-xl"
                    />
                    {user?.isVerified && (
                        <>
                            <span className=" bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg flex gap-2 items-center">
                                <svg width="15" height="15" viewBox="0 0 512 488" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M154.5 37.3997L132.6 74.6997L91.2 83.7997C68.4 88.7997 49.5 93.1997 49.2 93.4997C48.8 93.8997 54.7 164.2 56.3 178.1C56.4 178.9 43.8 194 28.2 211.5C12.7 229.1 0 243.7 0 244C0 244.3 12.8 259.2 28.5 277C53.1 304.9 57 309.7 56.6 311.9C55.5 317.6 48.6 394 49.1 394.5C49.5 394.8 68.5 399.2 91.4 404.4C114.3 409.5 133.2 413.9 133.4 414.1C133.5 414.3 143.3 430.9 155 451C166.7 471.1 176.4 487.6 176.5 487.7C176.6 487.9 194.4 480.3 216.1 470.9C240.7 460.3 256.2 454.1 257.5 454.4C258.6 454.7 276.6 462.4 297.4 471.5C318.3 480.6 335.4 487.9 335.5 487.8C335.6 487.6 345.5 470.8 357.6 450.4L379.4 413.3L420.8 404.2C443.6 399.2 462.5 394.8 462.8 394.5C463.2 394.1 457.3 323.8 455.7 309.9C455.6 309.1 468.2 294 483.8 276.5C499.3 258.9 512 244.3 512 244C512 243.7 499.2 228.8 483.5 211C458.9 183.1 455 178.3 455.4 176.1C456.5 170.4 463.4 93.9997 462.9 93.4997C462.5 93.1997 443.5 88.7997 420.6 83.5997C397.7 78.4997 378.8 74.0997 378.6 73.8997C378.5 73.6997 368.7 57.0997 357 36.9997C345.3 16.8997 335.6 0.399749 335.5 0.299749C335.4 0.0997486 317.7 7.69975 296.1 16.9997C274.4 26.3997 256.3 33.9997 255.7 33.9997C255.2 33.9997 237.6 26.4997 216.6 17.3997C195.6 8.29975 178.1 0.599749 177.5 0.399749C177 0.199749 166.6 16.8997 154.5 37.3997ZM343.3 158.8C359 165.7 366.8 184.7 359.7 198.5C357.6 202.7 266.8 312.2 256.7 322.8C254.9 324.7 251.3 327.4 248.5 328.8C244.3 331 242.2 331.4 235.5 331.4C224.7 331.4 220.5 329.1 205.4 314.9C198.9 308.7 186.8 297.6 178.5 290.2C155.3 269.4 154.8 268.9 152.1 263C143.2 243.5 159.9 219.8 181.5 221.2C189.9 221.7 194.9 224.5 206.5 235.1C212 240.1 220.4 247.8 225.2 252.2L233.8 260.1L272.4 212.6C293.7 186.5 312.7 163.7 314.8 162C322.2 155.9 333.7 154.6 343.3 158.8Z" fill="#ffffff" />
                                </svg>
                                Verified
                            </span>
                        </>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-lg font-medium text-gray-700">
                        <span>Name:</span>
                        <span>{user?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-medium text-gray-700">
                        <span>Email:</span>
                        <span>{user?.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-medium text-gray-700">
                        <span>Phone:</span>
                        <span>{user?.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-medium text-gray-700">
                        <span>Role:</span>
                        <span className="font-bold">{user?.role || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-medium text-gray-700">
                        <span>Gender:</span>
                        <span>{user?.gender || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-medium text-gray-700">
                        <span>Address:</span>
                        <span>{user?.address || 'N/A'}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        className="w-full py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;


