"use client";

import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import type { GoApiErr, Process } from "../components.types";
import useGo from "../../api/useGo";

export default function ProcessesTable() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [error, setError] = useState<GoApiErr>("");

  const { GetProcesses } = useGo(setProcesses, setError);

  useEffect(() => {
    GetProcesses();
  }, []);

  return error ? (
    <h1 className="bg-red-600">{error}</h1>
  ) : (
    <>
      <div className="pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-80 rounded-lg border border-gray-300 bg-gray-50 ps-10 pt-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              {["PID", "Name", "Architecture", " "].map((item, i) => (
                <th scope="col" className="px-6 py-3" key={item}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processes.map((process, i) => (
              // striped rows tailwindcss
              <tr
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                key={process.pid}
              >
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {process.pid}
                </th>
                <td className="px-6 py-4">{process.name}</td>
                <td className="px-6 py-4">{process.arch}</td>
                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Attach
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
