import { useState } from "react";
import axios from "axios";
import "./App.css";

function UrlShortener() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState("");

  const handleShortenURL = () => {
    axios
      .post("https://cvip-url-shortener-backend.onrender.com/shorten", {
        longURL,
      })
      .then((response) => {
        setShortURL(response.data.shortURL);
        setError("");
      })
      .catch((error) => {
        setError("Error shortening URL: " + error.message);
        setShortURL("");
      });
  };

  return (
    <>
      <div className="background">
        <div className="url-shortener">
          <h1 className="title stay-on-top">URL Shortener</h1>
          <label htmlFor="longURL" className="input-label">
            Enter a long URL:
          </label>
          <input
            type="text"
            id="longURL"
            className="input-field stay-on-top"
            value={longURL}
            onChange={(e) => setLongURL(e.target.value)}
          />
          <button className="shorten-button" onClick={handleShortenURL}>
            Shorten
          </button>
          {shortURL && (
            <div className="shortened-url stay-on-top">
              <p>Your shortened URL is:</p>
              <a href={shortURL} target="_blank" rel="noopener noreferrer">
                {shortURL}
              </a>
            </div>
          )}
          {error && <p className="error">{error}</p>}

          <footer className="footer">
            &copy; {new Date().getFullYear()} Diwakar Bhadriraju. All rights
            reserved.
          </footer>
        </div>
        ;<span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}

export default UrlShortener;
