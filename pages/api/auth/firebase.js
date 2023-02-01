import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTU_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// export const firebaseAuth = getAuth(app);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 사용자가 로그인을 호출할 때, firebase에서 제공하는 config 사용
export const auth = getAuth(app);
const user = auth.currentUser;
// const newPassword = getASecureRandomPassword();

// 파이어베이스 Authentication 사용
const providerGoogle = new GoogleAuthProvider();
const providerMeta = new FacebookAuthProvider();

// 비밀번호 변경
// ** 단, 비밀번호를 설정하려면 사용자가 최근에 로그인한 적이 있어야 한다!
export const changePassword = async (newPassword) => {
  updatePassword(user, newPassword)
    .then(() => {
      // Update successful.
    })
    .catch(console.error);
};

// email 인증을 통해 비밀번호 변경
export const changePassowordFromEmail = async () => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch(console.error);
};

// 신규 사용자 등록
export const signUp = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password).catch(console.error);
};

// 기존 사용자 로그인
export const signIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password).catch(console.error);
};

// Google 사용자 로그인
// auth, provider가 호출되면 결과 값으로 user의 정보를 받아옵니다. 에러가 발생 시, 에러 메시지를 호출합니다.
export const loginWithGoogle = () => {
  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      return result.token;
    })
    .catch(console.error);
};

// Meta, faceBook 사용자 로그인
export const loginWithMeta = () => {
  signInWithPopup(auth, providerMeta).catch(console.error);
};

// logout 로직입니다. 데이터는 firebase를 토대로 받아옵니다.
// singOut매서드가 호출되며 데이터는 빈 값을 갖게 됩니다.
export const logout = async () => {
  return signOut(auth).then(() => null);
};

// Login 컴포넌트의 지속성을 유지해줍니다.
export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
    console.log(user);
  });
};
