/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as HomePage} from './homePage'
export {default as Navbar} from './navbar'
export {default as AllProducts} from './allProducts'
export {default as AdminProducts} from './admin-products'
export {default as AddProduct} from './addProduct'
export {default as EditProduct} from './editProduct'
export {default as SingleProduct} from './singleProduct'
export {default as Cart} from './cart'
export {default as AddProductReview} from './addProductReview'
export {default as EditProductReview} from './editProductReview'
export {default as Checkout} from './Checkout/checkout'
export {default as AdminOrders} from './adminOrders'
export {default as AdminUsers} from './adminUsers'

export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
