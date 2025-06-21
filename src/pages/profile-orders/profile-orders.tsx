import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedsSelectors } from '../../services/slices/feed';
import { userOrderHistoryApi } from '../../services/thunk/feed';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const userHistory = useSelector(feedsSelectors.selectOrderHistory);
  const dispatch = useDispatch();
  const orders: TOrder[] = userHistory;

  useEffect(() => {
    dispatch(userOrderHistoryApi());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
