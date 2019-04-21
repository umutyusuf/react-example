export const validateEmail = (email, forceEmail) => {
    const emailRegex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/);
    return (!forceEmail && !email.trim()) || emailRegex.test(email);
}