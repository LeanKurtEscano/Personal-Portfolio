import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface UserData {
    id: number;
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

const Table: React.FC<UserDataArray> = ({ data, deleteUser }) => {
    const navigate = useNavigate();

    return (
        <div className="md:relative w-11/12 overflow-x-auto mb-5">
            <table className="min-w-full text-xs text-center rtl:text-right text-darktext3 dark:text-darktext3">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-loginbg dark:text-gray-400">
                    <tr>
                        <th className="px-1 py-1 md:px-3 md:py-2">First Name</th>
                        <th className="px-1 py-1 md:px-3 md:py-2">Middle Name</th>
                        <th className="px-1 py-1 md:px-3 md:py-2">Last Name</th>
                        <th className="px-1 py-1 md:px-3 md:py-2">Birthday</th>
                        <th className="px-1 py-1 md:px-3 md:py-2">Age</th>
                        <th className="px-1 py-1 md:px-3 md:py-2">Contact Number</th>
                        <th className="px-1 py-1 md:px-3 md:py-2">Email</th>
                        <th className="px-1 py-1 md:px-3 md:py-2">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-loginbg dark:border-gray-800">
                                <td className="px-1 py-1 md:px-3 md:py-2">{item.firstname}</td>
                                <td className="px-1 py-1 md:px-3 md:py-2">{item.middlename || 'N/A'}</td>
                                <td className="px-1 py-1 md:px-3 md:py-2">{item.lastname}</td>
                                <td className="px-1 py-1 md:px-3 md:py-2">{item.birthday}</td>
                                <td className="px-1 py-1 md:px-3 md:py-2">{item.age}</td>
                                <td className="px-1 py-1 md:px-3 md:py-2">{item.contact_number}</td>
                                <td className="px-1 py-1 md:px-3 md:py-2 max-w-52 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {item.email}
                                </td>
                                <td className="px-1 py-1 md:px-3 md:py-2">
                                    <div className="flex justify-center items-center space-x-2">
                                        <button
                                            onClick={() => navigate(`/dashboard/user/update/${item.id}`)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() => deleteUser(item.id)}
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
                            <td colSpan={8} className="px-1 py-4 text-center">
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
