import { useI18n } from '../context/I18nProvider.jsx';
import { useTheme } from '../hooks/useTheme.js';

function ChevronIcon() {
  return (
    <svg className="header-prefs__chevron" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.25" fill="currentColor" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        d="M12 2.5v2.6M12 18.9v2.6M4.4 4.4l1.84 1.84M17.76 17.76l1.84 1.84M2.5 12h2.6M18.9 12h2.6M4.4 19.6l1.84-1.84M17.76 6.24l1.84-1.84"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.5 14.35A8.5 8.5 0 1 1 9.65 3.5a6.75 6.75 0 1 0 10.85 10.85Z"
      />
    </svg>
  );
}

function ThemeSwitch() {
  const { isDark, toggleTheme } = useTheme();
  const { content } = useI18n();
  const labels = content.header;

  return (
    <button
      type="button"
      className="header-prefs__theme-switch"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? labels.themeLightMode : labels.themeDarkMode}
      onClick={toggleTheme}
    >
      <span className="header-prefs__theme-track" aria-hidden="true">
        <span className="header-prefs__theme-icon header-prefs__theme-icon--sun">
          <SunIcon />
        </span>
        <span className="header-prefs__theme-icon header-prefs__theme-icon--moon">
          <MoonIcon />
        </span>
        <span className={`header-prefs__theme-thumb${isDark ? ' header-prefs__theme-thumb--dark' : ''}`}>
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
      </span>
    </button>
  );
}

export default function HeaderPreferences({ className = '' }) {
  const { locale, content, setLocale } = useI18n();
  const labels = content.header;
  const isEnglish = locale === 'en';

  const toggleLocale = () => {
    setLocale(isEnglish ? 'es' : 'en');
  };

  return (
    <div className={`header-prefs${className ? ` ${className}` : ''}`} aria-label={labels.preferencesAriaLabel}>
      <button
        type="button"
        className="header-prefs__lang"
        aria-label={isEnglish ? labels.switchToEs : labels.switchToEn}
        onClick={toggleLocale}
      >
        <span className="header-prefs__lang-code">{isEnglish ? labels.langEn : labels.langEs}</span>
        <ChevronIcon />
      </button>

      <span className="header-prefs__sep" aria-hidden="true" />

      <ThemeSwitch />
    </div>
  );
}
