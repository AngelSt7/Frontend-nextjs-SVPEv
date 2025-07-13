import { useMultiSelect } from '@/src/hooks/dashboard/ui/useMultiSelect'
import { FieldError, FieldValues, Path, UseFormRegisterReturn, UseFormSetValue, UseFormWatch } from 'react-hook-form'

type ItemOption = {
  label: string
  value: number
  filter: number
}

type MultiSelectTabsProps<T extends FieldValues> = {
  data: ItemOption[]
  name: Path<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
  register: UseFormRegisterReturn
  errorMessage?: FieldError
  label?: string
}

export default function MultiSelectTabs<T extends FieldValues>({
  data, name, setValue, watch, register, errorMessage, label
}: MultiSelectTabsProps<T>) {
  
  const { toggleSelect, isSelected } = useMultiSelect({
    data,
    name,
    setValue,
    watch
  })

  return (
    <div className="flex flex-col gap-4">
      {label && (
        <label htmlFor={`${name}`} className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">
          {label}
        </label>
      )}
      <input type="hidden" {...register} />
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => toggleSelect(item.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              isSelected(item.value)
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-gray-100 dark:bg-[#6f6991] dark:text-zinc-100 dark:border-zinc-600 dark:hover:bg-[#8b86a8] text-gray-700 border-gray-300 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {errorMessage && (
        <span className="text-xs text-[#d10b30] font-medium">{errorMessage.message}</span>
      )}
    </div>
  )
}