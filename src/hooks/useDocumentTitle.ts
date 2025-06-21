import { useEffect } from "react"

// Este hook permite actualizar el título de la pestana del navegador
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
