export const validateEndDate = (
  endDate: string,
  formData?: Record<string, any>
): boolean => {
  if (!endDate) return true; // Optional field

  const startDate = formData?.startDate;
  if (!startDate) return true;

  const start = new Date(startDate);
  const end = new Date(endDate);

  return end > start;
};

export const validateMaxLength =
  (maxLength: number) =>
  (value: string): boolean => {
    if (!value) return true;
    return value.length <= maxLength;
  };

export const validateURL = (url: string): boolean => {
  if (!url) return true; // Optional field
  const urlPattern =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return urlPattern.test(url);
};
