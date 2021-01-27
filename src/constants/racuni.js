export const STATUS = [
  { value: 'placen', label: 'Plaćen' },
  { value: 'nenaplativ', label: 'Nenaplativ' },
  { value: 'cekaSe', label: 'Čeka Se' },
  { value: 'privremeni', label: 'Privremeni' },
  { value: 'nenaplativDug', label: 'Nenaplativ Dug' },
];

export const TIPOVI_RACUNA = [
  { value: 'racun', label: 'Račun' },
  { value: 'predracun', label: 'Predračun' }
];

export const TIPOVI_POPUSTA = [
  { value: 'procenat', label: 'Procenat %' },
  { value: 'iznos', label: 'Iznos' }
]

export const KOREKTIVNI_RACUN = [
  { value: '0', label: 'Nije' },
  { value: 'CORRECTIV', label: 'Korektivni račun' },
  { value: 'DEBIT', label: 'Debit' },
  { value: 'CREDIT', label: 'Credit' }
];


export const POSALJI_PODSJETNIK = [
  { value: 'bez_slanja', label: 'Bez slanja podsjetnika' },
  { value: 'na_dan_isteka', label: 'Pošalji na dan isteka roka plaćanja' },
  { value: 'dva_dana_prije', label: 'Pošalji 2 dana prije roka plaćanja' },
  { value: 'pet_dana_prije', label: 'Pošalji 5 dana prije roka plaćanja' },
  { value: 'deset_dana_prije', label: 'Pošalji 10 dana prije roka plaćanja' }
];

export const VRIJEME_PODSJETNIKA = [
  { value: 'svaki_dan', label: 'Svaki dan' },
  { value: 'svake_nedjelje', label: 'Svake nedjelje' },
  { value: 'svakog_mjeseca', label: 'Svakog mjeseca' },
  { value: 'svake_godine', label: 'Svake godine' }
];

export const DAN_SLANJA_NEDELJA = [
  { value: 'svakog_pondeljka', label: 'Svakog Pondeljka' },
  { value: 'svakog_utorka', label: 'Svakog Utorka' },
  { value: 'svakog_srijede', label: 'Svakog Srijede' },
  { value: 'svakog_cetvrtka', label: 'Svakog Četvrtka' },
  { value: 'svakog_petka', label: 'Svakog Petka' },
];
