import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
interface Toggle {
    setToggleDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteNotif: React.FC<Toggle> = ({ setToggleDelete}) => {

    const removeNotif = () => {
        setToggleDelete(false);
    }
    return (
        <div className="flex flex-col p-8 md:w-full w-[200px]  bg-loginbg shadow-md hover:shadow-lg rounded-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex flex-col ml-3">
                        <div className="font-medium leading-none text-gray-100 mb-1">Deleted!</div>
                        <p className="text-sm text-gray-500 leading-none mt-1">
                            Data has been successfully deleted in the database.
                        </p>
                    </div>
                    <div className='pb-5 cursor-pointer' onClick={removeNotif}>
                        <FontAwesomeIcon icon={faTimes} className='text-cyan-500' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DeleteNotif