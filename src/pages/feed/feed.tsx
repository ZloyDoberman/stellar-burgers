import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedsSelectors } from '../../services/slices/feed';
import { fetchFeed } from '../../services/thunk/feed';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(feedsSelectors.selectFeedsOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch, orders]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
