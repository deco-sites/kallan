export const generateUniqueId = () => {
  const timestamp = new Date().getTime().toString();
  const randomNum = Math.floor(Math.random() * 1000000).toString();
  return timestamp + randomNum;
};
