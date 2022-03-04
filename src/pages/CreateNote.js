import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import { TextField, textFieldClasses } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import React, { useState } from "react";
import CreateLabel from './CreateLabel';


function CreateNote(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({

    title: "",
    content: "",
    created: "",
    label: ""

  });

  function handleClosee(e) {
    e.preventDefault(false);

  }


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
      "created": new Date().toLocaleString(),
      "edited": new Date().toLocaleString(),
      "label": note.label


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

  function handleLabel(event) {
    event.preventDefault()
  }

  function handleSumbit(e) {

    e.preventDefault();

  }

  const MyOptions = [
    "Add Label",

  ];

  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElPopper, setAnchorElPopper] = useState(null);



  const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const openn = Boolean(anchorEl);

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [value, setValue] = React.useState('Note2');

  // const handleChangee = (event) => {
  //   setValue(event.target.value);
  // }

  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "250px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
  };



  const [openKebab, setOpenKebab] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenKebab = (event) => {
    setOpenModal(false)
    setOpenKebab(true)
    setAnchorElMenu(event.currentTarget)
  }
  const handleCloseKebab = () => setOpenKebab(false);
  const handleOpenModal = (event) => {
    setOpenModal(true)
    setOpenKebab(false)
    setAnchorElPopper(event.currentTarget)
  }
  const handleCloseModal = () => setOpenModal(false);
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
{/* 
        <input
        type="text"
          name="Label"
          // onChange={handleChange}
          onClick={handleExpanded}
          value={note.label}
          placeholder="Label"
        /> */}


        <Tooltip
          title="AddNote"
        >
          <button onClick={submitButton}><AddIcon size={35} /></button>
        </Tooltip>
        <IconButton
          aria-label="more"
          onClick={handleOpenKebab}
          aria-haspopup="true"
          aria-controls="long-menu"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElMenu}
          keepMounted
          onClose={handleCloseKebab}
          open={openKebab}>
          {MyOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={() => { handleOpenModal(); { handleCloseKebab() } }} >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <CreateLabel openModal={openModal}
          handleCloseModal={handleCloseModal} />

      </form>
    </div>
  );
}


export default CreateNote;