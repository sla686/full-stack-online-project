import User from '../../src/models/User'
import UserService from '../../src/services/user'
import connect, { MongodHelper } from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser() {
  const user = new User({
    name: 'Test User',
    email: 'testUser@test.com',
    password: 'test123',
  })
  return await UserService.create(user)
}

describe('user service', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a new user', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('name', 'Test User')
    /*     expect(user).toHaveProperty('password', undefined) */
    expect(user).toHaveProperty('hashed_password')
    expect(user).toHaveProperty('salt')
    expect(user).toHaveProperty('created')
  })

  it('should get a user with id', async () => {
    const user = await createUser()
    const found = await UserService.findById(user._id)
    expect(found.name).toEqual(user.name)
    expect(found._id).toEqual(user._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing user', async () => {
    expect.assertions(1)
    return UserService.findById(nonExistingUserId).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })

  it('should update an existing user', async () => {
    const user = await createUser()
    const update = {
      name: 'Viacheslav',
      seller: true,
      password: 'test123',
    }
    const updated = await UserService.update(user._id, update)
    expect(updated).toHaveProperty('_id', user._id)
    expect(updated).toHaveProperty('name', 'Viacheslav')
    expect(updated).toHaveProperty('seller', true)
    // expect(updated).toHaveProperty('password', undefined)
    expect(updated).toHaveProperty('updated')
  })

  it('should not update a non-existing user', async () => {
    expect.assertions(1)
    const update = {
      name: 'Test User',
      seller: true,
    }

    return UserService.update(nonExistingUserId, update).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })

  it('should delete an existing user', async () => {
    expect.assertions(1)
    const user = await createUser()
    await UserService.remove(user._id)
    return UserService.findById(user._id).catch((e) => {
      expect(e.message).toBe(`User ${user._id} not found`)
    })
  })
})
