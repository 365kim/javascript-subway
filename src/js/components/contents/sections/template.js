export const LINE_OPTION_TEMPLATE = (lineList) =>
  lineList.map(({ id, name }) => `<option value=${id}>${name}</option>`).join('');

export const STATION_OPTION_TEMPLATE = (stationList) => {
  const headOption = `<option value="" selected disabled hidden>역 선택</option>`;
  const bodyOptions = stationList.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');

  return `${headOption}${bodyOptions}`;
};

export const STATION_OF_LINE_TEMPLATE = ({ name: stationName }) => `
<li class="station-list-item d-flex items-center py-2">
  <span class="w-100 pl-2">${stationName}</span>
  <i class="remove-button fas fa-trash-alt"></i>
  <label for="other-stations" class="input-label" hidden >역선택</label>
  <input type="number" class="distance" value="1" min="0" required />
  <input type="number" class="duration" value="1" min="0" required />
  </li>
  <hr class="my-0" />`;

export const EDIT_FORM_TEMPLATE = (lineId, stationOption) => `
  <form id=${lineId} class="v-hidden">
  <label for="station-select-${lineId}" class="input-label" hidden>역 선택</label>
  <select id="station-select-${lineId}" name="id" required>
  ${stationOption}
  </select>
  <i class="plus-button fas fa-plus-circle"></i>
  <i class="undo-button fas fa-undo"></i>
  <i class="check-button fas fa-check-circle"></i>
  <input ty pe="number" class="distance" value="20" min="0" required />
  <input type="number" class="duration" value="100" min="0" required />
</form>`;

export const SECTIONS_TEMPLATE = `
<div class="heading d-flex">
  <h2 class="mt-1 w-100">🔁 구간 관리</h2>
</div>
<form>
  <div class="input-control">
    <label for="line-select" class="input-label" hidden>노선</label>
    <select id="line-select"></select>
  </div>
</form>
<ul class="mt-3 pl-0">
</ul>
`;
