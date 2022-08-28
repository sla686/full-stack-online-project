export interface Product {
  _id?: string
  name: string
  image?: Buffer
  desciption?: string
  category?: string
  quantity?: number
  price?: number
  created: Date | string
  updated?: Date | string
  shop: {
    _id: string
    name: string
  }
}

export interface ProductCreation extends FormData {
  _id?: string
  name?: string
  image?: Buffer
  desciption?: string
  category?: string
  quantity?: number
  price?: number
  created?: Date | string
  updated?: Date | string
  shop?: string
}
