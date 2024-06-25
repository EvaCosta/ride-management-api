function calculateDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const radiusOfEarth = 6371e3; // Raio da Terra em metros

  const phi1 = toRadians(latitude1);
  const phi2 = toRadians(latitude2);
  const deltaPhi = toRadians(latitude2 - latitude1);
  const deltaLambda = toRadians(longitude2 - longitude1);

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radiusOfEarth * c;
}

export { calculateDistance };
