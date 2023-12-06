import { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../context/search';
import { backendAxios } from '../axios';
import { IApiResponse } from './response';

interface IMockResponse extends IApiResponse {
  result: ITransformUSTradeOutput
}

interface IMetaData {
  [key: string]: string
}

export interface ITimeSeriesValue {
  [key: string]: number | string
}

export interface ITransformTimeSeries {
  value: ITimeSeriesValue
  date: Date
  index: number
}

export interface ITransformUSTradeOutput {
  'meta_data': IMetaData | null;
  'time_series': ITransformTimeSeries[];
}

const initData = { meta_data: null, time_series: [] }

export const useSearch = () => {
  const [search, setSearch] = useState<{
    timeSeries: string,
    interval: string,
    outputSize: string,
    adjusted?: boolean,
    extended_hours?: boolean,
    month?: string,
    search: Date | null
  }>({
    timeSeries: '',
    interval: '',
    outputSize: '',
    search: null
  })
  const [data, setData] = useState<{ loading: boolean, result: ITransformUSTradeOutput }>({ loading: false, result: { ...initData } })
  const searchApi = async () => {
    const params = {
      function: search.timeSeries
    };

    if (search.interval) {
      Object.assign(params, { interval: search.interval });
    }

    if (search.outputSize) {
      Object.assign(params, { outputSize: search.outputSize });
    }

    const appendUrl = params.function === 'TIME_SERIES_INTRADAY' ? 'mock' : 'mock/trading'
    const { data: result } = await backendAxios.post<IMockResponse>(appendUrl, params);

    setData({ result: result.result, loading: false })
  }

  useEffect(() => {
    if (search.search) {
      setData({ result: { ...initData }, loading: true })
    }
  }, [
    search.search
  ]);

  useEffect(() => {
    if (data.loading) {
      searchApi()
    }
  }, [data.loading])

  return {
    search,
    setSearch,
    data
  }
}

export const useSearchContext = () => {
  const props = useContext(SearchContext);

  return props;
}
