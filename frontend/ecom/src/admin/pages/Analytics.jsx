import React, { useEffect, useState } from 'react';

const Analytics = () => {
    const [visitors, setVisitors] = useState(0);
    const [pageViews, setPageViews] = useState(0);
    const [bounceRate, setBounceRate] = useState(0);
    const [sessionDuration, setSessionDuration] = useState(0);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            setVisitors(1250);
            setPageViews(5432);
            setBounceRate(45.3);
            setSessionDuration(3.5);
            setTopProducts([
                { name: 'Product A', sales: 120 },
                { name: 'Product B', sales: 95 },
                { name: 'Product C', sales: 80 },
            ]);
        };

        fetchAnalyticsData();
    }, []);

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
            <p className="text-lg text-gray-600 mb-8">
                Get detailed insights and reports about your e-commerce performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Visitors</h3>
                    <p className="text-4xl font-bold text-purple-600">{visitors}</p>
                    <p className="text-sm text-gray-500">Last 30 days</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Page Views</h3>
                    <p className="text-4xl font-bold text-purple-600">{pageViews}</p>
                    <p className="text-sm text-gray-500">Last 30 days</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Bounce Rate</h3>
                    <p className="text-4xl font-bold text-purple-600">{bounceRate}%</p>
                    <p className="text-sm text-gray-500">Last 30 days</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Avg. Session Duration</h3>
                    <p className="text-4xl font-bold text-purple-600">{sessionDuration}m</p>
                    <p className="text-sm text-gray-500">Last 30 days</p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Performing Products</h3>
                <div className="space-y-4">
                    {topProducts.map((product, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                            <p className="text-lg font-semibold text-gray-900">{product.name}</p>
                            <p className="text-lg text-purple-600">{product.sales} Sales</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <button
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    onClick={() => {
                        alert('Redirecting to detailed analytics...');
                    }}
                >
                    View Detailed Reports
                </button>
            </div>
        </div>
    );
};

export default Analytics;