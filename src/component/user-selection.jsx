import { useState } from "react";
import "../styles/user-selection.css";


export function UserSelection ({userSelection, getUserSelection, RecordInSwitch}) {

  const selectionHandler = (event) => {
    if (RecordInSwitch) {
      getUserSelection(event.target.value);
    } else {
      // introduce a pop up advice <----------
    }
  }
  return (
    <section id="selection-choices-container" onClick={selectionHandler}>
      <option
        value="screen"
        className={`selection-choice-box ${userSelection === 'screen' ? 'active-choice-box' : ''}`}
      >
        Screen
      </option>
      <option
        value="user"
        className={`selection-choice-box ${userSelection === 'user' ? 'active-choice-box' : ''}`}
      >
        User
      </option>
      <option
        value="screen&user"
        className={`selection-choice-box ${userSelection === 'screen&user' ? 'active-choice-box' : ''}`}
      >
        Screen and user
      </option>
    </section>
  );
}