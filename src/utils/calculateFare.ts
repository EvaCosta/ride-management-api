import { v4 as uuidv4 } from 'uuid';
import { calculateDistance } from './calculateDistance';
import { GeoLocation } from '../core/domain/value-objects/GeoLocation';

interface Fare {
  price: number;
  requestId: string;
}

function calculateFare(currentLocation: GeoLocation, destination: GeoLocation, fareRate: number): Fare {
  const distance = calculateDistance(
    currentLocation.getLatitude(),
    currentLocation.getLongitude(),
    destination.getLatitude(),
    destination.getLongitude()
  );
  const price = (distance / 1000) * fareRate;
  const requestId = uuidv4();

  return { price: parseFloat(price.toFixed(2)), requestId };
}

export { calculateFare };
