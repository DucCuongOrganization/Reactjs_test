import { zodResolver } from "@hookform/resolvers/zod";
import { Form as AntdForm } from "antd";
import { ReactNode, forwardRef, useImperativeHandle } from "react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { ZodType } from "zod";
import "./Form.scss";

interface FormProps<T extends FieldValues> {
  schema: ZodType<T, any, any>;
  defaultValues?: Partial<T>;
  children: (methods: UseFormReturn<T>) => ReactNode;
}

/**
 * Generic Form component sử dụng React Hook Form + Zod validation
 *
 * @template T - Type của form data (must extend FieldValues)
 * @param schema - Zod validation schema
 * @param defaultValues - Initial form values
 * @param children - Render function nhận form methods
 */
export interface FormRef<T extends FieldValues> {
  submit: (onSubmit: (data: T) => Promise<void>) => void;
}

export const Form = forwardRef(function Form<T extends FieldValues>(
  { schema, defaultValues, children, id }: FormProps<T> & { id?: string },
  ref: React.Ref<FormRef<T>>
) {
  const methods = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
  });

  useImperativeHandle(ref, () => ({
    submit: (onSubmit) => {
      methods.handleSubmit(onSubmit)();
    },
  }));

  return (
    <AntdForm id={id} layout="vertical" requiredMark={true}>
      {children(methods as unknown as UseFormReturn<T>)}
    </AntdForm>
  );
});
