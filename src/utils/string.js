/**
 * Validate email address
 *
 * @param {String} email email string
 * @returns {Boolean} true if email is invalid otherwise return false
 * @Thanks https://stackoverflow.com/a/46181
 * @Thanks https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 */
export const validateEmail = email => {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};
