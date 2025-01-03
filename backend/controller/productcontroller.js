const Product = require("../models/Product");
const User = require("../models/User");

const productController = () => {
    return {
        getAllProducts: async (req, res) => {
            try {
                const products = await Product.find();
                res.status(200).json({ message: "Product Retrieved Successfully.", products: products });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        getCountData: async (req, res) => {
            try {
                const ProductData = await Product.find().select("-token -password")
                const UserCount = await User.find({ role: 'user' }).select("-token -password")
                const ProductStockCount = await ProductData?.map((product) => {
                    const data = { category: product.category, stock: product.stock }
                    return data
                })

                const filterfurniture = ProductData?.filter((product) => product.category == 'Furniture').length
                const filterelectronics = ProductData?.filter((product) => product.category == 'Electronics').length
                const filterclothing = ProductData?.filter((product) => product.category == 'Clothing').length
                const filterbooks = ProductData?.filter((product) => product.category == 'Books').length

                const data = {
                    furniture: filterfurniture,
                    electronics: filterelectronics,
                    clothing: filterclothing,
                    books: filterbooks
                }

                res.status(200).json({
                    message: "Count Retrieved Successfully.",
                    ProductCount: ProductData.length,
                    CategoryCount: data,
                    UserCount: UserCount.length,
                    ProductData: ProductStockCount
                });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        getProductById: async (req, res) => {
            try {
                const product = await Product.findById(req.params.id);
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }
                res.status(200).json({ message: "Product Retrieved Successfully.", product: product });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        createProduct: async (req, res) => {
            const { category, name, price, description, stock } = req.body
            const Productfile = req.file;
            if (!Productfile) {
                return res.status(400).json({ error: 'Product image is required' });
            }
            const product = new Product({
                category: category,
                ProductName: name,
                ProductPrice: price,
                ProductDescription: description,
                stock: stock,
                ProductImage: `/public/products/${Productfile.filename}`,
            });
            await product.save();
            res.status(201).json({ message: 'Product created successfully', product: product });
        },

        updateProduct: async (req, res) => {
            try {
                const { name, description, price, stock, category } = req.body;
                const updateData = {
                    ProductName: name,
                    ProductDescription: description,
                    ProductPrice: price,
                    stock,
                    category,
                };
                if (req.file) {
                    updateData.ProductImage = `/uploads/products/${req.file.filename}`;
                }

                const updatedProduct = await Product.findByIdAndUpdate(
                    req.params.id,
                    { $set: updateData },
                    { new: true }
                );

                if (!updatedProduct)
                    return res.status(404).json({ error: "Product not found" });

                res.status(200).json({
                    message: "Product updated successfully",
                    product: updatedProduct,
                })
            } catch (error) {
                res.status(500).json({ error: "Failed to update product" });
            }
        },

        deleteProduct: async (req, res) => {
            console.log("🚀🚀 Your selected text is req.body: ", req.body);
            try {
                const deletedProduct = await Product.findByIdAndDelete(req.body._id);
                if (!deletedProduct)
                    return res.status(404).json({ error: "Product not found" });

                res.status(200).json({
                    message: "Product deleted successfully",
                    product: deletedProduct,
                });
            } catch (error) {
                res.status(500).json({ error: "Failed to delete product" });
            }
        },
    }
}

module.exports = productController;