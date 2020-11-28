import * as Yup from 'yup';
import $t from '../lang';

export const FizickaLicaSchema = Yup.object().shape({
  ime: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  prezime: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  jmbg: Yup.string()
    .length(13, $t('validacija.duzina'))
    .required($t('validacija.obavezno')),
  ib: Yup.string()
    .length(8, $t('validacija.duzina')),
  adresa: Yup.string()
    .max(191, $t('validacija.unosDugacak')),
  telefon: Yup.string()
    .max(191, $t('validacija.unosDugacak')),
  email: Yup.string()
    .email($t('validacija.email'))
    .max(191, $t('validacija.unosDugacak'))
    .required($t('validacija.obavezno')),
  zanimanje: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak')),
  radno_mjesto: Yup.string()
    .max(50, $t('validacija.unosDugacak')),
  drzavljanstvo: Yup.string()
    .max(50, $t('validacija.unosDugacak')),
  nacionalnost: Yup.string()
    .max(50, $t('validacija.unosDugacak')),
  cv_link: Yup.string()
    .url($t('validacija.url'))
    .max(255, $t('validacija.unosDugacak')),
  avatar: Yup.string()
    .max(255, $t('validacija.unosDugacak')),
});
