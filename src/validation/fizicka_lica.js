import * as Yup from 'yup';
import $t from '../lang';

export const FizickaLicaSchema = Yup.object().shape({
  ime: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.ime')),
  prezime: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.prezime')),
  jmbg: Yup.string()
    .length(13, $t('validacija.duzina'))
    .required($t('fizickaLicaValidation.jmbg')),
  grad: Yup.string()
    .min(3, $t('validacija.unosDugacak'))
    .max(255, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.grad')),
  drzava: Yup.string()
    .min(3, $t('validacija.unosDugacak'))
    .max(255, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.drzava')),
  // nacionalnost: Yup.string()
  //   .min(3, $t('validacija.unosKratak'))
  //   .max(100, $t('validacija.unosDugacak'))
  //   .required($t('fizickaLicaValidation.nacionalnost')),
  drzavljanstvo: Yup.string()
    .min(3, $t('validacija.unosKratak'))
    .max(50, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.drzavljanstvo')),
});
