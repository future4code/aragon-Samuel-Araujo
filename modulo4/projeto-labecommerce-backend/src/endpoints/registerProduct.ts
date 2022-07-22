import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";
import { Product } from "../models/Product";

export const registerProduct = async (req: Request, res: Response) => {
    const errorCode = 400
    try {
        const {name, price} = req.body
        const newProduct : Product = { id: `${Date.now()}`, name, price }
        await connection(TABLE_PRODUCTS)
            .insert(newProduct)
        res.status(201).send({message: "Produto criado com sucesso", newProduct})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}