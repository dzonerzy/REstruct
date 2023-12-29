type TableProps = {
  /** object keys are gonna be splitted by ':' so don't put it in a key */
  data: object[];
};

export default function Table({ data }: TableProps) {
  if (!Array.isArray(data)) {
    return <span className="text-red-500">data is not an Array</span>;
  }

  if (!data.length) {
    return (
      <table className="w-full table-auto border-collapse overflow-hidden rounded-lg border border-gray-300 text-white dark:border-gray-700">
        <thead>
          <tr className="bg-gray-200 uppercase dark:bg-gray-700">
            <th className="border border-gray-300 px-4 py-2 dark:border-gray-700">No data</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white text-center italic last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            <span className="opacity-25">No data</span>
          </tr>
        </tbody>
      </table>
    );
  }

  let aligns = [];

  return (
    <table className="w-full table-fixed border-collapse overflow-hidden rounded-lg border border-gray-300 text-white dark:border-gray-700">
      <thead>
        <tr className="bg-gray-200 uppercase dark:bg-gray-700">
          {Object.keys(data[0]).map(alignedKey => {
            type AlignedKey = [string, "l" | "c" | "r"];
            const [key, align = ""] = alignedKey.split(":") as AlignedKey;

            let alignClass = "";
            switch (align) {
              case "l":
                alignClass = "text-left";
                break;
              case "c":
                alignClass = "text-center";
                break;
              case "r":
                alignClass = "text-right";
                break;
            }

            aligns.push(alignClass);

            return (
              <th
                scope="col"
                className={`px-4 py-3 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400 ${alignClass}`}
              >
                {key}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map(obj => (
          <tr className="border-b bg-white last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            {Object.values(obj).map((val, i) => (
              <td scope="row" className={`px-4 py-2 ${aligns[i]}`}>
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
