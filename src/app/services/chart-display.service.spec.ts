import { TestBed } from '@angular/core/testing';
import { ChartDisplayService, IDataset } from './chart-display.service';

describe('ChartDisplayService', () => {
  let service: ChartDisplayService;
  const labels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  const datasets: IDataset[] = [
    {
      label: 'Sample Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1,
      borderWidth: 1,
      pointRadius: 4,
    },
  ];
  let dummyElement = document.createElement('canvas');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartDisplayService],
    });
    service = TestBed.inject(ChartDisplayService);
  });

  it('should initialize Chart with correct new parameter', () => {
    service.initializeChart(dummyElement, 'line', labels, datasets);

    expect(service['config'].type).toEqual('line');
    expect(service['dataChart']).toEqual({
      labels: labels,
      datasets: datasets,
    });
  });

  describe('chat data options', () => {
    it('should set X axis options', () => {
      service.setXAxisOptions('linear', true, true, true);
      const options = service['options'];
      expect(options.scales.x.type).toBe('linear');
      expect(options.scales.x.display).toBe(true);
      expect(options.scales.x.ticks.display).toBe(true);
      expect(options.scales.x.grid.display).toBe(true);
    });

    it('should set Y axis options', () => {
      service.setYAxisOptions('linear', true, true, true);
      const options = service['options'];
      expect(options.scales.y.type).toBe('linear');
      expect(options.scales.y.display).toBe(true);
      expect(options.scales.y.ticks.display).toBe(true);
      expect(options.scales.y.grid.display).toBe(true);
    });

    it('should set plugins options', () => {
      service.setPluginsOptions(true);
      const options = service['options'];
      expect(options.plugins?.legend?.display).toBe(true);
    });

    it('should set responsive options', () => {
      service.setResponsiveOptions(true);
      const options = service['options'];
      expect(options.responsive).toBe(true);
    });

    it('should set maintain aspect ratio', () => {
      service.setMaintainAspectRatio(true);
      const options = service['options'];
      expect(options.maintainAspectRatio).toBe(true);
    });
  });

  describe('drawNewChart', () => {
    it('should throw error when draw a new chart because there is no canvas element', () => {
      expect(() => service.drawNewChart()).toThrowError(
        'no canvas element detected'
      );
    });

    it('should change the chart data (labels, datasets) from here', () => {
      service.initializeChart(dummyElement);
      service.drawNewChart(labels, datasets);
      expect(service['config'].type).toEqual('line');
      expect(service['dataChart']).toEqual({
        labels: labels,
        datasets: datasets,
      });
    });
  });

  it('should destroy the chart', () => {
    expect(() => service.chartDestroy()).toThrowError(
      'there is nothing to destroy'
    );
  });
});
