import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
type Cuisine = {
  name: string;
  uniqueName: string;
}
type Restaurant = {
  name: string;
  cuisines: Cuisine[];
  rating: number;
  address: {
    firstLine: string;
    postalCode: string;
    city: string;
  }
}
function App() {
  const [postCode, setPostCode] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  const handlePostCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostCode(e.target.value)
  }

  const handleSearch = () => {
    if (postCode) {
      axios.get(`http://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postCode}`)
        .then((data: any) => {
          const allRestaurants = data.restaurants.slice(0, 10).map((item: any) => {
            const restaurant: Restaurant = {
              name: item.name,
              cuisines: item.cuisines,
              rating: item.rating.starRating,
              address: {
                firstLine: item.address.firstLine,
                postalCode: item.address.postalCode,
                city: item.adddress.city
              }
            }
            return restaurant;
          })

          setRestaurants(allRestaurants)
          return allRestaurants
        })
        .then((result) => console.log("success!"))
        .catch((err) => console.log("Fetch error:", err))
    }
  }

  useEffect(() => {
    console.log(postCode)
  }, [postCode])
  return (
    <div className='app'>
      <h1>Order takeaway in your area</h1>
      <p>Find restaurants near you</p>

      <label htmlFor="">
        <input type="text" name="" id="" onChange={(e) => handlePostCode(e)} />
        <button onClick={handleSearch}>Search</button>
      </label>
    </div>
  );
}

export default App;
