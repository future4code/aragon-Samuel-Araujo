import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";

export const getProducts = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const result = await connection(TABLE_PRODUCTS)
            .select()
        res.status(200).send({message: "Produtos econtrados!", result})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}