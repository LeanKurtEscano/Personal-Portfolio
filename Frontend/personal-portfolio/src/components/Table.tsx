import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface UserData {
    id:number;
    firstname: string;
    middlename: string;
    lastname: string;
    birthday: string;
    age: number;
    contact_number: string;
    email: string;
}
interface UserDataArray {
    data: UserData[];
    deleteUser: (userId: number) => void;
  
}

const Table: React.FC<UserDataArray> = ({ data, deleteUser  }) => {

 
    const navigate = useNavigate();
    return (
        <div className="md:relative w-full overflow-x-auto mb-5">
            <table className="min-w-full text-sm text-center rtl:text-right text-darktext3 dark:text-darktext3">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-loginbg dark:text-gray-400">
                    <tr>
                        <th className="px-2 py-2 md:px-6 md:py-3">First Name</th>
                        <th className="px-2 py-2 md:px-6 md:py-3">Middle Name</th>
                        <th className="px-2 py-2 md:px-6 md:py-3">Last Name</th>
                        <th className="px-2 py-2 md:px-6 md:py-3">Birthday</th>
                        <th className="px-2 py-2 md:px-6 md:py-3">Age</th>
                        <th className="px-2 py-2 md:px-6 md:py-3">Contact Number</th>
                        <th className="px-2 py-2 md:px-6 md:py-3">Email</th>
                        <th className="px-2 py-2 md:px-6 md:py-3">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-loginbg dark:border-gray-800">
                                <td className="px-2 py-2 md:px-6 md:py-4 text-center">{item.firstname}</td>
                                <td className="px-2 py-2 md:px-6 md:py-4 text-center">{item.middlename || 'N/A'}</td>
                                <td className="px-2 py-2 md:px-6 md:py-4 text-center">{item.lastname}</td>
                                <td className="px-2 py-2 md:px-6 md:py-4 text-center">{item.birthday}</td>
                                <td className="px-2 py-2 md:px-6 md:py-4 text-center">{item.age}</td>
                                <td className="px-2 py-2 md:px-6 md:py-4 text-center">{item.contact_number}</td>
                                <td className="px-2 py-2 md:px-6 md:py-4 text-center">{item.email}</td>
                                <td className="px-2 py-2 md:px-6 md:py-4 text-center">
                                    <div className="flex justify-center items-center space-x-4">
                                        <button
                                             onClick={() => navigate(`/dashboard/user/update/${item.id}`)}
                                            className="text-blue-500 hover:text-blue-700"
                                           
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => deleteUser(item.id)}
                                           className="text-red-500 hover:text-red-700"
                                          
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="px-2 py-4 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
