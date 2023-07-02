export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const convertedDate = date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return convertedDate;
};
