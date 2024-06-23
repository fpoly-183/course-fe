import { IMenu } from '@/shared/model/menu.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IContainerState {
  sidebarShow: boolean;
  asideShow: boolean;
  darkMode: boolean;
  currentMenu: IMenu | null;
  menu: IMenu[]
}

const initialState: IContainerState = {
  sidebarShow: true,
  asideShow: false,
  darkMode: false,
  currentMenu: null,
  menu: []
};

const containerSlice = createSlice({
  name: 'containerSlice',
  initialState,
  reducers: {
    toggleSidebar: (state, { payload }: PayloadAction<boolean>) => {
      state.sidebarShow = payload;
    },
    toggleAside: (state, { payload }: PayloadAction<boolean>) => {
      state.asideShow = payload;
    },
    toggleDarkMode: (state, { payload }: PayloadAction<boolean>) => {
      state.darkMode = payload;
    },
    setCurrentMenu: (state, { payload }: PayloadAction<IMenu | null>) => {
      state.currentMenu = payload;
    },
  },
  extraReducers: (builder) => {},
});

export default containerSlice.reducer;
export const { toggleSidebar, toggleAside, toggleDarkMode, setCurrentMenu } = containerSlice.actions;
