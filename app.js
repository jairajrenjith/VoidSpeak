const chatList=document.getElementById('chatList')
const messages=document.getElementById('messages')
const composer=document.getElementById('composer')
const userInput=document.getElementById('userInput')
const chatTitle=document.getElementById('chatTitle')
const chatStatus=document.getElementById('chatStatus')
const newChatBtn=document.getElementById('newChatBtn')

let chats=[]
let activeChatId=null

function createChat(){
  const id=Date.now().toString()
  chats.push({id,history:[]})
  renderChatList()
  setActiveChat(id)
}

function renderChatList(){
  chatList.innerHTML=''
  chats.forEach(c=>{
    const div=document.createElement('div')
    div.className='chat-item'+(c.id===activeChatId?' active':'')
    div.textContent='Chat '+c.id.slice(-4)
    div.onclick=()=>setActiveChat(c.id)
    chatList.appendChild(div)
  })
}

function setActiveChat(id){
  activeChatId=id
  renderChatList()
  renderMessages()
  chatTitle.textContent='Chat '+id.slice(-4)
  chatStatus.textContent='online'
}

function renderMessages(){
  messages.innerHTML=''
  const chat=chats.find(c=>c.id===activeChatId)
  chat.history.forEach(m=>{
    const div=document.createElement('div')
    div.className='msg '+m.from
    div.textContent=m.text
    messages.appendChild(div)
  })
}

function addMessage(text,from){
  const chat=chats.find(c=>c.id===activeChatId)
  chat.history.push({text,from})
  renderMessages()
}

function botReply(){
  chatStatus.textContent='seen just now'
  setTimeout(()=>{
    chatStatus.textContent='typing...'
    const typingDiv=document.createElement('div')
    typingDiv.className='typing'
    typingDiv.textContent='typing...'
    messages.appendChild(typingDiv)
    messages.scrollTop=messages.scrollHeight
    setTimeout(()=>{
      typingDiv.remove()
      const char=getRandomChar()
      addMessage(char,'bot')
      chatStatus.textContent='online'
    },1500)
  },1000)
}

function getRandomChar() {
  const chars = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789" +
    "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

composer.onsubmit=e=>{
  e.preventDefault()
  const text=userInput.value.trim()
  if(!text)return
  addMessage(text,'user')
  userInput.value=''
  setTimeout(botReply,500)
}

newChatBtn.onclick=()=>createChat()

createChat()
