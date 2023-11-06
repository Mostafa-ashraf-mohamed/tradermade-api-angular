/*Date format*/

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getCurrentDate(): string {
  return formatDate(new Date());
}

export function getDateMonthsAgo(months: number): string {
  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() - months);

  return formatDate(targetDate);
}

export function getDateWeeksAgo(weeksAgo: number): string {
  const currentDate = new Date();
  const weeksInMilliseconds = weeksAgo * 7 * 24 * 60 * 60 * 1000;
  const targetDate = new Date(currentDate.getTime() - weeksInMilliseconds);

  return formatDate(targetDate);
}

export function getDateDaysAgo(days: number): string {
  const currentDate = new Date();
  const targetDate = new Date(
    currentDate.getTime() - days * 24 * 60 * 60 * 1000
  );

  return formatDate(targetDate);
}
