import { GoApiErr, GoApiResponse, Process } from "./useGo.types";
import { GoBinds } from "./useGo.types";

/** Custom hook to wrap the golang bindings for react states logic */
export default function useGo(
  /** The useState function to set the data value on each binding */
  setData: React.Dispatch<React.SetStateAction<any>>,
  /** The useState function to set the error value on each binding */
  setError: React.Dispatch<React.SetStateAction<GoApiErr>>,
  /** Called at the end of the promise, either fulfilled or not */
  setLoading: React.Dispatch<React.SetStateAction<boolean>> = () => {}
) {
  //@ts-ignore
  const binds: GoBinds = window.go.main.App;
  const impossible = (err: any) => {
    console.error("This should be impossible, value received: ", err);
  };

  const setLoadingFalse = () => setLoading(false);

  /** Callback for promise created through a golang binding
   *
   * (following the `{data: interface{}, error: string}` convention)
   */
  const setResp = <T>({ data, error }: GoApiResponse<T>) => {
    setData(data);
    setError(error);
  };

  /** Gets processes running on the machine */
  const GetProcesses = () => {
    setLoading(true);
    binds
      .GetProcesses()
      .then(setResp<Process[]>)
      .catch(impossible)
      .finally(setLoadingFalse);
  };

  /** Kill process running on the machine */
  const TerminateProcess = (pid: number) => {
    setLoading(true);
    binds
      .TerminateProcess(pid)
      .then(setResp<number>)
      .catch(impossible)
      .finally(setLoadingFalse);
  };

  return { GetProcesses, TerminateProcess };
}
