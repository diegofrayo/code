import { keyMirror } from './utils';

const FORM_STATUS = keyMirror({
  VALID: 0,
  INVALID: 0,
  LOADING: 0,
});

const FORM_SUBMIT_RESPONSE_TYPES = keyMirror({
  SUCCESS: 0,
  FAILURE: 0,
});

export { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES };
