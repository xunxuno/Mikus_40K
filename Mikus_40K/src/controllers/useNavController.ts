import { NavModel } from '../models/NavModel';

export const useNavController = () => {
  const isSidebarOpen = NavModel.getSidebarState();

  const handleSidebarToggle = () => {
    NavModel.toggleSidebar();
  };

  return {
    isSidebarOpen,
    handleSidebarToggle,
  };
};
