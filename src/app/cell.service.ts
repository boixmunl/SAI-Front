import { Injectable } from '@angular/core';
import {CELL1, CELL2, CELL3, CELL4} from './mock-cell';
import {Cell} from './cell';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CellService {
  protected cell: Cell;
  protected baseURLs = ['http://3de90d15.ngrok.io'];
  private radix = 10;


  constructor(private httpClient: HttpClient) { }

  getCells(): Observable<Cell>[] {
    let cells: Observable<Cell>[];
    cells = [];
    this.baseURLs.forEach( (url) => {
      cells.push(this.getDataFromCell(url));
    });
    return cells;
  }

  getDataFromCell(url: string): Observable<Cell> {
    return this.httpClient.get(url + '/data').pipe(map(res => {
      return this.mapCell(res);
    }));
  }

  mapCell(obj: any): Cell {
    if (obj) {
      let cell: Cell;
      cell = new Cell();
      const obj1 = obj;
      if (obj1.id) {
        cell.id = obj1.id;
      }
      if (obj1.alt) {
        cell.altitude = parseInt(obj1.alt, this.radix);
      }
      if (obj1.bat) {
        cell.batteryVoltage = parseInt(obj1.bat, this.radix);
      }
      if (obj1.bat) {
        cell.batteryLevel = parseInt(obj1.bat, this.radix) / 15;
      }
      if (obj1.dateLastInfo) {
        cell.dateLastInfo = obj1.dateLastInfo;
      }
      if (obj1.hum) {
        cell.humidity = parseInt(obj1.hum, this.radix);
      }
      if (obj1.lat) {
        cell.latitude = parseInt(obj1.lat, this.radix);
      }
      if (obj1.long) {
        cell.longitude = parseInt(obj1.long, this.radix);
      }
      if (obj1.ppm) {
        cell.ppm = parseInt(obj1.ppm, this.radix);
      }
      if (obj1.raw) {
        cell.raw = parseInt(obj1.raw, this.radix);
      }
      if (obj1.rzero) {
        cell.rzero = parseInt(obj1.rzero, this.radix);
      }
      if (obj1.temp) {
        cell.temp = parseInt(obj1.temp, this.radix);
      }
      return cell;
    }
    return null;
  }
}
