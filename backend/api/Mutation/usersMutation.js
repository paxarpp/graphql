import { users } from "../mockData/db";

export const createUser = (parent, { user }, context, info) => {
    user.id = Math.max(...users.map(u => u.id)) + 1;
    users.push(user);
    return user;
};
export const updateUser = (parent, { user }, context, info) => {
    let prevUser = users.find(u => +u.id === +user.id);
    if (prevUser === undefined) throw new Error("User not found.");
    Object.assign(prevUser, user)
    return prevUser;
};
export const deleteUser = (parent, { id }, context, info) => {
    const userIndex = users.findIndex(user => +user.id === +id);
    if (userIndex === -1) throw new Error("User not found.");
    const deletedUsers = users.splice(userIndex, 1);
    return deletedUsers[0];
};