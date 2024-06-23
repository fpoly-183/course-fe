export enum Permission {
  ROLE_ADMIN = 'ROLE_ADMIN',
  default = '',
  none = 'none',
  viewDashboard = 'sys_dashboard', // Bảng điều khiển
  sysSystem = 'sys_system', // Quản trị hệ thống

  // user
  addAccount = 'add_user',
  editAccount = 'edit_user',
  delAccount = 'del_user',
  viewAccount = 'view_user',
}

export const permissionsArray: Permission[] = [Permission.ROLE_ADMIN];

// export const mapPermissions: { [key in Permission]: string } = {
//   [Permission.ROLE_ADMIN]: 'QUẢN TRỊ VIÊN',
//   [Permission.default]: '',
//   [Permission.none]: '',
//   [Permission.viewDashboard]: '',
//   [Permission.sysSystem]: '',
// };
