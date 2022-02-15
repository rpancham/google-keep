
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import LabelIcon from '@mui/icons-material/Label';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ClickAwayListener from '@mui/material/ClickAwayListener';


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
      // "label": note.label


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


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openn = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState('female');

  const handleChangee = (event) => {
    setValue(event.target.value);
  }

  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
  };

  const [openKebab, setOpenKebab] = useState(false);
  const [openPopper, setOpenPopper]=useState(false);
  const handleOpenKebab = () => setOpenKebab(true);
  const handleCloseKebab = () => setOpenKebab(false);
  const handleOpenPopper = () => setOpenPopper(true);
  const handleClosePopper = () => setOpenPopper(false);


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
{/* 
        <ClickAwayListener onClickAway={handleClosePopper}> */}
        <IconButton

          aria-label="more"
          onClick={handleOpenKebab}
          aria-haspopup="true"
          aria-controls="long-menu"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted 
          onClose={handleCloseKebab}
          open={openKebab}>
          {MyOptions.map((option) => (
            <MenuItem
              key={option}
              onClick = { () => {handleOpenPopper();{handleClosePopper()}} } >
              {/* <Modal
                open={open}
                onClose={handleCloseM}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              > */}
              


              <popper
                open={openPopper}>


                <Fade in={openPopper}>

                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h6">
                      Label

                      <input
                        name="label"
                        onClick={handleLabel}
                        onChange={handleChange}
                        value={note.label}
                        placeholder="label"
                      />
                      <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={value}
                          onChange={handleChangee}
                        >
                          <FormControlLabel value="note1" control={<Radio />} label="Note1" />
                          <FormControlLabel value="note2" control={<Radio />} label="Note2" />
                        </RadioGroup>
                      </FormControl>



                    </Typography>
                    <button onClick={handleSumbit}>Submit</button>
                    <button onClick={handleClosePopper}>Close</button>
                    {/* <CloseRoundedIcon onClick={handleClose}>Close</CloseRoundedIcon> */}

                  </Box>
                </Fade>
                {/* </Modal> */}
              </popper> 

              {option}
            </MenuItem>
          ))}
        </Menu>
        {/* </ClickAwayListener> */}





        {/* <button onClick={submitButton}><AddIcon size={35} /></button> */}

      </form>
    </div>
  );
}


export default CreateNote;