import React from 'react';

type defaultContextData = {
  dark: boolean;
  toggle: Function;
};

const defaultContextData = {
  dark: false,
  toggle: (): void => {
    return;
  },
};

const ThemeContext = React.createContext(defaultContextData);
const useTheme = (): defaultContextData => React.useContext(ThemeContext);

const useEffectDarkMode = (): [
  { dark: boolean; hasThemeMounted: boolean },
  React.Dispatch<
    React.SetStateAction<{
      dark: boolean;
      hasThemeMounted: boolean;
    }>
  >,
] => {
  const [themeState, setThemeState] = React.useState({
    dark: false,
    hasThemeMounted: false,
  });
  React.useEffect(() => {
    const lsDark = localStorage.getItem('dark') === 'true';
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (lsDark || darkModeMediaQuery.matches) {
      document.documentElement.setAttribute('dark', '');
      document.documentElement.classList.add('is-dark');
    } else {
      document.documentElement.removeAttribute('dark');
      document.documentElement.classList.remove('is-dark');
    }
    setThemeState({ ...themeState, dark: lsDark, hasThemeMounted: true });
  }, []);

  return [themeState, setThemeState];
};

const ThemeProvider: React.FC = ({ children }): JSX.Element => {
  const [themeState, setThemeState] = useEffectDarkMode();

  if (!themeState.hasThemeMounted) {
    return <div />;
  }

  const toggle = (): void => {
    const dark = !themeState.dark;
    localStorage.setItem('dark', JSON.stringify(dark));
    if (dark) {
      document.documentElement.setAttribute('dark', '');
      document.documentElement.classList.add('is-dark');
    } else {
      document.documentElement.removeAttribute('dark');
      document.documentElement.classList.remove('is-dark');
    }
    setThemeState({ ...themeState, dark });
  };

  return (
    <ThemeContext.Provider
      value={{
        dark: themeState.dark,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
