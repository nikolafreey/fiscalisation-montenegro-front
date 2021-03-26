import * as Yup from 'yup';
import $t from '../lang';

export const BezgotovinskiSchema = Yup.object().shape({
  partner_id: Yup.number().required($t('bezgotovinskiValidation.partner_id')),
  jedinica_mjere_id: Yup.number().required($t('robeValidation.jedinica_mjere')),
  proizvodjac_robe_id: Yup.number().required(
    $t('robeValidation.proizvodjac_robe_id')
  ),
  ukupna_cijena: Yup.number().required(
    $t('bezgotovinskiValidation.ukupna_cijena')
  ),
  kolicina: Yup.number()
    .positive($t('bezgotovinskiValidation.pozitivan'))
    .required($t('bezgotovinskiValidation.kolicina')),
});
