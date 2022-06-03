const logIn = data => {
    return {name: data.username, roles: ["ADMIN"]}
}

export {logIn}