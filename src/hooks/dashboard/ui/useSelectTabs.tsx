import { ItemOption } from '@/src/types/commonTypes/commonTypes'
import { useEffect, useMemo, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form'

type SelectTabsReturn<T extends FieldValues> = {
  data: ItemOption[]
  name: Path<T>
  watch: UseFormWatch<T>
  setValue: UseFormSetValue<T>
}

export function useSelectTabs<T extends FieldValues>({
  data,
  name,
  watch,
  setValue,
}: SelectTabsReturn<T>) {
  const selected = watch(name)

  const selectedItem = useMemo(() => {
    return data.find(item => item.value === selected)
  }, [selected, data])

  const selectedLabel = selectedItem?.label || ''
  const [search, setSearch] = useState(selectedLabel)
  const [hasInteracted, setHasInteracted] = useState(false)

useEffect(() => {
  if (!hasInteracted) {
    setSearch(selectedLabel)
  }
}, [selectedLabel, hasInteracted])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return selectedItem ? [selectedItem] : []
    return data.filter(item =>
      item.label.toLowerCase().includes(query)
    )
  }, [search, data, selectedItem])


  useEffect(() => {
    if (!hasInteracted) return

    const query = search.trim().toLowerCase()
    const isExactMatch = selectedItem?.label.toLowerCase() === query
    const noMatch = filtered.length === 0

    if (query === '' || (noMatch && !isExactMatch)) {
      setValue(name, '' as PathValue<T, Path<T>>, { shouldValidate: true })
    }
  }, [filtered, selectedItem, search, hasInteracted, setValue, name])

  const onChangeSearch = (value: string) => {
    setHasInteracted(true)
    setSearch(value)
  }

const onSelectProduct = (id: number, label: string) => {
  setSearch(label);
  setHasInteracted(true);
  setValue(name, id as PathValue<T, Path<T>>, { shouldValidate: true, shouldDirty: true });
};

  return {
    selected,
    search,
    filtered,
    onChangeSearch,
    onSelectProduct,
  }
}
