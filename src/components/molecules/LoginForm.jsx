import { signIn } from '../../../pages/api/auth/firebase';
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // email과 비밀번호로 로그인
  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn(email, password);
    const resultRouter = await router.push('/');
    return result && resultRouter;
  };

  return <div></div>;
};
export default LoginForm;
