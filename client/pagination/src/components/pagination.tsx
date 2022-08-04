import React from 'react'

type Props = {
    newsPerPage: number,
    totalNews: number,
    changePage:Function
  };
  

const pagination = ({newsPerPage,totalNews,changePage}:Props) => {
    
const numOfPages:number = Math.ceil(Number(totalNews) / Number(newsPerPage))

const niz:Array<number> = [...Array(numOfPages)]

  return (
    <div className='paginationContainer'> 
        {
        niz.map((a,i:number)=>{
            return(
                <div className='paginationPage' key={i} onClick={()=>{changePage(i+1)}}>
                    {i+1}
                </div>
            )
        })
        }
    </div>
  )
}

export default pagination