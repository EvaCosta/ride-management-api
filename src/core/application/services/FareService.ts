import { Fare } from '../../domain/models/Fare';
import { DateTime } from '../../domain/value-objects/DateTime';

export class FareService {
  private fares: Fare[] = [
    { start: '08:00', end: '17:00', weekdayRate: 2.8, weekendRate: 3.0 },
    { start: '17:00', end: '20:00', weekdayRate: 3.5, weekendRate: 4.1 },
    { start: '20:00', end: '08:00', weekdayRate: 3.1, weekendRate: 3.5 },
  ];

  getFareRate(dateTime: DateTime): number {
    const isWeekend = dateTime.getValue().getDay() === 0 || dateTime.getValue().getDay() === 6;
    const time = dateTime.getValue().toTimeString().slice(0, 5);

    for (const fare of this.fares) {
      if (this.isTimeInRange(time, fare.start, fare.end)) {
        return isWeekend ? fare.weekendRate : fare.weekdayRate;
      }
    }
    throw new Error('Nenhuma tarifa encontrada para o horário determinado.');
  }

  private isTimeInRange(time: string, start: string, end: string): boolean {
    if (start < end) {
      return time >= start && time < end;
    } else {
      return time >= start || time < end;
    }
  }
}
