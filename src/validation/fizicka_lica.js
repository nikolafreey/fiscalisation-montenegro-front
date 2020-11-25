import * as Yup from 'yup';
import $t from '../lang';

export const FizickaLicaSchema = Yup.object().shape({
  ime: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  /*prezime: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  jmbg: Yup.string()
    .min(13, $t('validacija.unosKratak'))
    .max(13, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  ib: Yup.string()
    .min(8, $t('validacija.unosKratak'))
    .max(8, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  adresa: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  telefon: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  email: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  zanimanje: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  radno_mjesto: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  drzavljanstvo: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  nacionalnost: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  cv_link: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  avatar: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),*/
});
