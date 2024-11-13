class NavModel {
  private static sidebarOpen: boolean = false;

  public static getSidebarState(): boolean {
    return this.sidebarOpen;
  }

  public static toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}

export { NavModel };
