import axios from "axios";
import { useMyContext } from "../context/MyContext";
import { validateFirstName,validateMiddleName,validateBirthday,validateLastName,validateAge,validateContactNumber,validateEmail } from '../constants/validation';
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
    bdayError : string
    ageError: string;
    cnumberError: string;
    emailError: string;
  }
 
  interface LogOutProps {
    userProfile: UserProfile; 
    refetchProfile: () => void;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;  
    setValidationError: React.Dispatch<React.SetStateAction<ValidationError>>;
    setToggleUpdate: React.Dispatch<React.SetStateAction<boolean>>;  
  }
  
  const Update: React.FC<LogOutProps> = ({ userProfile,refetchProfile, setIsEditing,setValidationError,setToggleUpdate }) => { 
    const { setToggleUp } = useMyContext();
   
    const handleUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
    
     
      const trimmedUserProfile = {
        first_name: userProfile.first_name.trim(),
        middle_name: userProfile.middle_name.trim(),
        last_name: userProfile.last_name.trim(),
        birthday: userProfile.birthday,
        age: userProfile.age,
        contact_number: userProfile.contact_number.trim(),
        email: userProfile.email.trim(),
      };
      
    
      setValidationError({
        fnameError : "",
        lnameError : "",
        mnameError : "",
        bdayError : "",
        ageError: "",
        cnumberError : "",
        emailError: "",
      });
  


    const fnameError = validateFirstName(userProfile.first_name);
    const lnameError = validateLastName(userProfile.last_name);
    const mnameError = validateMiddleName(userProfile.middle_name || ""); 
    const bdayError = validateBirthday(userProfile.birthday,userProfile.age);

    const ageError = validateAge(userProfile.age);
    const cnumberError = validateContactNumber(userProfile.contact_number);
    const emailError = validateEmail(userProfile.email);
    

    setValidationError({
      fnameError : fnameError,
      lnameError : lnameError,
      mnameError : mnameError,
      bdayError : bdayError,
      ageError: ageError,
      cnumberError : cnumberError,
      emailError: emailError,
    });

    if (fnameError || lnameError || mnameError ||bdayError || ageError || cnumberError || emailError) {
      setToggleUp(false);
      return;
     
    }
    
      const response = await axios.post('http://127.0.0.1:5000/user-profile/update', trimmedUserProfile, {
        headers: {
            'Content-Type': 'application/json',
        }
      });

      if(response.status === 200){
        setToggleUpdate(true);
        setToggleUp(false);
        refetchProfile();
        setIsEditing(false);
        
      }
      
    };
  
    const cancelToggle = () => {
      setToggleUp(false);
    };
  
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-darkbg p-6 rounded-lg border border-cyan-600 max-w-sm w-full">
          <h2 className="text-red-600 mb-4 text-lg md:text-xl">Are you sure?</h2>
          <p className="text-slate-200 mb-4">Do you really want to save the changes?</p>
          <div className="flex justify-end">
            <button
              className="bg-gray-700 text-slate-200 px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
              onClick={cancelToggle}
            >
              Cancel
            </button>
            <button
              className="bg-cyan-600 ml-2 text-slate-200 px-4 py-2 rounded-md transition duration-300"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Update;
  
