/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} firstName
 * @property {string} role
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Session
 * @property {User} user
 * @property {number} expires
 */

/**
 * @typedef {Object} FormErrors
 * @property {string} [fieldName] - Error message for field
 */

export {};
