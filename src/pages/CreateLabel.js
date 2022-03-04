import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

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

export default function CreateLabel({ openModal, handleCloseModal }) {



  const [note, setNote] = useState({

    title: "",
    content: "",
    created: "",
    label: ""

  });

  const [label, setLabel] = useState()

  // function label(label) {
  //   var ele = ele.join();
  //   console.log(ele); 
  // }

  const [checkbox, setCheckbox] = useState({
    label: ""
  })

  const [isChecked, setIsChecked] = useState(false);


  const [value, setValue] = React.useState('Note2');

  function handleLabel(event) {
    event.preventDefault()

  }
  const handleChangee = (event) => {
    setValue(event.target.value);
  }

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };


  function handleSumbit(event) {
    event.preventDefault();
    console.log(label);
    setLabel(event.target.value);
    // props.onSubmit(Label);
  }

  const Label = (props) => {
    return (
      props.label.map(notes => {
        return <notes key={notes.id} {...note} />
      })


    )
  };

  function handleSumbit(e) {
    e.preventDefault();

    // axios.post("http://localhost:8080/Keep/keep", {

    //   "label": note.label
    // }
    // ).then((response) => {
    //   // props.onAdd(response.data);
    //   console.log(response);

    // })
    //   .catch((error) => {
    //     console.log(error);
    //   })

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
    <Modal
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
              placeholder="label" />
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <FormGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                // onChange={handleChangee}
                checked={isChecked}
                onChange={handleOnChange}
              >
                <FormControlLabel control={<Checkbox isChecked />} label="Note1" />
                <FormControlLabel control={<Checkbox isChecked />} label="Note2" />
                <FormControlLabel control={<Checkbox isChecked />} label="Note3" />
              </FormGroup>
            </FormControl>
          </Typography>

          <button onClick={handleSumbit}>Submit</button>
          <button onClick={handleCloseModal}>Close</button>

        </Box>
      </Fade>
    </Modal>

  );
}
