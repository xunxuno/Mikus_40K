import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isVisible: boolean;
}

const initialState: SidebarState = {
  isVisible: false, // El sidebar empieza cerrado
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
