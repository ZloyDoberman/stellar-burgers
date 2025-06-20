import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSliceSelectors } from '../../services/slices/user';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  isPublic?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  isPublic = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(userSliceSelectors.selectUser);
  const userCheck = useSelector(userSliceSelectors.selectUserCheck);

  if (!userCheck) {
    return <Preloader />;
  }

  if (!isPublic && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return (
      <Navigate
        to={from}
        state={{ background: from?.state?.background }}
        replace
      />
    );
  }

  return children;
};
