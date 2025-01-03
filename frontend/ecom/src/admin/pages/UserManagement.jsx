// import React, { useState } from "react";
// import { FiEdit2, FiEye, FiSearch, FiChevronLeft } from "react-icons/fi";

// const UserManagement = () => {
//   const [users] = useState([
//     { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//     { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Manager" },
//   ]);

//   const [products] = useState([
//     { id: 1, userId: 1, name: "Product A", description: "High-quality product", price: 99.99 },
//     { id: 2, userId: 1, name: "Product B", description: "Premium features", price: 149.99 },
//     { id: 3, userId: 2, name: "Product C", description: "Best seller", price: 79.99 },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editingUser, setEditingUser] = useState(null);
//   const [showProducts, setShowProducts] = useState(false);

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setShowProducts(false);
//   };

//   const handleViewProducts = (user) => {
//     setSelectedUser(user);
//     setShowProducts(true);
//     setEditingUser(null);
//   };

//   const UserList = () => (
//     <div className="w-full">
//       <div className="mb-4 relative">
//         <FiSearch className="absolute left-3 top-3 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search users..."
//           className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredUsers.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
//                 <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
//                 <td className="px-6 py-4 text-sm text-gray-800">{user.role}</td>
//                 <td className="px-6 py-4 text-sm space-x-2">
//                   <button
//                     onClick={() => handleEdit(user)}
//                     className="text-blue-600 hover:text-blue-800 p-1 rounded"
//                   >
//                     <FiEdit2 className="inline" />
//                   </button>
//                   <button
//                     onClick={() => handleViewProducts(user)}
//                     className="text-green-600 hover:text-green-800 p-1 rounded"
//                   >
//                     <FiEye className="inline" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const UserEditForm = ({ user }) => {
//     const [formData, setFormData] = useState({
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     });

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // Handle form submission logic here
//       setEditingUser(null);
//     };

//     return (
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//             <input
//               type="text"
//               required
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               required
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//             <select
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.role}
//               onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//             >
//               <option value="Admin">Admin</option>
//               <option value="User">User</option>
//               <option value="Manager">Manager</option>
//             </select>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={() => setEditingUser(null)}
//               className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   };

//   const ProductDetails = ({ userId }) => {
//     const userProducts = products.filter((product) => product.userId === userId);

//     return (
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <div className="flex items-center mb-6">
//           <button
//             onClick={() => setShowProducts(false)}
//             className="text-gray-600 hover:text-gray-800 mr-2"
//           >
//             <FiChevronLeft className="text-xl" />
//           </button>
//           <h2 className="text-2xl font-bold">Products</h2>
//         </div>
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {userProducts.map((product) => (
//             <div
//               key={product.id}
//               className="p-4 border rounded-lg hover:shadow-md transition-shadow"
//             >
//               <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//               <p className="text-gray-600 mb-2">{product.description}</p>
//               <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 pb-8">
//       <h1 className="text-3xl font-bold mb-8">User Management</h1>
//       {!editingUser && !showProducts && <UserList />}
//       {editingUser && <UserEditForm user={editingUser} />}
//       {showProducts && <ProductDetails userId={selectedUser.id} />}
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllProducts, GetUSers } from "../../apis/products/Productapi";
import UserList from "./users/UserList";
import UserEditForm from "./users/UserEditForm";
import ProductDetails from "./users/ProductDetails";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    // Fetch users and products from API
    try {
      const fetchData = async () => {
        const res = await GetUSers();
        setUsers(res.users);
        const productsRes = await getAllProducts();
        setProducts(productsRes.products);
      }
      fetchData();
    } catch (error) {
      console.log("🚀🚀 Your selected text is error: ", error);

    }
    // axios.get("/api/users").then((res) => setUsers(res.data));
    // axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowProducts(false);
  };

  const handleViewProducts = (user) => {
    setSelectedUser(user);
    setShowProducts(true);
    setEditingUser(null);
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      {!editingUser && !showProducts && (
        <UserList
          users={filteredUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onEdit={handleEdit}
          onViewProducts={handleViewProducts}
        />
      )}
      {editingUser && (
        <UserEditForm user={editingUser} onCancel={() => setEditingUser(null)} />
      )}
      {showProducts && (
        <ProductDetails
          userId={selectedUser.id}
          products={products}
          onBack={() => setShowProducts(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
