import { useState } from "react";
import type { todoProps } from "./TodoContainer";
interface todoPropExtra extends todoProps{
    handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDelete : (id:string) => void;
    handleEdit : (updatedTod :{id:string, name:string}) => void;
}
const Todo = ({name, id, isCompleted, handleCheckBox, handleDelete, handleEdit}: todoPropExtra) =>{
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(name);

    const handleEditTodo = () =>{
        setIsEdit(true);
    }

    const handleSave = () =>{
        handleEdit({id, name:editedText})
        setIsEdit(false)
    }

    return(
        <div className="flex md:w-3/4 lg:1/2 mx-auto items-center shrink py-1">
            {
                !isEdit ?
                 <>
                    <input type="checkbox"  checked={isCompleted} onChange={(e)=> handleCheckBox(e)} name='isCompleted' id={id} className="w-[18px] h-[18px] rounded bg-indigo-500 cursor-pointer accent-blue-500" />
                    <p className={`${isCompleted && 'line-through'} w-3/4 ps-2 text-start text-lg overflow-y-auto` }>{name}</p>
                    <button  className={`cursor-pointer ms-2 me-4 px-[12px] py-[3px] bg-indigo-500 rounded text-white ${isCompleted ? "opacity-50 disabled:cursor-not-allowed" : "hover:bg-blue-800"}`} onClick={handleEditTodo}>Edit</button>
                    <button className="cursor-pointer px-[8px]  bg-red-500 py-[3px] rounded text-white hover:bg-red-600" onClick={()=> handleDelete(id)}>Delete</button>
                 </> :
                 <>
                    
                        <input className="w-3/4 border border-2 rounded p-[2px] " type="text"  value={editedText} onChange={(e)=> setEditedText(e.target.value)} />
                        <button className="cursor-pointer px-[8px]  bg-green-500 py-[3px] rounded text-white hover:bg-green-600 ms-15 me-[18px]" onClick={handleSave}>Yes</button>
                        <button className="cursor-pointer px-[8px]  bg-red-500 py-[3px] rounded text-white hover:bg-red-600" onClick={()=> setIsEdit(false)}>No</button>
                    
                 </>
                
                
            }
            
            
        </div>
    )
}

export default Todo;