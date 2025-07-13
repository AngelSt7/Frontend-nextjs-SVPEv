import { useEffect, useMemo, useState, useRef } from 'react'
import { FieldValues, Path, UseFormSetValue, UseFormWatch } from 'react-hook-form'

type ItemOption = {
  label: string
  value: number
  filter: number
}

type UseMultiSelectProps<T extends FieldValues> = {
  data: ItemOption[]
  name: Path<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
}

export function useMultiSelect<T extends FieldValues>({
  data,
  name,
  setValue,
  watch
}: UseMultiSelectProps<T>) {

  const validIds = useMemo(() => new Set(data.map(item => item.value)), [data])
  const watchedValue = (watch(name) as string) || ''
  
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const isUpdatingFromForm = useRef(false)

  useEffect(() => {
    const currentSelected = watchedValue === '' ? [] : 
      (watchedValue as string).split(',').map((id: string) => Number(id)).filter((id: number) => validIds.has(id))
    if (!isUpdatingFromForm.current) {
      setSelectedIds(currentSelected)
    }
  }, [data, validIds])

  useEffect(() => {
    if (watchedValue === '') {
      setSelectedIds([])
    } else {
      const initialSelected = (watchedValue as string).split(',').map((id: string) => Number(id))
      setSelectedIds(initialSelected)
    }
  }, [])

  const toggleSelect = (id: number) => {
    const newSelected = selectedIds.includes(id) 
      ? selectedIds.filter(item => item !== id) 
      : [...selectedIds, id]
    
    setSelectedIds(newSelected)
    
    isUpdatingFromForm.current = true
    
    const newValue = newSelected.length > 0 ? newSelected.join(',') : ''
    setValue(name, newValue as any, { shouldValidate: true })
    setTimeout(() => {
      isUpdatingFromForm.current = false
    }, 0)
  }

  const isSelected = (id: number) => selectedIds.includes(id)

  return {
    selectedIds,
    toggleSelect,
    isSelected
  }
}