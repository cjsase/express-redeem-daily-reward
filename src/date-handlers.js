/**
 * converts date to string in ISO 8601 format
 *
 * @param {Date} date
 * @returns {string}
 */
export const getISO8601DateString = date => {
    return date.toISOString().split('.')[0]+"Z";
}

/**
 * calculate expiry date as ISO string
 *
 * @param {Date} date
 * @returns {string}
 */
export const getNextDay = date => {
    const currentDate = new Date(date.setUTCHours(0, 0, 0, 0));
    return getISO8601DateString(new Date(currentDate.setDate(currentDate.getDate() + 1)));
};

/**
 * get days of a week for a given date as ISO strings
 *
 * @param {Date} date
 * @returns {string[]}
 */
export const getDaysOfWeek = date => {
    const listOfDays = [];
    const currentDate = new Date(date.setUTCHours(0, 0, 0, 0));
    let dayOfWeek = currentDate.getDate() - currentDate.getDay();
    for (let i = 0; i < 7; i++) {
        listOfDays.push(getISO8601DateString(new Date(currentDate.setDate(dayOfWeek++))));
    }
    return listOfDays;
};