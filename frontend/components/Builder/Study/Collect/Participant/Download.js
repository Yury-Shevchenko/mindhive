// useSWR allows the use of SWR inside function components
import useSWR from "swr";

import { saveAs } from "file-saver";
import { jsonToCSV } from "react-papaparse";

// A fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Download({ date, dataToken, components }) {
  // Set up SWR to run the fetcher function when calling "/api/staticdata"
  // There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const [year, month, day] = date.split("-");
  const { data, error } = useSWR(
    `/api/data/${year}/${month}/${day}/${dataToken}`,
    fetcher
  );

  // Handle the error state
  if (error) return <div>Failed to load</div>;
  // Handle the loading state
  if (!data) return <div>Loading...</div>;
  // Handle the ready state and display the result contained in the data object mapped to the structure of the json file

  // trim the data
  const trimmedData = "[" + data.trim().slice(0, -1) + "]";

  let results = [];
  if (data) {
    results = JSON.parse(trimmedData);
  }
  // aggregate all data together
  const rows = results
    .filter((result) => result?.data)
    .map((result) =>
      result?.data.map((line) => ({
        ...line,
        url: JSON.stringify(line?.url),
        meta: JSON.stringify(line?.meta),
        ...result?.metadata,
        subtitle: components
          .filter((c) => c?.testId === result?.metadata?.testVersion)
          .map((c) => c?.subtitle),
        condition: components
          .filter((c) => c?.testId === result?.metadata?.testVersion)
          .map((c) => c?.conditionLabel),
      }))
    )
    .reduce((a, b) => a.concat(b), []);

  const download = () => {
    const allKeys = rows
      .map((line) => Object.keys(line))
      .reduce((a, b) => a.concat(b), []);
    const keys = Array.from(new Set(allKeys));
    const csv = jsonToCSV({ fields: keys, data: rows });
    const blob = new Blob([csv], {
      type: "text/csv",
    });
    saveAs(blob, `${dataToken}.csv`);
  };

  return <button onClick={download}>Download</button>;
}
