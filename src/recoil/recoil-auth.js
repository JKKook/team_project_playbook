import { atom } from 'recoil';

export const userFormState = atom(
  {
    key: 'userFormState', // unique ID (with respect to other atoms/selectors)
    default: {
      name: '',
      uid: '',
      email: '',
      password: '',
      passwordConfirm: '',
      newAccount: '',
      avatar: '',
    },
  } // default value (aka initial value)
);

export const userFormMessageState = atom({
  key: 'userFormMessageState',
  default: {
    emailMessage: '',
    passwordMessage: '',
    passwordConfirmMessage: '',
  },
});

export const isUserState = atom({
  key: 'isUserState',
  default: { isEmail: false, isPassword: false, isPasswordConfirm: false },
});
