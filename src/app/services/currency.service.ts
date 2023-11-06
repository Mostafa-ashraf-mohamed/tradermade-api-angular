import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { IRequestParameters, ResponseIQuote } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://marketdata.tradermade.com/api/v1/';
  private apiKey = 'N3dQNjQN3LWaK3Km6GS4';
  constructor(private http: HttpClient) {}

  getAllCurrenciesList(): Observable<any> {
    const finalApi: string = `${this.apiUrl}live_currencies_list?api_key=${this.apiKey}`;

    return this.http.get<any>(finalApi).pipe(
      catchError(this.handleError),
      map((response) => response.available_currencies),
      shareReplay(1)
    );
  }

  getTimeseriesData(requestParameters: IRequestParameters): Observable<any> {
    const finalApi: string = `${this.apiUrl}timeseries?currency=${requestParameters.baseCurrency}${requestParameters.quoteCurrency}&start_date=${requestParameters.startDate}&end_date=${requestParameters.endDate}&api_key=${this.apiKey}`;
    return this.http.get<ResponseIQuote>(finalApi).pipe(
      catchError(this.handleError),
      map((response) => response.quotes)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
