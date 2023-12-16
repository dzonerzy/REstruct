import { useEffect, useState } from "react";
import useGo from "../../api/useGo";
import ModalGuard from "../Wrappers/ModalThemed";
import TooltipThemed from "../Wrappers/TooltipThemed";
import type { GoApiErr, Process } from "../../api/useGo.types";
import Loading from "../Loading/Loading";

export default function ProcessesTable() {
  const [processes, setProcesses] = useState([]);
  const [error, setError] = useState<GoApiErr>(null);
  const [loading, setLoading] = useState(true);
  const [attachedPid, setAttachedPid] = useState<number>(-1);
  const [selectedPid, setSelectedPid] = useState<number>(-1);
  const [modalText, setModalText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { GetProcesses } = useGo(setProcesses, setError, setLoading);
  const { TerminateProcess } = useGo(
    () => {}, // doesn't set any state
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
    return <Loading />;
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
