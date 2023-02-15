/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { db, storage } from '../../../pages/api/auth/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { TiDelete } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';

const SupportChat = ({ chatObj, isOwner, isUserName, isUserPhoto }) => {
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
                placeholder='변경하실 내용을 입력해주세요'
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
                  width={200}
                  height={200}
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
  margin-top: 2rem;
  border: 1px solid #f3f4ed;
  border-radius: 12px;
`;

const Chat = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  height: 35px;
  margin-top: 5rem;
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
  width: 100%;
  font-size: 14px;
  border-radius: 12px;
  padding: 0.5rem 0;
  padding-left: 0.8rem;
  margin-bottom: 4rem;
  background-color: #f3f4ed;
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
  // border-radius: 12px;
  transform: translate(300%, 10%);
  aspect-ratio: 1/1;
`;

const ChatEditDelete = css`
  margin-top: 0.4rem;
  margin-bottom: 4rem;
  padding-left: 0.2rem;
`;

// edit form
const NewChatInput = css`
  width: 300px;
  border: none;
  font-size: 14px;
  padding-left: 0.8rem;
  margin-bottom: 4rem;
  background-color: #f3f4ed;
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
