/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as AllProducts} from './allProducts'
export {default as AdminProducts} from './admin-products'
export {default as AddProduct} from './add-product'
export {default as EditProduct} from './edit-product'

export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
