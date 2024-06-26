import { DateTime } from "../value-objects/DateTime";

export interface Receipt {
  id: string;
  rideId: string;
  userId: string;
  date: string;
  value: number;
  distance: number;
}
