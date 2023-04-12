/* eslint-disable no-lone-blocks */
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./Search.css";
import Wrapper from "./PopperWrapper";
import HeadlessTippy from "@tippyjs/react/headless";

function Search({ data }) {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("searchValue") || ""
  );
  const [valueSearch, setvalueSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchedError, setSearchedError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
    }
    setTimeout(() => {
      if (valueSearch) {
        const metadata = "&md=d";
        const url = "https://api.datamuse.com/words?";
        const response = `${url}${data}=${valueSearch}${metadata}`;
        axios
          .get(response)
          .then((res) => {
            setSearchResult(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setSearchedError(true);
            setLoading(false);
          });
      }
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearch]);

  useEffect(() => {
    localStorage.setItem("searchValue", searchValue);
  }, [searchValue]);
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("searchValue");
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleClick = () => {
    setSearched(true);
    setTimeout(() => {
      setvalueSearch(searchValue);
    }, 300);

    setTimeout(() => {
      setSearchedError(true);
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      handleClick();
    }, 800);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleDelete = () => {
    setSearchValue("");
    setvalueSearch("");
    setSearched(false);
    inputRef.current.focus();
  };

  return (
    <div className='wrapper-search'>
      <div className='input-group'>
        <HeadlessTippy
          interactive
          visible={searchResult.length > 0 && valueSearch}
          placement='bottom-start'
          render={(attrs) => (
            <div tabIndex='-1' {...attrs}>
              <Wrapper>
                <div className='content'>
                  <h3 className='list-search'>
                    {valueSearch && searched && "Các từ tìm được:"}
                  </h3>

                  <ol className='render-search'>
                    {valueSearch &&
                      searchResult.slice(0, 10).map((item) => (
                        <li key={item.word}>
                          <strong>{item.word}</strong>
                          <ul>
                            {Array.isArray(item.defs) &&
                              item.defs.map((def) => <li key={def}>{def}</li>)}
                          </ul>
                        </li>
                      ))}
                  </ol>
                </div>
              </Wrapper>
            </div>
          )}
        >
          <div className='form-outline'>
            <div>
              <div className='icon-search'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-search'
                  viewBox='0 0 16 16'
                >
                  <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                </svg>
              </div>
              <input
                ref={inputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className='input-search'
                placeholder='Search a word'
              />
            </div>
            {loading && (
              <div className='loader'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  height={15}
                  width={15}
                  fill='#fff'
                >
                  <path d='M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z' />
                </svg>
              </div>
            )}
            {searchValue && !loading && (
              <span className='close' onClick={handleDelete}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  fill='currentColor'
                  className='bi bi-x-lg'
                  viewBox='0 0 16 16'
                >
                  <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
                </svg>
              </span>
            )}{" "}
            <div>
              <button className='btn-search' onClick={handleClick}>
                Search
              </button>
            </div>
          </div>
        </HeadlessTippy>
        <p className='error-search'>
          {searchedError &&
            !loading &&
            !searchResult.length &&
            valueSearch &&
            "Không tìm thấy kết quả"}
        </p>
      </div>
    </div>
  );
}

export default Search;
