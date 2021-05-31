import * as React from 'react'
import en from '../locales/en.json'
import hi from '../locales/hi.json'

export type SupportedLocales = 'en' | 'hi'
type TranslatedStringProviderFunction = (key: string) => string
type UseTranslationReturn = {
  locale: SupportedLocales
  setLocale: (key: SupportedLocales) => void
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
  const [locale, setLocale] = React.useState<SupportedLocales>('en')
  const [mountTrip, setMountTrip] = React.useState(false)

  React.useEffect(() => {
    const savedLocale = localStorage.getItem('locale')
    if (typeof savedLocale === 'string') {
      if (savedLocale !== locale) {
        document.documentElement.setAttribute('lang', savedLocale)
        setLocale(savedLocale as SupportedLocales)
      }
    } else {
      localStorage.setItem('locale', 'en')
    }
    setMountTrip(true)
  }, [])

  const changeLocale = (key: SupportedLocales) => {
    if (mountTrip) {
      document.documentElement.setAttribute('lang', key)
      setLocale(key)
      localStorage.setItem('locale', key)
      document.documentElement.setAttribute('lang', navigator.language)
    }
  }

  const t: TranslatedStringProviderFunction = React.useMemo(
    () => (key) => {
      return translations?.[locale]?.[key] ?? ''
    },
    [locale, translations]
  )

  return (
    <translationContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </translationContext.Provider>
  )
}

export const useTranslation = () =>
  React.useContext(translationContext) as UseTranslationReturn

export default TranslationProvider
