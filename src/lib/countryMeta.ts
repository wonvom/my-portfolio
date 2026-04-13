/** ISO 3166-1 numeric codes and city coordinates [lat, lon] */
export const COUNTRY_META: Record<
  string,
  { isoNumeric: string; lon: number; cities: Record<string, [number, number]> }
> = {
  China: {
    isoNumeric: "156",
    lon: 104,
    cities: { Shanghai: [31.2304, 121.4737] },
  },
  Japan: {
    isoNumeric: "392",
    lon: 136,
    cities: { Osaka: [34.6937, 135.5023] },
  },
  "South Korea": {
    isoNumeric: "410",
    lon: 128,
    cities: { Seoul: [37.5665, 126.978] },
  },
  "United States America": {
    isoNumeric: "840",
    lon: -100,
    cities: {
      Chicago: [41.8781, -87.6298],
      Corvallis: [44.5646, -123.262],
      Detroit: [42.3314, -83.0458],
      "Las Vegas": [36.1699, -115.1398],
      "Los Angeles": [34.0522, -118.2437],
      Nashville: [36.1627, -86.7816],
      "New York": [40.7128, -74.006],
      Seattle: [47.6062, -122.3321],
    },
  },
  Canada: { isoNumeric: "124", lon: -95, cities: {} },
};
