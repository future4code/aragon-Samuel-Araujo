import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS, TABLE_PURCHASES } from "../database/tableNames";
import { Purchases } from "../models/Purchases";

export const registerPurchases = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const {user_id, product_id, quantity} = req.body
        const price = await connection(TABLE_PRODUCTS)
            .select("price")
            .where("id", "=", `${product_id}`)
            // console.log(price[0].price)
        const total_price : number = Number(quantity)*Number(price[0].price)
        const newPurchases : Purchases = {
            id : `${Date.now()}`,
            user_id,
            product_id,
            quantity,
            total_price
        }
        await connection(TABLE_PURCHASES)
            .insert(newPurchases)
        res.status(201).send({message: "Compra realizado com sucesso!", newPurchases})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}