import React, { useState } from "react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import axios from 'axios';
import "../index.css";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from '@mui/material/Tooltip';
import LabelIcon from '@mui/icons-material/Label';
import CreateLabel from "./CreateLabel";
import Chip from '@mui/material/Chip';


function Note(props) {
  const [displayForm, setForm] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [id, setId] = useState(props.id);
  const [label,setLabel]=useState(props.label);
  const [edited, setedited] = useState(props.edited);
  const [created, setcreated] = useState(props.created);
  const [CreateLabel, setCreateLabel]=useState("");

  const [searchNote, setSearchNote] = useState('');

  console.log(props);

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

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
       "label":props.label,
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
    <Tooltip title={"Title  " + props.title }>
    <h1>{props.title}</h1>
      </Tooltip>  
      <Tooltip title={"Content  " + props.content}>
      <p>{props.content}</p>
      </Tooltip><h1>{props.label}</h1>


      <form
        onSubmit={handleEdit}
        className={`${displayForm ? "show" : "hide"}`}
      >
      
        <input defaultValue={title} onChange={(handleTitleChange)} placeholder="Title" required={true} />
      
        <input defaultValue={content} onChange={(handleContentChange)} placeholder="Content" required={true} />
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
        {/* <Tooltip title="Label">
          <button onClick={()=> setCreateLabel(CreateLabel)}><LabelIcon /></button>
        </Tooltip> */}
        <Tooltip title="Label" align="right">
        <Chip label="Label"  onDelete={handleDelete} />
        </Tooltip>
      </div>
     
    </div>
  );
}

export default Note;

