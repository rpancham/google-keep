import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LabelIcon from '@mui/icons-material/Label';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Modal from '@mui/material/Modal';
import Popper from '@mui/material/Popper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from "react";
import CreateLabel from "./CreateLabel";


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
      "created": new Date().toDateString(),
      "edited": new Date().toDateString(),
      //"label": note.label


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



      </form>
    </div>
  );
}


export default CreateNote;