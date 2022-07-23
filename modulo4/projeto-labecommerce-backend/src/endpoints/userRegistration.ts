import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_USERS } from "../database/tableNames";
import { User } from "../models/User";

export const userRegistration = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const {email, password} = req.body
        // Input validations -- email
        if(!email) {
            errorCode = 404
            throw new Error("A propriedade 'email' está vazia!")
        }
        if(typeof email !== "string") {
            errorCode = 406
            throw new Error("A propriedade 'email' deve ser do tipo string.")
        }
        if(!email.includes('@')) {
            errorCode = 406
            throw new Error("'email' deve conter '@'.");
        }
        if(!email.includes('.')) {
            errorCode = 406
            throw new Error("'email' deve conter '.'(ponto).");
        }
        // Input validations -- password
        if(!password) {
            errorCode = 404
            throw new Error("A propriedade 'password' está vazia!")
        }
        if(typeof password !== "string") {
            errorCode = 406
            throw new Error("A propriedade 'password' deve ser do tipo string.")
        }
        const newUser : User = { id: `${Date.now()}`, email, password }
        await connection(TABLE_USERS)
            .insert(newUser)
        res.status(201).send({message: "Usuário criado com sucesso", newUser})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}