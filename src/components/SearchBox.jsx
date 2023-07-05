import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm !== '' && searchTerm !== lastSearchTerm) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: searchTerm }],
          headers : {
    'Content-Type': 'application/json',
    'Authorization': `Bearer YOUR_OPENAI_API_KEY`
  }});
          setSearchResult(response.data.choices[0].text);
          setLastSearchTerm(searchTerm);
        } catch (err) {
          setError('An error occurred while fetching results.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchResults();
  }, [searchTerm, lastSearchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResult(null);
    setError(null);
  };

  return (
    <a>
      <div>
        Welcome to the page

      </div>
      <div className={styles.container}>
        <input className={styles.input} type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <button className={styles.button} onClick={() => setSearchTerm(searchTerm)}>Search</button>
        <button className={styles.button} onClick={clearSearch}>Clear</button>
        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.result}>{searchResult}</div>
        )}
      </div>
    </a>
  );
};

export default SearchBox;
