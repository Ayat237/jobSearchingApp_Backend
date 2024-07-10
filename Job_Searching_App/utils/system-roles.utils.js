export const  systemRoles = {
    USER : 'user',
    HR : "companyHR"
};

const {USER, HR} = systemRoles;
export const  roles = {
    USER_ROLE : USER,
    HR_ROLE : HR,
    USER_HR_ROLE : [USER, HR]
};