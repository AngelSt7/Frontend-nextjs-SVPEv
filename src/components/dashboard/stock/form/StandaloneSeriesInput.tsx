import { useStandaloneSeriesInput } from '@/src/hooks/dashboard/ui/useStandaloneSeriesInput';
import React from 'react';

type StandaloneSeriesInputProps = {
  isEnabled: boolean;
  series: string[];
  onSeriesChange: (series: string[]) => void;
  errorMessage?: string;
};

export default function StandaloneSeriesInput({
  isEnabled,
  series,
  onSeriesChange,
  errorMessage,
}: StandaloneSeriesInputProps) {

  const {
      inputValue,
      setInputValue,
      handleKeyDown,
      removeTag } =
  useStandaloneSeriesInput(
    { series,
      onSeriesChange }
  );

  if (!isEnabled) return null;

  return (
    <div className="flex flex-col gap-2 mt-4">
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe y presiona Enter o coma"
        className={`text-sm block w-full h-[50px] p-2 border border-[#afaeae] dark:border-[#3f3f46] bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] rounded-md outline-none focus:ring-1 focus:ring-white/10 ${
          errorMessage ? 'ring-1 ring-[#d10b30]' : ''
        }`}
      />
      {series.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {series.map(tag => (
            <div
              key={tag}
              className="flex items-center gap-1 bg-indigo-100 dark:bg-[#6f6991] dark:text-zinc-100 dark:border-zinc-600 text-indigo-700 border border-indigo-300 px-3 py-1 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-xs hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      {errorMessage && (
        <span className="text-xs text-[#d10b30] font-medium">
          {errorMessage}
        </span>
      )}
    </div>
  );
}