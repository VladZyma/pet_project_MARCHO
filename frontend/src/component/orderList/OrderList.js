import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";


import './orderList.scss';

import {Order} from "../order/Order";
import {orderActions} from "../../redux";

const OrderList = () => {

  const dispatch = useDispatch();

  const {orders} = useSelector(state => state.orderReducer);

  useEffect(() => {
    dispatch(orderActions.getOrders());
  }, [dispatch]);

  const orderCosts = orders.map(order => {
    let sum = 0;
    for (let product of order.productsInfo) {
      sum += product.totalCost;
    }
    return sum;
  });
  const totalOrdersCost = orderCosts.reduce((sum, price) => sum += price, 0);

  return (
    <div className={'order-list'}>
      <div className={'container'}>
        <div className={'order-list__info'}>
          <span className={'order-list__info-item'}>
            Total orders: {orders.length}
          </span>
          <span className={'order-list__info-item'}>
            Made orders for: ${totalOrdersCost}
          </span>
        </div>
        {orders.length > 0
          &&
          orders.map(order => <Order order={order} key={order._id}/>)
        }
      </div>
    </div>
  );
};

export {OrderList}
