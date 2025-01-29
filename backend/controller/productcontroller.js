const { default: Favourite } = require("../models/Favourite");
const Product = require("../models/Product");
const Rating = require("../models/Rating");
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
                    const data = { category: product.category, product: product.ProductName, stock: product.stock }
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
            const { category, name, price, description, stock, rating } = req.body
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
                rating,
                ProductImage: `/public/products/${Productfile.filename}`,
            });
            await product.save();
            res.status(201).json({ message: 'Product created successfully', product: product });
        },

        findProductByCategory: async (req, res) => {
            try {
                const { category } = req.body;
                if (!category) {
                    return res.status(400).json({ error: "Category is required" });
                }

                const products = await Product.find({ category });
                if (products.length === 0) {
                    return res.status(404).json({ error: 'No products found for this category' });
                }

                res.status(200).json({ message: "Products Retrieved Successfully.", products });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
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
                    updateData.ProductImage = `/public/products/${req.file.filename}`;
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

        createRatingAndReview: async (req, res) => {
            try {
                const { rating, review } = req.body;

                const newReview = new Rating({
                    productId: req.params.productId,
                    userId: req.params.userId,
                    rating,
                    comment: review,
                });

                await newReview.save();
                res.status(201).json({ message: 'Review and rating added successfully', data: newReview });
            } catch (err) {
                res.status(400).json({ message: 'Error adding review', error: err });
            }
        },

        getProductRatings: async (req, res) => {
            try {
                const productRatings = await Rating.find({ productId: req.params.productId });
                if (!productRatings) {
                    return res.status(404).json({ message: 'No ratings found for this product' });
                }
                else {
                    const mappedRatingsWithUserDetails = await Promise.all(
                        productRatings.map(async (rating) => {
                            const user = await User.findById(rating.userId).select('-token -password')
                            const userObj = {
                                email: user.email,
                                name: user.name,
                                profileImage: user.profileImage
                            }
                            return { ...rating.toObject(), user: userObj };
                        })
                    );
                    res.status(200).json({
                        message: 'Ratings retrieved successfully',
                        data: mappedRatingsWithUserDetails
                    });
                }
            } catch (err) {
                res.status(500).json({ message: 'Error retrieving ratings', error: err });
            }
        },

        addToFavourite: async (req, res) => {
            try {
                const { productId } = req.params;
                const userId = req?.user?.id;
                console.log("🚀🚀 Your selected text is => req.user: ", req.user);

                if (!productId) {
                    return res.status(400).json({ error: "Product ID is required" });
                }

                const existingFavourite = await Favourite.findOne({ userId, productId });
                if (existingFavourite) {
                    return res.status(400).json({ error: "Product already in favourites" });
                }

                const favourite = await Favourite.create({ userId, productId });

                // Populate the product details before sending response
                const populatedFavourite = await Favourite.findById(favourite._id)
                    .populate("productId")
                    .populate("userId", "name email"); // Populate user with selected fields
                console.log("🚀🚀 Your selected text is => populatedFavourite: ", populatedFavourite);

                res.status(200).json({
                    message: "Product added to favourites successfully",
                    favourite: populatedFavourite,
                });
            } catch (error) {
                console.error("Error adding product to favourites:", error);
                res.status(500).json({ error: error.message });
            }
        },

        removeFromFavourite: async (req, res) => {
            try {
                const { productId } = req.body;
                const userId = req.user.id;

                if (!productId) {
                    return res.status(400).json({ error: 'Product ID is required' });
                }

                const user = await User.findByIdAndUpdate(
                    userId,
                    { $pull: { favouriteProducts: productId } },
                    { new: true }
                );

                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                res.status(200).json({ message: 'Product removed from favourites successfully', user });
            } catch (error) {
                console.error('Error removing product from favourites:', error);
                res.status(500).json({ error: error.message });
            }
        },

        getFavourites: async (req, res) => {
            try {
                const userId = req.user.id;

                const user = await User.findById(userId)
                    .select('-token -password')
                    .populate('favouriteProducts', 'id ProductName ProductImage')
                    .exec();

                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                res.status(200).json({ message: 'Favourites retrieved successfully', user });
            } catch (error) {
                console.error('Error retrieving favourites:', error);
                res.status(500).json({ error: error.message });
            }
        },
    }
}

module.exports = productController;