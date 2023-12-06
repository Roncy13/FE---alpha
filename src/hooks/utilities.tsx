import { useContext, useEffect, useState } from 'react';
import { backendAxios } from '../axios';
import { UtilitiesContext } from '../context/utilities';
import { IApiResponse } from './response';

interface IUtilityResponse extends IApiResponse {
  result: string[]
}

export const useUtilities = () => {
  const [utilities, setUtilities] = useState<{
    timeSeries: string[],
    interval: string[],
    outputSize: string[],
    success: boolean
  }>({
    timeSeries: [],
    interval: [],
    outputSize: [],
    success: false
  })

  const setTimeSeries = async () => {
    const { data } = await backendAxios.get<IUtilityResponse>('utilities/time-series')

    setUtilities((props) => {
      return { ...props, timeSeries: data.result }
    });
  }

  const setInterval = async () => {
    const { data } = await backendAxios.get<IUtilityResponse>('utilities/interval')
    
    setUtilities((props) => {
      return { ...props, interval: data.result }
    });
  }

  const setOutputSize = async () => {
    const { data } = await backendAxios.get<IUtilityResponse>('utilities/output-size')
    
    setUtilities((props) => {
      return { ...props, outputSize: data.result }
    });
  }

  useEffect(() => {
    if (utilities.interval.length > 0 && utilities.outputSize.length > 0 && utilities.timeSeries.length > 0) {
      setUtilities((props) => {
        return { ...props, success: true }
      });
    }
  }, [utilities.interval, utilities.outputSize, utilities.timeSeries])

  return {
    utilities,
    setTimeSeries,
    setInterval,
    setOutputSize
  }
}

export const useUtilityContext = () => {
  const props = useContext(UtilitiesContext);

  return props;
}
