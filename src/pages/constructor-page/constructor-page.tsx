import { useDispatch, useSelector } from 'react-redux';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { ingredientsSelectors } from '../../services/slices/Ingredients';
import { RequestStatus } from '@utils-types';
import { AppDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/thunk/ingredients';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const isLoading = useSelector(
    ingredientsSelectors.selectIsIngredientsLoading
  );

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
