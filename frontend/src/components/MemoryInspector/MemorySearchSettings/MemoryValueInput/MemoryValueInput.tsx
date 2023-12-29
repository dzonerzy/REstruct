import { FirstScanType, NextScanType, ValueType } from "../../MemorySearchSettings.types";

type MemoryValueInputProps = {
  scanType: FirstScanType | NextScanType;
  valueType: ValueType;
};

export default function MemoryValueInput({ scanType, valueType }: MemoryValueInputProps) {
  // change html and inputs based on scanType and valueType
  return <input className="border-[1px] border-neutral-500 bg-neutral-800" type="text" id="value-input" />;
}
