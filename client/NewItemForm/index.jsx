import React, { useEffect } from 'react'

const NewItemForm = ({ handleSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e)
        e.target.elements.text.value = ''
      }}
    >
      <legend>Add Some Absolutely Legendary TODOs</legend>
      <label>
        <span>Text:</span>
        <input type="text" name="text" defaultValue="" />
      </label>
      <button type="submit">Add</button>
    </form>
  )
}

export default NewItemForm
