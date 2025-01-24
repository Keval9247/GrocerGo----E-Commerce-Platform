const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const PDFDocument = require("pdfkit");
const axios = require('axios');
const paypalREST = require('paypal-rest-sdk');
const generatePayPalAccessToken = require('../miidleware/paypal');
const GenerateInvoice = require('../utils/GenerateInvoice');
const GenerateHTMLInvoice = require('../utils/GenerateInvoice');
const fs = require('fs');


// const environment = new checkoutNodeJssdk.core.SandboxEnvironment(process.env.SANDBOX_CLIENT_ID, process.env.SANDBOX_SECRET);
// const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

paypalREST.configure({
    mode: 'sandbox',
    client_id: process.env.SANDBOX_CLIENT_ID,
    client_secret: process.env.SANDBOX_SECRET,
})

const paymentController = () => {
    return {
        getCheckoutSession: async (req, res) => {
            const { items } = req.body;
            try {
                const customer = await User.findById(req.params.id)
                const AllItems = items?.map((item) => ({
                    price_data: {
                        currency: 'usd',
                        unit_amount: item.price * 100, // Price in cents
                        product_data: {
                            name: item.name,
                            description: item.description,
                            // images: [`${process.env.BACKEND_URL}${item.productImage}`],
                        },
                    },
                    quantity: item.quantity,
                }))

                const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

                const order = new Order({
                    userId: customer._id,
                    items: items.map((item) => ({
                        productId: item.productId,
                        name: item.name,
                        description: item.description,
                        productImage: item.productImage,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    totalAmount,
                    paymentStatus: 'pending',
                    paymentMethod: 'stripe',
                    stripeSessionId: '', // Will be updated after creating the Stripe session
                    deliveryDetails: {},
                });

                await order.save();

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    success_url: `${process.env.FRONTEND_URL}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${process.env.FRONTEND_URL}/user/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
                    customer_email: customer.email,
                    line_items: AllItems,
                    metadata: {
                        orderId: order._id.toString(),
                    },
                });

                order.stripeSessionId = session.id;
                await order.save();

                res.status(200).json({ url: session.url });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error in craeting checkout session.' });
            }
        },

        handlePaymentSuccess: async (req, res) => {
            const { session_id } = req.query;

            try {
                // Retrieve the Stripe session
                const session = await stripe.checkout.sessions.retrieve(session_id);

                const deliveryDetails = {
                    country: session.customer_details?.address?.country || '',
                    state: session.customer_details?.address?.state || '',
                    address1: session.customer_details?.address?.line1 || '',
                    address2: session.customer_details?.address?.line2 || '',
                    city: session.customer_details?.address?.city || '',
                    pin: session.customer_details?.address?.postal_code || '',
                };

                // Find the order in the database using the session ID
                const order = await Order.findOne({ stripeSessionId: session.id });

                if (!order) {
                    return res.status(404).json({ error: 'Order not found.' });
                }

                // Update the payment status to 'completed'
                order.paymentStatus = 'completed';
                order.deliveryDetails = deliveryDetails;
                await order.save();

                await Cart.findOneAndDelete({ userId: order.userId });


                // Redirect the user to a success page
                // res.redirect(`${process.env.FRONTEND_URL}/user/payment/success`);
                res.status(200).json({ success: true, message: 'Payment successful!', orderId: order?._id });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error handling payment success.' });
            }
        },

        handlePaymentCancel: async (req, res) => {
            const { session_id } = req.query;

            try {
                const order = await Order.findOne({ stripeSessionId: session_id });

                if (!order) {
                    return res.status(404).json({ error: 'Order not found.' });
                }

                // Update the payment status to '`failed`'
                order.paymentStatus = 'failed';
                await order.save();

                // Redirect the user to a cancel page
                res.redirect(`${process.env.FRONTEND_URL}/user/payment/cancel`);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error handling payment cancellation.' });
            }
        },

        //-------------------------- PayPal Integration----------------------

        handlePayPalPayment: async (req, res) => {
            const { userId, items } = req.body;

            try {
                const totalAmount = items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );

                const order = new Order({
                    userId,
                    items: items.map((item) => ({
                        productId: item.productId,
                        name: item.name,
                        description: item.description,
                        productImage: item.productImage,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    totalAmount,
                    paymentStatus: "pending",
                    paymentMethod: "paypal",
                    paypalOrderId: "",
                    deliveryDetails: {},
                });

                await order.save();

                const accessToken = await generatePayPalAccessToken();

                const response = await axios.post(
                    `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
                    {
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: totalAmount.toFixed(2),
                                },
                            },
                        ],
                        application_context: {
                            return_url: `${process.env.FRONTEND_URL}/user/payment/success`,
                            cancel_url: `${process.env.FRONTEND_URL}/user/payment/cancel`,
                            brand_name: 'GrocerGo'
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                order.paypalOrderId = response.data.id;
                await order.save();

                res.status(201).json({ id: response.data.id, link: response.data.links?.map((link) => link.rel === 'approve').href });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error creating PayPal payment." });
            }
        },

        handlePayPalSuccess: async (req, res) => {
            const { orderId } = req.body;
            console.log("🚀🚀 Your selected text is => orderId: ", orderId);

            try {
                const accessToken = await generatePayPalAccessToken();

                const captureResponse = await axios.post(
                    `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (captureResponse.data.status === "COMPLETED") {
                    const order = await Order.findOne({ paypalOrderId: orderId });
                    if (!order) {
                        return res.status(404).json({ error: "Order not found." });
                    }

                    const purchaseUnit = captureResponse.data.purchase_units?.[0] || {};
                    console.log("🚀🚀 Your selected text is => purchaseUnit: ", purchaseUnit);
                    const payerInfo = captureResponse.data.payer || {};

                    const deliveryDetails = {
                        name: `${payerInfo.name?.given_name || "Default"} ${payerInfo.name?.surname || "User"}`,
                        email: payerInfo.email_address || "default@example.com",
                        country: purchaseUnit.shipping?.address?.country_code || "US",
                        state: purchaseUnit.shipping?.address?.admin_area_1 || "Default State",
                        city: purchaseUnit.shipping?.address?.admin_area_2 || "Default City",
                        address1: purchaseUnit.shipping?.address?.address_line_1 || "Default Address 1",
                        address2: purchaseUnit.shipping?.address?.address_line_2 || "",
                        postalCode: purchaseUnit.shipping?.address?.postal_code || "000000",
                    };

                    order.deliveryDetails = deliveryDetails;
                    order.paymentStatus = "completed";
                    await order.save();

                    const htmlContent = GenerateHTMLInvoice(order, payerInfo, purchaseUnit);

                    // Send the HTML content as a response
                    res.setHeader('Content-Type', 'text/html');
                    res.send(htmlContent);
                } else {
                    res.status(400).json({ error: "Payment not completed." });
                }
            } catch (error) {
                // Improved error logging
                console.error("PayPal success handler error:", error);

                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                    res.status(error.response.status).json({ error: error.response.data });
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received:", error.request);
                    res.status(500).json({ error: "No response received from PayPal." });
                } else {
                    // Something happened in setting up the request
                    console.error("Error setting up the request:", error.message);
                    res.status(500).json({ error: "Error setting up the request." });
                }
            }
        },

        // handlePayPalSuccess: async (req, res) => {
        //     const { orderId } = req.body;

        //     try {
        //         const accessToken = await generatePayPalAccessToken();

        //         // Capture the PayPal order
        //         const captureResponse = await axios.post(
        //             `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
        //             {},
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${accessToken}`,
        //                     'Content-Type': 'application/json',
        //                 },
        //             }
        //         );

        //         if (captureResponse.data.status === "COMPLETED") {
        //             const order = await Order.findOne({ paypalOrderId: orderId });
        //             if (!order) {
        //                 return res.status(404).json({ error: "Order not found." });
        //             }

        //             const purchaseUnit = captureResponse.data.purchase_units?.[0] || {};
        //             const payerInfo = captureResponse.data.payer || {};

        //             const invoiceData = {
        //                 detail: {
        //                     invoice_number: `INV-9247`,
        //                     reference: order._id,
        //                     currency_code: "USD",
        //                     note: "Thank you for your purchase!",
        //                 },
        //                 invoicer: {
        //                     name: {
        //                         given_name: "GrocerGo",
        //                         surname: "Inc",
        //                     },
        //                     address: {
        //                         address_line_1: "1234 Market Street",
        //                         admin_area_2: "San Francisco",
        //                         admin_area_1: "CA",
        //                         postal_code: "94103",
        //                         country_code: "US",
        //                     },
        //                     email_address: "support@grocero.com",
        //                 },
        //                 primary_recipients: [
        //                     {
        //                         billing_info: {
        //                             name: {
        //                                 given_name: payerInfo.name?.given_name || "Default",
        //                                 surname: payerInfo.name?.surname || "User",
        //                             },
        //                             email_address: payerInfo.email_address || "default@example.com",
        //                         },
        //                     },
        //                 ],
        //                 items: order.items.map((item) => ({
        //                     name: item.name,
        //                     quantity: item.quantity.toString(),
        //                     unit_amount: {
        //                         currency_code: "USD",
        //                         value: item.price.toFixed(2),
        //                     },
        //                 })),
        //                 amount: {
        //                     breakdown: {
        //                         item_total: {
        //                             currency_code: "USD",
        //                             value: order.totalAmount.toFixed(2),
        //                         },
        //                     },
        //                 },
        //             };

        //             // Create the invoice using PayPal's API
        //             const invoiceResponse = await axios.post(
        //                 `${process.env.PAYPAL_BASE_URL}/v2/invoicing/invoices`,
        //                 invoiceData,
        //                 {
        //                     headers: {
        //                         Authorization: `Bearer ${accessToken}`,
        //                         'Content-Type': 'application/json',
        //                     },
        //                 }
        //             );

        //             // Send the invoice to the customer
        //             const invoiceId = invoiceResponse.data.id;
        //             await axios.post(
        //                 `${process.env.PAYPAL_BASE_URL}/v2/invoicing/invoices/${invoiceId}/send`,
        //                 {},
        //                 {
        //                     headers: {
        //                         Authorization: `Bearer ${accessToken}`,
        //                         'Content-Type': 'application/json',
        //                     },
        //                 }
        //             );

        //             // Update the order with invoice details
        //             order.paymentStatus = "completed";
        //             order.invoiceId = invoiceId;
        //             await order.save();

        //             res.status(200).json({ success: true, message: "Invoice sent successfully!", invoiceId });
        //         } else {
        //             res.status(400).json({ error: "Payment not completed." });
        //         }
        //     } catch (error) {
        //         console.error("PayPal success handler error:", error.response?.data);
        //         res.status(500).json({ error: "Error handling PayPal success." });
        //     }
        // },


        downloadInvoice: async (req, res) => {
            const { orderId, payer, purchase_units } = req.body;

            try {
                const invoiceDoc = GenerateInvoice(orderId, payer, purchase_units);

                // Set response headers for PDF download
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", `attachment; filename=Invoice_${orderId}.pdf`);

                // Stream the PDF to the response
                invoiceDoc.pipe(res);
                invoiceDoc.end();
            } catch (error) {
                console.error("Error generating invoice:", error);
                res.status(500).json({ error: "Failed to generate invoice." });
            }
        },
    }
}

// const generateInvoice = (order, payer, purchaseUnit) => {
//     const doc = new PDFDocument({ margin: 50 });

//     doc.fontSize(20).text("Invoice", { align: "center" });
//     doc.moveDown();

//     doc.fontSize(12).text(`Invoice ID: ${order._id}`, { align: "left" });
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "left" });

//     doc.moveDown();
//     doc.text(`Customer Name: ${payer.name?.given_name || "Default"} ${payer.name?.surname || "User"}`);
//     doc.text(`Customer Email: ${payer.email_address || "default@example.com"}`);

//     doc.moveDown();
//     doc.text("Shipping Details:");
//     doc.text(`Address 1: ${purchaseUnit.shipping?.address?.address_line_1 || "Default Address 1"}`);
//     doc.text(`Address 2: ${purchaseUnit.shipping?.address?.address_line_2 || ""}`);
//     doc.text(`City: ${purchaseUnit.shipping?.address?.admin_area_2 || "Default City"}`);
//     doc.text(`State: ${purchaseUnit.shipping?.address?.admin_area_1 || "Default State"}`);
//     doc.text(`Postal Code: ${purchaseUnit.shipping?.address?.postal_code || "000000"}`);

//     doc.moveDown();
//     doc.text("Order Details:");
//     order.items.forEach((item, index) => {
//         doc.text(`${index + 1}. ${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`);
//     });

//     doc.moveDown();
//     doc.fontSize(14).text(`Total Amount: $${order.totalAmount.toFixed(2)}`, { align: "right" });

//     const buffers = [];
//     doc.on('data', buffers.push.bind(buffers));
//     doc.on('end', () => { });

//     doc.end();

//     return new Promise((resolve, reject) => {
//         doc.on('end', () => {
//             resolve(Buffer.concat(buffers));
//         });
//         doc.on('error', reject);
//     });
// };

module.exports = paymentController;