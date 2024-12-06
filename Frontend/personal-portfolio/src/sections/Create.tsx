import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';
import CreateNotif from '../components/CreateNotif';
import { validateFirstName, validateMiddleName, validateBirthday, validateLastName, validateAge, validateContactNumber, validateEmail } from '../constants/validation';

interface UserProfile {
    first_name: string;
    middle_name: string;
    last_name: string;
    birthday: string;
    age: number;
    contact_number: string;
    email: string;
}

interface ValidationError {
    fnameError: string;
    lnameError: string;
    mnameError: string;
    bdayError: string;
    ageError: string;
    cnumberError: string;
    emailError: string;
}


const Create: React.FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [toggleCreate, setToggleCreate] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [formData, setFormData] = useState<UserProfile>({
    
        first_name: '',
        middle_name: '',
        last_name: '',
        birthday: '',
        age: 0,
        contact_number: '',
        email: ''
    });
   


    const [validationError, setValidationError] = useState<ValidationError>({
        fnameError: "",
        lnameError: "",
        mnameError: "",
        bdayError: "",
        ageError: "",
        cnumberError: "",
        emailError: "",
    })

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/dashboard/user');
    };

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");
        const trimmedUserProfile = {
            first_name: formData.first_name.trim(),
            middle_name: formData.middle_name.trim(),
            last_name: formData.last_name.trim(),
            birthday: formData.birthday,
            age: formData.age,
            contact_number: formData.contact_number.trim(),
            email: formData.email.trim(),
        };



        setValidationError({
            fnameError: "",
            lnameError: "",
            mnameError: "",
            bdayError: "",
            ageError: "",
            cnumberError: "",
            emailError: "",
        });



        const fnameError = validateFirstName(formData.first_name);
        const lnameError = validateLastName(formData.last_name);
        const mnameError = validateMiddleName(formData.middle_name || "");
        const bdayError = validateBirthday(formData.birthday, formData.age);

        const ageError = validateAge(formData.age);
        const cnumberError = validateContactNumber(formData.contact_number);
        const emailError = validateEmail(formData.email);


        setValidationError({
            fnameError: fnameError,
            lnameError: lnameError,
            mnameError: mnameError,
            bdayError: bdayError,
            ageError: ageError,
            cnumberError: cnumberError,
            emailError: emailError,
        });

        if (fnameError || lnameError || mnameError || bdayError || ageError || cnumberError || emailError) {
            return;

        }

        try {
            const response = await axios.post(`http://127.0.0.1:5000/user-management/create`, 
                trimmedUserProfile

            , {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.status === 200) {
                setToggleCreate(true);
            }

        } catch (error: any) {
            const {data} = error.response

            if(data.email){
                setEmailError(data.email);
            } else {
                alert("Failed to create user");
            }
            

        }

    }




    useEffect(() => {
        if (toggleCreate) {
            const timer = setTimeout(() => {
                setToggleCreate(false);
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, [toggleCreate]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };





    return (
        <section className="flex items-center h-auto min-h-screen pb-11 justify-center bg-darkbg">
            <div className="md:w-[500px] w-[200px] bg-darkbg p-4 sm:p-6">
                <div className='flex flex-row'>
                    <h1 className="bg-gradient-to-br mr-44 text-3xl from-cyan-400 to-blue-600 bg-clip-text text-transparent font-bold mb-4">Create </h1>
                    <div className=' '>
                        <button
                            onClick={handleGoBack}
                            className="flex items-center  pb-2 py-2 text-white rounded-lg"
                        >

                            <span className="mr-2 text-xl">←</span> Go Back
                        </button>

                    </div>

                </div>

                <form className="space-y-4">
                    <div>
                        <label htmlFor="first_name" className="block text-sm text-slate-100 font-medium">First Name</label>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            value={formData.first_name}
                            onChange={handleChange}

                            className={`${isEditing ?
                                'mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300'
                                : 'mt-1 p-2 border rounded w-full text-slate-300 bg-inputcolor'}`}
                        />
                    </div>
                    {validationError.fnameError && (
                        <p className='text-red-600 mt-5'>{validationError.fnameError}</p>
                    )}

                    <div>
                        <label htmlFor="middle_name" className="block text-slate-100 text-sm font-medium">Middle Name</label>
                        <input
                            id="middle_name"
                            name="middle_name"
                            type="text"
                            value={formData.middle_name}
                            onChange={handleChange}

                            className={`${isEditing ?
                                'mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300'
                                : 'mt-1 p-2 border rounded w-full text-slate-300 bg-inputcolor'}`}
                        />
                    </div>

                    {validationError.mnameError && (
                        <p className='mt-5 text-red-600'>{validationError.mnameError}</p>
                    )}

                    <div>
                        <label htmlFor="last_name" className="block text-slate-100 text-sm font-medium">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            value={formData.last_name}
                            onChange={handleChange}

                            className={`${isEditing ?
                                'mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300'
                                : 'mt-1 p-2 border rounded w-full text-slate-300 bg-inputcolor'}`}
                        />
                    </div>

                    {validationError.lnameError && (
                        <p className='mt-5 text-red-600'>{validationError.lnameError}</p>
                    )}

                    <div>
                        <label htmlFor="birthday" className="block text-slate-100 text-sm font-medium">Birthday</label>
                        <input
                            id="birthday"
                            name="birthday"
                            type="date"
                            value={formData.birthday}
                            onChange={handleChange}

                            className={`${isEditing ?
                                'mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300'
                                : 'mt-1 p-2 border rounded w-full text-slate-300 bg-inputcolor'}`}
                        />
                    </div>

                    {validationError.bdayError && (
                        <p className='mt-5 text-red-600'>{validationError.bdayError}</p>
                    )}


                    <div>
                        <label htmlFor="age" className="block text-slate-100 text-sm font-medium">Age</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}

                            className={`${isEditing ?
                                'mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300'
                                : 'mt-1 p-2 border rounded w-full text-slate-300 bg-inputcolor'}`}
                        />
                    </div>
                    {validationError.ageError && (
                        <p className='mt-5 text-red-600'>{validationError.ageError}</p>
                    )}

                    <div>
                        <label htmlFor="contact_number" className="block text-slate-100 text-sm font-medium">Contact Number</label>
                        <input
                            id="contact_number"
                            name="contact_number"
                            type="text"
                            value={formData.contact_number}
                            onChange={handleChange}

                            className={`${isEditing ?
                                'mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300'
                                : 'mt-1 p-2 border rounded w-full text-slate-300 bg-inputcolor'}`}
                        />
                    </div>
                    {validationError.cnumberError && (
                        <p className='mt-5 text-red-600'>{validationError.cnumberError}</p>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-slate-100 text-sm font-medium">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}

                            className={`${isEditing ?
                                'mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300'
                                : 'mt-1 p-2 border rounded w-full text-slate-300 bg-inputcolor'}`}
                        />
                    </div>

                    {validationError.emailError && (
                        <p className='mt-5 text-red-600'>{validationError.emailError}</p>
                    )}

                    {emailError && (
                          <p className='mt-5 text-red-600'>{emailError}</p>
                    )}

                    <button onClick={createUser}
                       
                        className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded w-full transform transition duration-300 ease-in-out hover:scale-105 hover:bg-cyan-500 focus:ring-2 focus:ring-cyan-500"
                    >
                        Create
                    </button>



                </form>
            </div>
            {toggleCreate && (

                <div className={`absolute right-5 top-28 ${toggleCreate ? 'notification-enter' : 'notification-exit'}`}>
                    <CreateNotif setToggleCreate={setToggleCreate} />
                </div>

            )}
        </section>


    );
};

export default Create;
