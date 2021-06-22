import * as Yup from 'yup';
import $t from '../lang';

export const FizickaLicaSchema = Yup.object().shape({
  ime: Yup.string()
    .max(50, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.ime')),
  prezime: Yup.string()
    .max(50, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.prezime')),
  jmbg: Yup.string()
    .length(13, $t('validacija.duzina', 13)),
  grad: Yup.string()
    .max(255, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.grad')),
  drzava: Yup.string()
    .max(255, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.drzava')),
  // nacionalnost: Yup.string()
  //   .min(3, $t('validacija.unosKratak'))
  //   .max(100, $t('validacija.unosDugacak'))
  //   .required($t('fizickaLicaValidation.nacionalnost')),
  drzavljanstvo: Yup.string()
    .max(50, $t('validacija.unosDugacak'))
    .required($t('fizickaLicaValidation.drzavljanstvo')),
});
