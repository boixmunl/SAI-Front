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
  private protocol = 'http://';
  private domain = '.ngrok.io';
  private radix = 10;


  constructor(private httpClient: HttpClient) { }

  getCells(id: string[]): Observable<Cell>[] {
    let cells: Observable<Cell>[];
    cells = [];
    id.forEach( (uId) => {
      cells.push(this.getDataFromCell(uId));
    });
    return cells;
  }

  getDataFromCell(url: string): Observable<Cell> {
    return this.httpClient.get(this.protocol + url + this.domain + '/data').pipe(map(res => {
      return this.mapCell(res);
    }));
  }

  mapCell(obj: any): Cell {
    if (obj) {
      let cell: Cell;
      cell = new Cell();
      const obj1 = obj;
      if (obj1.id) {
        cell.id = obj1.id.split('/')[2].split('.')[0];
      }
      if (obj1.alt) {
        cell.altitude = this.parseFloatFromCell(obj1.alt);
      }
      if (obj1.bat) {
        cell.batteryVoltage = this.parseFloatFromCell(obj1.bat);
        cell.batteryLevel = parseFloat((parseFloat(obj1.bat) / 15).toFixed(2));
        if (cell.batteryLevel < 20) {
          cell.cellStatus = 'low';
        } else if (cell.batteryLevel >= 20 && cell.batteryLevel < 60) {
          cell.cellStatus = 'normal';
        } else {
          cell.cellStatus = 'good';
        }

      }
      if (obj1.dateLastInfo) {
        cell.dateLastInfo = obj1.dateLastInfo;
      }
      if (obj1.hum) {
        cell.humidity = this.parseFloatFromCell(obj1.hum);
      }
      if (obj1.temp) {
        cell.temperature = this.parseFloatFromCell(obj1.temp);
      }
      if (obj1.lat) {
        cell.latitude = this.parseFloatFromCell(obj1.lat);
      }
      if (obj1.long) {
        cell.longitude = this.parseFloatFromCell(obj1.long);
      }
      if (obj1.ppm) {
        cell.ppm = this.parseFloatFromCell(obj1.ppm);
      }
      if (obj1.raw) {
        cell.raw = this.parseFloatFromCell(obj1.raw);
      }
      if (obj1.rzero) {
        cell.rzero = this.parseFloatFromCell(obj1.rzero);
      }
      return cell;
    }
    return null;
  }

  parseFloatFromCell(param: string): number {
    return parseFloat(param) / 100;
  }
}
