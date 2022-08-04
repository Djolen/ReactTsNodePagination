import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import Pagination from './pagination';
import pagination from './pagination';

const news = () => {

  const [news, setNews] = useState<any>([]);

  const [newsPerPage, setNewsPerPage] = useState<number>(3);

  const [totalNews, setTotalNews] = useState<number>(0)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [firstNewsIndex, setfirstNewsIndex] = useState<number>(0)

  const [lastNewsIndex, setlastNewsIndex] = useState<number>(firstNewsIndex + newsPerPage)

  const getNews = () =>{
    axios.get("http://localhost:3001/getNews").then((response)=>{
      setNews(response.data);
      setTotalNews(news.length)
    })
  }

  const changePage = (value:any )=>{
    setCurrentPage(value)
  }

  useEffect(()=>{
    getNews()
  },[news])

  useEffect(()=>{
    setfirstNewsIndex(newsPerPage * currentPage - newsPerPage)
  },[currentPage])


  useEffect(()=>{
    setlastNewsIndex(firstNewsIndex + newsPerPage - 1)
  },[firstNewsIndex])

  useEffect(()=>{
    console.log("prvi indeks",firstNewsIndex)
    console.log("poslednji indeks",lastNewsIndex)
  },[lastNewsIndex])


  return (
    <div>
      <div className='newsContainer'>
          {
            news.map((singleNews: { id: number; naslov: string ; tekst: string; },i:number)=>{
              return (   
              <div key={i}> 
                { 
                (firstNewsIndex <= i && i <= lastNewsIndex) ?
                <div className='singleNewsContaien'>
                  <h2>
                  {singleNews.naslov}
                </h2>
                <p>
                  {singleNews.tekst}
                </p>
                </div>
                : null
                }
              </div>
              )
            })
          }
      </div>
      <Pagination newsPerPage={newsPerPage} totalNews={totalNews} changePage={changePage}/>
    </div>
  )
}

export default news