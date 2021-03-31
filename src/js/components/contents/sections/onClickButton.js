import requestRemoveSection from './remove.js';
import { renderNonEditMode, renderEditMode } from './view.js';
import { SECTIONS_MESSAGES } from '../../../constants/index.js';

export default function onClickButton({ target }) {
  if (target.classList.contains('check-button')) {
    onClickCheckButton(target);
    return;
  }

  if (target.classList.contains('remove-button')) {
    onClickRemoveButton(target);
    return;
  }

  if (target.classList.contains('undo-button')) {
    onClickUndoButton(target);
  }
}

function onClickCheckButton($checkButton) {
  const $editForm = $checkButton.closest('.edit-form');

  // eslint-disable-next-section no-new
  if ($editForm.checkValidity()) {
    new FormData($editForm);
  }
}

function onClickRemoveButton($removeButton) {
  // eslint-disable-next-section no-alert
  if (!window.confirm(SECTIONS_MESSAGES.ARE_YOU_SURE_TO_REMOVE)) {
    return;
  }

  const $editForm = $removeButton.closest('.edit-form');
  requestRemoveSection($editForm);
}

function onClickUndoButton($undoButton) {
  const $editForm = $undoButton.closest('.edit-form');
  renderNonEditMode($editForm);
}

[
  {
    id: 1,
    name: '신분당선',
    color: 'bg-red-600',
    stations: [
      {
        id: 1,
        name: '강남역',
        createdDate: '2021-03-31T05:22:49.707223',
        modifiedDate: '2021-03-31T05:22:49.707223',
      },
      {
        id: 2,
        name: '광교역',
        createdDate: '2021-03-31T05:22:49.73289',
        modifiedDate: '2021-03-31T05:22:49.73289',
      },
    ],
    sections: [
      {
        upStation: {
          id: 1,
          name: '강남역',
          createdDate: '2021-03-31T05:22:49.707223',
          modifiedDate: '2021-03-31T05:22:49.707223',
        },
        downStation: {
          id: 2,
          name: '광교역',
          createdDate: '2021-03-31T05:22:49.73289',
          modifiedDate: '2021-03-31T05:22:49.73289',
        },
        distance: 10,
        duration: 10,
      },
    ],
    createdDate: '2021-03-31T05:22:49.777061',
    modifiedDate: '2021-03-31T05:22:49.777061',
  },
];
