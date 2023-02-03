// import React, { createContext, useState } from 'react';

// const UserContext = createContext({
//   loggedUser: {
//     email: '',
//     password: '',
//   },
//   loggedIn: false,
//   setLoggedUser: () => {},
//   setLoggedIn: () => {},
// });

// const UserContextProvider = ({ children }) => {
//   const [userState, setUserState] = useState(initialValue);
//   const setLoggedUser = (data) => {
//     setUserState((prev) => ({ ...prev, loggedUser: data }));
//   };

//   const setLoggedIn = () => {
//     setUserState((prev) => ({ ...prev, loggedIn: !prev.loggedIn }));
//   };

//   const initialValue = {
//     loggedUser: {},
//     loggedIn: false,
//     setLoggedUser,
//     setLoggedIn,
//   };

//   return (
//     <UserContext.Provider value={userState}>{children}</UserContext.Provider>
//   );
// };
// export default UserContextProvider;
