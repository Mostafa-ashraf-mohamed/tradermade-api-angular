import { of } from 'rxjs';

export const currencyServiceMock = {
  getTimeseriesData: jasmine.createSpy('getTimeseriesData').and.returnValue({
    pipe: jasmine.createSpy('pipe').and.returnValue({
      subscribe: jasmine.createSpy('subscribe').and.returnValue(
        of([
          { date: '2023-10-01', close: 100 },
          { date: '2023-10-02', close: 120 },
          { date: '2023-10-03', close: 90 },
        ])
      ),
    }),
  }),
};

export const chartDisplayServiceMock = {
  initializeChart: jasmine.createSpy('initializeChart'),
  drawNewChart: jasmine.createSpy('drawNewChart').and.returnValue(true),
};
