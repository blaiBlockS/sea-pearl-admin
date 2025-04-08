export const convertStatus = (status: string) => {
  const target = Number(status);
  return isNaN(target) ? false : target;
};

// Disabled면 true, 아니면 false
export const updateDisabledParser = (status: string) => {
  const statusNumber = convertStatus(status);
  console.log(status, "status");
  const isStatusNumber = typeof statusNumber === "number";
  if (isStatusNumber) {
    if (statusNumber >= 2) {
      return true;
    } else {
      return false;
    }
  }

  return true;
};
