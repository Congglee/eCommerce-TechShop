import { useMemo } from "react";
import { generateRange } from "../utils/fn";
import icons from "../utils/icons";

const { HiOutlineDotsHorizontal } = icons;

const usePagination = (
  totalProductCount: number,
  currentPage: number,
  siblingCount = 1
) => {
  const paginationArray = useMemo(() => {
    const limitProductPerPage =
      import.meta.env.VITE_APP_LIMIT_PRODUCT_PER_PAGE || 6;
    const paginationCount = Math.ceil(totalProductCount / limitProductPerPage);
    const totalPaginationItem = siblingCount + 5;

    if (paginationCount <= totalPaginationItem)
      return generateRange(1, paginationCount); // TH1

    const isShowLeft = currentPage - siblingCount > 2; // true or false
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);

      return [1, <HiOutlineDotsHorizontal />, ...rightRange]; // TH2
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, <HiOutlineDotsHorizontal />, paginationCount]; // TH3
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [
        1,
        <HiOutlineDotsHorizontal />,
        ...middleRange,
        <HiOutlineDotsHorizontal />,
        paginationCount,
      ]; // TH4
    }
  }, [totalProductCount, currentPage, siblingCount]);

  return paginationArray;
};

export default usePagination;

// first + last + current + sibling + 2 * dots
// min = 6 > sibling + 5
// totalPagination: 58, limitProduct = 10 > 58 / 10 = 5.8 === 6
// totalPaginationItem: sibling + 5 = 6
// sibling = 1

// [1, 2, 3, 4, 5, 6]: TH1
// [1, ..., 6, 7, 8, 9, 10]: TH2
// [1, 2, 3, 4, 5, ..., 10]: TH3
// [1, ..., 5, 6, 7, ..., 10]: TH4
