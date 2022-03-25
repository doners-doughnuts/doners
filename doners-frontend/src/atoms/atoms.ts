import { atom } from 'recoil';

export const signupState = atom({
  key: 'signupState',
  default: '',
});

export const isLoggedState = atom({
  key: 'isLoggedState',
  default: false,
});
