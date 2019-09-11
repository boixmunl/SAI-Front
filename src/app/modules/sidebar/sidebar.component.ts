import { Component, OnInit } from '@angular/core';
import {CellService} from '../../controller/cell.service';
import { Cell } from '../../model/cell';
import {Observable, forkJoin} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public _opened = false;
  public cells: Observable<Cell[]> ;
  public selectedCell: Cell;
  public plotData = [];

  constructor(private cellService: CellService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCells();
  }

  public _toggleSidebar() {
    this._opened = !this._opened;
  }

  public onSelect(cell: Cell): void {
    this.selectedCell = cell;
  }
  private getCells() {
    const id: string[] = [];
    id.push(this.route.snapshot.paramMap.get('id'));
    this.cells = forkJoin(this.cellService.getCells(id));
    this.cells.subscribe(cell => {
      this.selectedCell = cell[0];
      this.plotData = this.selectedCell.plotData;
    });
  }
}
