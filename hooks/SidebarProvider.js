
import React ,{ useState } from "react";

const SidebarContext = React.createContext();

export function SidebarWrapper({ children }) {
  
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  
  return (
    <SidebarContext.Provider value={{
      menuIsOpen,
      changeMenu: () => setMenuIsOpen(!menuIsOpen)
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  return React.useContext(SidebarContext);
}
