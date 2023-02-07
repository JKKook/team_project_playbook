// import { initializeApp } from 'firebase/app';
// import { addDoc, collection, getFirestore } from 'firebase/firestore';
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTU_DOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORE,
// };

// // firebaseConfig 정보로 firebase 시작
// const app = initializeApp(firebaseConfig);

// // firebase의 firestore 인스턴스를 변수에 저장
// const db = getFirestore(app);

// // ** 데이터 추가하기 **
// // collection : database table
// // document : collection에 저장되는 데이터 정보 => RestAPI의 엘리먼트라고 보면 됨

// try {
//   const docRef = await addDoc(collection(db, 'users'), {
//     name: 'user_name',
//     email: 'user_email',
//     password: 'user_passowrd',
//   });
//   console.log(docRef.id);
// } catch (error) {
//   console.error(error);
// }
