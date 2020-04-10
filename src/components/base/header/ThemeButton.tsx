import styles from './ThemeButton.module.scss';
import carbonIconStyles from '@/styles/modules/carbonIcon.module.scss';
import { useTheme } from '@/plugins/theme/ThemeContext';
import { AsleepFilled16 } from '@carbon/icons-react';

const ThemeButton = () => {
  const themeState = useTheme();

  return (
    <button className={styles.button} onClick={() => themeState.toggle()}>
      <AsleepFilled16 aria-label="Add" className={carbonIconStyles.base} />
      <span className="u-sr-only">{themeState.dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
    </button>
  );
};

export default ThemeButton;
