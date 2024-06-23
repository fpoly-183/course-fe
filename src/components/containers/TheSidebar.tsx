import logoteam from '@/assets/img/logoteam.png';
import { useRouter } from '@/shared/utils/hooks/useRouter';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { setCurrentMenu, toggleSidebar } from './reducer';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { RiDashboardFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { IconType } from 'react-icons';
const TheSidebar = () => {
  const dispatch = useDispatch();
  const containerState = useSelector((state: RootState) => state.container);
  const [unfoldable, setUnfoldable] = useState<boolean>(false);
  const { sidebarShow } = containerState;
  const { location } = useRouter();

  const iconComponents: { [key: string]: IconType } = {
    FaUserCircle,
    RiDashboardFill,
  };

  const menu: any[] = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: 'RiDashboardFill',
    },
    {
      path: '/account-management',
      name: 'Quản lý tài khoản',
      icon: 'FaUserCircle',
      code: 'account',
    },
  ];
  const findMenu = () => {
    let found = menu.find((item) => location.pathname === item.path);
    if (!found) {
      const newArr = menu.flatMap((item) => item.children || []);
      found = newArr.find((item) => location.pathname === item.path);
    }
    return found || null;
  };

  useEffect(() => {
    const currentMenu = findMenu();
    dispatch(setCurrentMenu(currentMenu));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, JSON.stringify(menu)]);
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName];
    if (IconComponent) {
      return <IconComponent />;
    }
    return null;
  };
  return (
    <>
      {/* <CSidebar
        className="sidebar-custom"
        colorScheme="light"
        position="fixed"
        visible={sidebarShow}
        unfoldable={unfoldable}
        onVisibleChange={(val: boolean) => dispatch(toggleSidebar(val))}
      >
        <CSidebarBrand className="bg-white">
          <CImage src={logoteam} height={80} />
        </CSidebarBrand>
        <CSidebarNav>
          {menu.map((item) => (
            <CNavItem
              href={`#${item.path}`}
              active={location.pathname?.includes(item.path)}
              onClick={() => dispatch(setCurrentMenu(item))}
              key={item.path}
            >
              <CIcon customClassName="nav-icon" icon={item.icon} />
              {item.name}
            </CNavItem>
          ))}
        </CSidebarNav>
        <CSidebarToggler className="d-none d-lg-flex" onClick={() => setUnfoldable(!unfoldable)} />
      </CSidebar> */}
      {/* <div className="card flex justify-content-center">
        <Sidebar
          className="sidebar-custom bg-white "
          visible={sidebarShow}
          onHide={() => dispatch(toggleSidebar(false))}
          onShow={() => dispatch(toggleSidebar(true))}
        >

          <nav>
            {menu.map((item) => (
              <CNavItem
                href={`#${item.path}`}
                active={location.pathname?.includes(item.path)}
                onClick={() => dispatch(setCurrentMenu(item))}
                key={item.path}
              >
                {item.name}
              </CNavItem>
            ))}
          </nav>
          <CSidebarToggler className="d-none d-lg-flex" onClick={() => setUnfoldable(!unfoldable)} />
        </Sidebar>
      </div> */}
      {/* <div className="fixed left-0 h-screen w-64 bg-white shadow-lg dark:bg-gray-800 dark:text-white"> */}
      <div className="bg-white">
        <img src={logoteam} className="w-[213px] h-[70px] " />
      </div>
      <nav className="border-t-[1px] border-[#ccc]">
        {menu.map((item) => (
          <li
            key={item.path}
            className={`list-none px-4 py-2 hover:bg-gray-200 transition-colors duration-300 ${
              location.pathname?.includes(item.path) ? 'bg-gray-300 ' : ''
            }`}
          >
            <div className="flex items-center">
              {renderIcon(item.icon)}
              <a
                href={`#${item.path}`}
                className="block text-gray-700 hover:text-gray-900 transition-colors duration-300 ml-2"
                onClick={() => dispatch(setCurrentMenu(item))}
              >
                {item.name}
              </a>
            </div>
          </li>
        ))}
      </nav>
      {/* </div> */}
    </>
  );
};

export default React.memo(TheSidebar);
