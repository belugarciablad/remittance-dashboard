import { init, register, locale, getLocaleFromNavigator } from 'svelte-i18n';
import { writable } from 'svelte/store'

const isLocaleLoaded = writable(false);

register('en', () => import('../config/locales/en.json'));
register('es', () => import('../config/locales/es.json'));

init({
  fallbackLocale: 'en',
  initialLocale: localStorage.getItem('locale') || getLocaleFromNavigator(),
}).then(() => {
  isLocaleLoaded.set(true);
});

const setLocale = (lang) => {
  localStorage.setItem('locale', lang);
  locale.set(lang);
}

export const i18nStore = {
  subscribe: isLocaleLoaded.subscribe,
  setLocale
};
