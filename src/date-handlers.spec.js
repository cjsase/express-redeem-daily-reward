import {getDaysOfWeek, getISO8601DateString, getNextDay} from "./date-handlers.js";

describe('getISO8601DateString', () => {
    it('should get a date in ISO 8601 format', () => {
        const dateString = '2020-03-19T12:00:00Z';
        expect(getISO8601DateString(new Date(dateString))).toEqual(dateString);
    });
});

describe('getNextDay', () => {
    it('should get date of next day on midnight', () => {
        expect(getNextDay(new Date('2020-03-19T12:00:00Z'))).toEqual("2020-03-20T00:00:00Z");
    });
});

describe('getDaysOfWeek', () => {
    it('should get days of week', () => {
        expect(getDaysOfWeek(new Date('2020-03-19T12:00:00Z'))).toEqual([
            "2020-03-15T00:00:00Z",
            "2020-03-16T00:00:00Z",
            "2020-03-17T00:00:00Z",
            "2020-03-18T00:00:00Z",
            "2020-03-19T00:00:00Z",
            "2020-03-20T00:00:00Z",
            "2020-03-21T00:00:00Z"
        ]);
    });
});