import React from 'react'
import { FieldError, FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch, UseFormRegisterReturn } from 'react-hook-form'

export type ItemOption = { label: string, value: number }

type TabsProductProps<T extends FieldValues> = {
  data: ItemOption[]
  name: Path<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
  register: UseFormRegisterReturn
  errorMessage?: FieldError
  label?: string
}

export default function SelectTabs<T extends FieldValues>({ data, name, setValue, watch, register, errorMessage, label }: TabsProductProps<T>) {
  const selected = watch(name)

  const selectedLabel = React.useMemo(() => {
    const found = data.find(item => item.value === selected)
    return found ? found.label : ''
  }, [selected, data])

  const [search, setSearch] = React.useState(selectedLabel)
  const [filtered, setFiltered] = React.useState<ItemOption[]>([])

  React.useEffect(() => { setSearch(selectedLabel) }, [selectedLabel])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filteredItems = data.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filteredItems);
    } else {
      setFiltered([]);

      const selectedItem = data.find(item => item.value === selected);
      if (selectedItem && selectedItem.label.toLowerCase() !== value.toLowerCase()) {
        setValue(name, '' as PathValue<T, Path<T>>, { shouldValidate: true });
      }
    }
  };

  const onSelectProduct = (id: number, label: string) => {
    setValue(name, id as PathValue<T, Path<T>>, { shouldValidate: true });
    setSearch(label);
    const filteredItems = data.filter((item) =>
      item.label.toLowerCase().includes(label.toLowerCase())
    );
    setFiltered(filteredItems);
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={`${name}`} className="text-base font-semibold text-[#202021]">
        {`Buscar ${label}`}
      </label>

      <input type="hidden" {...register} />

      <input
        id={`${name}`}
        className={`h-12 text-sm block w-full p-2 border rounded-md bg-[#f4f4f5] hover:bg-[#e4e4e7] outline-none focus:ring-1 ${errorMessage ? 'border-[#d10b30] ring-[#d10b30]' : 'border-[#afaeae] focus:ring-indigo-400'
          }`}
        type="text"
        placeholder="Ingrese su busqueda"
        onChange={onChangeSearch}
        value={search}
      />

      {filtered.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filtered.slice(0, 5).map((product) => (
            <button
              key={product.value}
              type="button"
              onClick={() => onSelectProduct(product.value, product.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${selected === product.value
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 active:bg-gray-300'
                }`}
            >
              {product.label}
            </button>
          ))}
        </div>
      )}

      {errorMessage && (
        <span className="text-xs text-[#d10b30] font-medium">{errorMessage.message}</span>
      )}
    </div>
  )
}
