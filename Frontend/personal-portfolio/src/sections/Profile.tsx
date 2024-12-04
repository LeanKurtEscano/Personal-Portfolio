import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMyContext } from '../context/MyContext';
import UpdateNotif from '../components/UpdateNotif';
import Update from '../components/Update';

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

const Profile: React.FC = () => {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
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

  const { toggleUp, setToggleUp } = useMyContext();

  const getProfile = async () => {

    try {
      const response = await axios.post('http://127.0.0.1:5000/user-profile/profile', {

        withCredentials: true
      })

      if (response.status === 200) {
        const formattedBirthday = new Date(response.data.birthday).toISOString().split('T')[0];
        setFormData({
          first_name: response.data.first_name,
          middle_name: response.data.middle_name,
          last_name: response.data.last_name,
          birthday: formattedBirthday,
          age: response.data.age,
          contact_number: response.data.contact_number,
          email: response.data.email
        })
        console.log(response.data);
      }

    } catch (error) {
      alert("Failed to fetch data");

    }


  }

  useEffect(() => {
    if (toggleUpdate) {
      const timer = setTimeout(() => {
        setToggleUpdate(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toggleUpdate]);

  useEffect(() => {
    getProfile();

  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };


  const showUpdate = () => {
    setToggleUp(!toggleUp);
  }
  const refetchProfile = () => {
    getProfile();
    setToggleUp(false);

  }

  return (
    <section className="flex items-center h-auto min-h-screen pb-11 justify-center bg-darkbg">
      <div className="md:w-[500px] w-[200px] bg-darkbg p-4 sm:p-6">
        <h1 className="bg-gradient-to-br text-3xl from-cyan-400 to-blue-600 bg-clip-text text-transparent font-bold mb-4">Profile</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="first_name" className="block text-sm text-slate-100 font-medium">First Name</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
              className={`${isEditing ?
                'mt-1 p-2 border rounded w-full border-inputcolor text-slate-300 placeholder:text-inputtext bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300'
                : 'mt-1 p-2 border rounded w-full text-slate-300 bg-inputcolor'}`}
            />
          </div>

          {validationError.emailError && (
            <p className='mt-5 text-red-600'>{validationError.emailError}</p>
          )}

          <div className="flex justify-between flex-col sm:flex-row">
            <button
              type="button"
              onClick={() => setIsEditing(prev => !prev)}
              className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <div
                onClick={showUpdate}
                className="mt-4 px-4 cursor-pointer py-2 bg-blue-600 text-white rounded"
              >
                Save
              </div>
            )}
          </div>
        </form>
      </div>

      {toggleUp && (
        <Update userProfile={formData} refetchProfile={refetchProfile} setIsEditing={setIsEditing} setValidationError={setValidationError} setToggleUpdate={setToggleUpdate} />
      )}
      {toggleUpdate && (

        <div className={`absolute right-5 top-28 ${toggleUpdate ? 'notification-enter' : 'notification-exit'}`}>
          <UpdateNotif setToggleUpdate={setToggleUpdate} />
        </div>

      )}
    </section>


  );
};

export default Profile;
