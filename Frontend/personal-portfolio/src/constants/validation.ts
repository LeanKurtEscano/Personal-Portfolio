export const validateFirstName = (firstName: string): string => {
    const regex = /^[A-Za-z\s]+$/;
    const repeatedCharRegex = /(.)\1{2,}/;
    const maxLength = 20;  

    if (!firstName) return "First name is required.";
    if (!regex.test(firstName.trim())) return "First name must not contain special characters or numbers.";
    if (firstName.trim().length < 2) return "First name must be at least 2 characters long.";
    if (firstName.trim().length > maxLength) return `First name must be at most ${maxLength} characters long.`;
    if (repeatedCharRegex.test(firstName.trim())) return "First name must not contain repeated characters.";
    return "";
};

export const validateMiddleName = (middleName: string): string => {
    const regex = /^[A-Za-z\s]+$/;
    const repeatedCharRegex = /(.)\1{2,}/;
    const maxLength = 20; 

    if (middleName && !regex.test(middleName.trim())) return "Middle name must not contain special characters or numbers.";
    if (middleName && middleName.trim().length < 2) return "Middle name must be at least 2 characters long.";
    if (middleName && middleName.trim().length > maxLength) return `Middle name must be at most ${maxLength} characters long.`;
    if (middleName && repeatedCharRegex.test(middleName.trim())) return "Middle name must not contain repeated characters.";
    return "";
};

export const validateLastName = (lastName: string): string => {
    const regex = /^[A-Za-z\s]+$/;
    const repeatedCharRegex = /(.)\1{2,}/;
    const maxLength = 20;  

    if (!lastName) return "Last name is required.";
    if (!regex.test(lastName.trim())) return "Last name must not contain special characters or numbers.";
    if (lastName.trim().length < 2) return "Last name must be at least 2 characters long.";
    if (lastName.trim().length > maxLength) return `Last name must be at most ${maxLength} characters long.`;
    if (repeatedCharRegex.test(lastName.trim())) return "Last name must not contain repeated characters.";
    return "";
};


export const validateBirthday = (birthday: string, age: number): string => {
    if (!birthday) return "Birthday is required.";


    const birthdayDate = new Date(birthday);

    const currentDate = new Date();

    // Minimum age for validation: 60 years
    const sixtyYearsAgo = new Date("1964-01-01");

    if (birthdayDate > currentDate) return "Birthday cannot be a future date.";

    // Check if the birthday makes the person at least 60 years old
    if (birthdayDate < sixtyYearsAgo) return "The birthdate must not be earlier than January 1, 1964, based on app standards.";

    if (isNaN(birthdayDate.getTime())) return "Invalid date format.";

    const calculatedAge = currentDate.getFullYear() - birthdayDate.getFullYear();


    // Check if the birthday has already passed this year
    const isBirthdayPastThisYear =
        currentDate.getMonth() > birthdayDate.getMonth() ||
        (currentDate.getMonth() === birthdayDate.getMonth() && currentDate.getDate() >= birthdayDate.getDate());

   
    const finalCalculatedAge = isBirthdayPastThisYear ? calculatedAge : calculatedAge - 1;

    
    console.log(`Calculated Age: ${finalCalculatedAge}, Provided Age: ${age}`);

    if (Number(finalCalculatedAge) !== Number(age)) {
        return `The age (${age}) does not match the birthday.`;
    }


    return ""; 




};

export const validateAge = (age: number): string => {
    if (!age) return "Age is required.";
    if (age < 18) return "Age must be at least 18.";
    if (age > 60) return "Age must be less than or equal to 60.";
    return "";
};

export const validateContactNumber = (contactNumber: string): string => {
    
    const regex = /^09\d{9}$/;

    
    if (!contactNumber) return "Contact number is required.";

    const trimmedContactNumber = contactNumber.trim();


    if (!regex.test(trimmedContactNumber)) {
        return "Contact number must be a valid Philippine mobile number.";
    }

    // Check if the contact number contains 4 or more repeating digits in a row (e.g., 09111111111, 09000000000)
    if (/(\d)\1{3,}/.test(trimmedContactNumber)) {
        return "Contact number must not contain 4 or more repeating digits.";
    }

    return "";
};





export const validateEmail = (email: string): string => {

    const validProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com'];

    // Regex for matching a valid email format with a specific set of allowed domains
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|co|io|co\.uk)$/;

    if (!email) return "Email is required.";
    
   
    if (!emailRegex.test(email.trim())) return "Invalid email format. Please use a valid email provider.";

    // Extract the domain
    const domain = email.split('@')[1];
    
    // Ensure the domain is in the list of valid email providers
    if (domain && !validProviders.includes(domain)) {
        return `Invalid email format. ${domain} is not a recognized email provider.`;
    }

    // Ensure the domain name part does not contain numbers (except in valid cases like .co.uk)
    if (domain && /\d/.test(domain.split('.')[0]) && !domain.endsWith('.co.uk')) {
        return "Invalid email format. Domain should not contain numbers.";
    }

    return "";
};