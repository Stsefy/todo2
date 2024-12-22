import Chance from "chance";
import capitalize from "./capitalize";
import getFormattedDate from "./getFormatDate";
import statuses from "../constants/statuses";

export const getTaskList = (length = 1000) => {
  return [...new Array(length)].map(() => getTask());
};

export const getTask = () => {
  const getRandomNumber = (length) => Math.floor(Math.random() * length);
  const chance = new Chance(Math.random);

  return {
    id: chance.guid(),
    title: capitalize(chance.word()),
    desc: chance.sentence(),
    created: getFormattedDate(Date.now()),
    severity: statuses[getRandomNumber(statuses.length)],
    done: false,
  };
};
