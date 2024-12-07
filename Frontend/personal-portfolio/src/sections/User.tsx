import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Table from '../components/Table';
import DeleteNotif from '../components/DeleteNotif';
import axios from 'axios';

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

const User: React.FC = () => {
    const [emptyActivity, setEmptyActivity] = useState("");
    const [userData, setUserData] = useState<UserData[]>([]);
    const [toggleDelete, setToggleDelete] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (toggleDelete) {
            const timer = setTimeout(() => {
                setToggleDelete(false);
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, [toggleDelete]);
    const deleteUser = async (userId: number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/user-management/delete/${userId}`, {
                withCredentials: true
            });

            if (response.status === 200) {
                getCrud();
                setToggleDelete(!toggleDelete);
            }
        } catch (error) {
            console.log(error);
            alert("Failed to Delete Data");
        }
    };

    const getCrud = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/user-management/read", {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response.data.data);
                setUserData(response.data.data);
                if (response.data.length === 0) {
                    setEmptyActivity("No user data found.");
                } else {
                    setEmptyActivity("");
                }
            }
        } catch (error) {
            console.log(error);
            alert("Failed to fetch Data");
        }
    };

    useEffect(() => {
        getCrud();
    }, []);

    return (
        <section className="w-full sm:overflow-y-auto flex flex-col min-h-screen pb-20 pt-20 md:pl-36 pl-20 bg-darkbg relative">
           
            <div className=" md:pl-12 pl-3 flex justify-start items-center mb-4 pr-6">
                <button
                    className="flex items-center space-x-2 bg-cyan-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-cyan-500 hover:scale-105 transition-transform duration-300"
                    onClick={() => navigate('/dashboard/create')}
                >
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Create User</span>
                </button>
            </div>

            {emptyActivity ? (
                <h1 className="text-slate-200 md:text-4xl text-md pr-14 font-bold">{emptyActivity}</h1>
            ) : (
                <div className="flex overflow-x-auto items-center flex-col">
                    <Table data={userData || []} deleteUser={deleteUser} />
                </div>
            )}


            {toggleDelete && (
                <div className={`absolute right-5 top-24 ${toggleDelete ? 'notification-enter' : 'notification-exit'}`}>
                    <DeleteNotif setToggleDelete={setToggleDelete} />
                </div>
            )}
        </section>
    );
};

export default User;
