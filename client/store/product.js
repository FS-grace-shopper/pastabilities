import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_REVIEW = 'ADD_REVIEW'
const EDIT_REVIEW = 'EDIT_REVIEW'

// const GET_CATEGORIES = 'GET_CATEGORIES'
const UPDATE_PAGE = 'UPDATE_PAGE'
const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

const GET_TYPES = 'GET_TYPES'
const GET_SHAPES = 'GET_SHAPES'
const NEW_SHAPE = 'NEW_SHAPE'
const NEW_TYPE = 'NEW_TYPE'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const editProduct = product => ({type: EDIT_PRODUCT, product})
const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})
const addReview = review => ({type: ADD_REVIEW, review})
const editReview = review => ({type: EDIT_REVIEW, review})
const getTypes = types => ({type: GET_TYPES, types})
const getShapes = shapes => ({type: GET_SHAPES, shapes})
export const newShape = shapeNew => ({type: NEW_SHAPE, shapeNew})
export const newType = typeNew => ({type: NEW_TYPE, typeNew})

export const updatePage = page => ({type: UPDATE_PAGE, page})
export const filterProducts = page => ({type: FILTER_PRODUCTS, page})

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

export const searchProductsName = searchString => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/search/${searchString}`)
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getProduct(data))
  } catch (err) {
    console.error(err)
  }
}

//NOTE: the below thunk won't work well as long as we have shape and type as ENUM columns; do the filtering in the redux store for now
export const fetchProductsByCategory = (type, shape) => async dispatch => {
  try {
    if (type === 'all') {
      const {data} = await axios.get(`/api/products/cat/${shape}`)
    } else if (shape === 'all') {
      const {data} = await axios.get(`/api/products/cat/${type}`)
    } else {
      const {data} = await axios.get(`/api/products/cat/${shape}/${type}`)
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
    const {data} = await axios.get('/api/admin/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const postReview = review => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/products/${review.productId}/review`,
      review
    )
    dispatch(addReview(data))
  } catch (err) {
    console.error(err)
  }
}

export const putReview = review => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/products/${review.productId}/review/${review.id}`,
      review
    )
    dispatch(editReview(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchTypes = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/admin/products/categories/types')
    dispatch(getTypes(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchShapes = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/admin/products/categories/shapes')
    dispatch(getShapes(data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * INITIAL STATE
 */
const initialState = {
  allProducts: [],
  visibleProducts: [],
  numProductPages: 0,
  productsPerPage: 5,
  numPages: 0,
  currentPage: [],
  currentProduct: {
    name: '',
    description: '',
    price: 0,
    quantity: 100,
    image: '',
    shape: '',
    type: ''
  },
  types: [],
  shapes: []
}

/**
 * REDUCER
 */
//Should we clean this up - eslint doesn't like the complexity
// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: action.products,
        visibleProducts: action.products,
        numProductPages: action.products.length,
        numPages: Math.ceil(action.products.length / 5),
        currentPage: action.products.slice(0, state.productsPerPage)
      }
    case GET_PRODUCT:
      return {...state, currentProduct: action.product}
    case ADD_PRODUCT:
      return {...state, allProducts: [...state.allProducts, action.product]}
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
          product => product.id !== +action.productId
        )
      }
    case ADD_REVIEW:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          reviews: [...state.currentProduct.reviews, action.review]
        }
      }
    case UPDATE_PAGE:
      return {
        ...state,
        currentPage: action.page
      }
    case FILTER_PRODUCTS:
      console.log([...action.page])
      return {
        ...state,
        visibleProducts: [...action.page],
        numPages: Math.ceil(action.page.length / 5)
      }

    case EDIT_REVIEW:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          reviews: [
            ...state.currentProduct.reviews.map(review => {
              if (review.id === action.review.id) {
                return action.review
              } else {
                return review
              }
            })
          ]
        }
      }
    case GET_TYPES:
      return {...state, types: action.types}
    case GET_SHAPES:
      return {...state, shapes: action.shapes}
    case NEW_SHAPE:
      return {...state, shapes: [...state.shapes, action.shapeNew]}
    case NEW_TYPE:
      return {...state, types: [...state.types, action.typeNew]}
    default:
      return state
  }
}
