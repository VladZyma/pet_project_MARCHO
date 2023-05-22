import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import './statistics.scss';

import {orderActions} from "../../redux";

const Statistics = () => {

  const dispatch = useDispatch();

  const {orders} = useSelector(state => state.orderReducer);

  useEffect(() => {
    if (orders.length < 1) {
      dispatch(orderActions.getOrders());
    }
  }, [dispatch]);

  const orderCosts = orders.map(order => {
    let sum = 0;
    for (let product of order.productsInfo) {
      sum += product.totalCost;
    }
    return sum;
  });
  const totalOrdersCost = orderCosts.reduce((sum, price) => sum += price, 0);

  const data = [
    {
      name: 'January',
      sales: 15,
      profit: 567,
    },
    {
      name: 'February',
      sales: 10,
      profit: 432,
    },
    {
      name: 'March',
      sales: 25,
      profit: 890,
    },
    {
      name: 'April',
      sales: 17,
      profit: 357,
    },
    {
      name: 'May',
      sales: `${orders.length}`,
      profit: `${totalOrdersCost}`,
    },
    {
      name: 'June',
      sales: 0,
      profit: 0,
    },
    {
      name: 'July',
      sales: 0,
      profit: 0,
    },
    {
      name: 'August',
      sales: 0,
      profit: 0,
    },
    {
      name: 'September',
      sales: 0,
      profit: 0,
    },
    {
      name: 'October',
      sales: 0,
      profit: 0,
    },
    {
      name: 'November',
      sales: 0,
      profit: 0,
    },
    {
      name: 'December',
      sales: 0,
      profit: 0,
    },
  ];

  return (
    <div className={'statistics'}>
      <div className={'container'}>
        <div className={'statistics__inner'}>
          <ResponsiveContainer width={'100%'} height={500}>
            <BarChart  data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="profit" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export {Statistics}