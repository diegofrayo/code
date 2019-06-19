import { keyMirror } from './utils';

const FORM_STATUS = keyMirror(['VALID', 'INVALID', 'LOADING']);
const FORM_SUBMIT_RESPONSE_TYPES = keyMirror(['SUCCESS', 'FAILURE']);

export { FORM_STATUS, FORM_SUBMIT_RESPONSE_TYPES };
