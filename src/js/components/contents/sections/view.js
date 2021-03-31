/* eslint-disable no-unused-vars */
import onClickButton from './onClickButton.js';
import { requestCreateSection, updateSubmitButtonState } from './create.js';
import requestReadLine from '../lines/read.js';
import { dispatchFormData } from '../../../utils/index.js';
import {
  STATION_OPTION_TEMPLATE,
  LINE_OPTION_TEMPLATE,
  STATION_OF_LINE_TEMPLATE,
  SECTIONS_TEMPLATE,
} from './template.js';

const $wrapper = document.createElement('div');
$wrapper.classList.add('wrapper', 'bg-white', 'p-10');
$wrapper.innerHTML = SECTIONS_TEMPLATE;

const $list = $wrapper.querySelector('ul');
const $lineSelect = $wrapper.querySelector('#line-select');

$lineSelect.addEventListener('change', renderSectionOfLine);

$list.addEventListener('click', onClickButton);
$list.addEventListener('input', updateSubmitButtonState);
$list.addEventListener('submit', dispatchFormData);
$list.addEventListener('formdata', requestCreateSection);

let lineList = [];

export async function renderSections($main) {
  lineList = await requestReadLine();

  $lineSelect.innerHTML = LINE_OPTION_TEMPLATE(lineList);

  const [{ id: lineId, name, stations: stationList, sections }] = lineList;
  // const sectionList = getSectionList(sections);

  $list.innerHTML = stationList.map((station) => STATION_OF_LINE_TEMPLATE(station)).join('');

  const stationOption = STATION_OPTION_TEMPLATE(stationList);

  $main.replaceChildren($wrapper);
}

function renderSectionOfLine(event) {
  console.log('select event fire!');

  // list:
}

export function renderEditMode($editForm) {
  $editForm.classList.add('edit-mode');

  const $editInput = $editForm.querySelector('input');
  $editInput.disabled = false;
  // FIXME: 최초 focus시 커서가 제일 앞임
  $editInput.focus();
}

export function renderNonEditMode($editForm) {
  $editForm.classList.remove('edit-mode');

  const $editInput = $editForm.querySelector('input');
  $editInput.disabled = true;
}
