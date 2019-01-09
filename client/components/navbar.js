import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCart from '@material-ui/icons/ShoppingCart'

const Navbar = ({handleClick, isLoggedIn}) => (
  <React.Fragment>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap style={{flex: 1}}>
          Pastabilities
        </Typography>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/products">
          <Button>Catalog</Button>
        </Link>
        <Button>Contact</Button>
        {isLoggedIn ? (
          <Link to="/home">
            <Button onClick={handleClick}>Logout</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
        <IconButton>
          <ShoppingCart />
        </IconButton>
      </Toolbar>
    </AppBar>
  </React.Fragment>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default connect(mapState, mapDispatch)(Navbar)
