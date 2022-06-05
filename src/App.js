import './App.css';
import { useState,useEffect } from 'react';
import Axios from 'axios';


function App() {

  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [listOfFriends,setlistOfFriends] = useState([]);

  //sending the data
  const addFriend = ()=>{
    Axios.post("https://dataentry-1.herokuapp.com/addFriend",{
      name: name,
      age: age,
    }).then((response)=>{
      setlistOfFriends([...listOfFriends,{_id:response.data._id ,name:name,age:age}])
    })
  };

  const updateFriend = (id)=>{
    const newAge = prompt("Enter new age :");
    Axios.put("https://dataentry-1.herokuapp.com/update",{newAge:newAge,id:id}).then(()=>{
      setlistOfFriends(listOfFriends.map((val)=>{
        return val._id == id ? {_id: id,name: val.name,age: newAge} : val
      }))
    })
  }

  const deleteFriend = (id)=>{
    Axios.delete(`https://dataentry-1.herokuapp.com/delete/${id}`).then(()=>{
      setlistOfFriends(listOfFriends.filter((val)=>{
        return val._id != id;
      }))
    })
  }

  //getting the data
  useEffect(()=>{
    Axios.get("https://dataentry-1.herokuapp.com/read",{
      name: name,
      age: age,
    }).then((response)=>{
      setlistOfFriends(response.data)
    }).catch(()=>{
      console.log("ERROR")
    })
  },[])

  return (

    <div className="app">
      
      <div className="inputs">
        <input className='name' type="text"   placeholder='Friends name' onChange={(event)=>{setName(event.target.value)}}/>
        <input className='age' type="number" placeholder='Friends age'onChange={(event)=>{setAge(event.target.value)}}/>
        <button className='button' onClick={addFriend}>Add Friend</button>
      </div>
      
      <div className='listOfFriends'>
      {listOfFriends.map((val)=>
      {
        return (
        
        <div className="friendContainer">
          <div className='friends'> 
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
          </div>
          <button className='btn-update' onClick={()=>{updateFriend(val._id);}}>Update</button>
          <button className='btn-delete' onClick={()=>{deleteFriend(val._id);}}>Delete</button>
        </div>
        
        )
      })}
      </div>
    </div>
  );
}

export default App;
