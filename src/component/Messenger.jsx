import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import UserMessage from './UserMessage';
import FlipMove from 'react-flip-move';
import { db, auth } from './firebase';
import { Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Messenger(props) {
  const [message, setmessage] = useState('');
  const [messages, setmessages] = useState([]);
  const [user, setuser] = useState([]);

  let callUser = () => {
    db.collection('users').doc(auth.currentUser.displayName).set({
      name: auth.currentUser.displayName,
      status: true,
    });
  };

  useEffect(() => {
    db.collection('texts')
      .orderBy('timestamp')
      .onSnapshot((snapshot) => {
        setmessages(snapshot.docs.map((doc) => doc.data()));
      });

    db.collection('users')
      .orderBy('status')
      .onSnapshot((snapshot) => {
        setuser(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  let submit = (event) => {
    callUser();
    let today = new Date();
    let time = today.getHours() + ':' + today.getMinutes();
    event.preventDefault();
    console.log(props);
    db.collection('texts').add({
      text: message,
      user: props.aboutuser.displayName,
      time: time,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setmessage('');
  };
  if (props.allow) {
    return <Redirect to="/" push={true} />;
  }
  return (
    <div className="message_container">
      <div className="user-online">
        <header className="user-header">
          <div className="user-header-title">
            <AccountCircleIcon />
            UserOnline
          </div>
        </header>
        <div className="user-display">
          {user.map((u, index) => (
            <div key={index} className="user-status">
              <p>{u.name}</p>
              <span className={u.status ? 'green' : 'red'}></span>
            </div>
          ))}
        </div>
      </div>
      <div class="msger">
        <header class="msger-header">
          <div class="msger-header-title">
            <i class="fas fa-comment-alt"></i> SimpleChat
          </div>
          <div class="msger-header-options">
            <span>
              <i class="fas fa-cog"></i>
            </span>
          </div>
        </header>
        <div className="msger-chat">
          <FlipMove>
            {messages.map((val, index) => (
              <UserMessage
                val={val}
                key={index}
                cur_user={props.aboutuser.displayName}
              />
            ))}
          </FlipMove>
        </div>

        <form class="msger-inputarea" onSubmit={submit}>
          <input
            type="text"
            class="msger-input"
            placeholder="Enter your message..."
            value={message}
            onChange={(event) => setmessage(event.target.value)}
          />
          <button type="submit" class="msger-send-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messenger;
