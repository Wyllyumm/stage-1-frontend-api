import { checkResponse } from "./Api";
import { APIkey } from "./../utils/constants";

const currentDate = new Date();
const lastWeekDate = new Date();
lastWeekDate.setDate(currentDate.getDate() - 7);

const formatDate = (date) => date.toISOString().split("T")[0]; // Extract YYYY-MM-DD and removes time

const currentDateString = formatDate(currentDate);
const lastWeekDateString = formatDate(lastWeekDate);

export const getNews = (keyword) => {
  console.log("fetching news for keyword:", keyword);
  return fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&from=${lastWeekDateString}&to=${currentDateString}&pageSize=100&apiKey=${APIkey}`
  )
    .then(checkResponse)
    .then((data) => data.articles);
};
