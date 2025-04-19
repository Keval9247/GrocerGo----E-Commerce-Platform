import React, { useState, useEffect } from "react";
import { getUsers } from "../../apis/products/Productapi";
import UserList from "./users/UserList";
import UserEditForm from "./users/UserEditForm";
import UserDetailsModal from "./users/UserDetailsModal";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers();
        setUsers(res.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

      <UserList
        users={filteredUsers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEdit={handleEdit}
        onViewProducts={handleViewProducts}
      />

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserManagement;
