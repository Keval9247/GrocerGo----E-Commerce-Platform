const fs = require('fs');
const path = require('path');

const GenerateHTMLInvoice = (order, payer, purchaseUnit) => {
    console.log("🚀🚀 Your selected text is => order: ", order);
    // Read the HTML template file
    const templatePath = path.join(__dirname, '..', 'views', 'invoice.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');

    htmlContent = htmlContent
        .replace(/{{invoiceId}}/g, order._id)
        .replace(/{{invoiceDate}}/g, new Date().toLocaleDateString())
        .replace(/{{customerName}}/g, `${payer.name?.given_name || "Default"} ${payer.name?.surname || "User"}`)
        .replace(/{{customerEmail}}/g, payer.email_address || "default@example.com")
        .replace(/{{address1}}/g, purchaseUnit.shipping?.address?.address_line_1 || "Default Address 1")
        .replace(/{{address2}}/g, purchaseUnit.shipping?.address?.address_line_2 || "")
        .replace(/{{city}}/g, purchaseUnit.shipping?.address?.admin_area_2 || "Default City")
        .replace(/{{state}}/g, purchaseUnit.shipping?.address?.admin_area_1 || "Default State")
        .replace(/{{postalCode}}/g, purchaseUnit.shipping?.address?.postal_code || "000000")
        .replace(/{{totalAmount}}/g, order.totalAmount.toFixed(2))
        .replace(
            /{{#items}}(.*?){{\/items}}/gs,
            order.items
                .map(
                    (item, index) =>
                        `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
            `
                )
                .join('')
        );

    const filePath = path.join(__dirname, '..', 'views', `test-invoice_${order._id}.html`);
    fs.writeFileSync(filePath, htmlContent);

    return filePath;
};

module.exports = GenerateHTMLInvoice;