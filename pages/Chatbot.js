import React,{useState,useEffect} from 'react'
import axios from 'axios';
import OpenAI from "openai";

const Chatbot = ({recognizedMsg}) => {
    const [chats,setChats]=useState([]);
    const [msg,setMsg]=useState('');
    const openai = new OpenAI({
        apiKey: '', // This is the default and can be omitted
        dangerouslyAllowBrowser: true 
    });
      
    useEffect(() => {
        const filteredMsg = [...new Set(recognizedMsg.filter(item => item !== "thumbs_up"))];
        setMsg((prev)=>{
            return filteredMsg.join('')
        });
    }, [recognizedMsg.length]);
    useEffect(()=>{
       console.log(msg);
    },[msg])

    async function SendMsg() {
        // Add try-catch block for error handling
        try {
            // Send user message to OpenAI API
            setChats(prev => [...prev, ['user', msg]]);
            const chatCompletion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: msg }],
                model: 'gpt-3.5-turbo',
              });
            console.log(chatCompletion);
          
// Extract the message content
const messageContent = chatCompletion.choices[0].message.content;

// Now you can use the message content as needed
console.log(messageContent);

            // Update chats state with user message and chatbot response
            setChats(prev => [...prev, ['chatbot', messageContent]]);
        } catch (error) {
            console.error('Error:', error);
        }
    }
  return (
    <div style={{position:'absolute',right:'10%',top:'20%',height:'50vh',width:'30vw',backgroundColor:'white'}}>
      <div style={{height:'80%',width:'100%'}} className='chat-section'>
          
           {chats.map((chat,index)=>{
            return (
            <div key={index} className='msg' style={{display:'flex',justifyContent:chat[0]=='user'?'end':'start'}} >
            <div  className={`${chat[0]==='user'?'user-msg':'chatbot-msg'} `}>{chat[1]}</div>  
            </div>
            )
           })}
        </div>
           
            
          
           
      
      <div style={{display:'flex',height:'20%',justifyContent:'space-around',alignItems:'center'}}>
      <div>
      <input
      
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      value={msg} // Convert array to string using join()
      placeholder="Enter query"
    />
    
      </div>
      <div><button className='btn btn-primary' onClick={()=>{
        SendMsg();
      }}>send</button></div> 
      </div>
    </div>
  )
}

export default Chatbot
