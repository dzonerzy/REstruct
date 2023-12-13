"use client";

import { useEffect, useState } from "react";
import useGo from "../../api/useGo";
import ModalGuard from "../Wrappers/ModalThemed";
import TooltipThemed from "../Wrappers/TooltipThemed";
import type { GoApiErr, Process } from "../components.types";

export default function ProcessesTable() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [error, setError] = useState<GoApiErr>(null);
  const [loading, setLoading] = useState(true);
  const [attachedPid, setAttachedPid] = useState<number>(-1);
  const [selectedPid, setSelectedPid] = useState<number>(-1);
  const [modalText, setModalText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { GetProcesses } = useGo(setProcesses, setError, setLoading);
  const { TerminateProcess } = useGo(
    () => {},
    err => {
      if (!err) {
        GetProcesses();
      }
      setError(err);
    },
    setLoading
  );

  useEffect(() => {
    GetProcesses();
  }, []);

  const onConfirm = () => {
    TerminateProcess(selectedPid);
    setOpenModal(false);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center" role="status">
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return error ? (
    <h1 className="bg-red-600">{error}</h1>
  ) : (
    <>
      <ModalGuard {...{ text: modalText, openModal, setOpenModal, onConfirm }} />
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

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              {["PID", "Icon", "Name", "Exe", "Architecture", " "].map(item => (
                <th scope="col" className={`px-4 py-3 ${item === "Name" ? "" : "text-center"}`} key={item}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processes.map(process => (
              // striped rows tailwindcss
              <tr
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                key={process.pid}
              >
                <th
                  scope="row"
                  className="whitespace-nowrap p-4 py-2 text-center font-medium text-gray-900 dark:text-white"
                >
                  {process.pid}
                </th>
                <td className="p-4 py-2">
                  <div className="w-8">
                    <img src={process.icon} />
                  </div>
                </td>
                <td className="p-4 py-2">{process.desc}</td>
                <td className="p-4 py-2 text-center">{process.name}</td>
                <td className="p-4 py-2">
                  <div className="flex w-full items-center justify-center">
                    {process.arch === 1 ? <img src="/assets/bit32.svg" /> : <img src="/assets/bit64.svg" />}
                  </div>
                </td>
                <td className="min-w-max p-4 py-2">
                  <div className="flex w-max flex-row items-center gap-x-3">
                    {attachedPid === -1 ? (
                      <i className="fi fi-br-play-circle cursor-pointer text-xl text-green-600 hover:text-green-700"></i>
                    ) : (
                      <i className="fi fi-br-stop-circle cursor-pointer text-xl text-red-600 hover:text-red-700"></i>
                    )}
                    <TooltipThemed content="Kill Process">
                      <i
                        className="fi fi-sr-trash cursor-pointer text-xl text-amber-600 hover:text-amber-700"
                        onClick={() => {
                          setSelectedPid(process.pid);
                          setModalText(`Are you sure you want to kill pid ${process.pid}?\n(${process.name})`);
                          setOpenModal(true);
                        }}
                      ></i>
                    </TooltipThemed>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
