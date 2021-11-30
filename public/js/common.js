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

/**
 * Converts a datetime from a MySQL query into a human readable datetime string for presenting in the front-end
 * @param {string} dateTime - datetime string coming from a datetime field in MySQL
 * @returns {string} - a human readable datetime string in the fromat MM/DD/YYY HH:MM:SS
 */
function toLocalDateTime(dateTime){
    localTime = new Date(Date.parse(dateTime));
    return toLocalDate(localTime) + ' ' + localTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
}

/**
 * Converts a date string from "MM/DD/YYYY" to "YYYY-MM-DD" format
 *  @param {string} inDate - date string in format "MM/DD/YYYY"
 * @returns {string} - date string in format "YYYY-MM-DD"
 */
function toDateFormat(inDate){
    let month = inDate.slice(0, 2); 
    let day = inDate.slice(3, 5);
    let year = inDate.slice(6);
    return `${year}-${month}-${day}`;
}