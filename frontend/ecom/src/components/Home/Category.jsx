import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: "Electronics",
            image: "/images/elctronicCategory.jpeg",
            description: "Discover the latest gadgets and electronics.",
            itemsAvailable: 320,
            topBrands: ["Apple", "Samsung", "Sony"],
            featuredDeals: "Up to 50% off on top brands",
        },
        {
            id: 2,
            name: "Fashion",
            image: "/images/fashionCategory.png",
            description: "Stay trendy with the newest styles.",
            itemsAvailable: 540,
            topBrands: ["Nike", "Adidas", "Zara"],
            featuredDeals: "Flat 40% off on winter collection",
        },
        {
            id: 3,
            name: "Home & Kitchen",
            image: "/images/home-kitchenCategory.png",
            description: "Everything you need for your home and kitchen.",
            itemsAvailable: 420,
            topBrands: ["IKEA", "Hamilton Beach", "Instant Pot"],
            featuredDeals: "Buy 1 Get 1 Free on select cookware",
        },
        {
            id: 4,
            name: "Books",
            image: "/images/booksCategory.png",
            description: "Explore books across a variety of genres.",
            itemsAvailable: 760,
            topBrands: ["Penguin", "HarperCollins", "Oxford"],
            featuredDeals: "Buy 2 Get 1 Free on bestsellers",
        },
        {
            id: 5,
            name: "Sports",
            image: "/images/sportsCategory.png",
            description: "Gear up for your favorite sports activities.",
            itemsAvailable: 280,
            topBrands: ["Puma", "Wilson", "Spalding"],
            featuredDeals: "Up to 30% off on sports equipment",
        },
        {
            id: 6,
            name: "Toys",
            image: "/images/toysCategory.png",
            description: "Fun and educational toys for kids of all ages.",
            itemsAvailable: 350,
            topBrands: ["LEGO", "Mattel", "Hasbro"],
            featuredDeals: "Save 25% on select LEGO sets",
        },
    ];

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Explore Categories</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
                {categories.map((category) => (
                    <Link
                        to={`/user/products?category=${category.name}`}
                        key={category.id}
                        className="group block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                                {category.name}
                            </h2>
                            <p className="text-sm text-gray-500">{category.description}</p>
                            <div className="mt-4 text-sm text-gray-700">
                                <p>
                                    <strong>Items Available:</strong> {category.itemsAvailable}
                                </p>
                                <p>
                                    <strong>Top Brands:</strong> {category.topBrands.join(", ")}
                                </p>
                                <p className="text-green-600 font-medium mt-2">
                                    {category.featuredDeals}
                                </p>
                            </div>
                            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Shop {category.name}
                            </button>
                        </div>
                    </Link>
                ))}
            </div>

            <section>
                <h2 className="text-2xl font-bold text-center mb-6">Trending Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="border rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="h-16 w-16 mb-4 object-cover rounded-full"
                            />
                            <h3 className="text-sm font-semibold text-center">
                                {category.name}
                            </h3>
                            <p className="text-xs text-gray-500 text-center">
                                {category.itemsAvailable} Items
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Categories;
