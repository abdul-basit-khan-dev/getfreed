import React from 'react'

function NotesList() {
  return (
    <div className='row'>
      {/* // TODO */}
      <div className="col-2">box</div>
      <div className="col-8">
        <p className='mb-0'>Unknown</p>
        <p className='mb-0'>02/01/24 <span>6:56pm</span></p>
        <p>Paused</p>
      </div>
      <div className="col-2">icon</div>
    </div>
  )
}

export default NotesList;
