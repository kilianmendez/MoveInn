export interface SocialMedia {
  id: number
  socialMedia: number
  url: string
}
export interface DecodedToken {
  id: string
  email: string
  name: string
}
export interface UserUpdateFormData {
  name: string
  lastName: string
  email: string
  biography: string
  school: string
  city: string
  degree: string
  nationality: string
  erasmusCountry: string
  erasmusDate: string | null
  phone: string
  password?: string
  avatarFile?: File | null
  socialMedias: SocialMedia[]
  countryFlag?: string
  erasmusCountryFlag?: string
}
export interface User {
  id: string
  mail: string
  name: string
  phone: string
  lastName?: string
  biography?: string
  school?: string
  city?: string
  degree?: string
  nationality?: string
  erasmusCountry?: string
  erasmusDate?: string | number | null
  avatarUrl?: string
  countryFlag?: string
  erasmusCountryFlag?: string
  socialMedias?: Array<{
    id: number
    socialMedia: number
    url: string
  }>
  [key: string]: any
}

export const SOCIAL_MEDIA_TYPES = {
  1: "Facebook",
  2: "Instagram",
  3: "Twitter",
  4: "LinkedIn",
  5: "GitHub",
}

export const SOCIAL_MEDIA_ICONS = {
  1: "facebook",
  2: "instagram",
  3: "twitter",
  4: "linkedin",
  5: "github",
}
