import React from 'react';

type defaultContextData = {
  dark: boolean;
  toggle: Function;
};

const defaultContextData = {
  dark: true,
  toggle: (): void => {
    return;
  },
};

const ThemeContext = React.createContext(defaultContextData);

const useTheme = (): defaultContextData => React.useContext(ThemeContext);

const supportsDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches === true;

const addDarkModeStyle = () => {
  console.log('addDarkModeStyle');
  document.documentElement.setAttribute('dark', '');
  document.documentElement.classList.add('is-dark');
  document.body.style.backgroundColor = 'rgb(18, 21, 22)';
};

const removeDarkModeStyle = () => {
  console.log('removeDarkModeStyle');
  document.documentElement.removeAttribute('dark');
  document.documentElement.classList.remove('is-dark');
  document.body.style.backgroundColor = '';
};

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

    if (lsDark || supportsDarkMode) {
      addDarkModeStyle();
    } else {
      removeDarkModeStyle();
    }
    setThemeState({ ...themeState, dark: lsDark, hasThemeMounted: true });
  }, []);

  return [themeState, setThemeState];
};

const ThemeProvider: React.FC = ({ children }) => {
  const [themeState, setThemeState] = useEffectDarkMode();

  if (!themeState.hasThemeMounted) {
    return <div />;
  }

  const toggle = () => {
    const dark = !themeState.dark;
    localStorage.setItem('dark', JSON.stringify(dark));
    if (dark) {
      addDarkModeStyle();
    } else {
      removeDarkModeStyle();
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
