import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BoxRemark from "../components/BoxRemark/BoxRemark";
jest.mock("axios");

describe("<BoxRemark/>", () => {
  let props: any;
  let components: any;
  beforeEach(() => {
    props = {
      onDataChange: jest.fn(),
      onSubmitData: jest.fn(),
      maxLength: 10,
      listRemark: ["123", "456", "789"],
    };
  });

  test("onChange Textarea", () => {
    render(<BoxRemark {...props} />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "new remark" } });
    expect(textarea.value).toBe("new remark");
    fireEvent.change(textarea, { target: { value: "new remark 2" } });
    expect(textarea.value).toBe("new remark 2");
  });

  test("onChange Textarea maxLength", () => {
    render(<BoxRemark {...props} />);
    const longText = "012345678901234567890123456789";
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    userEvent.type(textarea, longText);
    expect(textarea.value).toHaveLength(10);
    expect(textarea.value).toBe("0123456789");
  });
});
