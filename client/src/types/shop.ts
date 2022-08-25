export interface Shop {
  _id?: string
  name: string
  image: Buffer
  description?: string
  created?: Date | string
  updated?: Date | string
  owner?: string
}

export interface ShopCreation extends FormData {
  _id?: string
  name?: string
  image?: Buffer
  description?: string
  created?: Date | string
  updated?: Date | string
  owner?: string
}
