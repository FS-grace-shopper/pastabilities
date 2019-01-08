import {expect} from 'chai'
import {
  getProduct,
  fetchProduct,
  getProducts,
  fetchProducts,
  searchProductsName,
  fetchProductsByCategory,
  postProduct,
  putProduct,
  destroyProduct
} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

/*
  I'm really happy to see tests! Let's also write some tests for API routes
  and React components when the time comes.
*/

describe.only('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    allProducts: [],
    currentProduct: {}
  }

  const oneProduct = {
    id: 1,
    name: 'Ravioli',
    description: 'The best in the city!',
    quantity: 10,
    photo: '/imageUrl',
    type: 'Semolina',
    shape: 'shaped',
    price: 995
  }

  const twoProducts = [
    {
      id: 2,
      name: 'Linguini',
      description: 'The best in the city!',
      quantity: 7,
      photo: '/imageUrl',
      type: 'Gluten-free',
      shape: 'long',
      price: 995
    },
    {
      id: 3,
      name: 'Cavatelli',
      description: 'The best in the city!',
      quantity: 5,
      photo: '/imageUrl',
      type: 'Whole Wheat',
      shape: 'long',
      price: 1995
    }
  ]

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProduct', () => {
    it('dispatches the GET PRODUCT action', async () => {
      const fakeProduct = oneProduct
      mockAxios
        .onGet(`api/product/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(fetchProduct(fakeProduct.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })
  describe('fetchProducts', () => {
    it('dispatches the GET PRODUCTS action', async () => {
      const fakeProducts = twoProducts
      mockAxios.onGet(`api/products`).replyOnce(200, fakeProducts)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })

  //
  // describe('postProduct', () => {
  //   it('dispatches the ADD PRODUCT action', async () => {
  //     const fakeProduct = oneProduct
  //     mockAxios.onPost(`api/products`).replyOnce(200, fakeProducts)
  //     await store.dispatch(fetchProducts())
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('GET_PRODUCTS')
  //     expect(actions[0].products).to.be.deep.equal(fakeProducts)
  //   })
  // })
})
