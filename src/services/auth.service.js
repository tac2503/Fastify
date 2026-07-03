import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function register(userData){
    const {name, email, password}= userData;

    const existingUser = await User.findOne({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("El correo ya se encuentra registrado.");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email, 
        password:hashedPassword
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
}

export async function login(credentials){
    const {email, password} = credentials;

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("Correo o contraseña incorrectos.");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword){
        throw new Error("Correo o contraseña incorrectos.");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
}

