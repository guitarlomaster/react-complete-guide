import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {

    const orders = useSelector(state => state.order.orders),
        loading = useSelector(state => state.order.loading),
        token = useSelector(state => state.auth.token),
        userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();
    const onFetchOrders = useCallback(
        (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        [dispatch]
    );

    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders]);

    let renderedOrders = <Spinner/>;
    if (!loading) {
        renderedOrders = orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
            />
        ))
    }
    return (
        <div>
            {renderedOrders}
        </div>
    );
};

export default withErrorHandler(orders, axios);
