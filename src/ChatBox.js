import './ChatBox.css';
import './InputBar';
import InputBar from './InputBar';
import { useState, useEffect, useCallback, useMemo } from 'react';

function ChatBox(props){
    const chats = props.chat
    useEffect(() => {
        var element = document.getElementById('chatBox')
        element.scrollTop = element.scrollHeight
    }, [chats])
    const chatMessages = useMemo(() => {
        return chats && chats.map(msg =>
            <div className="clearfix" key={msg.id}>
                <div className={"message-data " + (msg.sentByMe ? '' : 'text-right')}>
                    <span className="message-data-time">{msg.time}</span>
                </div>
                    {msg.type === "text" && <div className={"message " + (msg.sentByMe ? 'my-message' : 'other-message float-right')}>{msg.content}</div>} 
                    {msg.type === "img" && <div className={"message " + (msg.sentByMe ? 'my-message' : 'other-message float-right')}><a href={msg.source} target="_blank"><img src={msg.source} width={200} /></a></div>}
                    {msg.type === "audio" && <div className={msg.sentByMe ? '' : 'float-right'}><audio src={msg.source} controls></audio></div>}
                    {msg.type === "video" && <div className={"message " + (msg.sentByMe ? 'my-message' : 'other-message float-right')}><video width={500} controls>
                                                <source src={msg.source} type="video/mp4"></source>
                                             </video></div>}
            </div>) || null
    }, [chats, props.updateContactChat, props.setChat, props.contact])
    return(
        <div className="chat-container">
            <div className="messages" id="chatBox">
                {chatMessages}
            </div>
            {props.contact == "" ? "" : <InputBar onPopupChange={props.onPopupChange} chats={chats} user={props.user} contact={props.contact} setChats={props.setChat} updateContactChat={props.updateContactChat} />}
        </div>
    );
}

export default ChatBox