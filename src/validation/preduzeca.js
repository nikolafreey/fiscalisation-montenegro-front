import * as Yup from 'yup';
import $t from '../lang';

export const PreduzecaSchema = Yup.object().shape({
  kratki_naziv: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  oblik_preduzeca: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  pib: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  pdv: Yup.string()
    .min(13, $t('validacija.unosKratak'))
    .max(13, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  twitter_username: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(100, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  instagram_username: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(100, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  facebook_username: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(100, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  skype_username: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(100, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  telefon: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  email: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .email($t('validacija.email'))
    .required($t('validacija.obavezno')),
});
