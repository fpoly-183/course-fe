import { intersection } from 'lodash';
import React from 'react';
import { Permission } from '../../../shared/enumeration/permission';
import { TAuthorities } from '../../../shared/model/user.model';

interface IProtectedComponentProp {
  children: React.ReactNode;
  requiredPerms: [];
}

export const checkIfUserIsAdmin = (userAuthorities: TAuthorities[]): boolean => {
  return userAuthorities.includes(Permission.ROLE_ADMIN);
};

export const checkOverlapBetweenPerms = (userAuthorities: TAuthorities[], requiredPerms: TAuthorities[]): boolean => {
  const overlappedPerms = intersection(requiredPerms, userAuthorities)
  return Boolean(overlappedPerms.length);
};

export const ProtectedComponent = ({ children, requiredPerms }: IProtectedComponentProp) => {
  // const { user } = useSelector((state: RootState) => state.authentication);
  // const { location } = useRouter();

  // if (!user) return <Navigate to="/auth/login" state={{ path: location.pathname }} />;

  // const { authorities } = user;
  // if (checkIfUserIsAdmin(authorities)) return <>{children}</>;
  // return checkOverlapBetweenPerms(authorities, requiredPerms) ? <>{children}</> : <Navigate to="/403" replace/>;
};
