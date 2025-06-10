import React from 'react';
import { FieldError, FieldValues, Path, PathValue, UseFormRegisterReturn, UseFormSetValue, UseFormWatch } from 'react-hook-form';

type SerieTabsInputProps<T extends FieldValues> = {
  isEnabled: boolean;
  name: Path<T>;
  register: UseFormRegisterReturn;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  errorMessage?: FieldError;
};

export default function SerieTabs<T extends FieldValues>({
  isEnabled,
  name,
  register,
  watch,
  setValue,
  errorMessage,
}: SerieTabsInputProps<T>) {
  const [inputValue, setInputValue] = React.useState('');
  const [tags, setTags] = React.useState<string[]>(() => {
    const initial = watch(name);
    return typeof initial === 'string' && initial.length > 0 ? initial.split(',').map((s: string) => s.trim()) : [];
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        setValue(name, newTags as PathValue<T, Path<T>>, { shouldValidate: true });

      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setValue(name, newTags as PathValue<T, Path<T>>, { shouldValidate: true });

  };

  if (!isEnabled) return null;

  return (
    <div className="flex flex-col gap-2 mt-4">
      <input type="hidden" {...register} />

      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe y presiona Enter o coma"
        className={`h-12 text-sm p-2 border rounded-md bg-[#f4f4f5] outline-none focus:ring-1 ${
          errorMessage ? 'border-[#d10b30] ring-[#d10b30]' : 'border-[#afaeae] focus:ring-indigo-400'
        }`}
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <div
              key={tag}
              className="flex items-center gap-1 bg-indigo-100 text-indigo-700 border border-indigo-300 px-3 py-1 rounded-full text-sm"
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

      {errorMessage && <span className="text-xs text-[#d10b30] font-medium">{errorMessage.message}</span>}
    </div>
  );
}
