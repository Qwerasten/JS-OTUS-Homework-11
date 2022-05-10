/* eslint-disable no-param-reassign */

import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";

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

  const button: HTMLButtonElement = document.createElement("button");
  const fieldWrapper: HTMLDivElement = document.createElement("div");
  button.innerHTML = "Start";
  fieldWrapper.classList.add("field-wrapper");
  htmlElement.appendChild(fieldWrapper);
  htmlElement.appendChild(button);

  // Создать поле заданного размера

  let field = Array.from<number>({ length: sizeY }).map(() =>
    Array.from<number>({ length: sizeX }).fill(0)
  );

  const cellClickHandler = (x: number, y: number) => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    drawField(fieldWrapper, field, cellClickHandler);
  };

  // Отрисовать поле заданного размера
  drawField(fieldWrapper, field, cellClickHandler);
  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле
  function stopGame() {
    gameIsRunning = false;
    button.innerHTML = "Start";
    // При клике на кнопке `Stop` остановить таймер
    clearInterval(timer);
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
      drawField(fieldWrapper, field, cellClickHandler);
      if (!isAnyoneAlive(field)) {
        alert("Death on the block");
        stopGame();
      }
    }, 1000);
  }

  button.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });
}
