export const createUserValidationShema = {
    username:{
        isLength: {
            options:{
                min: 5,
                max: 32
            },
            errorMessage:
                "Username must be at least 5 characters with a max of 32 characters"
        },
        notEmpty: {
            errorMessage: "username cannot be empty"
        },
        isString: {
            errorMessage: "username must be a string"
        },
    },
    displayName :{
        notEmpty: true,
    },
    password:{
        notEmpty:true,
    },
};