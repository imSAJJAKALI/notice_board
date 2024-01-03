import './NoticeBoard.css'

export const Note = ({note, onDelete,onEdit,onPin,onDoubleClick,onDragStart,onBlur }) => {
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
  