export const calculateCourseDuration = (
  startDateString: string,
  endDateString: string,
) => {
  const startDate = new Date(startDateString); //string to date format
  const endDate = new Date(endDateString);

  const dateInMiliSeconds = endDate.getTime() - startDate.getTime(); // calculate time difference between dates
  const dateInweeks = Math.ceil(dateInMiliSeconds / (1000 * 60 * 60 * 24) / 7);
  return dateInweeks;
};
