import { useEffect } from "react";
import { useUtilityContext } from "../hooks/utilities";
import { Card, CustomFlowbiteTheme, Dropdown, Spinner, Button, ToggleSwitch } from 'flowbite-react';
import { useSearchContext } from "../hooks/search";

const TIME_SERIES_INTRADAY = 'TIME_SERIES_INTRADAY';
const customTheme: CustomFlowbiteTheme['dropdown'] = {
  floating: {
    target: "w-full"
  },
};

const replaceTimeSeries = (r: string) => r.replaceAll('_', ' ');

export default function LoadUtitilies() {
  const { utilities, setInterval, setOutputSize, setTimeSeries } = useUtilityContext();
  const { search, setSearch } = useSearchContext();
  const { data } = useSearchContext();

  const initFunction = () => {
    setInterval();
    setOutputSize();
    setTimeSeries();
  }
  
  useEffect(() => {
    initFunction();
  }, [])

  const setQuery = (e: string | boolean, field: 'extended_hours' | 'timeSeries' | 'interval' | 'outputSize' | 'adjusted' | '') => {
    setSearch((props) => {
      if (field === 'timeSeries') {
        return { 
            timeSeries: e as string,
            interval: '',
            outputSize: '',
            search: null
        }
      }

      return { ...props, [field]: e }
    })
  }

  const setSearchFn = () => {
    setSearch({
        ...search,
        search: new Date()
    });
  }
 
  return (
    <Card href="#" className="w-100 m-2">
      { utilities.success ? <div className="flex flex-col space-y-4">
        <Dropdown theme={customTheme} color="light" label={ replaceTimeSeries(search.timeSeries) || "Time Series *" } >
            {utilities.timeSeries.map(r => <Dropdown.Item key={r} onClick = {() => setQuery(r, 'timeSeries')}>{replaceTimeSeries(r)}</Dropdown.Item>)}
        </Dropdown>
        {
            search.timeSeries === TIME_SERIES_INTRADAY && <Dropdown theme={customTheme} color="light" label={ search.interval || 'Interval *' }>
                {[utilities.interval[0], utilities.interval[1]].map(r => <Dropdown.Item value={r} onClick = {() => setQuery(r, 'interval')}>{r}</Dropdown.Item>)}
            </Dropdown>
        }
        <Dropdown theme={customTheme} color="light" label={ search.outputSize || 'Output Size' }>
            {utilities.outputSize.map(r => <Dropdown.Item value={r} onClick = {() => setQuery(r, 'outputSize')}>{r}</Dropdown.Item>)}
        </Dropdown>
        
        <div className="w-full flex">
            {
                search.timeSeries === TIME_SERIES_INTRADAY && <ToggleSwitch className="ml-auto" checked={search.adjusted || false} label="Adjusted" onChange={(e) => setQuery(e, 'adjusted')} />
            }
            {
                search.timeSeries === TIME_SERIES_INTRADAY && <ToggleSwitch className="ml-2" checked={search.extended_hours || false} label="Extended Hours" onChange={(e) => setQuery(e, 'extended_hours')} />
            }
        </div>
        <Button disabled={!search.timeSeries || search.timeSeries === TIME_SERIES_INTRADAY && !search.interval || data.loading} color="success" onClick={setSearchFn}>{ data.loading ? 'Loading...' : 'Search'}</Button>
            </div> : <Spinner />
      }
    </Card>
  );
}
  