
'use client';
import React, { useState } from 'react';
import { Card, CustomFlowbiteTheme, Dropdown, Pagination, Spinner, Table } from 'flowbite-react';
import { ITransformTimeSeries, useSearchContext } from '../hooks/search';

const paginate = (array: ITransformTimeSeries[], page_size: number, page_number: number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const customTheme: CustomFlowbiteTheme['pagination'] = {
  "pages": {
    "base": "xs:mt-0 mt-0 inline-flex items-center -space-x-px ml-2",
  }
};


export default function Display() {
  const { data } = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [display, setDisplay] = useState<ITransformTimeSeries[]>([]);
  const [pageLength, setPageLength] = useState<number>(0)
  const [columns, setColumns] = useState<string[]>([]);
  
  const onPageChange = (pageNo: number = page) => {
    const newDisplay = paginate(data.result.time_series, limit, pageNo);
    setDisplay(newDisplay);
  }

  React.useEffect(() => {
    const newRecords = data.result.time_series
    const newColumns = newRecords?.[0]?.value ?? {}

    setColumns(Object.keys(newColumns))
    
    if (newRecords.length === 0) {
      setPage(1);
      setLimit(10);
    } else {
      onPageChange();
      setPageLength(Math.ceil(newRecords.length / limit))
    }
  }, [data.result.time_series]);

  React.useEffect(() => {
    onPageChange(page)
  }, [page])

  React.useEffect(() => {
    setPageLength(Math.ceil(data.result.time_series.length / limit))
  }, [limit])

  React.useEffect(() => {
    setPage(1)
    onPageChange(1)
  }, [pageLength])

  return <Card href="#" className="w-100 m-2">
    {
        data.loading ? <Spinner/> : 
        <div className="flex flex-col overflow-x-auto space-y-2">
          <div className='w-full flex flex-row-reverse'>
            <Pagination theme={customTheme} currentPage={page} totalPages={pageLength} onPageChange={(p) => { setPage(p) }} showIcons />
            <Dropdown size="xs" color="light" label={ limit || "Page Limit" } >
                { [10, 50, 100].map(r => <Dropdown.Item key={r} onClick = {() => setLimit(r)}>{(r)}</Dropdown.Item>) }
            </Dropdown>
          </div>
          <Table>
              <Table.Head>
                  <Table.HeadCell>#</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                  {
                    columns.map(r =>  <Table.HeadCell key={`th-${r}`}>{r}</Table.HeadCell>)
                  }
              </Table.Head>
              <Table.Body className="divide-y">
                  { display.map((r) => (
                    <Table.Row key={`row-${r.index}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell key={`row-index-${r.index}`}>{ r.index }</Table.Cell>
                    <Table.Cell key={`row-date-${r.index}`}>{r.date.toString()}</Table.Cell>
                    {
                        columns.map(c => <Table.Cell key={`tc-${r.index}-${c}`}>{r.value[c]}</Table.Cell>)
                    }
                    </Table.Row>
                  ))}
              </Table.Body>
          </Table>
        </div>
    }
  </Card>
}
