const toggle = (arr, element) => {
  const index = arr.indexOf(element);
  const newArr = index !== -1
    ? [...arr.slice(0, index), ...arr.slice(index + 1)]
    : [...arr, element];
  return newArr;
};

export default toggle;