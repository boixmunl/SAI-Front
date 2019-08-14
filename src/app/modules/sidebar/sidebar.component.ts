import { Component, OnInit } from '@angular/core';
import {CellService} from '../../cell.service';
import { Cell } from '../../cell';
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
  public plotData= [];

  constructor(private cellService: CellService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCells();
    this.cells.subscribe(cell => {
      this.selectedCell = cell[0];
      this.plotData=this.selectedCell.plotData;
    });
  }

  public _toggleSidebar() {
    this._opened = !this._opened;
  }

  public onSelect(cell: Cell): void {
    this.selectedCell = cell;
  }
  private getCells() {
    let id: string[] = [];
    id.push(this.route.snapshot.paramMap.get('id'));
    this.cells = forkJoin(this.cellService.getCells(id));
  }
}
