import {DateTime} from "luxon";

export default class TimeHelper {
    static formatDuration(millis) {
        const hours = Math.floor(millis / (1000 * 3600));
        const minutes = Math.floor((millis - (hours * 1000 * 3600)) / (1000 * 60));
        const seconds = Math.floor((millis - (hours * 1000 * 3600) - (minutes * 1000 * 60)) / 1000);
        return `${hours} hours ${minutes} minutes and ${seconds} seconds`;
    }

    static currentTime() {
        return DateTime.fromJSDate(new Date()).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    }

    static formatISOTime(iso) {
        return DateTime.fromISO(iso).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    }
}