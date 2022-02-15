import React, { useState } from "react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import axios from 'axios';
import "../index.css";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from '@mui/material/Tooltip';



function Note(props) {
  const [displayForm, setForm] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [id, setId] = useState(props.id);
  const [label,setLabel]=useState(props.label);
  const [edited, setedited] = useState(props.edited);
  const [created, setcreated] = useState(props.created);

  const [searchNote, setSearchNote] = useState('');

  console.log(props);

  function handleClick() {
    axios.delete("http://localhost:8080/Keep/keep/" + props.id
    ).then((response) => {
      console.log(response);
      props.onDelete(props.id);
    })
      .catch((error) => {
        console.log(error);
      })

  }

  function handleEdit(e) {
    e.preventDefault();
    const title = e.target.children[0].value;
    const content = e.target.children[1].value;
    setForm(false);

    axios.put("http://localhost:8080/Keep/keep/" + props.id, {

      "title": props.title,
      "content": props.content,
      "id": props.id,
      // "label":props.label,
      "edited": props.edited,
      "created": props.created

    }
    ).then((response) => {
      console.log(response);
      props.onEdit(props.id, title, content, created, edited);

    })
      .catch((error) => {
        console.log(error);
      })

  }

  function handleTitleChange(e) {
    console.log(e.target.value);
    setTitle(e.target.value);

  }

  function handleContentChange(e) {
    console.log(e.target.value);
    setContent(e.target.value);

  }

  function handleClose(e) {
    setForm(false);

  }

  function handleSumbit(e) {
    e.preventDefault();
    console.log(title, content);
    setForm(!displayForm);
    props.onEdit(id, title, content, created, edited);
  }


  return (
    <div className="note" >
      {/* note={Notes.filter((notei)=>notei.text.toLowerCase().includes(searchNote))} */}
      <h1>{props.title}</h1>
      <p>{props.content}</p>


      <form
        onSubmit={handleEdit}
        className={`${displayForm ? "show" : "hide"}`}
      ><Tooltip
      title="Title"
    >
        <input defaultValue={title} onChange={(handleTitleChange)} placeholder="Title" required={true} /></Tooltip>
        <Tooltip
          title="Content"
        >
        <input defaultValue={content} onChange={(handleContentChange)} placeholder="Content" required={true} /></Tooltip>
        <CheckCircleIcon onClick={handleSumbit}>Submit</CheckCircleIcon>
        <CloseRoundedIcon onClick={handleClose}>Close</CloseRoundedIcon>
      </form>

      <div>
        <Tooltip title={"Created " + props.created}>
          <p align="bottom"><small>Edited {props.edited} </small></p>
        </Tooltip>

        <Tooltip
          TransitionProps={{ timeout: 600 }}
          title="Delete"
        >
          <button onClick={handleClick}><DeleteRoundedIcon /></button>
        </Tooltip>
        <Tooltip title="Edit">
          <button onClick={() => setForm(!displayForm)}><EditRoundedIcon /></button>

        </Tooltip>
      </div>

    </div>
  );
}

export default Note;

