import i18n from 'i18n-js';

import sr from './sr';

i18n.fallbacks = true;

i18n.translations = {
  sr
};

i18n.locale = 'sr';

export default function $t(key, params = {}) {
  return i18n.t(key, params);
}