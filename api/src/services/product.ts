import Product, { ProductDocument } from '../models/Product'
import { NotFoundError, BadRequestError } from '../helpers/apiError'

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById({ _id: productId })
    .populate('shop', '_id name')
    .exec()
  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

const findByQuery = async (query: any): Promise<ProductDocument[]> => {
  const foundProducts = await Product.find(query)
    .populate('shop', '_id name')
    .select('-image')
    .exec()
  if (!foundProducts) {
    throw new NotFoundError('Products are not found')
  }

  return foundProducts
}

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return await product.save()
}

const findByShop = async (shopId: string): Promise<ProductDocument[]> => {
  return await Product.find({ shop: shopId })
    .populate('shop', '_id name')
    .select('-image')
}

const listLatest = async (): Promise<ProductDocument[]> => {
  return await Product.find({})
    .sort('-created')
    .limit(5)
    .populate('shop', '_id name')
    .exec()
}

const listRelated = async (
  product: ProductDocument
): Promise<ProductDocument[]> => {
  return await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(5)
    .populate('shop', '_id name')
    .exec()
}

const remove = async (productId: string) => {
  return await Product.deleteOne({ _id: productId })
}

const listCategories = async () => {
  return await Product.distinct('category', {})
}

export default {
  findById,
  create,
  findByShop,
  listLatest,
  listRelated,
  listCategories,
  remove,
  findByQuery,
}
