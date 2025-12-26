import { useState } from 'react'
import EventCard from './EventCard';

const Search = ({token}) => {
    const [searchResults, setSearchResults] = useState([]);
    function handleSearch(formData){
    const keyword = formData.get("keyword");
    const date = formData.get("date");
    const time = formData.get("time");
    const searchData = {
  ...(keyword && { keyword }),
  ...(date && { date }),
  ...(time && { time })
}
fetch('https://backend-route-crt-20226011-dev.apps.rm3.7wse.p1.openshiftapps.com/search/searchEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(searchData) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      setSearchResults(data);
      
      
    })
    .catch(error => {
        console.error('Error searching item:', error);
    });
    }
    


  
  return (
    <div>
      <div className="container-fluid m-2">
        <form className="d-flex" action={handleSearch}>
          <input name="keyword" className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <input type="date" name="date" id="" />
          <input type="time" name='time'/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 m-4">
        {searchResults.map((event) => (
          <div key={event.id} className="col">
            <EventCard event={event}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
