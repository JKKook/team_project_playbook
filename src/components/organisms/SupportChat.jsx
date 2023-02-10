import React from 'react';
import { TiDelete } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import { db, storage } from '../../../pages/api/auth/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import Image from 'next/image';
import { deleteObject, ref } from 'firebase/storage';
const SupportChat = ({ chatObj, isOwner }) => {
  // console.log('chat', chatObj);
  const [editting, setEditting] = useState(false);
  const [newChat, setNewChat] = useState(chatObj.text);

  const inquiryTextRef = doc(db, 'inquiries', `${chatObj.id}`);
  const inquiryAttachmentRef = ref(storage, chatObj.attachmentURL);

  const handleDeleteClick = async () => {
    const ok = window.confirm('정말로 댓글을 삭제하시겠습니까?');
    ok
      ? (await deleteDoc(inquiryTextRef)) &&
        (await deleteObject(inquiryAttachmentRef))
      : '';
  };

  const toggleEditting = () => setEditting((prev) => !prev);
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(inquiryTextRef, { text: newChat });
    // 이것 빼먹으면 변경이 안 됨!!
    setEditting(false);
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewChat(value);
  };

  return (
    <>
      {isOwner && (
        <div>
          {editting ? (
            <form onSubmit={handleUpdateSubmit}>
              <input onChange={handleChange} value={newChat} required />
              <input type='submit' value='변경' />
              <button onClick={toggleEditting}>취소</button>
            </form>
          ) : (
            <div>
              <h4>{chatObj.text}</h4>
              {chatObj.attachmentURL && (
                <Image
                  src={chatObj.attachmentURL}
                  alt='photo_image'
                  width={200}
                  height={200}
                />
              )}
            </div>
          )}
          <>
            <button onClick={toggleEditting}>
              수정
              <FiEdit />
            </button>
            <button onClick={handleDeleteClick}>
              삭제
              <TiDelete />
            </button>
          </>
        </div>
      )}
    </>
  );
};
export default SupportChat;
