import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";

export const editPerfumes = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id
        const price = req.body.price

        await connection(TABLE_PERFUMES)
            .update({ price: price })
            .where({ id : id })
            res.status(201).send({message: "Preço atualizado."})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}