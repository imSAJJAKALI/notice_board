// NoticeBoard.js
import React, { useEffect, useState } from 'react';
import './NoticeBoard.css';

const Note = ({
  note,
  onDelete,
  onEdit,
  onPin,
  onDoubleClick,
  onDragStart,
  onBlur,
}) => {
  return (
    <div
      className={`note ${note.pinned ? 'pinned' : ''}`}
      style={{ left: note.x, top: note.y }}
      draggable={!note.pinned}
      onDragStart={onDragStart}
      onDoubleClick={onDoubleClick}
    >
      {note.editing ? (
        <input
          type="text"
          value={note.text}
          autoFocus
          onBlur={onBlur}
        />
      ) : (
        <>
          <div className="note-text">{note.text}</div>
          <button onClick={onDelete}>X</button>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onPin}>
            {note.pinned ? 'Unpin' : 'Pin'}
          </button>
        </>
      )}
    </div>
  );
};

const NoticeBoard = () => {
  const [notes, setNotes] = useState([
    { id: 1, text: 'Note 1', x: 60, y: 20, pinned: false, editing: false },
    { id: 2, text: 'Note 2', x: 150, y: 50, pinned: false, editing: false },
    // Add more initial notes as needed
  ]);

  const [newNote, setNewNote] = useState('');

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, x: mouseX, y: mouseY } : note
    );

    setNotes(updatedNotes);
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: prevNotes.length + 1,
          text: newNote,
          x: 20,
          y: 20,
          pinned: false,
          editing: false,
        },
      ]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, editing: true } : note
    );
    setNotes(updatedNotes);
  };

  const handlePinNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleNoteDoubleClick = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, editing: true } : note
      )
    );
  };

  const handleEditBlur = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, editing: false } : note
      )
    );
  };

  return (
    <div className="app">
      <button onClick={handleAddNote}>+</button>
      <input
        type="text"
        placeholder="New Note"
        value={newNote}
        onChange={handleInputChange}
        className="new-note-input"
      />
      <div className="board" onDragOver={handleDragOver} onDrop={handleDrop}>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={() => handleDeleteNote(note.id)}
            onEdit={() => handleEditNote(note.id)}
            onPin={() => handlePinNote(note.id)}
            onDoubleClick={() => handleNoteDoubleClick(note.id)}
            onDragStart={(e) => handleDragStart(e, note.id)}
            onBlur={() => handleEditBlur(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
