/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { TiDelete } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import { db, storage } from '../../../pages/api/auth/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import Image from 'next/image';
import { deleteObject, ref } from 'firebase/storage';
const SupportChat = ({ chatObj, isOwner, isUserName, isUserPhoto }) => {
  // console.log('chat', chatObj);
  console.log('photo', isUserPhoto);
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
        <div css={[ChatFormContainer]}>
          {editting ? (
            <form onSubmit={handleUpdateSubmit}>
              <input
                css={[NewChatInput]}
                onChange={handleChange}
                value={newChat}
                required
              />
              <input css={[SubmitBtn]} type='submit' value='변경' />
              <button css={[SubmitBtn]} onClick={toggleEditting}>
                취소
              </button>
            </form>
          ) : (
            <div css={[Chat]}>
              <div css={{ display: 'flex' }}>
                <div css={[ChatUserName]}>{isUserName}</div>
                <div>
                  {isUserPhoto && (
                    <Image
                      css={[ChatUserIcon]}
                      src={isUserPhoto}
                      alt='userPhoto'
                      width={30}
                      height={30}
                    />
                  )}
                </div>
              </div>

              <p css={[ChatEditText]}>{chatObj.text}</p>
              {chatObj.attachmentURL && (
                <Image
                  css={[ChatImg]}
                  src={chatObj.attachmentURL}
                  alt='photo_image'
                  width={150}
                  height={150}
                />
              )}
            </div>
          )}

          <div css={[ChatEditDelete]}>
            <button css={[SubmitBtn]} onClick={toggleEditting}>
              수정
              <FiEdit />
            </button>
            <button css={[SubmitBtn]} onClick={handleDeleteClick}>
              삭제
              <TiDelete />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default SupportChat;

const ChatFormContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justity-content: center;
  margin-top: 3rem;
`;

const Chat = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: 35px;
  margin-top: 0.5rem;
  margin-right: 2rem;
  padding-left: 0.5rem;
  word-break: break-all;
`;

const ChatUserName = css`
  margin-bottom: 1rem;
  padding-left: 0.2rem;
  font-weight: bold;
`;

const ChatEditText = css`
  font-size: 14px;
  border: 1px solid #798777;
  border-radius: 12px;
  padding: 2rem 0;
  padding-left: 0.2rem;
  margin-bottom: 4rem;
`;

const ChatUserIcon = css`
  margin-left: 0.5rem;
  border: 1px solid white;
  border-radius: 50%;
  transform: translateY(-25%);
`;

const ChatImg = css`
  position: absolute;
  border: 1px solid white;
  border-radius: 50%;
  transform: translate(300%, -15%);
`;

const ChatEditDelete = css`
  margin-top: 0.4rem;
  margin-bottom: 4rem;
  padding-left: 0.2rem;
`;

// edit form

const NewChatInput = css`
  width: 300px;
`;

const SubmitBtn = css`
  border: none;
  border-radius: 8px;
  margin-right: 1.5rem;
  padding: 0.5rem;
  margin-top: 0.3rem;
  color: gray;
  background-color: white;
  cursor: pointer;

  &: hover {
    color: #404258;
  }
`;
