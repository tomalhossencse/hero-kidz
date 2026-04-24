export const orderInvoiceTemplate = ({ orderId, items, totalPrice }) => {
  return `
    <div style="font-family:arial; padding: 20px">
      
      <h2 style="color:#4f46e5;">🧾 Order Invoice</h2>
      
      <p>Order Id :  <b>${orderId}</b>,</p>
      <img src="https://i.ibb.co.com/Xx5D9kNy/logo.png" width="200px"/>
      <p>Your order has been placed successfully 🎉</p>

      <table 
        border="1" 
        cellspacing="0" 
        cellpadding="10" 
        style="border-collapse: collapse; width: 100%; margin-top: 15px;"
      >
        <tr style="background:#f3f4f6;">
          <th align="left">Product</th>
          <th>Qty</th>
          <th align="right">Price</th>
        </tr>

        ${items
          .map(
            (item) => `
          <tr>
            <td>${item.title}</td>
            <td align="center">${item.quantity}</td>
            <td align="right">৳${item.price * item.quantity}</td>
          </tr>
        `,
          )
          .join("")}
      </table>

      <h3 style="margin-top:20px;">
        Total: <span style="color:#16a34a;">৳${totalPrice}</span>
      </h3>

      <p style="margin-top:20px;">Thanks for shopping with us ❤️</p>
    </div>
  `;
};
