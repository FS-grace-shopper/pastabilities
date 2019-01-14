import {expect} from 'chai'
import reducer, {addToCart, removeFromCart} from './cart'

import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()

import {createStore} from 'redux'

describe('Cart Action creators', () => {
  let store

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

  const initialState = {
    cartProducts: [...twoProducts]
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    store.clearActions()
  })

  describe('addToCart', () => {
    it('dispatches the ADD TO CART action', () => {
      const fakeProduct = oneProduct
      store.dispatch(addToCart(fakeProduct))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })

  describe('removeFromCart', () => {
    let testStore = createStore(reducer)

    it('dispatches the REMOVE FROM CART action', () => {
      const productToRemove = twoProducts[0]

      store.dispatch(removeFromCart(productToRemove))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_FROM_CART')
      expect(actions[0].product).to.be.deep.equal(productToRemove)

      testStore.dispatch(removeFromCart(productToRemove))
      expect(testStore.getState().cartProducts).to.be.deep.equal([
        twoProducts[1]
      ])
    })
  })
})
