import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { useRouter } from '../../shared/utils/hooks/useRouter';
import { toggleAside } from './reducer';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
enum NotificationType {
  ALL = 'ALL',
  UNREAD = 'UNREAD',
}

const TheAside = () => {
  const [visibleRight, setVisibleRight] = useState(false);
  // const show = useTypedSelector((state) => state.asideShow)
  const dispatch = useDispatch();
  const { navigate } = useRouter();
  const setState = (state: boolean) => () => dispatch(toggleAside(state));
  const [activeTab, setActiveTab] = React.useState<NotificationType>(NotificationType.ALL);
  const containerState = useSelector((state: RootState) => state.container);
  const { asideShow } = containerState;
  // const isMobile = useDeviceDetect();
  const handleRedirect = () => {
    dispatch(toggleAside(false));
    navigate('/');
  };

  return (
    <>
      {/* <CSidebar colorScheme="light" size="lg" overlaid placement="end" visible={asideShow} className={'aside-custom'}>
        <CSidebarHeader className="bg-transparent p-0">
          <CNav variant="underline" className="aside-navbar">
            {!true ? (
              <>
                {' '}
                <CNavItem>
                  <CNavLink
                    className="cursor-pointer"
                    onClick={() => setActiveTab(NotificationType.ALL)}
                    active={activeTab === NotificationType.ALL}
                  >
                    Tất cả
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    className="cursor-pointer"
                    onClick={() => setActiveTab(NotificationType.UNREAD)}
                    active={activeTab === NotificationType.UNREAD}
                  >
                    Chưa đọc
                  </CNavLink>
                </CNavItem>
              </>
            ) : (
              ''
            )}
            <CNavItem>
              <CNavLink className="cursor-pointer" active={asideShow}>
                Thông báo
              </CNavLink>
            </CNavItem>
            <CNavItem className="ms-auto flex align-items-center">
              <CNavLink onClick={setState(false)} className="cursor-pointer close-nav">
                <CCloseButton className="text-danger close-button" />
              </CNavLink>
            </CNavItem>
          </CNav>
        </CSidebarHeader>
        <CSidebarFooter
          className="bg-transparent border-top text-center cursor-pointer text-green readAll-btn"
          onClick={handleRedirect}
        >
          Xem tất cả
        </CSidebarFooter>
      </CSidebar> */}
      {/* <Sidebar visible={asideShow} position="right" onHide={() => setVisibleRight(!asideShow)} className="pt-3rem">
        <h2>Right Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </Sidebar> */}
    </>
  );
};

export default React.memo(TheAside);
