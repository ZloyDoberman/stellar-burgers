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
  createRoutesFromElements,
  createBrowserRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protectedRoute';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/thunk/ingredients';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from '../../services/store';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const ModalOrder = () => (
    <Modal title='' onClose={() => window.history.back()}>
      <OrderInfo />
    </Modal>
  );

  const ModalIngredient = () => (
    <Modal title='' onClose={() => window.history.back()}>
      <IngredientDetails />
    </Modal>
  );

  const Layout = () => (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />}>
          <Route path=':number' element={<ModalOrder />} />
        </Route>
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path=':number'
              element={
                <ProtectedRoute>
                  <ModalOrder />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path='/ingredients'>
          <Route path=':id' element={<ModalIngredient />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
