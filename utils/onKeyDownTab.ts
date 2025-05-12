export const onKeyDownTab = (index: number) => {
  const refs = document.querySelectorAll("._auto-clickable");

  if (refs[index + 1]) {
    (refs[index + 1] as HTMLButtonElement).click();
  } else {
    (refs[0] as HTMLButtonElement).click();
  }
};
