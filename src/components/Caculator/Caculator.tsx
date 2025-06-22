import React, { Fragment, JSX, useState } from "react";
import * as Math from "../../utils/mathFunction";

type CalculatorProps = {
  defaultA?: number;
  defaultB?: number;
  defaultOperation?: string;
};

const OPERATORS = ["+", "-", "x", "/"];

const Calculator = ({
  defaultA = 0,
  defaultB = 0,
  defaultOperation = "+",
}: CalculatorProps): JSX.Element => {
  const [inputValueA, setInputValueA] = useState<number>(
    !defaultA || isNaN(defaultA) ? 0 : Number(defaultA)
  );
  const [inputValueB, setInputValueB] = useState<number>(
    !defaultB || isNaN(defaultB) ? 0 : Number(defaultB)
  );
  const [operator, setOperator] = useState<string>(
    OPERATORS.includes(defaultOperation) ? defaultOperation : "+"
  );

  const valueA = inputValueA || 0;
  const valueB = inputValueB || 0;

  function getResult(): string | number {
    switch (operator) {
      case "+":
        return Math.sum(valueA, valueB);
      case "-":
        return Math.substract(valueA, valueB);
      case "x":
        return Math.multiply(valueA, valueB);
      case "/":
        return divideSafely(valueA, valueB);
      default:
        return "No operator provided";
    }
  }

  function divideSafely(a: number, b: number): string | number {
    try {
      return Math.divide(a, b);
    } catch (err) {
      return (err as Error).message;
    }
  }

  const renderInputA = (): JSX.Element => (
    <input
      data-testid="inputA"
      type="number"
      value={inputValueA}
      onChange={(e) =>
        setInputValueA(e.target.value ? Number.parseInt(e.target.value) : 0)
      }
    />
  );

  const renderInputB = (): JSX.Element => (
    <input
      data-testid="inputB"
      type="number"
      value={inputValueB}
      onChange={(e) =>
        setInputValueB(e.target.value ? Number.parseInt(e.target.value) : 0)
      }
    />
  );

  const renderSelectBox = (): JSX.Element => (
    <div>
      <select
        data-testid="operator"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        className="form-select"
        aria-label="Operator"
      >
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="x">x</option>
        <option value="/">/</option>
      </select>
    </div>
  );

  return (
    <Fragment>
      <h1 style={{ marginBottom: 40 }}>Caculator</h1>
      {renderInputA()}
      {renderSelectBox()}
      {renderInputB()}
      <h2 style={{ marginTop: 20 }}>Result</h2>
      <span data-testid="result">{getResult()}</span>
    </Fragment>
  );
};

export default Calculator;
