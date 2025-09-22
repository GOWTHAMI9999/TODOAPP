import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo";
export interface todoProps{
    id : string,
    name : string,
    isCompleted : boolean
}

const TodoContainer = () =>{
    const [todo, setTodo] = useState<string>('');
    
    const [todoList, setTodoList] = useState<todoProps[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

    const handleAddTodo = ()=>{
        if(todo===''){
            return;
        }
        setTodoList([...todoList, {name: todo, id: uuidv4(), isCompleted:false}])
        setTodo('');
    }

    const handleCheckBox = (e: { target: { id: string; }; }) =>{
        
        setTodoList(todoList.map(todo => 
        todo.id === e.target.id 
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo 
    ));
    }

    const handleDelete = (id:string) =>{
        const index = todoList.findIndex(todo=> todo.id==id);
        const newList = [...todoList]
        newList.splice(index, 1);
        setTodoList(newList)
    }

    const handleEdit = ({id, name}:{id:string, name:string}) =>{
        setTodoList(todoList.map(todo=> todo.id == id ? {...todo, name:name} : todo))
    }

    console.log(todoList)
    return(
        <div className="mx-auto ">
            <h1 className="text-xl font-bold mb-2">Todos</h1>
            <div className="flex md:w-3/4 lg:1/2  mx-auto m-1 flex-shrink">
                <input placeholder="Enter A Task Name" className="border border-2 w-3/4 rounded pl-1 me-3" type="text" value={todo} onChange={(e)=> setTodo(e.target.value)} />
                <button className="bg-yellow-500 px-3 py-[4px] rounded cursor-pointer hover:bg-yellow-600" onClick={handleAddTodo}>Add</button>
            </div>

            {
                todoList.length===0 ? <h3 className="mt-2 text-lg font-medium">No Tasks to Show</h3>:
                (
                    <div> 
                        {
                            todoList.map((todo)=> <Todo key={todo.id} {...todo} handleCheckBox={handleCheckBox} handleDelete={handleDelete} handleEdit={handleEdit}/>)
                        }
                    </div>
                )
            }

        </div>
    )
}

export default TodoContainer;

