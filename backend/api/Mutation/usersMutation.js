import { users } from "../mockData/db";

export const createUser = (parent, { id, name, email, age }, context, info) => {
    const user = users.find(user => +user.id === +id);
    if (user !== undefined) throw new Error("User exists");
    const newUser = { id, name, email, age };
    users.push(newUser);
    return newUser;
};
export const updateUser = (parent, { id, name, email, age }, context, info) => {
    let newUser = users.find(user => +user.id === +id);
    if (newUser === undefined) throw new Error("User not found.");
    newUser.name = name;
    newUser.email = email;
    newUser.age = age;
    return newUser;
};
export const deleteUser = (parent, { id }, context, info) => {
    const userIndex = users.findIndex(user => +user.id === +id);
    if (userIndex === -1) throw new Error("User not found.");
    const deletedUsers = users.splice(userIndex, 1);
    return deletedUsers[0];
};