import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendPhotos, setLoading, setPhotos } from "../store/imagesSlice";
import { incrementPage } from "../store/infiniteScrollSlice";
import ImageList from "./ImageList";

const clientID = `?client_id=${process.env.REACT_APP_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const Gallery = () => {
  const page = useSelector((state) => state.infiniteScroll);
  const { photos, loading } = useSelector((state) => state.images);
  const query = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();

  // Use useEffect hook to fetch images when page changes
  useEffect(() => {
    fetchImage();
  }, [page]);

  // Define a function to fetch images from the Unsplash API
  const fetchImage = async () => {
    // Dispatch the setLoading action with true as the argument
    dispatch(setLoading(true));
    try {
      let url;
      const urlPage = `&page=${page}`;
      const urlQuery = `&query=${query}`;

      if (query) {
        // If query exists, use the search URL with the query and page parameters
        url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
      } else {
        url = `${mainUrl}${clientID}${urlPage}`; // Otherwise, use the main URL with the page parameter
      }

      const response = await axios.get(url);
      const data = response.data;
     
      if (query && page === 1) {
        // If query exists and page is 1, dispatch the setPhotos action with the results as the argument
        dispatch(setPhotos(data.results));
      } else if (query) {
        // If query exists and page is not 1, dispatch the appendPhotos action with the results as the argument
        dispatch(appendPhotos(data.results));
      } else if (page === 0) {
        // If query does not exist and page is 0, dispatch the setPhotos action with the data as the argument
        dispatch(setPhotos(data));
      } else {
        // If query does not exist and page is not 0, dispatch the appendPhotos action with the data as the argument
        dispatch(appendPhotos(data));
      }
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e); // If there is an error, log it and dispatch the setLoading action with false as the argument
      setLoading(false);
    }
  };

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      // Define a function to handle scroll event
      // If not loading and scroll position reaches near bottom of page, dispatch incrementPage action
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        dispatch(incrementPage());
      }
    });
    // Return a function to remove the event listener when component unmounts
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <div className="container mx-auto px-5 2xl:px-0">
      <div className="container mx-auto px-5 2xl:px-0">
        {!photos ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 pb-20 lg:container">
            {photos.map((image, indx) => (
              <ImageList key={indx} {...image} loading={loading} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Gallery;
