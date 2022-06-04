import bcrypt from "react-native-bcrypt";

const encryptPassword = password => {
    return bcrypt.hashSync(password)
}

const loginUser = data => {
    console.log(encryptPassword(data.password))
    return {name: data.username, roles: ["USER"]}
}

const registerUser = data => {
    let counter = 0
    console.log(encryptPassword(data.password))
    return {name: data.username + counter++, roles: ["USER"]}
}

export {loginUser, registerUser}