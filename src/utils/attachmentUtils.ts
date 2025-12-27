import { TodoAttachment } from "../store/slices/todoSlice";

export const processAttachments = (
  attachments: (File | TodoAttachment)[] | undefined
): TodoAttachment[] => {
  const processedAttachments: TodoAttachment[] = [];

  if (attachments && Array.isArray(attachments)) {
    attachments.forEach((file) => {
      if (file instanceof File) {
        processedAttachments.push({
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        });
      } else if (file.name && file.type && file.size) {
        processedAttachments.push(file as TodoAttachment);
      }
    });
  }

  return processedAttachments;
};

export const revokeBlobUrls = (attachments: TodoAttachment[]) => {
  attachments.forEach((att) => {
    if (att.url?.startsWith("blob:")) {
      URL.revokeObjectURL(att.url);
    }
  });
};
