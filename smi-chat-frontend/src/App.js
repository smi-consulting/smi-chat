import React, { useRef, useState } from 'react';
import './App.css';


function App() {

  const [user] = "Test_User"

  return (
    <div className="App">
      <header>
        <h1>SMI Chat</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithEmail = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // auth.signInWithPopup(provider);
  }

  return (
    <>
      <form>
        <input>Please enter Username: </input>
        <input>Please enter Email: </input>
      </form>
      <button className="sign-in" onClick={signInWithEmail}>Sign in with Email</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  // TODO: Implement SignOut
  return /*auth.currentUser &&*/ (
    <button className="sign-out" /*onClick={() => auth.signOut()}*/>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  // const messagesRef = firestore.collection('messages');
  // const query = messagesRef.orderBy('createdAt').limit(25);

  // const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    // TODO: implement Send Message
    // e.preventDefault();
    //
    // const { uid, photoURL } = auth.currentUser;
    //
    // await messagesRef.add({
    //   text: formValue,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //   uid,
    //   photoURL
    // })
    //
    // setFormValue('');
    // dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {/*{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}*/}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const messageClass = 'sent';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;
