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
  updateProfile,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase, ref, child, get } from 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTU_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORE,
};

// initialize App for firebase
const app = initializeApp(firebaseConfig);

// database
export const database = getDatabase(app);
// store database
export const storeDatabase = getFirestore(app);
// storage
export const storage = getStorage(app);
// authentication
export const auth = getAuth(app);

// social authentication provider
const providerGoogle = new GoogleAuthProvider();
const providerMeta = new FacebookAuthProvider();

// update profile
export const changeProfile = async (userName, userAvatar) => {
  const user = auth.currentUser;
  const displayName = user.displayName;
  const photoURL = user.photoURL;
  updateProfile(user, displayName, photoURL, {
    displayName: userName,
    photoURL: userAvatar,
  });
};

// updateProfile(auth.currentUser, {
//   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(() => {
//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });

// 비밀번호 변경
// ** 단, 비밀번호를 설정하려면 사용자가 최근에 로그인한 적이 있어야 한다!
export const changePassword = async (newPassword) => {
  const user = auth.currentUser;
  updatePassword(user, newPassword)
    .then(() => {
      // Update successful.
    })
    .catch(console.error);
};

// email 인증을 통해 비밀번호 변경
export const changePassowordFromEmail = async (email) => {
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
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  ).catch(console.error);
  return userCredential.user;
};

// Google 사용자 로그인
// auth, provider가 호출되면 결과 값으로 user의 정보를 받아옵니다. 에러가 발생 시, 에러 메시지를 호출합니다.
export const loginWithGoogle = () => {
  signInWithPopup(auth, providerGoogle).then().catch(console.error);
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
// isLoggedIn인 경우 user의 정보를
export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
};

// User admin ** readAndWrite Data in firebase
const adminUser = async (user) => {
  // 사용자가 어드민 권한을 갖고 있는지 확인
  // {...user, isAdmin : true }

  return get(ref(database, 'admins')).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
};
