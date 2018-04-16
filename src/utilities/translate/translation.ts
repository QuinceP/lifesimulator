import { InjectionToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_ES_NAME, LANG_ES_TRANS } from './lang-es';
import { LANG_ZH_NAME, LANG_ZH_TRANS } from './lang-zh';

// all translations
export const _translations = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_ES_NAME]: LANG_ES_TRANS,
  [LANG_ZH_NAME]: LANG_ZH_TRANS,
};

/**
 * Supported language locales for the application.
 * @type {string[]}
 */
export const supportedLocales = [
  'az',
  'cz',
  'de',
  'de_AT',
  'de_CH',
  'en',
  'en_AU',
  'en_BORK',
  'en_CA',
  'en_GB',
  'en_IE',
  'en_IND',
  'en_US',
  'en_au_ocker',
  'es',
  'es_MX',
  'fa',
  'fr',
  'fr_CA',
  'ge',
  'id_ID',
  'it',
  'ja',
  'ko',
  'nb_NO',
  'nep',
  'nl',
  'pl',
  'pt_BR',
  'ru',
  'sk',
  'sv',
  'tr',
  'uk',
  'vi',
  'zh_CN',
  'zh_TW',
];
