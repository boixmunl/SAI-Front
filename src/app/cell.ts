export class Cell {
  id: string;
  location: string;
  batteryLevel: number;
  batteryVoltage: number;
  inverterVoltage: number;
  cellStatus: string;
  position: {lat: number, long: number, alt: number };
  dateLastInfo: string;
  humidity: number;
  temperature: number;
  ppm: number;
  raw: number;
  rzero: number;
  plotData: any[] = [];
}
