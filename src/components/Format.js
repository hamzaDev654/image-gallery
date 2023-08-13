const format = (date) => {
  const inputDate = new Date(date);
  const day = inputDate.getUTCDate();
  const month = inputDate.toLocaleString("default", { month: "short" });
  const year = inputDate.getUTCFullYear();
  const output = `${day} ${month} ${year}`;
  return output;
};

export default format;
