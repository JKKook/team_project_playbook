import { PERFORMANCE_LIKE_KEY } from '../contexts/localStorageKey';

export const bookmarkModule = (performanceid) => {
  const result = getBookmarkInfo();

  if (result.find((info) => info === performanceid)) {
    console.log(true);
    return true;
  } else {
    return false;
  }
};

export const getBookmarkInfo = () => {
  const result = JSON.parse(localStorage.getItem(PERFORMANCE_LIKE_KEY)) ?? [];
  return result;
};

export const removeBookMarkInfo = (performanceid) => {
  const bookmarkInfo = getBookmarkInfo();
  const newBookmarkInfo = bookmarkInfo.filter((info) => info !== performanceid);
  localStorage.setItem(PERFORMANCE_LIKE_KEY, JSON.stringify(newBookmarkInfo));
};

export const handleBookMarkInfo = (id, bookMarks,onAddMarks,onRemoveMarks) => {
  const bookmarkInfo = getBookmarkInfo();

  if (!bookmarkInfo.find((info) => info === id)) {
    localStorage.setItem(
      PERFORMANCE_LIKE_KEY,
      JSON.stringify([...bookmarkInfo, id]),
    );
    onAddMarks([...bookmarkInfo, id]);
  } else {
    removeBookMarkInfo(id);
    onRemoveMarks(bookMarks,id);
  }
};

