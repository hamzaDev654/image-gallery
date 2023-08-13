import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../store/searchSlice";
import { onSearchPage } from "../store/infiniteScrollSlice";

const Header = () => {
  const searchRef = useRef("");
  // Get the dispatch function from the redux store
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Get the input value from the ref
    let inputValue = searchRef.current.value;
    dispatch(setQuery(inputValue));

    dispatch(onSearchPage(1));
    // // If the query is empty, dispatch the onSearchPage action with 0 as the argument
    if (inputValue.length === 0) {
      dispatch(onSearchPage(0));
    }
  };

  return (
    <div
      className="flex items-center justify-between px-4 py-2 bg-gray-200 mb-4"
      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
    >
      <div className="flex items-center">
        <span
          className="mr-4"
          style={{ fontWeight: "bolder", fontSize: "30px" }}
        >
          IMAGE Gallery
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search image"
          ref={searchRef}
          className="w-40 md:w-60 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

// Export the Header component
export default Header;
