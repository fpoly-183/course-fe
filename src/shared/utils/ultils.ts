import { KEYS_STORAGE } from '../enumeration/keyStore';
import { Permission } from '../enumeration/permission';
import { IMenu } from '../model/menu.model';
import { IParams } from '../shared-interfaces';

export const checkIsLocalhost = (): boolean => {
  const isLocalHost =
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    Boolean(window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
  return isLocalHost;
};

export const createIndexes = <T, G extends IParams>(data: T[], filter: G) => {
  const { page, size } = filter;
  return data.map((element, index) => ({
    ...element,
    index: page * size + index + 1,
  }));
};

const noMoreThanOneCommas = (input: number | string) => {
  const str = input.toString();
  let commasCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '.') commasCount++;
    if (commasCount > 1) break;
  }
  return commasCount <= 1;
};

export const insertCommas = (input: number | undefined | string, decimals: number = 4) => {
  if (typeof input === 'undefined') return '';
  if (!noMoreThanOneCommas(input)) return '';
  const parts = input.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (parts[1]) parts[1] = parts[1].substring(0, decimals); // Only take the first 4 decimals
  return parts.join('.');
};

export const unInsertCommas = (input: string) => {
  const parts = input.split('.');
  parts[0] = parts[0].replaceAll(',', '');
  if (parts[1]) parts[1] = parts[1].substring(0, 4); // Only take the first 4 decimals
  return parts.join('.');
};

export const getEllipsisTxt = (str: string, n = 5) => {
  if (str) {
    return str.length > n ? `${str.slice(0, n)}...${str.slice(str.length - n)}` : str;
  }
  return '';
};

export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const phoneRegex = /^0([0-9]{9})$/;

export const setDataStorage = (Key: KEYS_STORAGE, value?: any): boolean => {
  try {
    if (value) {
      localStorage.setItem(Key, JSON.stringify(value));
    } else {
      localStorage.removeItem(Key);
    }
    return true;
  } catch (error) {
    console.log('Error saving data storage');
    return false;
  }
};

export const getDataStorage = (Key: KEYS_STORAGE) => {
  try {
    const data = localStorage.getItem(Key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error retrieving data storage');
  }
};

export function getButtons(): {
  code: string;
  buttons: IMenu[];
}[] {
  const value = getDataStorage(KEYS_STORAGE.BUTTONS);
  if (value) {
    return value;
  } else {
    return [];
  }
}

export function getButtonsByCode(code: string) {
  const buttons = getButtons();
  const data = buttons.filter((d) => {
    return d.code === code;
  });
  return data.length === 0 ? [] : data[0].buttons;
}

export const formatButtons = (buttons: IMenu[]): { code: string; buttons: IMenu[] }[] => {
  return buttons.map((item) => {
    return {
      code: item.code,
      buttons: item.children || [],
    };
  });
};
export function hasPermission(permission: Permission) {
  const userPermissions = getUserPermissions();
  return userPermissions?.includes(permission) ?? false;
}
export function getUserPermissions(): Permission[] {
  const storedValue = getDataStorage(KEYS_STORAGE.USER_PERMISSIONS);
  if (storedValue !== null) {
    return storedValue;
  }

  return [];
}
