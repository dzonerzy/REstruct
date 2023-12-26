import { Alert } from "flowbite-react";

type ErrorAlertProps = {
  errorMsg: string;
  closeError: () => void;
};

export default function ErrorAlert({ errorMsg, closeError }: ErrorAlertProps) {
  if (!errorMsg) {
    return <></>;
  }
  return (
    <div className="fixed bottom-0 flex h-full w-full flex-col-reverse p-6">
      <Alert
        rounded
        color="failure"
        className="w-full cursor-pointer bg-gray-600 text-gray-300 hover:bg-gray-700"
        onClick={closeError}
      >
        {errorMsg}
      </Alert>
    </div>
  );
}
