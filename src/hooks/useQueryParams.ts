'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface ParamsType {
  key: string
  value: string
}

export default function useQueryParams<T extends string[]>(params: T) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Mengambil semua query parameters yang diminta
  const getAllParams = () => {
    const data: Record<string, string> = {}

    params.forEach((param) => {
      data[param] = searchParams.get(param) ?? ''
    })

    return data as Record<T[number], string>
  }

  // Menambahkan atau memperbarui parameter dalam URL
  const createParam = ({ key, value }: ParamsType) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)

    router.replace(`${pathname}?${params.toString()}`)
  }

  // Menghapus parameter dari URL
  const deleteParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (params.has(key)) {
      params.delete(key)
      router.replace(`${pathname}?${params.toString()}`)
    }
  }

  return {
    createParam,
    deleteParam,
    params: getAllParams()
  }
}
