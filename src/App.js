import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react'



function App() {
  const socket = io.connect('http://localhost:8080')
  const [input, setInput] = useState('')
  const [message, setMessage] = useState()


  function handleClick(){
    socket.emit('sendMessage', {message: input})
  }
  function handleChange(e){
    setInput(e.target.value)
  }

  useEffect(()=>{
    socket.on('receiveMessage', (data)=>{
      setMessage(data.message)
      console.log(message)
    })
  }, [socket])
  return (
    <div>
      <form>
        <input placeholder='message' value={input} onChange={(e)=> handleChange(e)}/>
        <button onClick={handleClick}>send message</button>
      </form>
      <h1>
        Message
      </h1>
      <p>{message}</p>
    </div>
    
  );
}

export default App;
