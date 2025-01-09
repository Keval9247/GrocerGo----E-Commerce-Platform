import React, { useState } from 'react';
import {
    Bell,
    Shield,
    CreditCard,
    Globe,
    Truck,
    Store,
    Mail,
    Phone,
    Lock,
    User,
    ChevronRight,
    Save,
    AlertCircle
} from 'lucide-react';
import { Tooltip } from '@mui/material';

const UserSettings = () => {
    const [activeTab, setActiveTab] = useState('notifications');
    const [settings, setSettings] = useState({
        notifications: {
            orderUpdates: true,
            promotions: false,
            security: true,
            newsletter: false,
        },
        privacy: {
            profileVisible: true,
            showRevenue: false,
            showInventory: true,
        },
        locale: {
            language: 'English',
            currency: 'USD',
            timezone: 'UTC-5',
        }
    });

    const handleNotificationChange = (key) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    const handlePrivacyChange = (key) => {
        setSettings(prev => ({
            ...prev,
            privacy: {
                ...prev.privacy,
                [key]: !prev.privacy[key]
            }
        }));
    };

    const TabButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === id
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            <Icon className="w-5 h-5 mr-3" />
            <span className="flex-1 text-left">{label}</span>
            <ChevronRight className="w-5 h-5" />
        </button>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            // case 'account':
            //     return (
            //         <div className="space-y-6">
            //             <h3 className="text-lg font-semibold">Account Information</h3>
            //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            //                 <div>
            //                     <label className="block text-sm font-medium text-gray-700">Store Name</label>
            //                     <input
            //                         type="text"
            //                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            //                         placeholder="Your Store Name"
            //                     />
            //                 </div>
            //                 <div>
            //                     <label className="block text-sm font-medium text-gray-700">Business Email</label>
            //                     <input
            //                         type="email"
            //                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            //                         placeholder="store@example.com"
            //                     />
            //                 </div>
            //                 <div>
            //                     <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            //                     <input
            //                         type="tel"
            //                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            //                         placeholder="+1 (555) 000-0000"
            //                     />
            //                 </div>
            //                 <div>
            //                     <label className="block text-sm font-medium text-gray-700">Business Address</label>
            //                     <input
            //                         type="text"
            //                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            //                         placeholder="123 Business St"
            //                     />
            //                 </div>
            //             </div>
            //         </div>
            //     );

            case 'notifications':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Notification Preferences</h3>
                        <div className="space-y-4">
                            {Object.entries(settings.notifications).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-gray-700 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    <button
                                        onClick={() => handleNotificationChange(key)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-indigo-600' : 'bg-gray-200'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Security Settings</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                                <p className="text-sm text-gray-600 mb-3">
                                    Add an extra layer of security to your account
                                </p>
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-gray-400 hover:cursor-not-allowed" disabled>
                                    Enable 2FA
                                </button>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">Change Password</h4>
                                <div className="space-y-3">
                                    <input
                                        type="password"
                                        placeholder="Current Password"
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'billing':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Payment Methods</h3>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-lg flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center mr-4">
                                        <CreditCard className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">•••• •••• •••• 4242</p>
                                        <p className="text-sm text-gray-500">Expires 12/30</p>
                                    </div>
                                </div>
                                <button className="text-indigo-600 hover:text-indigo-700">Edit</button>
                            </div>
                            <Tooltip title="This account is linked with test account so you can't add or edit this payment methods" placement='top'>
                                <button className="w-full p-4 border border-dashed rounded-lg text-center text-gray-600 hover:border-indigo-600 hover:text-indigo-600 hover:cursor-not-allowed">
                                    + Add New Payment Method
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                );

            case 'shipping':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Shipping Settings</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-3">Default Shipping Zones</h4>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Domestic Shipping Rate
                                    </label>
                                    <input
                                        type="number"
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-3">Shipping Methods</h4>
                                <div className="space-y-2">
                                    {['Standard Shipping', 'Express Shipping', 'Free Shipping'].map((method) => (
                                        <div key={method} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                                            />
                                            <label className="ml-2 text-gray-700">{method}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className=" bg-white m-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-50 rounded-2xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px]">
                        {/* Sidebar */}
                        <div className="p-6 border-r">
                            <h2 className="text-xl font-bold mb-6">Settings</h2>
                            <nav className="space-y-2">
                                {/* <TabButton id="account" icon={Store} label="Store Profile" /> */}
                                <TabButton id="notifications" icon={Bell} label="Notifications" />
                                <TabButton id="security" icon={Shield} label="Security" />
                                <TabButton id="billing" icon={CreditCard} label="Billing" />
                                <TabButton id="shipping" icon={Truck} label="Shipping" />
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="p-6 md:col-span-3">
                            {renderTabContent()}

                            {/* Save Button */}
                            <div className="mt-8 flex justify-end">
                                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;