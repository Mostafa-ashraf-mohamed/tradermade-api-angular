import { IQuote } from './quote';

export interface ResponseIQuote {
  base_currency: string;
  end_date: string;
  endpoint: string;
  quote_currency: string;
  quotes: IQuote[];
  request_time: string;
  start_date: string;
}
