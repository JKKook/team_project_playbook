// localStorage로 저장하기

import PerformanceList from "@/src/components/molecules/PerformanceList";
import { getBookmarkInfo } from "@/src/modules/bookmarkModules";
import { async } from "@firebase/util";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import axios from "axios";

export const getListApi = async () => {
    const list = getBookmarkInfo();
    const urlArr = [];
    list.forEach((elem) => {
        const url = `http://localhost:4000/description/${elem}`;
        urlArr.push(axios.get(url));
    });
    const response = await axios.all(urlArr);

    // 파싱
    const arr = [];
    response.map((elem) => {
        const elemData = elem.data.elements[0].elements[0].elements;
        // console.log(elemData);
        const obj = {
            id: elemData[0].elements[0]?.text || "정보없음",
            name: elemData[1].elements[0]?.text || "정보없음",
            start: elemData[2].elements[0]?.text || "정보없음",
            end: elemData[3].elements[0]?.text || "정보없음",
            place: elemData[4].elements[0]?.text || "정보없음",
            image: elemData[11].elements[0]?.text || "정보없음",
            genre: elemData[13].elements[0]?.text || "정보없음",
            isPlaying: elemData[14].elements[0]?.text || "정보없음",
        };
        arr.push(obj);
    });
    return arr;
};

const Bookmark = () => {
    const { data, isLoading } = useQuery(["listApi"], getListApi);

    // console.log(data);

    if (isLoading) {
        return <div>로딩중</div>;
    }
    if (data.length === 0) {
        return <div>북마크 정보가 없습니다.</div>;
    }
    return (
        <div>
            <PerformanceList total={data} />
        </div>
    );
};

export default Bookmark;
