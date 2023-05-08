import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [users, setUsers] = useState([]);
    
    useEffect( () => {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    },[]);
    
    const handleAddUser = (event) => {
        event.preventDefault();
        
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = {name, email};
        
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const newUsers = [...users, data];
                setUsers(newUsers);
                form.reset();
            })
    }

  return (
      <div className="App">
          <h1>Users Management System</h1>
          <h3>Numbers of user: {users.length}</h3>
          <form onSubmit={handleAddUser}>
              <input type="text" name="name" id="name" placeholder="Your Name" />
              <br/>
              <input type="email" name="email" id="email" placeholder="Your Email" />
              <br/>
              <input type="submit" value="Add User"/>
          </form>
          <div>
              {
                  users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
              }
          </div>
      </div>
  )
}

export default App
