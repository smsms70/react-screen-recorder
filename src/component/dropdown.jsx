import { useState, useEffect, useRef } from "react";
import "../styles/dropdown.css"

export function Dropdown ({options, setParam}) {
  const [drop, setDrop] = useState(false);
  const [active, setActive] = useState(options[0]);
  const dropdownRef = useRef(null);

  const dropdownHandler = () => {
    setDrop(!drop)
  }
  const activeQualityHandler = (e) => {
    setParam(e.target.value)
    setActive(e.target.value)
    setDrop(false)
  }
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDrop(false);
    }
  };
  useEffect(() => {
    // Add the click event listener to the document body
    document.addEventListener('click', handleClickOutside);

    // Remove the event listener on cleanup
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  return (
    <div id="quality-handler-container" ref={dropdownRef}>
      <section id="quality-box" onClick={dropdownHandler}>
        <span className="quality-btn" id="quality-text">{active}</span>
        <span className="quality-btn" id="dropdown-btn">▼</span>
      </section>
      <section id="dropdown-quality-container" onClick={activeQualityHandler} className={drop ? "" : "hidden"}>

        {options.map((element, index) => {
          return( <DropdownOption key={index} value={element} />)
        })}
        
      </section>
    </div>
  )
}
function DropdownOption ({value}) {
  if (value) {
    return (
      <>
        <option className="dropdown-quality-box" value={value}>{value}</option>
      </>
    );
  } else {
    return null;
  }
}
