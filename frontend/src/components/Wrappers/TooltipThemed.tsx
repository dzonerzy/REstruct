import { Tooltip, type TooltipProps } from "flowbite-react";

export default function TooltipThemed(props: TooltipProps) {
  const theme = {
    target: "w-fit",
    animation: "transition-opacity",
    arrow: {
      base: "absolute z-10 h-2 w-2 rotate-45",
      style: {
        dark: "bg-gray-700 dark:bg-gray-500",
        light: "bg-white",
        auto: "bg-white dark:bg-gray-700",
      },
      placement: "-4px",
    },
    base: "absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm",
    hidden: "invisible opacity-0",
    style: {
      dark: "bg-gray-600 text-white dark:bg-gray-500",
      light: "border border-gray-200 bg-white text-gray-900",
      auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
    },
    content: "relative z-20",
  };
  return <Tooltip {...{ ...props, theme }} />;
}
