const isUnbounded = (window) => {
  const boundary = window?.documents || window?.range;
  return !boundary || boundary[0] === "unbounded" && boundary[1] === "unbounded";
};
export {
  isUnbounded
};
