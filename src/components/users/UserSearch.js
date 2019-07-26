import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const UserSearch = ({ showClear, clearUsers, setAlert }) => {
  const githubContext = useContext(GithubContext);
  const [text, setText] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    if (text === '') {
      setAlert('Enter a name to search', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  const onChange = event => setText(event.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

UserSearch.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default UserSearch;
