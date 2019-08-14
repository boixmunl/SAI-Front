import { Component, Input, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { Cell } from '../../cell';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { CellService } from 'src/app/cell.service';

@Component({
  selector: 'app-cell-detail',
  templateUrl: './cell-detail.component.html',
  styleUrls: ['./cell-detail.component.css']
})
export class CellDetailComponent implements OnInit {
  @Input() cell: Cell;

  @Input() plotData;

  ngOnChanges(changes: SimpleChanges) {
    this.updateChart(changes.plotData.currentValue);
  }

  updateChart(data) {
    this.options.series[0].data = data;
  }

  options: Highcharts.Options = {
    chart: {
      renderTo: 'container',
      //type: 'spline',
      zoomType: 'x',
      reflow: true
    },
    series: [{
      id: 'series',
      name: 'DS18B20 sensor (\u00B10.5\u00B0C)',
      type: 'line',
      data: [1, 2, 3]
    }],
    title: {
      text: 'Plot of battery voltage'
    },
    subtitle: {
      text: 'Click and drag in the plot area to zoom in',
      align: 'right',
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -5
            },
            title: {
              text: null
            }
          },
          subtitle: {
            text: null
          }
        }
      }]
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150,
      maxZoom: 20 * 1000,
      title: {
        text: 'Time',
        margin: 15
      }
    },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      showFirstLabel: false,
      title: {
        text: 'battery \u00B0C',
        margin: 15
      }
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, 'rgba(2,0,0,0)'],
          ]
        },
        lineWidth: 1,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 5
            }
          }
        },
        shadow: false,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      },
    },
  };

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: Highcharts.Options = this.options; // required

  constructor(private httpClient: HttpClient, private cellService: CellService) { }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateChartSize();
  }

  updateChartSize(){
    let x=window.innerWidth;
    if(x !== NaN && x <= 500){
      Highcharts.charts[0].setSize(x-50,400,false);
    } else {
      Highcharts.charts[0].setSize(500,400,false);
    }
  }
}
