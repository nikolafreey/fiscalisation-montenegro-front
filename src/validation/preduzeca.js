import * as Yup from 'yup';
import $t from '../lang';

export const PreduzecaSchema = Yup.object().shape({
  kratki_naziv: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(255, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  oblik_preduzeca: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(255, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  pib: Yup.string()
    .min(8, $t('validacija.unosKratak'))
    .max(13, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  pdv: Yup.string()
    .min(13, $t('validacija.unosKratak'))
    .max(13, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  adresa: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(255, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  grad: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(255, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  drzava: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(255, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  djelatnost: Yup.number().required($t('validacija.obavezno')),
  kategorija: Yup.number().required($t('validacija.obavezno')),
});
