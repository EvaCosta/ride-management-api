import { DateTime } from "../value-objects/DateTime";
import { GeoLocation } from "../value-objects/GeoLocation";

export interface AcceptRaceParams {
    userId: string;
    currentLocation: GeoLocation;
    destination: GeoLocation;
    dateTime: DateTime;
  }