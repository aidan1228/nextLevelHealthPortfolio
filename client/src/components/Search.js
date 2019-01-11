import React from "react";
import "./Search.css"

const Search = props => (
  <form>
    <div className="form-group">
      <input
        onChange={props.handleInputChange}
        value={props.value}
        name="search"
        type="text"
        className="form-control"
        placeholder="Enter Food Item"
        id="search"
      />
      <br />
      <button onClick={props.handleFormSubmit} className="btn btn-primary">
        Search
      </button>
    </div>
  </form>
);

export default Search;