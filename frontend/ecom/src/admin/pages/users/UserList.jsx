import React from "react";
import { FiEdit2, FiEye, FiSearch } from "react-icons/fi";

const UserList = ({ users, searchTerm, setSearchTerm, onEdit, onViewProducts }) => {

    return (
        < div className="w-full" >
            <div className="mb-4 relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users?.map((user, index) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-800">{index + 1}.</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.role}</td>
                                <td className="px-6 py-4 text-sm space-x-2">
                                    <button
                                        onClick={() => onEdit(user)}
                                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                                    >
                                        <FiEdit2 className="inline" />
                                    </button>
                                    <button
                                        onClick={() => onViewProducts(user)}
                                        className="text-green-600 hover:text-green-800 p-1 rounded"
                                    >
                                        <FiEye className="inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default UserList;
