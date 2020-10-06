import React, { useState, useEffect } from "react";
import axios from "axios";


// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

const App = () => {
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAuthors()
  },[])

  useEffect((key) => {
    getSelectedAuthor(key)
  },[])

  const getAuthors = async () => {
    try{
      const response = await axios.get('https://the-index-api.herokuapp.com/api/authors/')
      console.log(response.data)
      setAuthors(response.data)
      setLoading(false)
    } catch (error){
      console.log("something error")
      console.error(error)
    }
  }

  const getSelectedAuthor = async (key) => {
    try{
      setLoading(true)
      const response = await axios.get(`https://the-index-api.herokuapp.com/api/authors/${key}`)
      console.log(response.data)
      setCurrentAuthor(response.data)
      setLoading(false)
    } catch(error){
      console.log('something wrong in fetching author')
    }
  }

  const selectAuthor = author => setCurrentAuthor(author);

  const unselectAuthor = () => setCurrentAuthor(null);

  const getContentView = () => {
    if (currentAuthor) {
      return <AuthorDetail author={currentAuthor} />;
    } else {
      return <AuthorList authors={authors} selectAuthor={getSelectedAuthor} />;
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar unselectAuthor={unselectAuthor} />
        </div>
        {
          loading ? (
            <div className="content">
              <h1>Loading</h1>
            </div>
          ):(
            <div className="content col-10">{getContentView()}</div>
          )
        }
      </div>
    </div>
  );
};

export default App;
