export interface Country {
  name: string
  flag: string
}

export interface CountrySearchProps {
  value: string
  onChange: (value: string) => void
  onFlagChange?: (flagUrl: string) => void
  placeholder?: string
  className?: string
}

export interface CitySearchProps {
  value: string
  onChange: (value: string) => void
  country: string
  disabled?: boolean
  placeholder?: string
  className?: string
}