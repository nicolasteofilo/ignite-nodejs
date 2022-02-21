interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): Date | string;
  dateNow(): Date;
}

export { IDateProvider };
