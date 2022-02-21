import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    dayjs.extend(utc);
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  convertToUTC(date: Date): Date | string {
    dayjs.extend(utc);
    return dayjs(date).utc().local().toDate();
  }

  dateNow(): Date {
    console.log(dayjs());
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
