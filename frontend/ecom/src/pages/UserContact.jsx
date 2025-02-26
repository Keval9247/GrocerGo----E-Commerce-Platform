import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from 'axios';
import { toast } from 'react-toastify';


const ContactPage = () => {
    const containerStyle = {
        width: "100%",
        height: "100%",
    };

    const center = { lat: 21.1888, lng: 72.8293 };
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe/contact`, formData)
            toast.success(response?.data);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error("Something did wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        // {
        //     icon: Phone,
        //     title: 'Phone',
        //     details: ['+1 (555) 123-4567', '+1 (555) 765-4321'],
        //     description: 'Mon-Fri from 8am to 5pm'
        // },
        {
            icon: Mail,
            title: 'Email',
            details: ['olixlab.38@gmail.com'],
            description: 'Online support 24/7'
        },
        {
            icon: MapPin,
            title: 'Office',
            details: ['City Heart Business Hub, Surat', 'Gujarat, IN 394107'],
            description: 'Come visit us'
        },
        {
            icon: Clock,
            title: 'Working Hours',
            details: ['Monday - Friday: 8am - 5pm', 'Saturday: 9am - 1pm'],
            description: 'Sunday: Closed'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                <info.icon className="w-6 h-6 text-indigo-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                                            {info.details.map((detail, idx) => (
                                                <p key={idx} className="text-gray-600">{detail}</p>
                                            ))}
                                            <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    {[
                                        { Icon: Facebook, color: 'text-blue-600' },
                                        { Icon: Twitter, color: 'text-blue-400' },
                                        { Icon: Instagram, color: 'text-pink-500' },
                                        { Icon: Linkedin, color: 'text-blue-700' }
                                    ].map(({ Icon, color }, index) => (
                                        <button
                                            key={index}
                                            className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-indigo-100 transition-colors"
                                        >
                                            <Icon className={`w-5 h-5 ${color} hover:text-indigo-600`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                        }`}
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="bg-white rounded-2xl shadow-lg p-4">
                        <div className="w-full h-96 rounded-lg bg-gray-200 flex items-center justify-center">
                            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
                                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                                    <Marker position={center} />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;