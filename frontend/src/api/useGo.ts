import type { GoApiErr, GoApiResponse, Process } from "../components/components.types";

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
  const binds = window.go.main.App;
  const impossible = (err: any) => {
    console.error("This should be impossible, value received: ", err);
  };

  const setLoadingFalse = () => setLoading(false);

  /** Callback for promise created through a golang binding
   *
   * (following the `{data: interface{}, error: string}` convention)
   */
  const setResp = ({ data, error }: GoApiResponse<any>) => {
    setData(data);
    setError(error);
  };

  /** Gets processes running on the machine */
  const GetProcesses = () => {
    setLoading(true);
    (binds.GetProcesses() as Promise<GoApiResponse<Process[]>>)
      .then(setResp)
      .catch(impossible)
      .finally(setLoadingFalse);
  };

  return { GetProcesses };
}
