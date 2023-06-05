import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useTheme } from '../../../context/themeProvider';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
  const [ThemeMode, toggleTheme] = useTheme();

  return (
    <div>
      <Header />
      <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
        DarkMode
      </ThemeToggle>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
