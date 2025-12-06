import { fireEvent, render, screen } from "@testing-library/react";
import Calculator from "../components/Caculator/Caculator";

describe("<Caculator/>", () => {
  beforeEach(() => {
    // Cài đặt dữ liệu hoặc các tham số khác
  });
  test("has Caculator display somewhere", () => {
    // Sử dụng `render` và kiểm tra trong trường hợp kiểm thử cụ thể
    render(<Calculator />);

    expect(true).toBe(true);
  });

  test("has an h1 contains 'Caculator'", () => {
    render(<Calculator />);
    const titleEle = screen.getByRole("heading", { level: 1 });

    expect(titleEle.textContent).toBe("Caculator");
  });

  test("has an h2 contains 'Result'", () => {
    render(<Calculator />);
    const titleEle = screen.getByRole("heading", { level: 2 });

    expect(titleEle.textContent).toBe("Result");
  });

  test("perform 0+0 by default", () => {
    render(<Calculator />);
    const { getValueA, getValueB, getOperator, getResult } = getCalculator();

    expect(getValueA()).toBe("0");
    expect(getValueB()).toBe("0");
    expect(getOperator()).toBe("+");
    expect(getResult()).toBe("0");
  });

  test("uses correctly default values with subtract", () => {
    render(<Calculator defaultA={12} defaultB={10} defaultOperation="-" />);
    const { getValueA, getValueB, getOperator, getResult } = getCalculator();

    expect(getValueA()).toBe("12");
    expect(getValueB()).toBe("10");
    expect(getOperator()).toBe("-");
    expect(getResult()).toBe("2");
  });

  test("uses correctly default values with mutiply", () => {
    render(<Calculator defaultA={12} defaultB={10} defaultOperation="x" />);
    const { getValueA, getValueB, getOperator, getResult } = getCalculator();

    expect(getValueA()).toBe("12");
    expect(getValueB()).toBe("10");
    expect(getOperator()).toBe("x");
    expect(getResult()).toBe("120");
  });

  test("when operator is wrong", () => {
    render(<Calculator defaultA={12} defaultB={10} defaultOperation="x" />);
    const { getValueA, getValueB, getOperator, getResult } = getCalculator();
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "" },
    });

    expect(getResult()).toBe("No operator provided");
  });

  test("caculator correctly when uses update a input", () => {
    render(<Calculator defaultA={12} defaultB={10} defaultOperation="x" />);
    const { getValueA, getValueB, getOperator, getResult } = getCalculator();

    fireEvent.change(screen.getByTestId("inputA"), { target: { value: "3" } });
    expect(getResult()).toBe("30");

    fireEvent.change(screen.getByTestId("inputB"), { target: { value: "5" } });
    expect(getResult()).toBe("15");

    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "/" },
    });
    expect(getResult()).toBe("0.6");
  });

  test("caculator correctly when uses update a input incorrectly", () => {
    render(<Calculator defaultA={12} defaultB={10} defaultOperation="x" />);
    const { getResult } = getCalculator();

    fireEvent.change(screen.getByTestId("inputA"), { target: { value: "" } });
    expect(getResult()).toBe("0");

    fireEvent.change(screen.getByTestId("inputB"), { target: { value: "" } });
    expect(getResult()).toBe("0");

    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "/" },
    });
    expect(getResult()).toBe("You can't divide by 0");
  });

  test("display an error when we divide by 0", () => {
    render(<Calculator defaultA={12} defaultB={0} defaultOperation="/" />);
    const { getValueA, getValueB, getOperator, getResult } = getCalculator();

    expect(getValueA()).toBe("12");
    expect(getValueB()).toBe("0");
    expect(getOperator()).toBe("/");
    expect(getResult()).toBe("You can't divide by 0");
  });

  test("when operator is wrong when is default Operation", () => {
    render(<Calculator defaultA={12} defaultB={10} defaultOperation="!" />);
    const { getOperator } = getCalculator();

    expect(getOperator()).toBe("+");
  });
});

const getCalculator = (): {
  getValueA: () => string;
  getValueB: () => string;
  getOperator: () => string;
  getResult: () => string | null;
} => ({
  getValueA: () => (screen.getByTestId("inputA") as HTMLInputElement).value,
  getValueB: () => (screen.getByTestId("inputB") as HTMLInputElement).value,
  getOperator: () =>
    (screen.getByTestId("operator") as HTMLSelectElement).value,
  getResult: () => screen.getByTestId("result").textContent,
});
