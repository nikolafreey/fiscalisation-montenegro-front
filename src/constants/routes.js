export const HOME = '/';

export const AUTH = {
  LOGIN: '/login',
  FORGOT: '/password/forgot',
  FORGOT_SUCCESS: '/password/forgot/success',
  RESET: '/password/reset/:token',
  RESET_SUCCESS: '/password/reset/success',
  PASSWORD: '/password',
};

export const FIZICKA_LICA = {
  INDEX: '/fizicka-lica',
  EDIT: '/fizicka-lica/edit/:id',
  CREATE: '/fizicka-lica/create',
  SHOW: '/fizicka-lica/:id',
};
export const RACUNI = {
  INDEX: '/racuni',
  EDIT: '/racuni/edit/:id',
  CREATE: '/racuni/create',
  SHOW: '/racuni/show/:id',
  BEZGOTOVINSKI: {
    CREATE: '/racuni/bezgotovinski/create',
    SHOW: '/racuni/bezgotovinski/show/:id',
    EDIT: '/racuni/bezgotovinski/edit/:id',
  },
};
export const ULAZNI_RACUNI = {
  INDEX: '/ulazni-racuni',
  EDIT: '/ulazni-racuni/edit/:id',
  CREATE: '/ulazni-racuni/create',
  SHOW: '/ulazni-racuni/:id',
};
export const PREDRACUNI = {
  INDEX: '/predracuni',
  EDIT: '/predracuni/edit/:id',
  CREATE: '/predracuni/create',
  SHOW: '/predracuni/:id',
};
export const PARTNERI = {
  INDEX: '/partneri',
  EDIT: '/partneri/edit/:id',
  CREATE: '/partneri/create',
  SHOW: '/partneri/:id',
};
export const PREDUZECA = {
  INDEX: '/preduzeca',
  PARTNERI: '/preduzeca/partneri',
  EDIT: '/preduzeca/edit/:id',
  CREATE: '/preduzeca/create',
  SHOW: '/preduzeca/:id',
};

export const STAVKE = {
  INDEX: '/stavke',
  EDIT_USLUGE: '/stavke/usluge/edit/:id',
  EDIT_ROBE: '/stavke/robe/edit/:id',
  CREATE_USLUGE: '/stavke/usluge/create',
  CREATE_ROBE: '/stavke/robe/create',
};

export const ROBE = {
  INDEX: '/robe',
  EDIT: '/robe/edit/:id',
  CREATE: '/robe/create',
  SHOW: '/robe/:id',
};

export const USLUGE = {
  INDEX: '/usluge',
  EDIT: '/usluge/edit/:id',
  CREATE: '/usluge/create',
  SHOW: '/usluge/:id',
};



export const ERRORS = {
  NOT_FOUND: '/not_found',
};
