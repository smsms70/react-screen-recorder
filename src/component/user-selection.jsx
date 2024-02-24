import { useState } from "react";
import "../styles/user-selection.css";


export function UserSelection ({getUserSelection}) {
  const [selection, setSelection] = useState('screen');

  const selectionHandler = (event) => {
    setSelection(event.target.value);
    getUserSelection(event.target.value);
    
  }
  return (
    <section id="selection-choices-container" onClick={selectionHandler}>
      <option
        value="screen"
        className={`selection-choice-box ${selection === 'screen' ? 'active-choice-box' : ''}`}
      >
        Screen
      </option>
      <option
        value="user"
        className={`selection-choice-box ${selection === 'user' ? 'active-choice-box' : ''}`}
      >
        User
      </option>
      <option
        value="screen&user"
        className={`selection-choice-box ${selection === 'screen&user' ? 'active-choice-box' : ''}`}
      >
        Screen and user
      </option>
    </section>
  );
}