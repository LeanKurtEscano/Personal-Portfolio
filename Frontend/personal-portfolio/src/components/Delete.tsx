import React from 'react'


interface DeleteProps {
    setShowDelete: React.Dispatch<React.SetStateAction<boolean>>; 
    deleteUser: (userId: number) => void;
    id : number;
  }
const Delete:React.FC<DeleteProps> = ({setShowDelete,deleteUser,id}) => {

    const cancelToggle = () => {
        setShowDelete(false);
    }

    const handleDelete = () => {
        deleteUser(id);
        setShowDelete(false);
    }


  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-darkbg  p-6 rounded-lg border border-cyan-600 max-w-sm w-full">
      <div className=' flex flex-col justify-start items-start'>
      <h2 className="text-red-600 mb-4 text-lg md:text-xl">Are you sure?</h2>
      <p className="text-slate-200 md:text-lg mb-4">Do you really want to delete this data?</p>
      </div>
      
      <div className="flex justify-end">
        <button
          className="bg-gray-700 text-slate-200 px-4 py-2 text-base rounded-md hover:bg-gray-800 transition duration-300"
          onClick={cancelToggle}
        >
          Cancel
        </button>
        <button
          className="bg-cyan-600 ml-2 text-slate-200 px-4 text-base py-2 rounded-md transition duration-300"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  )
}

export default Delete