/** @jsxImportSource @emotion/react **/
import { css } from "@emotion/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import {
    bookmarkModule,
    handleBookMarkInfo,
    isCheckBookMark,
} from "@/src/modules/bookmarkModules";

const BookmarkHeart = ({ id }) => {
    const [state, setState] = useState(() => bookmarkModule(id));
    return (
        <>
            <span
                css={[Heart]}
                onClick={() => handleBookMarkInfo(id, setState)}
            >
                {state ? <BsHeartFill /> : <BsHeart />}
            </span>
        </>
    );
};

export default BookmarkHeart;

const Heart = css`
    cursor: pointer;
`;