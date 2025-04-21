export const convertPageIndex = (rowIndex: number, pageIndex: number) => {
  return 10 * (pageIndex - 1) + rowIndex + 1;
};
