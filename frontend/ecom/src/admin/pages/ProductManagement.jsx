import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiEdit, FiEye } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { getAllProducts } from "../../apis/products/Productapi";
import AddProduct from "./products/AddProduct";
import { Tooltip } from "@mui/material";
import ViewProduct from "./products/ViewProduct";
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/Loading";
import DeleteProductModal from "./products/DeleteProduct";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const response = await getAllProducts();
        setProducts(response?.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };
    fetchProducts();
  }, [deleteModal]);

  const productsPerPage = 50;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = products?.filter((product) =>
    product?.ProductName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log("🚀🚀 Your selected text is => currentProducts: ", currentProducts);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddProducts = () => {
    setShowAddForm(!showAddForm);
    navigate("/admin/products/create-product");
  };

  const handleDeleteProduct = () => {
    setDeleteModal(true);
  };

  return (
    <div className="container mx-auto pb-5">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Products Management
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={handleAddProducts}
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && <AddProduct />}

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 pl-10 border rounded-lg focus:ring-blue-500 focus:outline-none focus:ring-2"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
        <Loading />
      ) : currentProducts?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No products found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-200 border-b border-gray-300">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-center">
                  Id
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-center">
                  Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-center">
                  Product Image
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-center">
                  Price
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-center flex flex-col">
                  Stock{" "}
                  <span className="text-xs font-normal normal-case">
                    (Please hover to view availbale products.)
                  </span>
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-center">
                  Category
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 border-b">
              {currentProducts?.map((product, index) => (
                <tr
                  key={product._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-gray-200`}
                >
                  <td className="px-6 py-4 text-center">{index + 1}.</td>
                  <td className="px-6 py-4 text-center">
                    {product.ProductName}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${product.ProductImage}`}
                        alt={product.ProductName}
                        className="rounded-full hover:scale-110 transition-transform duration-300 w-16 h-16 shadow-md"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    ₹{product.ProductPrice}
                  </td>
                  <td className="px-6 py-4 text-center ">
                    {product?.stock > 0 ? (
                      product.stock < 5 ? (
                        <Tooltip
                          title={`Only ${product.stock} left in stock!`}
                          placement="top"
                        >
                          <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                            Low Stock{" "}
                            <span className="text-xs text-gray-600 items-baseline">
                              ({product.stock})
                            </span>
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title={`${product.stock} available`}
                          placement="top"
                        >
                          <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            In Stock
                          </span>
                        </Tooltip>
                      )
                    ) : (
                      <Tooltip title="Out of stock" placement="top">
                        <span className="px-2 py-1 rounded-full text-sm bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      </Tooltip>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select className="bg-white px-4 py-1 rounded-lg  hover:cursor-pointer focus:outline-none">
                      <option
                        className="select-none"
                        value={`${product.category}`}
                      >
                        {product.category}
                      </option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="text-indigo-600 hover:text-indigo-800 px-2"
                      onClick={() => setOpenModal(product)}
                    >
                      <FiEye size={20} />
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800 px-2"
                      onClick={() =>
                        navigate(`/admin/products/edit-product/${product._id}`)
                      }
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 px-2"
                      onClick={() => setDeleteModal(product)}
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteModal && (
        <DeleteProductModal
          product={deleteModal}
          onClose={() => setDeleteModal(null)}
          onDelete={handleDeleteProduct}
        />
      )}

      {openModal && (
        <ViewProduct product={openModal} onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
};

export default ProductsPage;
