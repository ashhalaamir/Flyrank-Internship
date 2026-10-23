import { useId, useState } from "react"

export function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId()

  return (
    <div className="border rounded p-4">
      <button
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between w-full font-bold focus:outline-blue-500"
      >
        <span>Manual Disclosure</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      <div id={panelId} hidden={!isOpen}>
        <div className="mt-2 text-gray-600">
          This is the hidden content. It is revealed using standard button interactions.
        </div>
      </div>
    </div>
  );
}