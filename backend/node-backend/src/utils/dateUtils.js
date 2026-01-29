export const getDaysLeft = (dueDate) => {
  const today = new Date();
  return Math.ceil((new Date(dueDate) - today) / (1000 * 60 * 60 * 24));
};
