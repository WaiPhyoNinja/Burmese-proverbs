'use client';

import { useEffect, useState } from "react";
import PromptList from "./PromptList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const filterPrompts = text => allPosts.filter(item => item.prompt.includes(text) || item.tag.includes(text))

  const handleSearchChange = e => {
    setSearchText(e.target.value)
    const searchResult = filterPrompts(e.target.value);
    setSearchedResults(searchResult);
  }

  const handleTagClick = tag => {
    setSearchText(tag);
    const searchResult = filterPrompts(tag);
    setSearchedResults(searchResult);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setAllPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for prompt/tag' value={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>
      {searchText ? <PromptList data={searchedResults} handleTagClick={handleTagClick} /> : <PromptList data={allPosts} handleTagClick={handleTagClick} />}
    </section>
  )
}

export default Feed
