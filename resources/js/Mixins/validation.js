export default {
    data() {
        return {
            SPECIAL_CHARACTER : 'special_characters',
            NUMBER : 'number',
            UPPER_CASE : 'upper_case',
            LOWER_CASE : 'lower_case',
            rules: {
                email: () => value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid email address";
                },
                required: (field) => value => {
                    return   (value != null && value.length > 0) ||
                        (field ? `The ${field.toString().toLocaleLowerCase()} field is required.` : 'This field is required')
                },
                maxLength: (max, field = "field") => val =>
                    val.length <= max ||
                    `The ${field} must be not longer ${max} characters.`,
                checkRegex: (regex, field = "field") => val =>
                    new RegExp(regex).test(val) ||
                    (field ? `The ${field.toString().toLocaleLowerCase()} field has invalid format.` : 'This field has invalid format.'),
                match: (field1, field2, fieldName = "Fields") =>
                    field1 === field2 || `${fieldName} do not match`,
                password: () => value => {
                    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d])(?!.*\s).{8,15}$/;
                    return pattern.test(value) || "The password field must be a minimum of 8 and a maximum of 15 characters and contain at least one uppercase character, one number, and one special character"
                },
            }
        }
    }
}
