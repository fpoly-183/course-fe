import avatar from '@/assets/img/avatar.jpg';
import { useEffect, useRef, useState } from 'react';
import { Badge } from 'primereact/badge';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
const AppHeaderDropdown = () => {
  const [checked, setChecked] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toast = useRef<Toast>(null);
  const menuLeft = useRef<Menu>(null);
  // const items = [
  //   {
  //     label: 'Documents',
  //     items: [
  //       {
  //         label: 'New',
  //         icon: 'pi pi-plus',
  //       },
  //       {
  //         label: 'Search',
  //         icon: 'pi pi-search',
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Profile',
  //     items: [
  //       {
  //         label: 'Settings',
  //         icon: 'pi pi-cog',
  //       },
  //       {
  //         label: 'Logout',
  //         icon: 'pi pi-sign-out',
  //       },
  //     ],
  //   },
  // ];
  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  //   console.log('true');
  // };
  const items = [
    {
      label: 'Options',
      items: [
        {
          label: 'Refresh',
          icon: 'pi pi-refresh',
        },
        {
          label: 'Export',
          icon: 'pi pi-upload',
        },
      ],
    },
  ];
  // useEffect(() => {
  //   if (menuLeft.current) {
  //     menuLeft.current.element.style.zIndex = '1000';
  //   }
  // }, [menuLeft]);

  const toggleDropdown = (event: React.MouseEvent) => {
    setIsDropdownOpen(!isDropdownOpen);
    if (menuLeft.current) {
      menuLeft.current.toggle(event);
    }
  };
  return (
    <>
      {/* <CDropdown variant="nav-item" className="list-none">
        <CDropdownToggle className="py-0 pe-0 " caret={false}>
          <CAvatar src={avatar} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0">
          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilEnvelopeOpen} className="me-2" />
            Messages
            <Badge value="42" severity="success"></Badge>
          </CDropdownItem>

          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Settings
          </CDropdownItem>

          <CDropdownDivider />
          <CDropdownItem href="#/login">
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown> */}
      {/* <div className="card flex justify-content-center">
        <div className="flex justify-content-center cursor-pointer" onClick={toggleDropdown}>
          <img src={avatar} alt="Avatar" className="w-[40px] h-[40px] rounded-full" />
        </div>
        <div className="card flex justify-content-center">
          <Toast ref={toast} />
          <Menu model={items} />
        </div>
      </div> */}
      {/* <div>
        <div className="card flex justify-content-center">
          <Toast ref={toast} />
          <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
          <div className="flex justify-content-center cursor-pointer" onClick={toggleDropdown}>
            <img src={avatar} alt="Avatar" className="w-[40px] h-[40px] rounded-full" />
          </div>
        </div>
      </div> */}
      <div className="flex justify-content-center cursor-pointer" onClick={toggleDropdown}>
        <img src={avatar} alt="Avatar" className="w-[40px] h-[40px] rounded-full" />
      </div>
    </>
  );
};

export default AppHeaderDropdown;
