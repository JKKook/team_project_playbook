import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null,
});

export const authModalState = atom({
  key: 'authModalState',
  default: {
    open: false,
    view: 'login',
  },
});
