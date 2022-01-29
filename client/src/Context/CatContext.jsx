import React, { useState } from 'react';
import axios from 'axios';
const CatContext = React.createContext();

const CatContextProvider = ({ children }) => {
  const [list, setList] =  useState([]);
  const [click, setClick] = useState(false);

  const browseClick = (id) => {
    //console.log(id);
     axios.get(`https://wger.de/api/v2/exercise/?language=2&?category=${id}`)
      .then(({ data }) => {
        const { results } = data;
        let filteredExercises = results.filter((obj) => obj.category === id);
        //once we have filtered array, set state of list  to workouts from that category
        setList(filteredExercises);
        setClick(true);
        //console.log(filteredExercises);
      })
      .catch((err) =>  {
        console.log(err);
        setClick(false);
      })
      
   };

   const catProps = {
     click,
     setClick,
     list, 
     setList,
     browseClick
   }
   return <CatContext.Provider value={catProps}> 
     {children}
   </CatContext.Provider>
}

export { CatContextProvider, CatContext };