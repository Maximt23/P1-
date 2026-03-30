export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString(); // Built-in fallback
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
