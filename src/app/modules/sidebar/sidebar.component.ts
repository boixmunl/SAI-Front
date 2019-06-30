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
  protected _opened = false;
  protected cells: Observable<Cell[]> ;
  protected selectedCell: Cell;

  constructor(private cellService: CellService, private route: ActivatedRoute) {}

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
    const id: string[] = [];
    id.push(this.route.snapshot.paramMap.get('id'));
    this.cells = forkJoin(this.cellService.getCells(id));
    this.cells.subscribe(cell => console.log(cell));
  }
}
