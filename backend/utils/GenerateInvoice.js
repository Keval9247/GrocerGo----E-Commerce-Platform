const fs = require('fs');
const path = require('path');

const GenerateHTMLInvoice = (order, payer, purchaseUnit) => {
    // Read the HTML template file
    const templatePath = path.join(__dirname, '..', 'views', 'invoice.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with actual data
    htmlContent = htmlContent
        .replace(/{{invoiceId}}/g, order._id || 'null')
        .replace(/{{invoiceDate}}/g, new Date(order.orderDate).toLocaleDateString() || 'null')
        .replace(/{{customerName}}/g, `${payer.name?.given_name || "Default"} ${payer.name?.surname || "User"}` || 'null')
        .replace(/{{customerEmail}}/g, payer.email_address || "null")
        .replace(/{{address1}}/g, order.deliveryDetails?.address1 || "null")
        .replace(/{{address2}}/g, order.deliveryDetails?.address2 || "N/A")
        .replace(/{{city}}/g, order.deliveryDetails?.city || "null")
        .replace(/{{state}}/g, order.deliveryDetails?.state || "null")
        .replace(/{{postalCode}}/g, order.deliveryDetails?.postalCode || "null")
        .replace(/{{totalAmount}}/g, order.totalAmount?.toFixed(2) || "0.00")
        .replace(
            /{{#items}}(.*?){{\/items}}/gs,
            order.items
                ?.map(
                    (item, index) =>
                        `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name || "null"}</td>
                    <td>${item.quantity || "null"}</td>
                    <td>${item.price?.toFixed(2) || "0.00"}</td>
                    <td>${(item.quantity * item.price)?.toFixed(2) || "0.00"}</td>
                </tr>
            `
                )
                .join('') || "<tr><td colspan='5'>No items found</td></tr>"
        );

    return htmlContent;
};

module.exports = GenerateHTMLInvoice;