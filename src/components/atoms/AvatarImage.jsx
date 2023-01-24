/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import React from 'react';

const AvatarImage = ({ user: { photoURL, displayName } }) => {
  return (
    <div>
      <img
        css={{
          borderRadius: '50%',
          width: '70px',
          height: '70px',
        }}
        src={photoURL}
        alt={displayName}
      />
      <span css={{ fontSize: '14px' }}>{displayName}</span>
      <span
        css={{
          position: 'absolute',
          transform: 'translate(30%, -200%)',
          maxWidth: '170px',
          wordBreak: 'break-word',
          fontSize: '18px',
        }}
      ></span>
    </div>
  );
};

export default AvatarImage;
