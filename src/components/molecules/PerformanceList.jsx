/** @jsxImportSource @emotion/react **/
import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { addReservation } from "@/pages/description/[performenceid]";
import BookmarkHeart from "../atoms/BookmarkHeart";
import { useRecoilState } from "recoil";
import {
    bookmarkState,
    handlePerformanceBookmark,
} from "@/src/recoil/bookmarkState";
import {
    bookmarkModule,
    handleBookMarkInfo,
    isCheckBookMark,
} from "@/src/modules/bookmarkModules";
import { useState } from "react";

// react query localstorage : user, email 등등...

const PerformanceList = ({ total }) => {
    // const [bookmarkList, setBookmarkList] = useRecoilState(bookmarkState);

    return (
        <div css={[Performances]}>
            {total.map((elem, idx) => (
                <div key={idx} css={[CardContainer]}>
                    <Link href={`/description/${elem.id}`}>
                        <Image
                            src={elem.image}
                            alt={"이미지"}
                            height={400}
                            width={288}
                            css={[ImgBox]}
                        />
                    </Link>
                    <div css={[CardBody]}>
                        <h5 css={[CardTitle]} title={elem.name}>
                            {elem.name}
                            <span css={[CardBookmark]}>
                                <BookmarkHeart id={elem.id} />
                            </span>
                        </h5>
                        <p css={[Detail]} title={elem.place}>
                            장소 : {elem.place}
                        </p>
                        <p css={[Detail]}>장르 : {elem.genre}</p>

                        <p css={[Detail]}>
                            기간 : {elem.start} ~ {elem.end}
                        </p>
                        <p css={[Detail, PlayingStatus]}>{elem.isPlaying}</p>

                        <div css={[ButtonContainer]}>
                            <Link
                                css={[ButtonToDetail, LinkToDescription]}
                                href={`/description/${elem.id}`}
                            >
                                자세히
                            </Link>
                            <Link href="/subPages/Order">
                                <button
                                    css={[ButtonToDetail, ReserveButton]}
                                    onClick={addReservation}
                                >
                                    예약하기
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PerformanceList;

const Performances = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    justify-content: center;
    align-items: cetner;
    margin: 20px 0;
    row-gap: 5rem;
<<<<<<< HEAD
    // background-color: #fff;
=======
    background-color: #fff;
>>>>>>> 5549379 (FEAT: Add to Bookmark Button and Bookmark Page)
`;

const CardContainer = css`
    width: 18rem;
    margin: 30px auto;
    osition: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;

const ImgBox = css`
    height: 350px;
    width: 100%;
    border-radius: 0.25rem;
`;

const CardBody = css`
    display: flex;
    flex-direction: column;
    min-height: 1px;
    padding: 1.25rem;
`;

const CardTitle = css`
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
    margin-bottom: 2rem;
    margin-right: 0.2rem;
    font-size: 1.25rem;
`;
const CardBookmark = css`
    padding: 0;
    marign: 0;
    margin-left: 0.5rem;
`;
const Detail = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 1rem;
`;

const PlayingStatus = css`
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 2rem;
    color: #dc3545;
    font-weight: 600;
`;

const ButtonContainer = css`
    margin-right: 0;
    margin-left: 0;
    justify-content: space-between;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
    flex-wrap: wrap;
`;

const ButtonToDetail = css`
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
`;

const LinkToDescription = css`
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
`;

const ReserveButton = css`
    width: 100%;
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
    cursor: pointer;
`;
