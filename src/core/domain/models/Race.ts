import { DateTime } from "../value-objects/DateTime";
import { GeoLocation } from "../value-objects/GeoLocation";

export interface Race {
    id: number;
    userId: string; 
    currentLocation: GeoLocation;
    destination: GeoLocation;
    fare: number;
    distance: number;
    dateTime: DateTime;
  }