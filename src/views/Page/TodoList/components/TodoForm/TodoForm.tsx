import { UploadOutlined } from "@ant-design/icons";
import {
  Form as AntdForm,
  Button,
  DatePicker,
  Input,
  Radio,
  Upload,
  UploadFile,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { FormLabel } from "../../../../common/FormLabel";
import { Form, FormRef } from "../../../../common/Form/Form";
import "./TodoForm.scss";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

// 🎓 ZOD SCHEMA: Define validation rules
const todoSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["todo", "in-progress", "done"] as const),
  dateRange: z
    .tuple([z.string(), z.string()])
    .refine((val) => val && val.length === 2 && val[0] && val[1], {
      message: "Timeline is required",
    })
    .refine(
      (val) => {
        const [start, end] = val;
        return new Date(start) <= new Date(end);
      },
      {
        message: "Start date must be before or equal to end date",
      }
    ),
  attachments: z
    .union([
      z.instanceof(FileList),
      z.array(z.instanceof(File)),
      z.array(
        z.object({
          id: z.number().optional(),
          name: z.string(),
          url: z.string().optional(),
        })
      ),
    ])
    .optional()
    .transform((val) => {
      // Transform FileList to array
      if (val instanceof FileList) {
        return Array.from(val);
      }
      // If it's already an array, return as is
      if (Array.isArray(val)) {
        return val;
      }
      return [];
    }),
});

export type TodoFormData = z.infer<typeof todoSchema>;

export interface TodoFormRef {
  submit: (onSubmit: (data: TodoFormData) => Promise<void>) => void;
}

interface TodoFormProps {
  initialData?: Partial<TodoFormData>;
}

export const TodoForm = React.forwardRef<TodoFormRef, TodoFormProps>(
  ({ initialData }, ref) => {
    const formRef = React.useRef<FormRef<TodoFormData>>(null);

    React.useImperativeHandle(ref, () => ({
      submit: (onSubmit) => {
        if (formRef.current) {
          formRef.current.submit(onSubmit);
        }
      },
    }));

    return (
      <Form
        ref={formRef}
        id="todo-form"
        schema={todoSchema}
        defaultValues={
          initialData || {
            status: "todo",
            name: "",
            description: "",
            dateRange: ["", ""],
            attachments: [],
          }
        }
      >
        {/* 🎓 RENDER PROPS: Receive form methods */}
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              {/* 🎓 RADIO BUTTONS: Using Controller + AntD Radio */}
              <AntdForm.Item
                label={<FormLabel required>Status</FormLabel>}
                validateStatus={errors.status ? "error" : ""}
                help={errors.status?.message as string}
              >
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Radio.Group {...field}>
                      <Radio value="todo">To Do</Radio>
                      <Radio value="in-progress">In Progress</Radio>
                      <Radio value="done">Done</Radio>
                    </Radio.Group>
                  )}
                />
              </AntdForm.Item>

              {/* 🎓 TEXT INPUT: Using Controller for AntD Input */}
              <AntdForm.Item
                label={<FormLabel required>Task Name</FormLabel>}
                validateStatus={errors.name ? "error" : ""}
                help={errors.name?.message as string}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter task name..."
                      maxLength={100}
                      count={{
                        show: true,
                        max: 100,
                      }}
                    />
                  )}
                />
              </AntdForm.Item>

              {/* 🎓 TEXTAREA: Using Controller for AntD TextArea */}
              <AntdForm.Item
                label={<FormLabel required>Description</FormLabel>}
                validateStatus={errors.description ? "error" : ""}
                help={errors.description?.message as string}
              >
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Enter description..."
                      rows={4}
                      maxLength={500}
                      count={{
                        show: true,
                        max: 500,
                      }}
                    />
                  )}
                />
              </AntdForm.Item>

              {/* 🎓 CONTROLLER: For complex components (Ant Design RangePicker) */}
              <AntdForm.Item
                label="Timeline"
                required
                validateStatus={errors.dateRange ? "error" : ""}
                help={errors.dateRange?.message as string}
              >
                <Controller
                  name="dateRange"
                  control={control}
                  render={({ field }) => (
                    <RangePicker
                      locale={locale}
                      className="date-range-picker"
                      value={
                        field.value && field.value[0] && field.value[1]
                          ? [dayjs(field.value[0]), dayjs(field.value[1])]
                          : null
                      }
                      onChange={(dates) => {
                        field.onChange(
                          dates
                            ? [
                                dates[0]?.format("YYYY-MM-DD") || "",
                                dates[1]?.format("YYYY-MM-DD") || "",
                              ]
                            : ["", ""]
                        );
                      }}
                      format="YYYY-MM-DD"
                    />
                  )}
                />
              </AntdForm.Item>

              {/* 🎓 FILE INPUT: Using Controller + AntD Upload */}
              <AntdForm.Item
                label="Attachments"
                validateStatus={errors.attachments ? "error" : ""}
                help={errors.attachments?.message as string}
              >
                <Controller
                  name="attachments"
                  control={control}
                  render={({ field: { value = [], onChange } }) => {
                    const fileList: UploadFile[] = value.map(
                      (item: any, index: number) => {
                        if (item instanceof File) {
                          return {
                            uid: (item as any).uid || `new-${index}`,
                            name: item.name,
                            status: "done",
                            originFileObj: item,
                          } as UploadFile;
                        }
                        return {
                          uid: item.id?.toString() || `existing-${index}`,
                          name: item.name,
                          status: "done",
                          url: item.url,
                          originFileObj: item, // Store ref to original item
                        } as UploadFile;
                      }
                    );

                    return (
                      <Upload
                        listType="picture"
                        fileList={fileList}
                        beforeUpload={() => false}
                        multiple
                        onChange={({ fileList: newFileList }) => {
                          const nextValue = newFileList.map((file) => {
                            return file.originFileObj || file;
                          });
                          onChange(nextValue);
                        }}
                      >
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    );
                  }}
                />
              </AntdForm.Item>
            </>
          );
        }}
      </Form>
    );
  }
);
