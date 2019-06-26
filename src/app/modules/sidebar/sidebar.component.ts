import { Component, OnInit } from '@angular/core';
import {CellService} from '../../cell.service';
import { Cell } from '../../cell';
import {Observable, forkJoin} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  protected _opened = false;
  protected cells: Observable<Cell[]> ;
  protected selectedCell: Cell;
  constructor(private cellService: CellService) { }

  ngOnInit() {
    this.getCells();
    this.cells.subscribe(cell => this.selectedCell = cell[0]);
  }

  protected _toggleSidebar() {
    this._opened = !this._opened;
  }

  protected onSelect(cell: Cell): void {
    this.selectedCell = cell;
  }
  private getCells() {
    // this.cellService.getCells().forEach(cellObs => cellObs.subscribe(cell => cells.push(cell)));
    this.cells = forkJoin(this.cellService.getCells());
    this.cells.subscribe(cell => console.log(cell));
    // this.cells.subscribe(cell => console.log(cell));
  }
}
