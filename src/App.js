import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];



const App = () =>{
  const[isOpen, SetIsOpen] = useState(false);
  const[friends, setFriends] = useState(initialFriends);
  const[ selectedFriend, setSelectedFriend] = useState(null);

  const handleSplitBill = (value) =>{
    console.log(value);
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance : friend.balance + value} : friend))
    setSelectedFriend(null);
  }

  const handleSelectedFriend = (friend) =>{
    // setSelectedFriend(friend);
    setSelectedFriend((current)=> current?.id ===friend.id ? null : friend);
    SetIsOpen(false);
  }

  const handleInsertIntoFriendsList = (friend) =>{
    setFriends(friends => [...friends, friend]);
    SetIsOpen(false);
  }
  const handleDisplayComponent = () =>{
    SetIsOpen(isOpen => !isOpen)
  }
  return(
  
    <div className="app">
      <div className="sidebar">
      <FriendList friends = {friends} onSelection = {handleSelectedFriend} selectedFriend = {selectedFriend}/>
      <FormAddFriendList isOpen = {isOpen} onAddList = {handleInsertIntoFriendsList}/>
      <Button onClick={handleDisplayComponent}>{isOpen ?"Close":"Add Friend"}</Button>
      </div>  
      {selectedFriend && <FormSplitBill selectedFriend = {selectedFriend} onSplitBill = {handleSplitBill} />}
    </div>


  )
}

const FriendList = ({friends, onSelection, selectedFriend}) =>{
  
  return (
    <ul>
      {friends.map(friend =><Friend  friend = {friend} key={friend.id} onSelection = {onSelection} selectedFriend = {selectedFriend} /> )}  
    </ul>
  )
}

const Friend=({friend, onSelection, selectedFriend})=>{
  //Now Checking which friend is selected to conditionally render stuffs.
  const isSelected = friend.id === selectedFriend?.id;
  return(
      <>
      <li className={isSelected?"selected":""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance<0 && <p className="red">you owe {friend.name} ₹{Math.abs(friend.balance)}</p>}
      {friend.balance>0 && <p className="green">{friend.name} owes you ₹{Math.abs(friend.balance)}</p>}
      {friend.balance===0 && <p>you both are even</p>}

      <Button onClick={() => onSelection(friend)}>{isSelected?"Close":`Submit`}</Button>
      </li>
     
      </>
      

    
  )
}

const Button = ({children, onClick}) =>{
 return <button  onClick = {onClick} className="button">{children}</button>
}

const FormAddFriendList = ({isOpen,onAddList}) =>{
  const[name, setName] = useState("");
  const[image, setImage] = useState("https://i.pravatar.cc/48");

 

  const handleSubmit = (event) =>{
    event.preventDefault();
    if(!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance : 0,
    }
    onAddList(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");

  }

  
  return(
    isOpen&&
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧜‍♀️Friend's Name</label>
      <input type="text" placeholder="Enter your friends name" value={name} onChange={event => setName(event.target.value)}></input>
      <label>🎴Friend's Image</label>
      <input type= "url" placeholder="Enter you image url" value={image} onChange={event => setImage(event.target.value)}></input>
      <Button >Add</Button>
      
    </form>
  ) 
}
const FormSplitBill = ({selectedFriend, onSplitBill}) =>{
  const[BillValue, setBillValue] = useState("");
  const[userExpense, setUserExpense] = useState("");
  //derived state
  const paidByFriend = BillValue ? BillValue - userExpense : "";
  const[whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (event) =>{
    event.preventDefault();
    if(!BillValue || !userExpense) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -userExpense)

  }

  return(
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split Bill with {selectedFriend.name}</h2>
      <label>💰Total Expense</label>
      <input type="text" value={BillValue} onChange={event => setBillValue(Number(event.target.value))}></input>
      <label>🧜‍♀️Your Amount</label>
      <input type="text" value={userExpense} onChange={event => setUserExpense(Number(event.target.value)> BillValue? userExpense : Number(event.target.value))}></input>
      <label >🐇{selectedFriend.name}'s Amount</label>
      <input type="text" value={paidByFriend} disabled></input>
      
      <label>💰Who will pay today?</label>
      <select value={whoIsPaying} onChange={event => setWhoIsPaying((event.target.value))}>
        <option value="user">🧜‍♀️You</option>
        <option value="friend">🐇{selectedFriend.name}</option>
      </select>
      
      
      <Button>Split Bill</Button>

    </form>
  )
}

















export default App;