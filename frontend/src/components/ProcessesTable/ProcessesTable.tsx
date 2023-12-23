import { useContext, useEffect, useMemo, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { GlobalCtx } from "../../App";
import useGo from "../../api/useGo";
import type { GoApiErr, Process } from "../../api/useGo.types";
import { MessageAttach, MessageDetach } from "../../api/useGoWebSocket.types";
import ArchIcon from "../ArchIcon/ArchIcon";
import Loading from "../Loading/Loading";
import ModalGuard from "../Wrappers/ModalThemed";
import TooltipThemed from "../Wrappers/TooltipThemed";

export default function ProcessesTable() {
  const [processes, setProcesses] = useState([]);
  const [error, setError] = useState<GoApiErr>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPid, setSelectedPid] = useState<number>(-1);
  const [modalText, setModalText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState("");
  const [loadingAttachDebugger, setLoadingAttachedDebugger] = useState(false);

  const {
    ws: { sendJsonMessage, lastJsonMessage, readyState },
    footer: [_, setFooterMsg],
    pid: [attachedPid, setAttachedPid],
  } = useContext(GlobalCtx);

  const connectionStatus = useMemo(
    () =>
      ({
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
      })[readyState],
    [readyState]
  );

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
    setFooterMsg("Open Processes");
  }, []);
  useEffect(() => {
    const timeOutId = setTimeout(() => setSearched(search), 150);
    return () => clearTimeout(timeOutId);
  }, [search]);
  useEffect(() => {
    if (!lastJsonMessage?.success) {
      setFooterMsg("Ws request failed ...");
    }
  }, [lastJsonMessage]);

  const onConfirm = () => {
    TerminateProcess(selectedPid);
    setOpenModal(false);
  };

  const attachDebugger = pid => () => {
    // setLoadingAttachedDebugger(true);
    setFooterMsg(`Attaching debugger to ${pid} ...`);
    sendJsonMessage(new MessageAttach(pid));
    setAttachedPid(pid);
  };

  const detachDebugger = () => {
    // setLoadingAttachedDebugger(true);
    setFooterMsg(`Detaching debugger from ${attachedPid} ...`);
    sendJsonMessage(new MessageDetach(attachedPid));
    setAttachedPid(-1);
  };

  const setSearchText = e => setSearch(e.target.value);

  const filterSearch = (process: Process) =>
    process.name.toLowerCase().includes(searched.toLowerCase()) ||
    process.pid.toString().includes(searched.toLowerCase()) ||
    process.desc.toLowerCase().includes(searched.toLowerCase());

  if (loading) {
    return <Loading />;
  }

  return error ? (
    <h1 className="bg-red-600">{error}</h1>
  ) : (
    <>
      <ModalGuard {...{ text: modalText, openModal, setOpenModal, onConfirm }} />
      <div className="flex justify-center pb-4">
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
            onChange={setSearchText}
            value={search}
          />
        </div>
      </div>

      <div className="relative w-full overflow-x-auto rounded-lg shadow-md ">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              {["PID", "", "Name", "Exe", "Architecture", " "].map(item => (
                <th scope="col" className={`px-4 py-3 ${item === "Name" ? "" : "text-center"}`} key={item}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processes.map((process: Process) =>
              // striped rows tailwindcss
              filterSearch(process) ? (
                <tr
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  key={process.pid}
                >
                  <td
                    scope="row"
                    className="whitespace-nowrap p-4 py-2 text-center font-medium text-gray-900 dark:text-white"
                  >
                    {process.pid}
                  </td>
                  <td className="p-4 py-2">
                    <div className="w-8">
                      <img src={process.icon} />
                    </div>
                  </td>
                  <td className="p-4 py-2">{process.desc}</td>
                  <td className="p-4 py-2 text-center">{process.name}</td>
                  <td className="p-4 py-2">
                    <div className="flex w-full items-center justify-center">
                      <ArchIcon arch={process.arch} />
                    </div>
                  </td>
                  <td className="min-w-max p-4 py-2">
                    <div className="flex max-h-min w-max flex-row items-center gap-x-3">
                      {loadingAttachDebugger && attachedPid === process.pid ? (
                        <TooltipThemed content="Trying to attach debugger ...">
                          <Loading />
                        </TooltipThemed>
                      ) : attachedPid !== process.pid ? (
                        <TooltipThemed content="Attach Debugger">
                          <i
                            className="fi fi-br-play-circle cursor-pointer text-xl text-green-600 hover:text-green-700"
                            onClick={attachDebugger(process.pid)}
                          ></i>
                        </TooltipThemed>
                      ) : (
                        <TooltipThemed content="Detach Debugger">
                          <i
                            className="fi fi-br-stop-circle cursor-pointer text-xl text-red-600 hover:text-red-700"
                            onClick={detachDebugger}
                          />
                        </TooltipThemed>
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
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
