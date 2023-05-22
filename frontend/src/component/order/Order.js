
import './order.scss';

const Order = ({order}) => {

  const prices = order.productsInfo.map(product => product.totalCost);
  const totalPrice = prices.reduce((sum, price) => sum += price, 0);

  return (
    <table>
      <thead>
      <tr>
        <th>
          DATE
        </th>
        <th>
          RECIPIENT
        </th>
        <th colSpan={5}>
          STATUS
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          {new Date(order.createdAt).toLocaleString()}
        </td>
        <td>
          {order.name}<br/>
          {order.email}<br/>
          {order.country} {order.city}<br/>
          {order.address}<br/>
          {order.postalCode}
        </td>
        <td colSpan={5}>
          {new Date(order.updatedAt).toLocaleString()}<br/>
          {order.status}
        </td>
      </tr>
      <tr>
        <td colSpan={7} className={'order-bg'}>
          ORDER
        </td>
      </tr>
      </tbody>
      <thead>
      <tr>
        <th>
          Product
        </th>
        <th>
          Color
        </th>
        <th>
          SKU
        </th>
        <th>
          Size
        </th>
        <th>
          Quantity
        </th>
        <th>
          Price
        </th>
        <th>
          Total
        </th>
      </tr>
      </thead>
      <tbody>
      {order.productsInfo.map((product, i) =>
        <tr key={i + 1 + product.size}>
          <td>
            {product.title}
          </td>
          <td>
            {product.color}
          </td>
          <td>
            {product.sku}
          </td>
          <td>
            {product.size}
          </td>
          <td>
            {product.quantity}
          </td>
          <td>
            ${product.price}
          </td>
          <td>
            ${product.totalCost}
          </td>
        </tr>
      )}
      <tr>
        <td colSpan={7}>
          Total price: ${totalPrice}
        </td>
      </tr>
      </tbody>
    </table>
  );
};

export {Order}
