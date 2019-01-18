import { Cell } from './cell';

export const CELLS: Cell[] = [
  { id: 11, location: 'Cardedeu', batteryLevel: 85, batteryVoltage: 14.85, inverterVoltage: 232.2, cellStatus: 'high'},
  { id: 12, location: 'La Roca del V.', batteryLevel: 2, batteryVoltage: 4.85, inverterVoltage: 0, cellStatus: 'discharged'},
  { id: 13, location: 'Valldoriolf', batteryLevel: 60, batteryVoltage: 12.85, inverterVoltage: 222.2, cellStatus: 'charging'},
  { id: 14, location: 'Sant Celoni', batteryLevel: 20, batteryVoltage: 11.85, inverterVoltage: 212.2, cellStatus: 'low'}
];
