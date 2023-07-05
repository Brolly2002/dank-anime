import React, { useContext } from 'react'
import Movies from './Movies';
import  Search from './Search';

function Home() {
  // access the shared data
  return (
    <>
      <Search />
      <Movies />
    </>
  )
}

export default Home;