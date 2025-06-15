import React from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

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
    return typeof initial === 'string' && initial.length > 0
      ? initial.split(',').map((s: string) => s.trim())
      : [];
  });

  React.useEffect(() => {
    const filteredTags = tags.filter(tag => tag.trim() !== '');
    setValue(name, filteredTags as PathValue<T, Path<T>>);

    if (filteredTags.length === 0) {
      setValue(name, filteredTags as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
    }
  }, [tags]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags(prev => [...prev, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
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
        className={`text-sm block w-full h-[50px] p-2 border border-[#afaeae] dark:border-[#3f3f46] bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] rounded-md outline-none focus:ring-1 focus:ring-white/10 ${
          errorMessage ? 'ring-1 ring-[#d10b30]' : ''
        }`}
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <div
              key={tag}
              className="flex items-center gap-1 bg-indigo-100 dark:bg-[#6f6991] dark:text-zinc-100 dark:border-zinc-600 text-indigo-700 border border-indigo-300 px-3 py-1 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-xs hover:text-red-600 hover:text-zinc-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {errorMessage && (
        <span className="text-xs text-[#d10b30] font-medium">
          {errorMessage.message}
        </span>
      )}
    </div>
  );
}
