'use client'

import { FaRegEye } from "react-icons/fa";
import React, { useEffect, useState, useMemo } from 'react'
import {
  FieldError, FieldValues, Path, PathValue,
  UseFormSetValue, UseFormWatch, UseFormRegisterReturn
} from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export type ItemOption = { label: string, value: number }

type TabsProductProps<T extends FieldValues> = {
  data: ItemOption[]
  name: Path<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
  register: UseFormRegisterReturn
  errorMessage?: FieldError
  label?: string
  view: string
}

export default function SelectTabs<T extends FieldValues>({
  data,
  name,
  setValue,
  watch,
  register,
  errorMessage,
  label,
  view
}: TabsProductProps<T>) {
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('action') === 'edit'

  const selected = watch(name)

  const selectedLabel = useMemo(() => {
    const found = data.find(item => item.value === selected)
    return found ? found.label : ''
  }, [selected, data])

  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState<ItemOption[]>([])

  useEffect(() => {
    if (isEditMode && selectedLabel) {
      setSearch(selectedLabel)
      const matches = data.filter((item) =>
        item.label.toLowerCase().includes(selectedLabel.toLowerCase())
      )
      setFiltered(matches)
    }
  }, [isEditMode, selectedLabel, data])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    const filteredItems = value.length > 0
      ? data.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      )
      : []

    setFiltered(filteredItems)

    const exactMatch = data.find(item =>
      item.label.toLowerCase() === value.toLowerCase()
    )

    if (!exactMatch) {
      setValue(name, '' as PathValue<T, Path<T>>, { shouldValidate: true })
    }
  }

  const onSelectProduct = (id: number, label: string) => {
    setValue(name, id as PathValue<T, Path<T>>, { shouldValidate: true })
    setSearch(label)
    const filteredItems = data.filter((item) =>
      item.label.toLowerCase().includes(label.toLowerCase())
    )
    setFiltered(filteredItems)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className=' flex justify-between items-center'>
        <label htmlFor={`${name}`} className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">
          {`Buscar ${label}`}
        </label>
        <Link target="_blank" prefetch title="Obtener ayuda" className="text-[#202021] text-base dark:text-[#c5c5c7]" href={view}><FaRegEye /></Link>
      </div>

      <input type="hidden" {...register} />

      <input
        id={`${name}`}
        className={`text-sm block w-full h-[50px] p-2 border border-[#afaeae] dark:border-[#3f3f46] bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] rounded-md outline-none focus:ring-1 focus:ring-white/10 ${errorMessage ? 'ring-1 ring-[#d10b30]' : ''
      }`}
        type="text"
        placeholder="Ingrese su búsqueda"
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
                  : 'bg-gray-100 dark:bg-[#6f6991] dark:text-zinc-100 dark:border-zinc-600 dark:hover:bg-[#8b86a8] text-gray-700 border-gray-300 hover:bg-gray-200 active:bg-gray-300'
                }`}
            >
              {product.label}
            </button>
          ))}
        </div>
      )}

      {search.length > 0 && filtered.length === 0 && (
        <p className="text-sm text-gray-500 italic">No se encontraron resultados</p>
      )}

      {errorMessage && (
        <span className="text-xs text-[#d10b30] font-medium">{errorMessage.message}</span>
      )}
    </div>
  )
}
