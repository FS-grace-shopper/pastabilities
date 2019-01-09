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

import {createStore} from 'redux'
import {reducer} from './index'

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
        .onGet(`api/products/${fakeProduct.id}`)
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

  describe('postProduct', () => {
    it('dispatches the ADD PRODUCT action', async () => {
      const fakeProduct = oneProduct
      mockAxios.onPost(`api/products`).replyOnce(201, fakeProduct)
      await store.dispatch(postProduct(fakeProduct))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })

  describe('Product - real store', () => {
    let testStore
    beforeEach(() => {
      testStore = createStore(reducer)
    })
    it('*** returns the initial state by default', () => {
      const action = {type: 'BLARGH', oneProduct}
      testStore.dispatch(action)
      const newState = testStore.getState()

      expect(newState.product.allProducts).to.deep.equal([])
      expect(newState.product.currentProduct).to.deep.equal({})
    })
    it('reduces on GET_PRODUCTS action', () => {
      const action = {type: 'GET_PRODUCTS', products: twoProducts}

      const prevState = testStore.getState()
      testStore.dispatch(action)
      const newState = testStore.getState()

      expect(newState.product.allProducts).to.be.deep.equal(twoProducts)
      expect(newState.product.allProducts).to.not.be.equal(
        prevState.product.allProducts
      )
    })
    it('reduces on ADD_PRODUCT action', () => {
      const action = {type: 'GET_PRODUCTS', products: twoProducts}
      testStore.dispatch(action)

      const action2 = {type: 'ADD_PRODUCT', product: oneProduct}

      const prevState = testStore.getState()
      testStore.dispatch(action2)
      const newState = testStore.getState()

      expect(newState.product.allProducts).to.be.deep.equal([
        ...twoProducts,
        oneProduct
      ])
      expect(newState.product.allProducts).to.not.be.equal(
        prevState.product.allProducts
      )
    })
  })
})
