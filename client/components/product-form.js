import React from 'react'

export default function ProductForm(props) {
  return (
    <form>
      <label htmlFor="name">
        Pasta Name:
        <span className="warning" hidden={props.state.name !== ''}>
          Field is required
        </span>
      </label>
      <input
        type="text"
        name="name"
        value={props.state.name}
        onChange={props.updateHandler}
      />
      <br />
      <label htmlFor="type">
        Pasta Type:
        <span className="warning" hidden={props.state.type !== ''}>
          Field is required
        </span>
      </label>

      <select
        name="type"
        value={props.state.type}
        onChange={props.updateHandler}
      >
        <option value="">—— please select ——</option>
        <option value="semolina">semolina</option>
        <option value="whole-wheat">whole-wheat</option>
        <option value="gluten-free">gluten-free</option>
      </select>
      <br />

      <label htmlFor="shape">
        Pasta Shape:
        <span className="warning" hidden={props.state.type !== ''}>
          Field is required
        </span>
      </label>
      <select
        name="shape"
        value={props.state.shape}
        onChange={props.updateHandler}
      >
        <option value="">—— please select ——</option>
        <option value="long">long</option>
        <option value="ribbon">ribbon</option>
        <option value="tubular">tubular</option>
        <option value="shaped">shaped</option>
        <option value="stuffed">stuffed</option>
      </select>
      <br />

      <label htmlFor="description">
        Description:
        <span className="warning" hidden={props.state.description !== ''}>
          Field is required
        </span>
      </label>
      <input
        type="text"
        name="description"
        value={props.state.description}
        onChange={props.updateHandler}
      />
      <br />

      <label htmlFor="price">
        Price:
        <span className="warning" hidden={props.state.price !== ''}>
          Field is required
        </span>
      </label>
      <input
        type="text"
        name="price"
        value={props.state.price}
        onChange={props.updateHandler}
      />
      <br />

      <label htmlFor="quantity">
        Quantity:
        <span className="warning" hidden={props.state.quantity !== ''}>
          Field is required
        </span>
      </label>
      <input
        type="text"
        name="quantity"
        value={props.state.quantity}
        onChange={props.updateHandler}
      />
      <br />

      <label htmlFor="image">
        Image Url:
        <span className="warning" hidden={props.state.image !== ''}>
          Field is required
        </span>
      </label>

      <input
        type="text"
        name="image"
        value={props.state.image}
        onChange={props.updateHandler}
      />

      <button
        type="submit"
        className="nav-btn"
        disabled={
          props.state.name === '' ||
          props.state.type === '' ||
          props.state.description === '' ||
          props.state.price === '' ||
          props.state.quantity === '' ||
          props.state.image === '' ||
          props.state.shape === ''
        }
        onClick={props.submitHandler}
      >
        Submit
      </button>
      {props.state.error.toString() === '[object Object]' ? (
        <div />
      ) : (
        <div className="error">{props.state.error.toString()}</div>
      )}
    </form>
  )
}
