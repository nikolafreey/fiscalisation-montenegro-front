import * as Yup from 'yup';
import $t from '../lang';

export const PreduzecaSchema = Yup.object().shape({
  kratki_naziv: Yup.string()
    .max(255, $t('validacija.unosDugacak'))
    .required($t('preduzecaValidation.kratki_naziv')),
  oblik_preduzeca: Yup.string()
    .max(255, $t('validacija.unosDugacak'))
    .required($t('preduzecaValidation.oblik_preduzeca')),
  pib: Yup.string()
    .max(13, $t('validacija.unosDugacak'))
    .required($t('preduzecaValidation.pib')),
  pdv: Yup.string()
    .max(13, $t('validacija.unosDugacak'))
    .required($t('preduzecaValidation.pdv')),
  adresa: Yup.string()
    .max(255, $t('validacija.unosDugacak'))
    .required($t('preduzecaValidation.adresa')),
  grad: Yup.string()
    .max(255, $t('validacija.unosDugacak'))
    .required($t('preduzecaValidation.grad')),
  drzava: Yup.string()
    .max(255, $t('validacija.unosDugacak'))
    .required($t('preduzecaValidation.drzava')),
  kategorija_id: Yup.number().required($t('preduzecaValidation.kategorija')),
  djelatnost: Yup.number().required($t('preduzecaValidation.djelatnost')),
});
