import { FirstScanType, ValueType } from "../MemorySearchSettings.types";
import "./MemorySearchSettings.css";
import MemoryValueInput from "./MemoryValueInput/MemoryValueInput";

export default function MemorySearchSettings() {
  return (
    <search className="memory-search-settings flex flex-col gap-y-4 px-4 dark:text-white">
      <div className="flex gap-4">
        <button className="btn-primary">First Scan</button>
        <button>Next Scan</button>
        <button className="ml-auto">Undo Scan</button>
      </div>
      <div className="flex gap-2">
        <section className="mt-auto flex flex-row-reverse gap-1">
          <label className="pb-px" htmlFor="hex-checkbox">
            Hex
          </label>
          <input type="checkbox" id="hex-checkbox" />
        </section>
        <section className="flex grow flex-col gap-y-[2px]">
          <label htmlFor="value-input">Value:</label>
          <MemoryValueInput scanType={FirstScanType.ExactValue} valueType={ValueType.FourBytes} />
        </section>
      </div>
      <section className="grid grid-cols-3 gap-x-2 gap-y-1">
        <div className="col-span-2 flex gap-x-2 justify-self-end">
          <span>Scan&nbsp;Type</span>
          <select className="w-40" name="" id=""></select>
        </div>
        <div className="flex gap-1">
          <input type="checkbox" id="lua-format" />
          <label htmlFor="lua-formula">lua formula</label>
        </div>
        <div className="col-span-2 flex gap-x-2 justify-self-end">
          <span>Value&nbsp;Type</span>
          <select className="w-40" name="" id=""></select>
        </div>
        <div className="flex gap-1">
          <input type="checkbox" id="lua-format" />
          <label htmlFor="lua-formula">lua formula</label>
        </div>
      </section>
    </search>
  );
}
