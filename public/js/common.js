// common.js

// Client-side javascript relevant to multiple files

/**
 * Converts a date from a MySQL query into a human readable date string for presenting in the front-end
 * @param {string} date - datetime string coming from a date field in MySQL
 * @returns {string} - a human readable date string in the format MM/DD/YYYY, or an empty string for null dates
 */
function toLocalDate(date){
    if (date) {
        console.log(date);
        localDate = new Date(Date.parse(date));
        return localDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year:'numeric'});
    } else {
        return ''
    }
    
}

/**
 * Converts a datetime from a MySQL query into a human readable datetime string for presenting in the front-end
 * @param {string} dateTime - datetime string coming from a datetime field in MySQL
 * @returns {string} - a human readable datetime string in the fromat MM/DD/YYY HH:MM:SS, or an empty string for null datetimes
 */
function toLocalDateTime(dateTime){
    if (dateTime) {
        localTime = new Date(Date.parse(dateTime));
    return toLocalDate(localTime) + ' ' + localTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    } else {
        return ''
    }
}

/**
 * Converts a date string from "MM/DD/YYYY" to "YYYY-MM-DD" format
 *  @param {string} inDate - date string in format "MM/DD/YYYY"
 * @returns {string} - date string in format "YYYY-MM-DD"
 */
function toDateFormat(inDate){
    // return empty string for incomplete date.
    if (inDate.length < 8) return "";

    let month = inDate.slice(0, 2); 
    let day = inDate.slice(3, 5);
    let year = inDate.slice(6);
    return `${year}-${month}-${day}`;
}

/**
 * Converts a datetime string from "MM/DD/YYYY 07:17:00 AM" to "yyyy-MM-ddThh:mm:ss" format
 *  @param {string} inDate - date string in format "MM/DD/YYYY"
 * @returns {string} - date string in format "YYYY-MM-DD"
 */
 function toDateTimeFormat(inDate){
    // return empty string for incomplete date.
    if (inDate.length < 8) return "";

    let month = inDate.slice(0, 2); 
    let day = inDate.slice(3, 5);
    let year = inDate.slice(6, 10);
    let hour = inDate.slice(11, 13);
    let min = inDate.slice(14, 16);
    let sec = inDate.slice(17, 19);
    let ampm = inDate.slice(20, 21)

    //convert to 24hour time
    hour = to24Hour(parseInt(hour), ampm);

    return `${year}-${month}-${day}T${hour}:${min}:${sec}`;
}

/**
 * Convert an hour integer from 12 hour to string 24 hour. 
 *  @param {int} hour - hour integer in 12 hour format
 *  @param {str} ampm - str 'a' for am and 'p' for pm.
 * @returns {str} - hour string in format "HH"
 */
function to24Hour(hour, ampm){
    // handle noon and midnight
    //console.log(hour);
    //console.log(ampm);
    let result = ""
    if (hour == 12)
    {
        if (ampm == 'P') result = "12";
        else result = "00";
    }
    else
    {
        if (ampm == 'A')
        {
            result = hour.toString();
            result = result.padStart(2, '0');
        }
        else
        {
            hour += 12;
            result = hour.toString();
        }
    }
    return result;
}