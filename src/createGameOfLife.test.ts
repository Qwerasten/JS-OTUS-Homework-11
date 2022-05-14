/* eslint-disable no-param-reassign */
import { createGameOfLife } from "./createGameOfLife";
import { drawField } from "./drawField";

jest.mock("./drawField");

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe("createGameOfLife", () => {
  let element: HTMLElement;
  let onCellClick: (x: number, y: number) => void;
  const originalAlert = window.alert;
  beforeEach(() => {
    element = document.createElement("div");
    window.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
    window.alert = originalAlert;
  });
  describe("UI", () => {
    it("creates Start button and field", () => {
      createGameOfLife(10, 10, element);
      const button = element.querySelector("button");
      expect(button).toBeTruthy();
      expect(button?.innerHTML).toBe("Start");
      expect(element.querySelector(".field-wrapper")).toBeTruthy();
    });
    it("changes button name on click", () => {
      createGameOfLife(10, 10, element);
      const button = element.querySelector("button");
      expect(button?.innerHTML).toBe("Start");
      button?.click();
      expect(button?.innerHTML).toBe("Stop");
      button?.click();
      expect(button?.innerHTML).toBe("Start");
      button?.click();
      expect(button?.innerHTML).toBe("Stop");
    });
    it("changes size on input width", () => {
      (drawField as jest.Mock).mockImplementation(
        (fieldEl: HTMLElement, field: number[][]) => {
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      createGameOfLife(2, 2, element);
      const inputWidth = element.querySelector(
        ".input-width"
      ) as HTMLInputElement;
      const fieldWrapper = element.querySelector(".field-wrapper");
      inputWidth.value = "4";
      inputWidth.dispatchEvent(new Event("change"));
      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ])})`
      );
      inputWidth.value = "2";
      inputWidth.dispatchEvent(new Event("change"));
      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );
    });
    it("changes size on input height", () => {
      (drawField as jest.Mock).mockImplementation(
        (fieldEl: HTMLElement, field: number[][]) => {
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      createGameOfLife(2, 2, element);
      const inputHeight = element.querySelector(
        ".input-height"
      ) as HTMLInputElement;
      const fieldWrapper = element.querySelector(".field-wrapper");
      inputHeight.value = "4";
      inputHeight.dispatchEvent(new Event("change"));
      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ])})`
      );
      inputHeight.value = "2";
      inputHeight.dispatchEvent(new Event("change"));
      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );
    });
    it("draws field", () => {
      (drawField as jest.Mock).mockImplementation(
        (fieldEl: HTMLElement, field: number[][]) => {
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      createGameOfLife(2, 2, element);
      const fieldWrapper = element.querySelector(".field-wrapper");

      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );
    });
    it("redraw field on interaction with it", () => {
      (drawField as jest.Mock).mockImplementation(
        (
          fieldEl: HTMLElement,
          field: number[][],
          cellClickHandler: (x: number, y: number) => void
        ) => {
          onCellClick = cellClickHandler;
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      createGameOfLife(2, 2, element);
      const fieldWrapper = element.querySelector(".field-wrapper");
      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );
      onCellClick(0, 0);

      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [1, 0],
          [0, 0],
        ])})`
      );

      onCellClick(0, 0);
      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );

      onCellClick(0, 1);

      onCellClick(1, 1);
      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [1, 1],
        ])})`
      );
    });
    it("on start it runs 1sec timer to update state", async () => {
      (drawField as jest.Mock).mockImplementation(
        (fieldEl, field, cellClickHandler) => {
          onCellClick = cellClickHandler;
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      createGameOfLife(2, 2, element);
      const button = element.querySelector("button");
      const fieldWrapper = element.querySelector(".field-wrapper");

      onCellClick(0, 0);
      button?.click();

      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [1, 0],
          [0, 0],
        ])})`
      );
      await sleep(1000);
      expect(fieldWrapper?.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );
    });
    it("stops game with alert, when none alive", async () => {
      (drawField as jest.Mock).mockImplementation(
        (fieldEl, field, cellClickHandler) => {
          onCellClick = cellClickHandler;
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      createGameOfLife(2, 2, element);
      const button = element.querySelector("button");
      onCellClick(0, 0);
      button?.click();
      await sleep(1000);
      expect(window.alert).toHaveBeenCalledWith("Death on the block");
      expect(button?.innerHTML).toBe("Start");
    });
  });
});
