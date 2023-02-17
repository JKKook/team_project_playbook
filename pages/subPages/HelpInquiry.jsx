/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storeDatabase, storage } from '../api/auth/firebase';
import SupportChat from '../../src/components/organisms/SupportChat';
import { LoginInnerContainer } from './Login';
import { SupportHeader } from '../mainPages/Support';
import { MdPhotoCamera } from 'react-icons/md';
import { BsChatLeftText } from 'react-icons/bs';

const HelpInquiry = () => {
  const router = useRouter();

  const [inquiry, setInquiry] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [attachment, setAttachment] = useState('');

  // uploadImg and then addDoc
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 텍스트만 첨부 할 때도 있으니 초기값을 지워준다
      let attachmentURL;
      if (attachment !== '') {
        // upload attachment
        const attachmentRef = ref(
          storage,
          `${router.query.user[0]}/${uuidv4()}`,
        );
        const response = await uploadString(
          attachmentRef,
          attachment,
          'data_url',
        );
        attachmentURL = await getDownloadURL(response.ref); // url은 ref안에 존재 공식사이트 참고
      }
      // updata docRef
      const docRef = {
        text: inquiry,
        createdAt: serverTimestamp(),
        creatorId: router.query.user[0],
        attachmentURL: attachmentURL || null,
      };
      // 지정 된 파이어베이스 경로에 docRef 추가,
      await addDoc(collection(storeDatabase, 'inquiries'), docRef);
      // 다 넣어줬으면 초기화
      setInquiry('');
      setAttachment('');
    } catch (error) {
      console.error('다음과 같은 에러가 발생했습니다 :', error);
    }
  };

  const handleChange = ({ target: { value } }) => {
    setInquiry(value);
  };

  const handleFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const currFiles = files[0];
    // 파일 리더를 쓰지 않으면 기존의 파일에서 value를 받아올 수 없음
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent); // target, result : value
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (currFiles) reader.readAsDataURL(currFiles);
  };

  // mount 될 시, getDocs 목록의 데이터를 가져 온다
  useEffect(() => {
    // getInquiries();
    // 데이터베이스가 realtime으로 변화를 인지할 수 있도록
    const userCollectionInquiries = query(
      collection(storeDatabase, 'inquiries'),
      // 최신순으로 업데이트
      orderBy('createdAt', 'desc'),
    );
    // snapshot이 의미하는 바는 CRUD 형식의 데이터 관리를 의미한다
    onSnapshot(userCollectionInquiries, (snapshot) => {
      const userInquiresArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInquiries(userInquiresArr);
    });
  }, []);

  const handleCancelAttachment = () => {
    setAttachment(null);
  };

  return (
    <section css={[Section]}>
      <div css={[SupportHeader]}>
        <h3 css={[SectionHeadLine]}>
          문의 사항을 남겨주세요
          <BsChatLeftText css={{ paddingLeft: '1rem' }} />
        </h3>
      </div>
      <div css={[LoginInnerContainer]}>
        <div css={[ChatContainer]}>
          <form css={[FormContainer]} onSubmit={handleSubmit}>
            <p css={[FormUser]}>궁금하신 사항이 있으신가요?</p>
            <div>
              <div css={{ position: 'relative' }}>
                <input
                  css={[FormInput]}
                  value={inquiry}
                  onChange={handleChange}
                  type='text'
                  placeholder='댓글을 남겨보세요'
                />

                {attachment && (
                  <div css={[AttachmentContainer]}>
                    <Image
                      src={attachment}
                      alt='UpLoad Image'
                      width='60'
                      height='60'
                    />
                    <button css={[SubmitBtn]} onClick={handleCancelAttachment}>
                      취소
                    </button>
                  </div>
                )}
              </div>

              {/* uploadFiles */}
              <div css={[FormFooter]}>
                <input
                  css={[inputFile]}
                  id='input-file'
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                />
                <label htmlFor='input-file'>
                  <MdPhotoCamera css={{ cursor: 'pointer' }} />
                </label>
                <input css={[SubmitBtn]} type='submit' value='등록' />
              </div>
            </div>
          </form>
          <div css={[ChatTextContainer]}>
            {inquiries.map((inquiry) => (
              <SupportChat
                key={inquiry.id}
                chatObj={inquiry}
                isOwner={inquiry.creatorId === router.query.user[0]}
                isUserName={router.query.user[1]}
                isUserEmail={router.query.user[2]}
                isUserPhoto={router.query.user[3]}
                isAdmin={router.query.user[4]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpInquiry;

const Section = css`
  min-height: 100vh;
  padding-top: 0;
  margin-bottom: 4rem;
`;

const SectionHeadLine = css`
  font-size: 1.6rem;
  font-weight: bold;
  color: #ce7777;
`;

const FormContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0;
  padding-left: 1.2rem;
  width: 100%;
  height: 150px;
  background-color: #f3f4ed;
  border-radius: 12px;
`;

const FormUser = css`
  font-size: 1rem;
  font-weight: bold;
  margin: 2rem 0;
  color: #3c4048;
`;

export const FormInput = css`
  width: 90%;
  height: 30px;
  border: none;
  color: #3c4048;
`;

const inputFile = css`
  display: none;
`;

const FormFooter = css`
  display: flex;
  margin: 1.5rem 0;
  font-size: 20px;
  justify-content: space-between;
`;

export const SubmitBtn = css`
  border: none;
  margin-right: 1.5rem;
  color: gray;
  background-color: #f3f4ed;
  cursor: pointer;

  &: hover {
    color: #404258;
  }
`;

const ChatContainer = css`
  max-width: 1000px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 3rem;
`;

const AttachmentContainer = css`
  position: absolute;
  transform: translate(50%, 0%);
`;

// ****** 구분선

const ChatTextContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
  background-color: white;
  width: 100%;
  border-radius: 12px;
`;
