import type { GoApiErr, GoApiResponse } from "../components/components.types";

/** Custom hook to wrap the golang bindings for react states logic */
export default function useGo(
  /** The useState function to set the data value on each binding */
  setData: React.Dispatch<React.SetStateAction<any>>,
  /** The useState function to set the error value on each binding */
  setError: React.Dispatch<React.SetStateAction<GoApiErr>>
) {
  //@ts-ignore
  const binds = window.go.main.App;
  const impossible = (err: any) => {
    console.error("This should be impossible, value received: ", err);
  };

  /** Callback for promise created through a golang binding
   *
   * (following the `{data: interface{}, error: string}` convention)
   */
  const setResp = ({ data, error }: GoApiResponse) => {
    setData(data);
    setError(error);
  };

  /** Gets processes running on the machine */
  const GetProcesses = () => {
    binds.GetProcesses().then(setResp).catch(impossible);
  };

  return { GetProcesses };
}
