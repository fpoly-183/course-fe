import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import AppBreadcrumb from './AppBreadcrumb';
import AppHeaderDropdown from './AppHeaderDropdown';
import { toggleAside, toggleSidebar } from './reducer';
import { FiAlignJustify } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdMailOutline } from 'react-icons/md';
const TheHeader = () => {
  const dispatch = useDispatch();
  const { sidebarShow, asideShow } = useSelector((state: RootState) => state.container);

  const toggleSidebarDesktop = () => {
    dispatch(toggleSidebar(!sidebarShow));
    console.log(sidebarShow);
  };

  const toggleASideDesktop = () => {
    dispatch(toggleAside(!asideShow));
  };

  return (
    <>
      {/* <CHeader position="sticky">
        <CContainer fluid>
          <CHeaderNav className="flex me-auto">
            <CHeaderToggler className="ps-1" onClick={toggleSidebarDesktop}>
              <CIcon icon={cilMenu} size="lg" />
            </CHeaderToggler>
            <CNavItem className="nav-breadcrumb">
              <AppBreadcrumb />
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav>
            <CNavItem>
              <CNavLink onClick={toggleASideDesktop}>
                <CIcon icon={cilBell} size="lg" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilList} size="lg" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilEnvelopeOpen} size="lg" />
              </CNavLink>
            </CNavItem>
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
      </CHeader> */}
      <header className="sticky top-0 py-2 px-2 sm:px-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
        <div className=" mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <FiAlignJustify
              onClick={toggleSidebarDesktop}
              className="text-xl mr-3.5 text-gray-500 dark:text-gray-400"
            />
            <AppBreadcrumb />
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex">{/* header-nav d-none flex */}</div>
            <div className="flex items-center">
              <MdMailOutline className="text-2xl mr-2 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="flex items-center" onClick={toggleASideDesktop}>
              <IoMdNotificationsOutline className="text-2xl mr-4 text-gray-500 dark:text-gray-400" />
            </div>
            <AppHeaderDropdown />
          </div>
        </div>
      </header>
    </>
  );
};

export default TheHeader;
