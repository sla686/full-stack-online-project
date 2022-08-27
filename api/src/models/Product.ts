import { Document, Schema, Types, model } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  image?: Buffer
  description?: string
  category: string
  quantity: number
  price: number
  updated?: Date | number
  created: Date
  shop: {
    _id: Types.ObjectId
    name: string
  }
}

// Mongoose version 6+ syntax!
const ProductSchema = new Schema<ProductDocument>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  image: {
    type: Buffer,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
})

export default model<ProductDocument>('Product', ProductSchema)
