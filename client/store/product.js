import axios from 'axios'

/*
  This Redux stuff looks good. But I'd caution against building out too much
  code before it's needed for a specific feature. Consider creating a React
  component that needs Redux to do something before actually making Redux do
  that thing. It'll cut down on the amount of refactoring you'll need to do.
*/

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const editProduct = product => ({type: EDIT_PRODUCT, product})
const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})

/**
 * THUNK CREATORS
 */
//'flat pasta'
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}
export const searchProductsName = pastaName => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/search/${pastaName}`)
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/product/${productId}`)
    dispatch(getProduct(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchProductsByCategory = (type, shape) => async dispatch => {
  try {
    if (type === 'all') {
      const {data} = await axios.get(`/api/products/${shape}`)
    } else if (shape === 'all') {
      const {data} = await axios.get(`/api/products/${type}`)
    } else {
      const {data} = await axios.get(`/api/products/${shape}/${type}`)
    }
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}
export const postProduct = product => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', product)
    dispatch(addProduct(data))
  } catch (err) {
    console.error(err)
  }
}
export const putProduct = product => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${product.id}`, product)
    dispatch(editProduct(data))
  } catch (err) {
    console.error(err)
  }
}
export const destroyProduct = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deleteProduct(productId))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  allProducts: [],
  currentProduct: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: action.products}
    case GET_PRODUCT:
      return {...state, currentProduct: action.product}
    case ADD_PRODUCT:
      return {...state, allProducts: [...allProducts, action.product]}
    case EDIT_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.map(product => {
          if (product.id !== +action.product.id) {
            return product
          } else {
            return {...action.product}
          }
        }),
        currentProduct: {...action.product}
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          product => product.id !== +action.product.id
        ),
        currentProduct: {}
      }
    default:
      return state
  }
}
