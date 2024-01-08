import Buttons from "@/components/buttons";
import { useEffect, useState } from "react";
import axios from "axios";


interface todo {
  id: number;
  task: string;
  strike: string;
  edit: boolean;
}
let index=0 

export default function Home() {
  const [task_name, setTask_name] = useState<string>("");
  const [add_task, setAdd_task] = useState<todo[]>([]);
  const [placeholderValue, setPlaceholderValue] = useState<string>("");
  const [changedTask, setChangedTask] = useState<string>("");
  useEffect(()=>{
    axios.get ('http://localhost:4000/get').then ((res)=>{
      setAdd_task (res.data)
    })
  },[])

  if (add_task.length != 0) index = add_task[add_task.length-1].id +1

  const clearAll = async() => {
    localStorage.clear(); 
    setAdd_task([]);
    await axios.delete ('http://localhost:4000/clearAll')
  };

  const postData = async ()=>{
    try {
      await axios.post('http://localhost:4000/post', {
        id : index,
        task: task_name,
        strike: "",
        edit: false,
      })
      console.log('POST request successful');
    }
    catch (e){
      console.log (e)
    }
  }


  // Edit Task Function
  const edit_task = (index: number) => {
    const i = add_task.findIndex((todo) => todo.id === index);
    const updatedList = [...add_task];
    if (updatedList[i].edit === false) updatedList[i].edit = true;
    setAdd_task(updatedList);
  };

  //Edited Task Ok Button
  const editedTask = async(index: number) => {
    try{
      const i = add_task.findIndex((todo) => todo.id === index);
      const updatedList = [...add_task];
      updatedList[i].task = changedTask;
      updatedList[i].edit = false;
      updatedList[i].strike = "";
      const ind = add_task[i].id
      setAdd_task(updatedList);
      await axios.put (`http://localhost:4000/put/${ind}`, {
        id: ind,
        task : changedTask,
        strike: "",
        edit: false,
      })
      console.log ("Edited Successfully")
    }
    catch (e){
      console.log (e)
    }
  };

  // Delete Task function
  const delete_task = async(index: number) => {
    try{
      const i = add_task.findIndex((todo) => todo.id === index);
      const updatedList = [...add_task];
      if (i > -1) {
        updatedList.splice(i, 1);
      }
      // console.log (i)
      setAdd_task(updatedList);
      const ind = add_task[i].id
      await axios.delete (`http://localhost:4000/delete/${ind}`)
      console.log ("Deleted Successfully")
    }
    catch (e){
      console.log (e)
    }
  };
  
  
  // Add Task Function
  const add_div = async() => {
    try{
      if (task_name === "") {
        alert("Please enter a task");
      } else {
        const newTodo: todo = {
          id: Date.now(),
          task: task_name,
          strike: "",
          edit: false,
        };
        postData()
        setAdd_task([...add_task, newTodo]);
        setPlaceholderValue("");
        setTask_name("");
        index++
        
      }
    }
    catch (e){
      console.log (e)
    }
  };

  const enter_text = (e: any) => {
    setPlaceholderValue(e.target.value);
    setTask_name(e.target.value);
  };

  // Strike Function
  const click = async(index: number) => {
    try{
      const i = add_task.findIndex((todo) => todo.id === index);
      const updatedList = [...add_task];
      const ind = add_task[i].id;
      if (i > -1) {
        if (updatedList[i].strike === "") {
          updatedList[i].strike = "line-through";
          await axios.put (`http://localhost:4000/put/${ind}`, {
            id : ind,
            task: updatedList[i].task,
            strike: "line-through",
            edit: false,
          })
        }
        else {
          updatedList[i].strike = "";
          await axios.put (`http://localhost:4000/put/${ind}`, {
            id : ind,
            task: updatedList[i].task,
            strike: "",
            edit: false,
          })
        }
      }
      setAdd_task(updatedList);
    }
    catch(e) {
      console.log (e);
    }
  };

  return (
    
    <div className="flex justify-center align-middle ">
      <div className="border w-80 h-80 bg-white">
        <div>
          <input
            type="text"
            onChange={enter_text}
            value={placeholderValue}
            placeholder="Enter Your Task"
            className="border me-3"
          />
          <button onClick={add_div} className="p-3">
            Add
          </button>
          <button onClick={clearAll}>Clear All</button>
        </div>
        <div className="overflow-auto h-60">
          {add_task.map((todo) => (
            <div key={todo.id}>
              <Buttons
                key={todo.id}
                task_name={todo.task}
                edit_task={edit_task}
                delete_task={delete_task}
                index={todo.id}
                click={click}
                strike={todo.strike}
              />
              {/* Edit Task */}
              <div>
                {todo.edit ? (
                  <div>
                    <input
                      type="text"
                      onChange={(e) => {
                        setChangedTask(e.target.value);
                      }}
                      className=""
                    />
                    <button onClick={() => editedTask(todo.id)}>Ok</button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
