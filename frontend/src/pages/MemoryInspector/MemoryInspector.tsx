import MemorySearchSettings from "../../components/MemoryInspector/MemorySearchSettings/MemorySearchSettings";

export default function MemoryInspector() {
  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <div className="flex gap-1">
        <div className="w-full border-[1px] p-[2px]">memory search results</div>
        <div className="w-[750px] border-[1px] p-[2px]">
          <MemorySearchSettings />
        </div>
      </div>
      <div className="mt-1 w-full grow border-[1px] p-[2px]">selected addresses and values</div>
    </div>
  );
}
