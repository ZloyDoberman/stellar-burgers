import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelectors } from '../../services/slices/Ingredients';
import { feedsSelectors } from '../../services/slices/feed';
import { useParams } from 'react-router-dom';
import { fetchOrderByNumberApi } from '../../services/thunk/feed';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const ingredients: TIngredient[] = useSelector(
    ingredientsSelectors.selectIngredients
  );
  const { number } = useParams();
  const orders = useSelector(feedsSelectors.selectFeedsOrders);
  const userHistory = useSelector(feedsSelectors.selectOrderHistory);
  const dispatch = useDispatch();

  const ordersInfoDataSelector = (number: number) => {
    const foundInOrders = orders.find((item) => item.number === number);
    if (foundInOrders) return foundInOrders;
    return userHistory.find((item) => item.number === number) || null;
  };

  const orderData = ordersInfoDataSelector(Number(number));

  useEffect(() => {
    if (!orderData) {
      dispatch(fetchOrderByNumberApi(Number(number)));
    }
  }, [dispatch, orderData, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
