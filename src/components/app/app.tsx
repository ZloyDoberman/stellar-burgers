import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Outlet
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protectedRoute';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/thunk/ingredients';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUser } from '../../services/thunk/user';
import userSlice from '../../services/slices/user';
import { fetchFeed, userOrderHistoryApi } from '../../services/thunk/feed';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  const ModalOrderWrapper = () => (
    <Modal title='Детали заказа' onClose={handleModalClose}>
      <OrderInfo />
    </Modal>
  );

  const ModalIngredientWrapper = () => (
    <Modal title='Детали ингредиента' onClose={handleModalClose}>
      <IngredientDetails />
    </Modal>
  );

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />

          <Route
            path='/login'
            element={
              <ProtectedRoute isPublic>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute isPublic>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute isPublic>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute isPublic>
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={<ModalIngredientWrapper />}
            />
            <Route path='/feed/:number' element={<ModalOrderWrapper />} />
            <Route
              path='/profile/orders/:number'
              element={<ModalOrderWrapper />}
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
