type ErrorAlertProps = {
  errorMsg: string;
  closeError: () => void;
};

export default function ErrorAlert({ errorMsg, closeError }: ErrorAlertProps) {
  if (!errorMsg) {
    return <></>;
  }
  return (
    <div
      className="fixed bottom-0 m-4 w-[95.5%] cursor-pointer self-center rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-900 dark:text-red-400"
      role="alert"
      onClick={closeError}
    >
      {errorMsg}
    </div>
  );
}
