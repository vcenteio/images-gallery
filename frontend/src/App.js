import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Search from "./components/Search"

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [word, setWord] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(word)
    fetch(`https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_KEY}&query=${word}`)
      .then(result => result.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    setWord("");
  }

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
    </div>
  );
}

export default App;
