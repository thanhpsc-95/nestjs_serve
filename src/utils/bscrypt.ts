import * as bcrypt from 'bcrypt';

export const generatePassword = async (password: string) => {
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword;
    }
    return null;
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    const convertedPassword = await generatePassword(password);
    const compareResult = await bcrypt.compare(convertedPassword, hashedPassword);
    return compareResult;
}