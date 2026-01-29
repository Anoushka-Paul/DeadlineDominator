export const evaluatePriority = ({
  daysLeft,
  credits,
  marks,
  urgency,
}) => {
  return (
    (daysLeft < 5 && credits > 2) ||
    daysLeft < 2 ||
    marks > 15 ||
    urgency
  );
};
