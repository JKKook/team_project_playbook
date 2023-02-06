import { atom, selector } from 'recoil';
import { emailRegex, passwordRegex } from '/src/utils/auth-regex';

// export const userState = atom({
//   key: 'userState',
//   default: {
//     user,
//   },
// });

export const userFormState = atom(
  {
    key: 'userFormState', // unique ID (with respect to other atoms/selectors)
    default: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      newAccount: '',
      avatar: '',
    },
  }, // default value (aka initial value)
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

// ** 로직을 어떻게 다뤄야 할지 모르겠음...
// const authFormState = selector({
//   key: 'authFormState',
//   get: ({ get }) => {
//     const vaildateEmail = emailRegex;
//     const vaildatePassword = passwordRegex;

//     const formCheck = get(userFormState);
//     const formCheckMessage = get(userFormMessageState);
//     const isFormChecked = get(isUserState);

//     if (!vaildatePassword.test()) {
//       // formCheckMessage({...})
//     }
//   },
// });
