import { PERFORMANCE_LIKE_KEY } from "../contexts/localStorageKey"

export const bookmarkModule = (performanceid) => {
    const result = getBookmarkInfo();

    // if (!result) return false;

    if (result.find((info) => info === performanceid)) {
        console.log(true);
        return true;
    } else {
        return false;
    }
}

export const getBookmarkInfo = () => {
    const result = 
        JSON.parse(localStorage.getItem(PERFORMANCE_LIKE_KEY)) ?? [];
    
    return result;
}

export const removeBookMarkInfo = (performanceid) => {
    const bookmarkInfo = getBookmarkInfo();
    const newBookmarkInfo = bookmarkInfo.filter((info) => info !== performanceid);
    localStorage.setItem(PERFORMANCE_LIKE_KEY, JSON.stringify(newBookmarkInfo));
};

export const handleBookMarkInfo = (id, state) => {
    const bookmarkInfo = getBookmarkInfo();
    
    if (!bookmarkInfo.find((info) => info === id)) {
        localStorage.setItem(PERFORMANCE_LIKE_KEY, JSON.stringify([...bookmarkInfo, id]));
        state(true);
    }
    else {
        removeBookMarkInfo(id);
        state(false);
    }
}

export const isCheckBookMark = (id) => {
    const bookmarkInfo = getBookmarkInfo();

    if(!bookmarkInfo.find((info) => info === id)) {
        return false;
    }
    return true;
}

