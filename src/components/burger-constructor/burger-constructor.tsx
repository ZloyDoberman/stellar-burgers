import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  ingredientsActions,
  ingredientsSelectors
} from '../../services/slices/Ingredients';
import { userSliceSelectors } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';
import { feedsActions, feedsSelectors } from '../../services/slices/feed';
import { userOrderBurgerApi } from '../../services/thunk/feed';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const ingredientsAdd = useSelector(ingredientsSelectors.selectAddIngredient);
  const user = useSelector(userSliceSelectors.selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: ingredientsAdd.find((item) => item.type === 'bun'),
    ingredients: ingredientsAdd.filter((item) => item.type !== 'bun')
  };

  const orderRequest = useSelector(feedsSelectors.selectOrderRequest);

  const orderModalData = useSelector(feedsSelectors.selectUserOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) return navigate('/login');
    const id = [
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];
    dispatch(userOrderBurgerApi(id)).then(() => {
      dispatch(ingredientsActions.clearIngredient());
    });
  };

  const closeOrderModal = () => {
    dispatch(feedsActions.clearUserOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
