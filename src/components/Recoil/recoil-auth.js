import { atom, selector, selectorFamily } from 'recoil';
import { emailRegex, passwordRegex } from '/src/utils/auth-regex';
import axios from 'axios';
import { async } from '@firebase/util';

// export const userInitState = atom({
//   key: 'userInit',
//   default: false,
// });

export const userState = atom({
  key: 'userState',
  default: null || undefined,
});

// TypeScript 실행오류 Cannot add property, object is not extensible

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

// ** store, server axios 전역관리

// 현재 화면에 표시할 performance의 id
const currentPerformanceIdState = atom({
  key: 'CurrentPerformanceId',
  default: 0,
});

// performance 정보
const currentPerformanceState = selector({
  key: 'CurrentPerformance',
  get: async ({ get }) => {
    const performanceId = get(currentPerformanceIdState);
    return axios
      .get(`http://localhost:4000/description/${performanceId}`)
      .then((response) => response.data);
  },
});

// performance 상세 정보
const currentDescriptionState = selectorFamily({
  key: 'CurrentDescription',
  get: async (currentPerformanceState) => {
    const response = await MyDBQuery({ currentPerformanceState });
    if (response.error) {
      throw response.error;
    }
    const resData = data.data.elements[0].elements[0].elements;
    return {
      id: resData[0].elements[0].text,
      name: resData[1].elements[0].text,
      from: resData[2].elements[0].text,
      to: resData[3].elements[0].text,
      actor: resData[5].elements[0].text,
      runtime: resData[7].elements[0].text,
      place: resData[4].elements[0].text,
      price: resData[10].elements[0].text,
      genre: resData[13].elements[0].text,
      posterImage: resData[11].elements[0].text,
      descriptImage: resData[16].elements[0].elements[0].text,
    };
  },
});
