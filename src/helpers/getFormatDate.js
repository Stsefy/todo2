const getFormattedDate = (date) => {
  const formatDateComponent = (part) => (part < 10 ? "0" : "") + part;

  const now = new Date(date);
  const day = formatDateComponent(now.getDate());
  const month = formatDateComponent(now.getMonth() + 1);
  const year = now.getFullYear();
  const hours = formatDateComponent(now.getHours());
  const minutes = formatDateComponent(now.getMinutes());
  const seconds = formatDateComponent(now.getSeconds());

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

export default getFormattedDate;