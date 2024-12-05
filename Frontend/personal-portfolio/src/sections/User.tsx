import React from 'react'
import { useState, useEffect } from 'react';
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


    const deleteUser = async (userId: number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/user-management/delete/${userId}`, {

                withCredentials: true
            })

            if (response.status === 200) {
                getCrud();
                setToggleDelete(!toggleDelete);
            }

        } catch (error) {
            console.log(error);
            alert("Failed to Delete Data");
        }


    }
    const getCrud = async () => {

        try {
            const response = await axios.get("http://127.0.0.1:5000/user-management/read", {

                withCredentials: true
            })

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

    }

    useEffect(() => {
        getCrud();

    }, []);

    return (
        <section className='w-full sm:overflow-y-auto flex min-h-screen justify-center pb-20 pt-20 md:pl-36 pl-20 bg-darkbg'>
            {emptyActivity ? (
                <h1 className='text-slate-200 md:text-4xl text-md pr-14 font-bold'>{emptyActivity}</h1>
            ) : (
                <div className='flex overflow-x-auto items-center flex-col'>
                    <Table data={userData || []} deleteUser={deleteUser} />

                </div>
            )}

            {toggleDelete && (

                <div className={`absolute right-5 top-28 ${toggleDelete ? 'notification-enter' : 'notification-exit'}`}>
                    <DeleteNotif setToggleDelete={setToggleDelete} />
                </div>
            )}


        </section>
    )
}

export default User