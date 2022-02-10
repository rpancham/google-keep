import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function CreateNote(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({

    title: "",
    content: "",
    created: ""

  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitButton(event) {
    event.preventDefault();

    axios.post("http://localhost:8080/Keep/keep", {
      "title": note.title,
      "content": note.content,
      "created": new Date().toDateString(),
      "edited": new Date().toDateString()
   
    }
    ).then((response) => {
      props.onAdd(response.data);
      console.log(response);

    })
      .catch((error) => {
        console.log(error);
      })

  }

  function handleExpanded() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={handleExpanded}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />

        <button onClick={submitButton}><AddIcon size={35} /></button>
        
      </form>
    </div>
  );
}

export default CreateNote;

