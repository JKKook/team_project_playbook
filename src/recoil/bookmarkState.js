import { atom, selector } from "recoil";
import { PERFORMANCE_LIKE_KEY } from "../contexts/localStorageKey";
import {
    getBookmarkInfo,
    removeBookMarkInfo,
} from "../modules/bookmarkModules";

// 공연정보 bookmark가 되어있는지 확인하는 상태
export const bookmarkState = atom({
    key: "bookmarkState", //유니크한 키값
    default: {
        performanceLike: [],
    }, //
});

// 1. 이미 선언된 아톰이 값이 변할때 그순간 아톰을 구독하고 있다가 셀렉터함수가 다시한번 실행됨 (아톰을 구독하는 기능)
// 2. 통신해서 response데이터값을 자기값으로 가져올 수 있다.

//
export const handlePerformanceBookmark = (id, state) => {
    const performanceInfo = getBookmarkInfo();
    console.log(state);
    if (
        !performanceInfo.find((info) => info === state) ||
        state.performanceLike[id] === false
    ) {
        localStorage.setItem(
            PERFORMANCE_LIKE_KEY,
            JSON.stringify([...performanceInfo, id])
        );
        state = {
            ...state,
            [id]: true,
        };
    } else {
        removeBookMarkInfo(id);
        state = {
            ...state,
            [id]: false,
        };
    }
};
