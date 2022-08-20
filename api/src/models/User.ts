import { Document, Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import crypto from 'crypto'

export type UserDocument = Document & {
  name: string
  email: string
  hashed_password: string
  salt: string
  updated?: Date
  created: Date
  seller: boolean
}

// Mongoose version 6+ syntax!
const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: [true, 'Email is required'],
  },
  hashed_password: {
    type: String,
    required: [true, 'Password is required'],
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  seller: {
    type: Boolean,
    default: false,
  },
})

// An interface is needed to be able to use vertual field and schema's methods
// Might be a little bit complicated, possibly need to refactor this code
// Virtual field can be refactored to rely more on 'Schema.pre' method
interface UserBaseDocument extends UserDocument, Document {
  password: string
  _password: string
  makeSalt(): string
  encryptPassword(password: string): string
  authenticate(plainText: string): boolean
}

UserSchema.virtual('password')
  .set(function (this: UserBaseDocument, password: string) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function (this: UserBaseDocument) {
    return this._password
  })

UserSchema.path('hashed_password').validate(function (this: UserBaseDocument) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
})

UserSchema.methods = {
  authenticate: function (this: UserBaseDocument, plainText: string) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (this: UserBaseDocument, password: string) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return console.log('Something went wrong during the encrypion:', err)
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },
}

UserSchema.plugin(uniqueValidator)

export default model<UserBaseDocument>('User', UserSchema)
