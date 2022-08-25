import { Document, Schema, Types, model } from 'mongoose'

export type ShopDocument = Document & {
  name: string
  image: Buffer
  description?: string
  updated?: Date
  created: Date
  owner?: Types.ObjectId
}

// Mongoose version 6+ syntax!
const ShopSchema = new Schema<ShopDocument>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  image: {
    type: Buffer,
    // contentType: String,
  },
  description: {
    type: String,
    trim: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default model<ShopDocument>('Shop', ShopSchema)
