export class Range {
  static get day(): [Date, Date] {
    const today = new Date();
    const tommorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    today.setHours(0, 0, 0, 0);
    tommorrow.setHours(0, 0, 0);
    return [today, tommorrow];
  }

  static get week(): [Date, Date] {
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));

    firstday.setHours(0, 0, 0);
    lastday.setHours(0, 0, 0);
    return [firstday, lastday];
  }

  static get month(): [Date, Date] {
    const [thisMonth, thisYear] = [new Date().getMonth(), new Date().getFullYear()];
    return [new Date(thisYear, thisMonth, 1), new Date(thisYear, thisMonth + 1, 0)];
  }

  static get year(): [Date, Date] {
    const thisYear = new Date().getFullYear();
    return [new Date(thisYear, 0, 1), new Date(thisYear, 11, 31)];
  }
}
