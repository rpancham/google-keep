import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


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

export default function CreateLabel() {
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElPopper, setAnchorElPopper] = useState(null);

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

    const [note, setNote] = useState({

      title: "",
      content: "",
      created: "",
      label: ""
  
    });

    const [value, setValue] = React.useState('Note2');

  function handleLabel(event) {
    event.preventDefault()

  }


  const handleChangee = (event) => {
    setValue(event.target.value);
  }

  function handleSumbit(e) {

    e.preventDefault();

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

    
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      
<CreateLabel
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openModal}>
                  <Box sx={style}>
                    <Typography >
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
                    <button onClick={handleCloseModal}>Close</button>
                  </Box>
                </Fade>
              </CreateLabel>
    </div>
  );
}
