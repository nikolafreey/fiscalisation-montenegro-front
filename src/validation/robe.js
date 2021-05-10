import * as Yup from 'yup';
import $t from '../lang';

export const RobeSchema = Yup.object().shape({
  naziv: Yup.string()
    .max(50, $t('validacija.unosDugacak'))
    .required($t('robeValidation.naziv')),
  jedinica_mjere_id: Yup.number().required($t('robeValidation.jedinica_mjere')),
  // ukupna_cijena: Yup.number().required($t('robeValidation.ukupna_cijena')),
  proizvodjac_robe_id: Yup.number().required(
    $t('robeValidation.proizvodjac_robe_id')
  ),
});
