import { RootState } from '@/reducers';
import { KEYS_STORAGE } from '@/shared/enumeration/keyStore';
import { Status } from '@/shared/enumeration/status';
import { IUser } from '@/shared/model/user.model';
import { createIndexes, formatButtons, setDataStorage } from '@/shared/utils/ultils';
import { AppDispatch } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEntities, removeEntity } from './account.api';
import { accountSelectors, resetEntity, resetMessage, setDummy, setFilterState } from './account.reducer';
import { Badge } from 'primereact/badge';
import GridTable from '@/components/shared/views/grid-table/GridTable';
import { SearchType } from '@/shared/enumeration/search-type';
import { IActionButton, ISearchItemProps } from '@/shared/utils/interface/interface-common';
import { ButtonPosition } from '@/shared/enumeration/button-position';
import { ButtonAlias } from '@/shared/enumeration/button-alias';
import { Permission } from '@/shared/enumeration/permission';

const columns = [
  {
    key: 'username',
    label: 'Tài khoản',
  },
  {
    key: 'fullName',
    label: 'Họ và tên',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'status',
    label: 'Trạng thái',
  },
];

const dummyData: IUser[] = [
  {
    id: '1',
    username: 'admin',
    fullName: 'Trần Văn Nam',
    email: 'namtv@gmail.com',
    address: 'Hà Nội',
    phone: '0123456789',
    createTime: '2018-08-07 16:00:00',
    createUser: '1',
    password: '',
    updateUser: '',
    updateTime: '',
    status: Status.ACTIVE,
  },
  {
    id: '2',
    username: 'manager',
    fullName: 'Vũ Thị Lan',
    email: 'lanvt@gmail.com',
    address: 'Hà Nội',
    phone: '0123456789',
    createTime: '2018-08-07 16:00:00',
    createUser: '1',
    password: '',
    updateUser: '',
    updateTime: '',
    status: Status.ACTIVE,
  },
  {
    id: '3',
    username: 'user01',
    fullName: 'Trần Ánh Tuyết',
    email: 'tuyet@gmail.com',
    address: 'Hà Nội',
    phone: '0123456789',
    createTime: '2018-08-07 16:00:00',
    createUser: '1',
    password: '',
    updateUser: '',
    updateTime: '',
    status: Status.ACTIVE,
  },
  {
    id: '4',
    username: 'user02',
    fullName: 'Văn Mai Hương',
    email: 'huong@gmail.com',
    address: 'Hà Nội',
    phone: '0123456789',
    createTime: '2018-08-07 16:00:00',
    createUser: '1',
    password: '',
    updateUser: '',
    updateTime: '',
    status: Status.ACTIVE,
  },
  {
    id: '5',
    username: 'cms01',
    fullName: 'Đăng Thị Trang',
    email: 'trang@gmail.com',
    address: 'Hà Nội',
    phone: '0123456789',
    createTime: '2018-08-07 16:00:00',
    createUser: '1',
    password: '',
    updateUser: '',
    updateTime: '',
    status: Status.ACTIVE,
  },
  {
    id: '6',
    username: 'cms02',
    fullName: 'Phạm Văn Bách',
    email: 'bach@gmail.com',
    address: 'Hà Nội',
    phone: '0123456789',
    createTime: '2018-08-07 16:00:00',
    createUser: '1',
    password: '',
    updateUser: '',
    updateTime: '',
    status: Status.ACTIVE,
  },
  {
    id: '7',
    username: 'cms03',
    fullName: 'Nguyễn Thị Linh',
    email: 'linh@gmail.com',
    address: 'Hà Nội',
    phone: '0123456789',
    createTime: '2018-08-07 16:00:00',
    createUser: '1',
    password: '',
    updateUser: '',
    updateTime: '',
    status: Status.ACTIVE,
  },
  {
    id: '8',
    username: 'cms04',
    fullName: 'Ngô Lan Hương',
    email: 'huongngo@gmail.com',
    address: 'Hà Nội',
    phone: '0123456789',
    createTime: '2018-08-07 16:00:00',
    createUser: '1',
    password: '',
    updateUser: '',
    updateTime: '',
    status: Status.ACTIVE,
  },
];

const actionButtons: any[] = [
  {
    action: 0,
    alias: 'menu',
    code: 'account',
    name: 'Quản lý tài khoản',
    path: '/account-management',
    children: [
      {
        id: '1',
        alias: 'create',
        path: '/account-management/create',
        name: 'Tạo mới',
        action: 1,
        code: 'create',
      },
      {
        id: '2',
        alias: 'detail',
        path: '/account-management/detail',
        name: 'Xem chi tiết',
        action: 2,
        code: 'detail',
      },
      {
        id: '3',
        alias: 'edit',
        path: '/account-management/edit',
        name: 'Sửa',
        action: 2,
        code: 'edit',
      },
      {
        id: '4',
        alias: 'delete',
        path: '/account-management/delete',
        name: 'Xoá',
        action: 2,
        code: 'delete',
      },
    ],
  },
];
// const actionButtons: IActionButton[] = [
//   {
//     title: 'Tạo mới',
//     position: ButtonPosition.header,
//     alias: ButtonAlias.add,
//     permission: Permission.addAccount,
//   },
//   // {
//   //   title: 'Đổi mật khẩu',
//   //   position: ButtonPosition.table,
//   //   alias: ButtonAlias.resetPassword,
//   //   permission: Permission.editAccount,
//   // },
//   {
//     title: 'Xem chi tiết',
//     position: ButtonPosition.table,
//     alias: ButtonAlias.view,
//     permission: Permission.delAccount,
//   },
//   {
//     title: 'Sửa',
//     position: ButtonPosition.table,
//     alias: ButtonAlias.edit,
//     permission: Permission.editAccount,
//   },
//   {
//     title: 'Xoá',
//     position: ButtonPosition.table,
//     alias: ButtonAlias.delete,
//     permission: Permission.viewAccount,
//   },
//   // {
//   //   title: 'Lịch sử hoạt động',
//   //   position: ButtonPosition.table,
//   //   alias: ButtonAlias.history,
//   //   permission: Permission.viewHistoryAccount,
//   // },
//   // {
//   //   title: 'Khoá',
//   //   position: ButtonPosition.footer,
//   //   alias: ButtonAlias.lock,
//   //   permission: Permission.lockAndUnlockAccount,
//   // },
//   // {
//   //   title: 'Mở khoá',
//   //   position: ButtonPosition.footer,
//   //   alias: ButtonAlias.unlock,
//   //   permission: Permission.lockAndUnlockAccount,
//   // },
//   // {
//   //   title: 'Xoá',
//   //   position: ButtonPosition.footer,
//   //   alias: ButtonAlias.deleteAll,
//   //   permission: Permission.deleteAccount,
//   // },
// ];

const searchTypes: ISearchItemProps[] = [
  {
    title: 'Tên đăng nhập',
    id: 'username',
    placeholder: 'Nhập tên đăng nhập...',
    type: SearchType.TEXT,
    size: 4,
  },
  {
    title: 'Họ tên',
    id: 'name',
    placeholder: 'Nhập họ tên...',
    type: SearchType.TEXT,
    size: 4,
  },
  {
    title: 'Email',
    id: 'email',
    placeholder: 'Nhập email...',
    type: SearchType.TEXT,
    size: 4,
  },
];

const AccountManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initialState } = useSelector((state: RootState) => state.account);
  const { filterState } = initialState;

  const accounts = useSelector(accountSelectors.selectAll);
  const indexedAccount = createIndexes(accounts, filterState);
  const dataTable = {
    username: (item: IUser) => <div className="fw-bold text-sm text-center">{item.username}</div>,
    fullName: (item: IUser) => <div className="text-sm text-center">{item.fullName}</div>,
    email: (item: IUser) => <div className="text-sm text-center">{item.email}</div>,
    status: (item: IUser) => (
      <div className="text-center">
        <Badge value="Hoạt động" severity="success"></Badge>
      </div>
    ),
  };

  useEffect(() => {
    dispatch(setDummy(dummyData));
    setDataStorage(KEYS_STORAGE.BUTTONS, formatButtons(actionButtons));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <Grid
    //   filterState={initialState.filterState}
    //   columns={columns}
    //   items={indexedAccount}
    //   scopedColumns={dataTable}
    //   initialState={initialState}
    //   setFilterState={setFilterState}
    //   getEntities={getEntities}
    //   resetEntity={resetEntity}
    //   removeEntity={removeEntity}
    // />
    <GridTable
      idKeyTable={'id'}
      initialState={initialState}
      getEntities={getEntities}
      removeEntity={removeEntity}
      resetEntity={resetEntity}
      resetMessage={resetMessage}
      filterState={initialState.filterState}
      setFilterState={setFilterState}
      tableData={indexedAccount}
      columns={columns}
      scopedColumns={dataTable}
      actionButtons={[]}
      searchContent={searchTypes}
    />
  );
};

export default AccountManagement;
