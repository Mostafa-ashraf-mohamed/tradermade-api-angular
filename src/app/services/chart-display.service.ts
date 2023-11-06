import { Injectable } from '@angular/core';
import {
  CategoryScale,
  Chart,
  ChartConfiguration,
  ChartItem,
  ChartOptions,
  ChartTypeRegistry,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js';
import { DeepPartial } from 'chart.js/dist/types/utils';

export interface IDataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  backgroundColor: string;
  tension: number;
  borderWidth: number;
  pointRadius: number;
}

export interface IChartData {
  labels: string[];
  datasets: IDataset[];
}

@Injectable({
  providedIn: 'root',
})
export class ChartDisplayService {
  private dataChart: IChartData = {
    labels: [],
    datasets: [],
  };

  private options: DeepPartial<ChartOptions<any>> = {
    scales: {
      x: {
        type: 'category',
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  private config: ChartConfiguration = {
    type: 'line',
    data: this.dataChart,
    options: this.options,
  };

  private myChart: Chart | null = null;

  private chartItem: ChartItem | undefined;

  initializeChart(
    chartCanvas: ChartItem,
    chartType: keyof ChartTypeRegistry = 'line',
    labels: string[] = [],
    datasets: IDataset[] = []
  ): void {
    if (chartCanvas) {
      this.chartItem = chartCanvas;
    } else {
      throw new Error(`There is no canvas element.`);
    }
    Chart.register(
      CategoryScale,
      LinearScale,
      LineController,
      LineElement,
      PointElement,
      Filler
    );
    this.setDataChart(labels, datasets);
    this.config.type = chartType;
  }

  setDataChart(labels: string[], datasets: IDataset[]): void {
    this.dataChart.labels = labels;
    this.dataChart.datasets = datasets;
  }

  setXAxisOptions(
    type?:
      | 'linear'
      | 'logarithmic'
      | 'category'
      | 'time'
      | 'timeseries'
      | undefined,
    display?: boolean,
    ticksDisplay?: boolean,
    gridDisplay?: boolean
  ): void {
    if (type) {
      this.options.scales.x.type = type;
    }
    if (display !== undefined) {
      this.options.scales.x.display = display;
    }
    if (ticksDisplay !== undefined) {
      this.options.scales.x.ticks.display = ticksDisplay;
    }
    if (gridDisplay !== undefined) {
      this.options.scales.x.grid.display = gridDisplay;
    }
  }

  setYAxisOptions(
    type?:
      | 'linear'
      | 'logarithmic'
      | 'category'
      | 'time'
      | 'timeseries'
      | undefined,
    display?: boolean,
    ticksDisplay?: boolean,
    gridDisplay?: boolean
  ): void {
    if (type) {
      this.options.scales.y.type = type;
    }
    if (display !== undefined) {
      this.options.scales.y.display = display;
    }
    if (ticksDisplay !== undefined) {
      this.options.scales.y.ticks.display = ticksDisplay;
    }
    if (gridDisplay !== undefined) {
      this.options.scales.y.grid.display = gridDisplay;
    }
  }

  setPluginsOptions(legendDisplay: boolean): void {
    this.options.plugins = { legend: { display: legendDisplay } };
  }

  setResponsiveOptions(responsive: boolean): void {
    this.options.responsive = responsive;
  }

  setMaintainAspectRatio(maintainAspectRatio: boolean): void {
    this.options.maintainAspectRatio = maintainAspectRatio;
  }

  drawNewChart(labels?: string[], datasets?: IDataset[]): boolean {
    if (this.chartItem) {
      try {
        if (labels !== undefined && datasets !== undefined) {
          this.setDataChart(labels, datasets);
        }
        if (this.myChart) {
          this.chartDestroy();
        }
        this.myChart = new Chart(this.chartItem, this.config);
        return true;
      } catch (error) {
        throw new Error(`error: ${error}`);
      }
    } else {
      throw new Error('no canvas element detected');
    }
  }

  chartDestroy(): void {
    if (this.myChart) {
      this.myChart.destroy();
    } else {
      throw new Error('there is nothing to destroy');
    }
  }
}
