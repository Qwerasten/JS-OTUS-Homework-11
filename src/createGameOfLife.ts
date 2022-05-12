/* eslint-disable no-param-reassign */

import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";
import { getFieldForDrawing } from "./getFieldForDrawing";

/**
 * Создание игры Жизнь
 * @param sizeX {number} - число колонок
 * @param sizeY {number} - число строк
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисована игра
 * @returns void
 */
export function createGameOfLife(
  sizeX: number,
  sizeY: number,
  htmlElement: HTMLElement
) {
  let gameIsRunning = false;
  let timer: number;
  let gameSpeed = 1000;

  const inputSpeed: HTMLSelectElement = document.createElement("select");
  const inputWidth: HTMLInputElement = document.createElement("input");
  const inputHeight: HTMLInputElement = document.createElement("input");
  const button: HTMLButtonElement = document.createElement("button");
  const fieldWrapper: HTMLDivElement = document.createElement("div");

  inputSpeed.innerHTML = `<option>1</option><option>2<option>`;
  inputSpeed.selectedIndex = 0;
  inputWidth.value = String(sizeX);
  inputWidth.classList.add("input-width");
  inputHeight.value = String(sizeY);
  inputHeight.classList.add("input-height");
  button.innerHTML = "Start";
  fieldWrapper.classList.add("field-wrapper");
  htmlElement.appendChild(inputSpeed);
  htmlElement.appendChild(inputWidth);
  htmlElement.appendChild(inputHeight);
  htmlElement.appendChild(fieldWrapper);
  htmlElement.appendChild(button);

  // Создать поле заданного размера
  let field = Array.from<number>({ length: sizeY }).map(() =>
    Array.from<number>({ length: sizeX }).fill(0)
  );
  let fieldNext = Array.from<number>({ length: sizeY }).map(() =>
    Array.from<number>({ length: sizeX }).fill(0)
  );
  let fieldForDrawing: number[][] = Array.from<number>({ length: sizeY }).map(
    () => Array.from<number>({ length: sizeX }).fill(0)
  );

  const cellClickHandler = (x: number, y: number) => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    fieldForDrawing[y][x] = field[y][x];
    drawField(fieldWrapper, fieldForDrawing, cellClickHandler);
  };

  function onSizeXChange() {
    const oldX = field.length;
    const newX = Number(inputHeight.value);
    const addX = newX - oldX;
    if (addX > 0) {
      const addedStrings = Array.from<number>({ length: addX }).map(() =>
        Array.from<number>({ length: field[0].length }).fill(0)
      );
      field = field.concat(addedStrings);
    } else {
      field.length = newX;
      fieldNext.length = newX;
      fieldForDrawing.length = newX;
    }
    fieldNext = getNextState(field);
    fieldForDrawing = getFieldForDrawing(field, fieldNext);
    drawField(fieldWrapper, fieldForDrawing, cellClickHandler);
  }

  function onSizeYChange() {
    const oldY = field[0].length;
    const newY = Number(inputWidth.value);
    const addY = newY - oldY;
    if (addY > 0) {
      const addedZeros = Array.from<number>({ length: addY }).fill(0);
      for (let i = 0; i < field.length; i++) {
        field[i] = field[i].concat(addedZeros);
      }
    } else {
      for (let i = 0; i < field.length; i++) {
        field[i].length = newY;
        fieldNext[i].length = newY;
        fieldForDrawing[i].length = newY;
      }
    }
    fieldNext = getNextState(field);
    fieldForDrawing = getFieldForDrawing(field, fieldNext);
    drawField(fieldWrapper, fieldForDrawing, cellClickHandler);
  }

  // Отрисовать поле заданного размера
  // fieldForDrawing = getFieldForDrawing(field, fieldNext);
  drawField(fieldWrapper, field, cellClickHandler);
  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле
  function stopGame() {
    gameIsRunning = false;
    button.innerHTML = "Start";
    // При клике на кнопке `Stop` остановить таймер
    clearInterval(timer);
    if (!isAnyoneAlive(field)) alert("Death on the block");
  }
  function startGame() {
    // При клике по кнопке старт
    // - поменять надпись на `Stop`
    gameIsRunning = true;

    button.innerHTML = "Stop";

    // - запустить таймер для обновления поля
    timer = window.setInterval(() => {
      // В таймере обновления поля
      // - посчитать новое состояние поля
      // - отрисовать новое состояние поля
      // - проверить, что есть живые клетки
      // - если живых клеток нет
      //    - остановить таймер
      //    - вывести сообщение
      field = getNextState(field);
      fieldNext = getNextState(field);
      fieldForDrawing = getFieldForDrawing(field, fieldNext);

      // drawField(fieldWrapper, field, cellClickHandler);
      drawField(fieldWrapper, fieldForDrawing, cellClickHandler);
      if (!isAnyoneAlive(field)) {
        stopGame();
      }
    }, gameSpeed);
  }

  button.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });
  inputSpeed.addEventListener("change", () => {
    clearInterval();
    gameSpeed = inputSpeed.selectedIndex === 0 ? 2000 : 500;
    startGame();
  });
  inputHeight.addEventListener("change", onSizeXChange);
  inputWidth.addEventListener("change", onSizeYChange);
}
