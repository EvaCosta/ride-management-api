export interface AcceptRaceDTO {
    userId: string;
    currentLocation: { lat: number, lon: number };
    destination: { lat: number, lon: number };
    dateTime: string;
  }