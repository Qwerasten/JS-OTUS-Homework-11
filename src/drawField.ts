/**
 * отрисовка поля
 * @param field {number[][]} - состояние поля
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисовано поле
 * @param onCellClick {(x: number, y: number) => void}
 * @returns void
 */

export function drawField(
  htmlElement: HTMLDivElement,
  field: number[][],
  onCellClick: (x: number, y: number) => void
) {
  const rowIterator = (row: number[], rowIndex: number) => {
    return `<tr>${row
      .map((cell: number, columnIndex: number) => {
        if (cell === 1) {
          return `<td 
        data-x=${columnIndex}
        data-y=${rowIndex}
        class="cell alive" 
        style="background-color:#FA58D0; height:40px; width:40px;"></td>`;
        }
        return `<td 
      data-x=${columnIndex}
      data-y=${rowIndex}
      class="cell dead" 
      style="background-color:#FFFFFF; height:40px; width:40px;"></td>`;
      })
      .join("")}</tr>`;
  };

  const tableHTML = `<table  border= 1 px>${field
    .map(rowIterator)
    .join("")}</table>`;

  // eslint-disable-next-line no-param-reassign
  htmlElement.innerHTML = tableHTML;
  const table = htmlElement.querySelector("table");
  table?.addEventListener("click", (ev) => {
    const clickedElement = ev.target as HTMLElement;
    const x = Number(clickedElement.getAttribute("data-x"));
    const y = Number(clickedElement.getAttribute("data-y"));
    if (x >= 0 && y >= 0) {
      onCellClick(x, y);
    }
  });
}
