/** @jsxImportSource @emotion/react */
import React from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  return (
    <>
      <div
        css={{
          display: ' flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#3C6255',
        }}
      >
        <div
          css={{
            padding: '50px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '10px 10px 5px -2px rgba(0,0,0,0.07)',
            WebkitBoxShadow: '10px 10px 5px -2px rgba(0,0,0,0.07)',
            MozBoxShadow: '10px 10px 5px -2px rgba(0,0,0,0.07)',
          }}
        >
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              marginBottom: '0px',
            }}
          >
            <h2 css={{ marginBottom: '0.5rem' }}>PlayBook ID 생성</h2>
            <p
              css={{ marginTop: '0.5rem', marginBottom: '2rem', color: 'gray' }}
            >
              PlayBook Account 생성중
            </p>
          </div>
          <div css={{ display: 'flex', flexDirection: 'column' }}>
            <form css={{ display: 'flex', flexDirection: 'column' }}>
              <p css={{ margin: '0.5rem 0', color: 'gray' }}>이메일</p>
              <input
                css={{
                  display: 'flex',
                  width: '450px',
                  height: '36px',
                  border: '1px solid gray',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                  textIndent: '1rem',
                  fontSize: '16px',
                  color: 'darkgrey',
                }}
                type='email'
                name='email'
                placeholder='생성하고자 하는 이메일 주소를 입력하십시오'
                required
              />
              <div>
                <p css={{ margin: '0.5rem 0', color: 'gray' }}>비밀번호</p>
                <input
                  css={{
                    display: 'flex',
                    width: '450px',
                    height: '36px',
                    border: '1px solid gray',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    textIndent: '1rem',
                    fontSize: '16px',
                    color: 'darkgrey',
                  }}
                  type='password'
                  name='password'
                  placeholder='생성하고자 하는 비밀번호를 입력하십시오'
                  required
                  autoComplete='on'
                />
                <p
                  css={{
                    margin: '1.5rem 0',
                    color: 'darkgrey',
                    fontSize: 'small',
                  }}
                >
                  *비밀번호는 6자 이상이어야 하며 공백으로 시작하거나 끝날 수
                  없습니다.
                </p>
                <p css={{ margin: '0.5rem 0', color: 'gray' }}>
                  새 비밀번호 확인
                </p>
                <input
                  css={{
                    display: 'flex',
                    width: '450px',
                    height: '36px',
                    border: '1px solid gray',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    textIndent: '1rem',
                    fontSize: '16px',
                  }}
                  type='password'
                  name='password'
                  required
                  autoComplete='on'
                />
              </div>
              <div
                css={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <input
                  css={{
                    width: '455px',
                    height: '55px',
                    border: 'none',
                    borderRadius: '4px',
                    margin: '1rem 0',
                    fontSize: '20px',
                    color: 'white',
                    backgroundColor: '#A3BB98',
                    textAlign: 'center',
                    ':hover ': {
                      backgroundColor: '#3C6255',
                    },
                  }}
                  type='submit'
                  value='PlayBook ID 생성'
                />
              </div>
            </form>
          </div>
          <div css={{ textAlign: 'left', marginTop: '4rem' }}>
            <span css={{ color: 'gray' }}>플레이북 ID가 이미 있으십니까?</span>
            <span
              onClick={() => router.push('/subPages/Login')}
              css={{
                marginLeft: '1rem',
                color: '#658864',
                fontWeight: '600',
                cursor: 'pointer',
                ':hover ': { textDecoration: 'underline', color: '#1A0000' },
              }}
            >
              로그인
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
