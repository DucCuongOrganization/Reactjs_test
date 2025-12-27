export const STATUS_LABELS: Record<string, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export const getStatusLabel = (status: string): string => {
  return STATUS_LABELS[status] || status;
};
