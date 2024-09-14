export const getDateOfCurrentWeek = (dayOfWeek: number) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  
  // Adjust currentDay to start the week from Monday
  const adjustedCurrentDay = (currentDay === 0) ? 6 : currentDay - 1;
  
  const daysToAdd = dayOfWeek - adjustedCurrentDay;
  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() + daysToAdd);
  return targetDate;
};

// Helper function to format the date
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Mapping day names to numbers
export const dayOfWeekMap = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};