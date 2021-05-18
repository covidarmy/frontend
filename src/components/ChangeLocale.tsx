import { Listbox, Transition } from "@headlessui/react"
import { SelectorIcon, CheckIcon } from "@heroicons/react/outline"
import * as React from "react"
import { useTranslation, SupportedLocales } from "~/context/translation"

const locales: Array<{ name: string; value: SupportedLocales }> = [
  { name: "English", value: "en" },
  { name: "Hindi", value: "hi" },
]

const ChangeLocale = () => {
  const { locale, setLocale } = useTranslation()
  const [selected, setSelected] = React.useState<typeof locales[0]>(locales[0])

  React.useEffect(() => {
    setSelected(locales.filter((i) => i.value === locale)[0])
  }, [locale])

  const changeLocale = (item: { name: string; value: SupportedLocales }) => {
    setLocale(item.value)
  }

  return (
    <Listbox value={selected} onChange={changeLocale}>
      {({ open }) => (
        <>
          <div className="relative mt-1 text-sm" style={{ zIndex: 9999 }}>
            <Listbox.Button className="relative w-full w-28 lg:w-32 py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 border border-gray-200">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {locales.map((locale, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `${
                        active
                          ? "text-indigo-900 bg-indigo-100"
                          : "text-gray-900"
                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={locale}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {locale.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-indigo-600" : "text-indigo-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default ChangeLocale
