import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import userSlice, { userSliceSelectors } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const userName = useSelector(userSlice.selectors.selectUser)?.name;
  console.log(userName);
  return <AppHeaderUI userName={userName} />;
};
