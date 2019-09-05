import React from 'react';
import _ from "lodash"; 

//Interface 
//gets the data - preferrable array of objects 
//loops through them and displays the obj @ runtime

const TableBody = ({data}) => {

    const handleDataObject = (datum) => { 
       let keyValue=[]; 
       const res= _.find(datum, (datum) => { 
           keyValue.push(datum); 
           console.log(keyValue)
       });
       return keyValue; 
    };


    return ( 
        <tbody>
            {data.map((datum,index) => 
              <tr key={index}>
                {handleDataObject(datum).map((value,index) => 
                    <td key={index}>{value}</td> 
                )}
              </tr>
            )}
        </tbody>
     );
}
 
export default TableBody;