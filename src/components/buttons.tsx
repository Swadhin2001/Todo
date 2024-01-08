import React from 'react'

export interface Props {
  task_name : string;
  delete_task: (index:number)=> void;
  index: number;
  edit_task: (index: number)=> void;
  click : (index: number)=> void;
  strike: string;
}


const buttons: React.FC <Props> =({task_name, delete_task, edit_task, index, strike, click})=>{

  return (
    <>
      <div className='flex'>
        <div onClick={()=> click(index)} className={`cursor-pointer ${strike}`}>{task_name}</div>
        <button className='px-4' onClick={()=> edit_task (index)}><b>Edit Task</b></button>
        <button onClick= {()=>delete_task(index)}><b>Detete task</b></button>
      </div>
    </>
  )
}

export default buttons
