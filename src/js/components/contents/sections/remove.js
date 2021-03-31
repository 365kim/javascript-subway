import { renderNonEditMode } from './view.js';
import { renderContent } from '../../index.js';
import { showNotification, reportError } from '../../../utils/index.js';
import { SECTIONS_MESSAGES, API_ENDPOINT, AUTH_MESSAGES, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';
import { getHeadersWithAccessToken, logout } from '../../../auth/index.js';
import { goTo } from '../../../router/index.js';

export default async function requestRemoveSection($editForm) {
  const { sectionId } = $editForm.dataset;

  try {
    const response = await fetchRemoveSection(sectionId);

    if (response.status === STATUS_CODE.AUTH_FAILED) {
      showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
      logout();
      goTo(PATHNAMES.LOGIN);
      return;
    }

    if (response.status === STATUS_CODE.SECTIONS.REMOVE.REGISTERED_TO_LINE) {
      showNotification(SECTIONS_MESSAGES.SECTION_IS_REGISTERED_TO_LINE);
      return;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
    }

    renderContent(PATHNAMES.SECTIONS);
    showNotification(SECTIONS_MESSAGES.SECTION_HAS_BEEN_REMOVED);
  } catch (error) {
    reportError({
      messageToUser: SECTIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    renderNonEditMode($editForm);
  }
}

async function fetchRemoveSection(sectionId) {
  const response = await fetch(`${API_ENDPOINT.SECTIONS}/${sectionId}`, {
    method: 'DELETE',
    headers: getHeadersWithAccessToken(),
  });

  return response;
}
