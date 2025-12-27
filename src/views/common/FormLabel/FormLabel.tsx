interface FormLabelProps {
  children: React.ReactNode;
  required?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({ children, required }) => {
  return (
    <>
      {children}
      {required && (
        <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>
      )}
    </>
  );
};
