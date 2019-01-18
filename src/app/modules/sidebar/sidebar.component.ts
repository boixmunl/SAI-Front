import { Component, OnInit } from '@angular/core';
import {CELLS} from '../../mock-cell';
import { Cell } from '../../cell';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  protected _opened = false;
  protected cells = CELLS;
  protected selectedCell: Cell;
  constructor() { }

  ngOnInit() {

  }

  protected _toggleSidebar() {
    this._opened = !this._opened;
  }

  protected onSelect(cell: Cell): void {
    this.selectedCell = cell;
  }
}
