export class GeoLocation {
  private readonly latitude: number;
  private readonly longitude: number;

  constructor(latitude: number, longitude: number) {
    if (!this.isValidLatitude(latitude) || !this.isValidLongitude(longitude)) {
      throw new Error('Localização geográfica inválida.');
    }

    this.latitude = latitude;
    this.longitude = longitude;
  }

  private isValidLatitude(latitude: number): boolean {
    return latitude >= -90 && latitude <= 90;
  }

  private isValidLongitude(longitude: number): boolean {
    return longitude >= -180 && longitude <= 180;
  }

  public getLatitude(): number {
    return this.latitude;
  }

  public getLongitude(): number {
    return this.longitude;
  }
}
