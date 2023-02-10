import React from 'react';
import { TiDelete } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import { doc } from 'firebase/firestore';
export default function SupportBoard({ chatObj, isOwner }) {
  const inquiryTextRef = doc(db, 'inquiries', `${chatObj.id}`);

  return (
    <div>
      <div>
        <h4>{chatObj.text}</h4>
        {isOwner && (
          <>
            <button>
              수정
              <FiEdit />
            </button>
            <button>
              삭제
              <TiDelete />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
