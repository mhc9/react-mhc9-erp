import DateUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/th";

export default class OverWriteMomentBE extends DateUtils {
    constructor({ locale, formats, instance }) {
        super({ locale, formats, instance });
    }

    date = (value = null) => {
        if (value === null) return null;

        const moment = this.moment(value);
        moment.locale(this.locale);

        return moment;
    }

    toBuddhistYear(moment, format) {
        var christianYear = moment.format('YYYY');
        var buddhishYear = (parseInt(christianYear) + 543).toString();

        return moment
                .format(format.replace('YYYY', buddhishYear).replace('YY', buddhishYear.substring(2, 4)))
                .replace(christianYear, buddhishYear);
    }

    format = (date, formatKey) => {
        return this.toBuddhistYear(date, formatKey);
    }
}
