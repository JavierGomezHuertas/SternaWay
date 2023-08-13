import { createContext } from "react";

export const NavbarContext = createContext({
  menuHidden: true,
  closeMenu: () => {}, // No hace nada (NO-OP)
});
