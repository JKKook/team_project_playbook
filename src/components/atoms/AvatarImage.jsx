/** @jsxImportSource @emotion/react */
import Image from 'next/image';
import { UserAvatar } from '../molecules/Navbar';

const AvatarImage = ({ userData: { photoURL, displayName } }) => {
  return (
    <div>
      <Image
        css={[UserAvatar]}
        src={photoURL}
        alt={displayName}
        width={30}
        height={30}
      />
    </div>
  );
};

export default AvatarImage;
