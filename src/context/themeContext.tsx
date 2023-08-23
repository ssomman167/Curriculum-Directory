import { createContext, useState } from "react";
export const ThemeContext: any = createContext(null);

const ThemeStateProvider = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeStateProvider;
