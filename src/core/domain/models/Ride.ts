import { GeoLocation } from '../value-objects/GeoLocation';
import { DateTime } from '../value-objects/DateTime';

export interface Ride {
  id: string; 
  userId: string; 
  driverId: number; 
  currentLocation: GeoLocation;
  destination: GeoLocation; 
  fare: number;
  distance: number; 
  dateTime: DateTime;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled'; 
}