import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetials } from '../apis/Authapi';
import {
    Camera, MapPin, Phone, Mail, Calendar, Edit2, Trash2,
    Briefcase, Award, Globe, Book, Heart, Star,
    Settings, Clock, Activity
} from 'lucide-react';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        try {
            const fetchProfileData = async () => {
                const response = await getUserDetials(id);
                await setUser(response?.user);
            };
            fetchProfileData();
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }, []);

    // Sample data for the new sections
    const achievements = [
        { id: 1, icon: Star, title: 'Top Buyer 2023', description: 'Placed over 100 orders' },
        { id: 2, icon: Award, title: 'Early Adopter', description: 'Member since platform launch' },
        { id: 3, icon: Heart, title: 'Trusted Reviewer', description: '50+ helpful reviews' }
    ];

    const recentActivity = [
        { id: 1, type: 'order', date: '2024-01-05', description: 'Placed order #12345' },
        { id: 2, type: 'review', date: '2024-01-03', description: 'Reviewed iPhone 13 Pro' },
        { id: 3, type: 'wishlist', date: '2024-01-01', description: 'Added 3 items to wishlist' }
    ];

    const stats = [
        { id: 1, label: 'Orders', value: '47' },
        { id: 2, label: 'Reviews', value: '23' },
        { id: 3, label: 'Wishlist', value: '12' },
        { id: 4, label: 'Points', value: '2,456' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 scrollbar-hidden overflow-auto">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Profile */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Cover Photo */}
                            <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="flex items-center space-x-2">
                                        <Globe className="w-4 h-4" />
                                        <span className="text-sm">Public Profile</span>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Section */}
                            <div className="relative px-6 pb-6">
                                {/* Profile Picture */}
                                <div className="relative -mt-24 mb-6">
                                    <div className="w-40 h-40 mx-auto relative">
                                        <img
                                            src={`${user?.profilePic ? `/images/usernull.png` : '/images/usernull.png'}`}
                                            alt="Profile"
                                            className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
                                        />
                                        <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                                            <Camera className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
                                        {user?.name || 'Loading...'}
                                    </h1>
                                    <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
                                        <Mail className="w-4 h-4" />
                                        <span>{user?.email || 'No email provided'}</span>
                                    </div>
                                    <div className="flex justify-center space-x-4">
                                        <span className="text-sm text-gray-500">
                                            <Briefcase className="w-4 h-4 inline mr-1" />
                                            Premium Member
                                        </span>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-4 gap-4 mb-8">
                                    {stats.map(stat => (
                                        <div key={stat.id} className="text-center p-4 bg-gray-50 rounded-xl">
                                            <div className="text-xl font-bold text-indigo-600">{stat.value}</div>
                                            <div className="text-sm text-gray-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                        <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Address</p>
                                            <p className="font-medium text-gray-900">{user?.address || 'Not provided'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                        <Phone className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium text-gray-900">{user?.phone || 'Not provided'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                        <Book className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Bio</p>
                                            <p className="font-medium text-gray-900">{user?.bio || 'No bio added yet'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                        <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Member Since</p>
                                            <p className="font-medium text-gray-900">
                                                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <button className="flex-1 flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200">
                                        <Edit2 className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </button>
                                    <button className="flex-1 flex items-center justify-center px-6 py-3 bg-white text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors duration-200" onClick={() => navigate('/user/settings')}>
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Additional Info */}
                    <div className="space-y-8">
                        {/* Achievements Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center">
                                <Award className="w-5 h-5 mr-2 text-indigo-600" />
                                Achievements
                            </h2>
                            <div className="space-y-4">
                                {achievements.map(achievement => (
                                    <div key={achievement.id} className="flex items-start p-4 bg-gray-50 rounded-xl">
                                        <achievement.icon className="w-8 h-8 text-indigo-600 mr-4" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                                            <p className="text-sm text-gray-500">{achievement.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center">
                                <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                                Recent Activity
                            </h2>
                            <div className="space-y-4">
                                {recentActivity.map(activity => (
                                    <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-xl">
                                        <Clock className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="font-medium text-gray-900">{activity.description}</p>
                                            <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;