import { startCase, toLower } from 'lodash';
import React from 'react';
import { matchPath, matchRoutes, RouteObject } from 'react-router-dom';
import { publicRoutes } from '../../routes';
import { useRouter } from '../../shared/utils/hooks/useRouter';
import { BreadCrumb } from 'primereact/breadcrumb';
import 'primeicons/primeicons.css';
interface IBreadCrumbs {
  label: string;
  name: string;
  active: boolean;
  className?: string;
}

const AppBreadcrumb = () => {
  const { location } = useRouter();
  const currentLocation = location.pathname;

  /**
   * Since pathname comes in the format of {parent / children / grandchildren } and we only want to take the substring after
   * the last slash
   *
   * getSubstringAfterLastSlash(input: string) : string
   * Input: "/BO/base/collapses"
   * Output: "/collapses"
   */
  const getSubstringAfterLastSlash = (input: string | undefined): string => {
    if (!input) return '';
    const lastSlashIndex = input.lastIndexOf('/');
    return input.slice(lastSlashIndex);
  };

  const getRouteName = (pathname: string, routes: RouteObject[]) => {
    // const currentRoute = routes.find((route) => matchPath(route.path, pathname));
    // if (!currentRoute) return '';
    // return currentRoute.name;
    const currentRoutes = matchRoutes(routes, pathname);
    const currentRoute = currentRoutes?.find((route) => matchPath(pathname, route.pathname));
    // https://stackoverflow.com/questions/38084396/lodash-title-case-uppercase-first-letter-of-every-word
    // transform {/BO/ BO abc / BO abc xyz} into {Back Office / Abc / Xyz}
    const result = startCase(toLower(getSubstringAfterLastSlash(currentRoute?.pathname).replace('/BO', 'Back Office')));
    return result;
  };

  const getBreadcrumbs = (location: string) => {
    const breadcrumbs: IBreadCrumbs[] = [];
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      breadcrumbs.push({
        name: currentPathname,
        label: getRouteName(currentPathname, publicRoutes),
        active: index + 1 === array.length ? true : false,
      });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  const home = { icon: 'pi pi-home', url: 'http://localhost:3000/#/dashboard' };
  return (
    <>
      {/* <CBreadcrumb className=" ms-2 custom-breadcrumb">
        <CBreadcrumbItem href="#">
          Dashboard
        </CBreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            breadcrumb.name && (
              <CBreadcrumbItem
                {...(breadcrumb.active
                  ? { href: `#${breadcrumb.label}`, className: 'breadcrumb-active' }
                  : { href: `#${breadcrumb.label}` })}
                key={index}
              >
                {breadcrumb.name}
              </CBreadcrumbItem>
            )
          );
        })}
      </CBreadcrumb> */}

      <BreadCrumb model={breadcrumbs} home={home} />
    </>
  );
};

export default React.memo(AppBreadcrumb);
