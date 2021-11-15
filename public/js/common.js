// common.js

// Client-side javascript relevant to multiple files

/**
 * Converts a date from a MySQL query into a human readable date string for presenting in the front-end
 * @param {string} date - datetime string coming from a date field in MySQL
 * @returns {string} - a human readable date string in the format MM/DD/YYYY
 */
function toLocalDate(date){
    localDate = new Date(Date.parse(date));
    return localDate.toLocaleDateString('en-US');
}