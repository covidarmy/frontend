import * as React from "react"
import en from "../locales/en.json"
import hi from "../locales/hi.json"

export type SupportedLocales = "en" | "hi"
type TranslatedStringProviderFunction = (key: string) => string
type UseTranslationReturn = {
  locale: SupportedLocales
  setLocale: React.Dispatch<React.SetStateAction<SupportedLocales>>
  t: TranslatedStringProviderFunction
}

const translations: Record<string, Record<string, string>> = {
  en,
  hi,
}

const translationContext = React.createContext<
  UseTranslationReturn | undefined
>(undefined)

const TranslationProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = React.useState<SupportedLocales>("en")

  React.useEffect(() => {
    const savedLocale = localStorage.getItem("locale")
    if (typeof savedLocale !== "string") {
      localStorage.setItem("locale", locale)
    } else {
      setLocale(locale)
    }
  }, [])

  React.useEffect(() => {
    console.log("locale changed")
    localStorage.setItem("locale", locale)
  }, [locale])

  const t: TranslatedStringProviderFunction = (key) => {
    return translations?.[locale]?.[key] ?? ""
  }

  return (
    <translationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </translationContext.Provider>
  )
}

export const useTranslation = () =>
  React.useContext(translationContext) as UseTranslationReturn

export default TranslationProvider
