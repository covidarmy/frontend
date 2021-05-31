const getFormattedDate = (date) => {
  // 2021-05-29T05:31:06.921Z
  const dateString = date.split("-");
  const year = dateString[0];
  const month = dateString[1];
  const day = dateString[2].split("T")[0];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedString = `${day} ${monthNames[+month - 1]} ${year}`;
  return formattedString;
};

export const getFormattedDateString = (createdAt, updatedAt) => {
  let formattedString = "";
  if (createdAt === updatedAt) {
    formattedString += `Added at ${getFormattedDate(createdAt)}`;
  } else {
    formattedString += `Last updated at ${getFormattedDate(updatedAt)}`;
  }

  return formattedString;
};
