import dayjs from "dayjs";

/**
 * Format date string to DD/MM/YYYY format
 * @param dateString - Date string in ISO format (YYYY-MM-DD)
 * @returns Formatted date string (DD/MM/YYYY)
 */
export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("DD/MM/YYYY");
};

/**
 * Format date range (start and end dates)
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Formatted date range string
 */
export const formatDateRange = (
  startDate?: string,
  endDate?: string
): string => {
  if (!startDate && !endDate) return "No timeline";
  if (startDate && !endDate) return `From ${formatDate(startDate)}`;
  if (!startDate && endDate) return `Until ${formatDate(endDate)}`;
  return `${formatDate(startDate!)} - ${formatDate(endDate!)}`;
};
