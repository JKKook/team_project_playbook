/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { db, storage } from '../api/auth/firebase';
import Image from 'next/image';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDoc,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import SupportChat from '../../src/components/organisms/SupportChat';
import SupportBoard from '../../src/components/organisms/SupportBoard';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const HelpInquiry = () => {
  const router = useRouter();
  // console.log('Help', router.query.id);

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
        const attachmentRef = ref(storage, `${router.query.id}/${uuidv4()}`);
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
        creatorId: router.query.id,
        attachmentURL: attachmentURL || null,
      };
      // 지정 된 파이어베이스 경로에 docRef 추가,
      await addDoc(collection(db, 'inquiries'), docRef);
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
    // console.log(e.target.files) // fileList
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
      collection(db, 'inquiries'),
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={inquiry}
          onChange={handleChange}
          type='text'
          placeholder='문의 하실 내용을 기재해주십시오'
          maxLength={120}
        />
        {/* uploadFiles */}
        <input type='file' accept='image/*' onChange={handleFileChange} />
        <input type='submit' value='제출' />
        {attachment && (
          <div>
            <Image
              src={attachment}
              alt='UpLoad Image'
              width='400'
              height='400'
            />
            <button onClick={handleCancelAttachment}>취소</button>
          </div>
        )}
      </form>
      <div>
        {inquiries.map((inquiry) => (
          <SupportChat
            key={inquiry.id}
            chatObj={inquiry}
            isOwner={inquiry.creatorId === router.query.id}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpInquiry;
