import date from "date-and-time";

export default function getDate(data) {
  const dateParse = new Date(data);
  const result = date.format(dateParse, "ddd, MMM DD YYYY");
  return result;
}
