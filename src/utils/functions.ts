export const CapitalizeString = (text: string): string => {
  if (text) {
    return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
  }
  return "";
};
