import * as Yup from "yup";

export const updateNameSchema = Yup.object().shape({
    name: Yup.string().required("Enter new name!")
});

export const changeUserDataSchema = Yup.object().shape({
    name: Yup.string().required("Enter new name!"),
    surname: Yup.string().required("Enter new surname!")
})

export const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Enter old password!"),
    password: Yup.string().required("Enter new password!"),
    confirmationPassword: Yup.string().required("Repeat new password!"),
})

export const updatePictureSchema = Yup.object().shape({
    file: Yup.string().required("Pick your file!")
})

export const createGradeSchema = Yup.object().shape({
    rating: Yup.number().required("Select grade!")
})

export const updateGradeSchema = Yup.object().shape({
    rating: Yup.string().required("Select grade!")
})

export const sendEmailSchema = Yup.object().shape({
    email: Yup.string().required("Enter your email!")
})


export const forgotPasswordSchema = Yup.object().shape({
    code: Yup.string().required("Enter code!"),
    password: Yup.string().required("Enter your new password!"),
    confirm_password: Yup.string().required("Repeat password!"),

})
