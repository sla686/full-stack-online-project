import { Document, Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import crypto from 'crypto'

export type UserDocument = Document & {
  name: string
  email: string
  hashed_password: string | undefined
  salt: string | undefined
  updated: Date
  created: Date
  seller: boolean
}

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
    required: 'Password is required',
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

UserSchema.virtual('password')
  .set(function (this: any, password: string) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function (this: any) {
    return this._password
  })

UserSchema.path('hashed_password').validate(function (this: any) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, undefined)

UserSchema.methods = {
  authenticate: function (this: any, plainText: string) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (this: any, password: string) {
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

export default model<UserDocument>('User', UserSchema)
