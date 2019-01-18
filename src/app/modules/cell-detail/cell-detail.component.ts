import {Component, Input, OnInit} from '@angular/core';
import { Cell } from '../../cell';

@Component({
  selector: 'app-cell-detail',
  templateUrl: './cell-detail.component.html',
  styleUrls: ['./cell-detail.component.css']
})
export class CellDetailComponent implements OnInit {
  @Input() cell: Cell;

  constructor() { }

  ngOnInit() {
  }

}
