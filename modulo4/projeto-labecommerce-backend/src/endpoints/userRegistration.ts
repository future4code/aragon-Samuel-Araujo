import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_USERS } from "../database/tableNames";
import { User } from "../models/User";

export const userRegistration = async (req: Request, res: Response) => {
    const errorCode = 400
    try {
        const {email, password} = req.body
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