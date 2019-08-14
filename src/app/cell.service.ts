import { Injectable } from '@angular/core';
import {Cell} from './cell';
import { HttpClient } from '@angular/common/http';
import {Observable, of, forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import {CELL1} from './mock-cell';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CellService {
  protected cell: Cell;
  private protocol = 'http://';
  private domain = '.ngrok.io';
  private encryptSecretKey = 'd6F3Efeq';
  private plotDaysBefore = 30;

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
    return forkJoin(this.getSensorDataFromCell(url), 
    this.getPlotDataFromCell(url)
    ).pipe(map(([res1, res2]) => {
        res1.plotData=res2;
        return res1;
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
      if (obj1.bat) {
        cell.batteryVoltage = this.parseBattery(obj1.bat);
        cell.batteryLevel = parseFloat((parseFloat(obj1.bat) / 147).toFixed(2));
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
      if (obj1.lat && obj1.long && obj1.alt) {
        cell.position = this.parseGPSData(obj1.lat, obj1.long, obj1.alt);
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
    if (param !== '-100') {
      return parseFloat(param) / 100;
    } else {
      return null;
    }
  }

  parseBattery(bat: string): number {
    return this.parseFloatFromCell(bat) / 10;
  }

  parseGPSData(lat: string, long: string, alt: string): {lat: number, long: number, alt: number } {
    let position: {lat: number, long: number, alt: number };
    if (lat !== '-100' && long !== '-100' && alt !== '-100') {
      position = {lat: parseFloat(lat) / 10, long: parseFloat(long) / 10, alt: parseFloat(alt) / 10};
    }
    return position;
  }

  decrypt(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  getSensorDataFromCell(url: string): Observable<Cell>{
    return this.httpClient.get(this.protocol + url + this.domain + '/data', {responseType: 'text'})
    .pipe(res => this.decrypt(res), map(res => this.mapCell(this.decrypt(res))))
  }

  getPlotDataFromCell(url: string): Observable<any[]>{
  return this.httpClient.get(this.protocol + url + this.domain + '/battery_query.json?num_obs=-1&start_date='+formatDate(new Date().setDate(new Date().getDate() - this.plotDaysBefore), 'yyyy-MM-dd', 'en')+'T16:00')
    .pipe(res => this.decrypt(res), map((res:any) => {
      var data: any[] = [];
      var i = 0;
      // Iterate JSON data series and add to plot
      while (res.battery_record[0][i])
      {
        data.push([res.battery_record[0][i].unix_time, res.battery_record[0][i].charge]);
        i++;
      }
      return data;
    }));
  }
}
