import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import LabelIcon from '@mui/icons-material/Label';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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
      "edited": new Date().toDateString(),
     

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

  const MyOptions = [
    "Add Label",
    "Delete Label"
  ];
  

const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const open = Boolean(anchorEl);
  
  const handleClose = () => {
    setAnchorEl(null);
  };


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

        {/* <input
        name="label"
        // onClick={handleLabel}
        value={label.name}
        placeholder="LabelName"
        /> */}

        <Tooltip
          title="AddNote"
        >
          <button onClick={submitButton}><AddIcon size={35} /></button>
        </Tooltip> 

       
        <IconButton
        
        aria-label="more"
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="long-menu"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu 
        anchorEl={anchorEl} 
        keepMounted onClose={handleClose} 
        open={open}>
        {MyOptions.map((option) => (
          <MenuItem
            key={option} 
            onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
         
      



        {/* <button onClick={submitButton}><AddIcon size={35} /></button> */}
        
      </form>
    </div>
  );
}

export default CreateNote;

