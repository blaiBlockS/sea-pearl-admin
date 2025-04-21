export function combineDateAndTime(datePart: Date, timePart: Date): Date {
  const year = datePart.getFullYear();
  const month = datePart.getMonth(); // 0-based
  const date = datePart.getDate();

  const hours = timePart.getHours();
  const minutes = timePart.getMinutes();

  return new Date(year, month, date, hours, minutes);
}
