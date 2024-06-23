import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AutocompleteProps {
  suggestions: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions }) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  useEffect(() => {
    if (query) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query, suggestions]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setQuery(e.currentTarget.innerText);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQuery(filteredSuggestions[activeSuggestionIndex]);
      setShowSuggestions(false);
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    }
  };

  const renderSuggestions = () => {
    if (showSuggestions && query) {
      if (filteredSuggestions.length) {
        return (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestionIndex) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={query}
      />
      {renderSuggestions()}
    </div>
  );
};

export default Autocomplete;
