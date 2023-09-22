import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const DetailedPage = () => {
    const {i} = useParams()
    const [detailedData, setDetailedData] = useState()

    useEffect(()=>{
     const retrieveData =   JSON.parse(localStorage.getItem("newsData") || "");
     console.log("retrie", retrieveData[Number(i)]);
     setDetailedData(retrieveData[Number(i)]);

    }, [])

  return (
    <div>
        <div>
        <div>{detailedData?.title}</div>
        <img src = {detailedData?.image}  />
        </div>
    </div>
  )
}

export default DetailedPage