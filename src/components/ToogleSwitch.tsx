"use client";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function ToggleSwitch({
  label,
  checked,
  onChange,
}: ToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span>{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#FAA620] ] transition-colors duration-200" />
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5" />
      </label>
    </div>
  );
}