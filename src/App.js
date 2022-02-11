import './App.css';
import Sidebar from './components/Sidebar';
import Note from './pages/Note';
import CreateNote from './pages/CreateNote';
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center'
}));

function App() {
  const [notes, setNotes] = useState([]);
  const [searchNote, setSearchNote] = React.useState("")

useEffect(()=>{
  // if(searchNote.length = 0){
  //   return setNotes(notes)
  // }
  if(searchNote.length > 0){
  const search = notes.filter(note=>note.title.includes(searchNote))
  setNotes(search)}
  else{
    return setNotes(notes)
  }
},[searchNote])

  function addNote(newNote) {
    console.log(newNote);
    setNotes(preValue => {
      return [...preValue, newNote];

    });
  }

  function deleteNote(id) {
    console.log(id);
    console.log(notes);
    setNotes((preValue) => {
      return preValue.filter((notei) => {
        return notei.id !== id;
      });
    });
  }


  function editNote(id, title, content, edited) {
    //  console.log(id, title, content, notes);
    let newarray = notes.map((element) => {
      if (element.id === id) {
        let obj = {
          id: id,
          title: title,
          content: content,
          edited: edited
        }
        return obj;
      }
      else {
        return element;
      }
    })
    console.log(newarray);
    setNotes(newarray);
    axios.put('http://localhost:8080/Keep/keep/' + id, {
      title: title,
      content: content,
      edited: edited

    })
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      })
  }

  const handleList = () => {
    console.log('handleList')
    axios.get('http://localhost:8080/Keep/keep/')
      .then((response) => {
        console.log(response);
        setNotes(response.data);
      }).catch((err) => {
        console.log(err);
      })
  }
   console.log(notes);
  return (
    // <div className="App">
    <div>
      <Sidebar 
      setSearchNote={setSearchNote}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <CreateNote onAdd={addNote} />
            <Button onClick={handleList}>ListNotes</Button>
          </Item>
        </Grid>

        {notes.map((notei) => {

          return (
            <Grid item xs={2}><Item>
              <Note
                key={notei.id}
                id={notei.id}
                title={notei.title}
                created={notei.created}
                edited={notei.edited}
                content={notei.content}
                onDelete={deleteNote}
                onEdit={editNote}
              />
            </Item></Grid>
          )
        })}
      </Grid>

    </div>

  );
}
export default App;
