import { FirstScanType, ValueType } from "../MemorySearchSettings.types";
import "./MemorySearchSettings.css";
import MemoryValueInput from "./MemoryValueInput/MemoryValueInput";

export default function MemorySearchSettings() {
  return (
    <search className="memory-search-settings flex min-w-[409px] max-w-[409px] flex-col gap-y-4 border-[1px] p-1 px-4 dark:text-white">
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
          <input type="checkbox" id="lua-formula" />
          <label htmlFor="lua-formula">Lua&nbsp;formula</label>
        </div>

        <div className="col-span-2 flex gap-x-2 justify-self-end">
          <span>Value&nbsp;Type</span>
          <select className="w-40" name="" id=""></select>
        </div>

        <div className="flex gap-1">
          <input type="checkbox" id="not" />
          <label htmlFor="not">Not</label>
        </div>

        <section className="col-span-3 mt-3 grid grid-cols-3 gap-2">
          <div className="col-span-2 border-[1px] p-1 pt-2">
            <h3 className="absolute ml-1 mt-[-20px] bg-[#1b2636] px-1">Memory Scan Options</h3>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi delectus commodi quis reiciendis corporis
              quasi iusto non facere obcaecati accusantium.
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex h-min gap-1">
              <input type="checkbox" id="unrandomizer" />
              <label htmlFor="unrandomizer">Unrandomizer</label>
            </div>

            <div className="flex h-min gap-1">
              <input type="checkbox" id="enable-speedhack" />
              <label htmlFor="enable-speedhack">Enable&nbsp;Speedhack</label>
            </div>
          </div>
        </section>
      </section>
    </search>
  );
}
