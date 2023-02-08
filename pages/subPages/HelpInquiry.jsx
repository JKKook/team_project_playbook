/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { db } from '../api/auth/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

const HelpInquiry = () => {
  const router = useRouter();
  console.log('Help', router);
  const [inquiry, setInquiry] = useState('');
  const [inquiries, setInquiries] = useState([]);

  // addDoc
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'inquiries'), {
        text: inquiry,
        createdAt: serverTimestamp(),
      });
      console.log('addDoc에 추가됩니다 :', docRef);
      setInquiry('');
    } catch (error) {
      console.error('다음과 같은 에러가 발생했습니다 :', error);
    }
  };

  // getDocs
  const getInquiries = async () => {
    const userCollectionInquiries = query(collection(db, 'inquiries'));
    const querySnapshot = await getDocs(userCollectionInquiries);
    querySnapshot.forEach((doc) => {
      const queryObj = {
        ...doc.data(),
        id: doc.id,
      };
      setInquiries((prev) => [queryObj, ...prev]);
    });
  };
  console.log(inquiries);

  const handleChange = ({ target: { value } }) => {
    setInquiry(value);
  };

  // mount 될 시, getDocs 목록의 데이터를 가져 온다
  useEffect(() => {
    getInquiries();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={inquiry}
          onChange={handleChange}
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='submit' value='제출' />
      </form>
      <div>
        {inquiries.map((inquiry) => (
          <div key={inquiry.id}>
            <h4>{inquiry.inquiry}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpInquiry;
