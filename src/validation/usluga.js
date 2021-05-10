import * as Yup from 'yup';
import $t from '../lang';

export const UslugeSchema = Yup.object().shape({
  naziv: Yup.string()
    .max(50, $t('validacija.unosDugacak'))
    .required($t('uslugeValidation.naziv')),
  jedinica_mjere_id: Yup.number().required(
    $t('uslugeValidation.jedinicaMjere')
  ),
  grupa_id: Yup.number().required($t('uslugeValidation.grupa_id')),
  ukupna_cijena: Yup.number().required($t('uslugeValidation.ukupna_cijena')),
  //   status: Yup.string().default($t('uslugeValidation.status')),
  //   pdv_ukljucen: Yup.number().default($t('uslugeValidation.pdv_ukljucen')),
});
