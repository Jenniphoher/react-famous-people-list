import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FamousSection.css';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(() => {
    fetchPeople();
  }, []);


  // TODO: fetch the list of people from the server
  const fetchPeople = () => {

    axios({
      method: 'GET',
      url: '/api/people'
    }) .then((response) => {
      console.log('We got the data:', response.data);
      setPeopleArray(response.data);
    }) .catch((err) => {
      console.log('Error in getting data:', err);
    })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database

    axios({
      method: 'POST',
      url: '/api/people',
      data: {
        name: famousPersonName,
        role: famousPersonRole
      }
    }) .then((response) => {
      setPersonName('');
      setPersonRole('');
      fetchPeople(response.data);
    }) .catch((err) => {
      console.log('Error posting data:', err);
    })
  
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input 
            id="name-input" 
            onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input 
            id="role-input" 
            onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>

      <h2> Famous People List:</h2>
      <ul>
          {famousPeopleArray.map((person) => {

            return(
              <li key={person.id}>
                {person.name} is famous for "{person.role}."
              </li>
            )

          })} 
      </ul>
            
      </section>
    );
}

export default FamousSection;
