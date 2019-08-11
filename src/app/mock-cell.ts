import { Cell } from './cell';

export const CELL1: Cell = { id: 11, location: 'Cardedeu', batteryLevel: 85, batteryVoltage: 14.85, inverterVoltage: 232.2, ppm: 222,
  cellStatus: 'high', humidity: 22, temperature: 39, dateLastInfo: 'yesterday', position: {lat: 41, long: 2, alt: 90 },
raw: 909, rzero: 49};
export const CELL2: Cell = { id: 12, location: 'La Roca del V.', batteryLevel: 85, batteryVoltage: 14.85, inverterVoltage: 232.2, ppm: 222,
  cellStatus: 'discharged', humidity: 22, temperature: 39, dateLastInfo: 'yesterday', position: {lat: 41, long: 2, alt: 90 },
  raw: 909, rzero: 499};
export const CELL3: Cell = { id: 13, location: 'Valldoriolf', batteryLevel: 85, batteryVoltage: 14.85, inverterVoltage: 232.2, ppm: 222,
  cellStatus: 'charging', humidity: 22, temperature: 39, dateLastInfo: 'yesterday', position: {lat: 41, long: 2, alt: 90 },
  raw: 909, rzero: 49};
export const CELL4: Cell = { id: 14, location: 'Sant Celoni', batteryLevel: 85, batteryVoltage: 14.85, inverterVoltage: 232.2, ppm: 222,
  cellStatus: 'low', humidity: 22, temperature: 39, dateLastInfo: 'yesterday', position: {lat: 41, long: 2, alt: 90 },
  raw: 909, rzero: 49};
