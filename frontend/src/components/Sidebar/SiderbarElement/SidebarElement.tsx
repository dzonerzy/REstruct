export default function SidebarElement({ text, iconElement, onClick }) {
  return (
    <div className="cursor-pointer rounded-md p-1 px-4 hover:bg-slate-400 dark:hover:bg-slate-700" onClick={onClick}>
      <div className="flex gap-x-2">
        {iconElement}
        <span>{text}</span>
      </div>
    </div>
  );
}
