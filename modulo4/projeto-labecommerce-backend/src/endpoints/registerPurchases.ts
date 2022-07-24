import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS, TABLE_PURCHASES } from "../database/tableNames";
import { Purchases } from "../models/Purchases";

export const registerPurchases = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { user_id, product_id, quantity } = req.body
        // Input validations -- user_id
        if (!user_id) {
            errorCode = 404
            throw new Error("A propriedade 'user_id' está vazia!")
        }
        if (typeof user_id !== "string") {
            errorCode = 406
            throw new Error("A propriedade 'user_id' deve ser do tipo string.")
        }
        // Input validations -- product_id
        if (!product_id) {
            errorCode = 404
            throw new Error("A propriedade 'product_id' está vazia!")
        }
        if (typeof product_id !== "string") {
            errorCode = 406
            throw new Error("A propriedade 'product_id' deve ser do tipo string.")
        }
        // Input validations -- quantity
        if (!quantity) {
            errorCode = 404
            throw new Error("A propriedade 'product_id' está vazia!")
        }
        if (typeof quantity !== "number") {
            errorCode = 406
            throw new Error("A propriedade 'quantity' deve ser do tipo number.")
        }
        const price = await connection(TABLE_PRODUCTS)
            .select("price")
            .where("id", "=", `${product_id}`)
        // console.log(price[0].price)
        const total_price: number = Number(quantity) * Number(price[0].price)
        const newPurchases: Purchases = {
            id: `${Date.now()}`,
            user_id,
            product_id,
            quantity,
            total_price
        }
        await connection(TABLE_PURCHASES)
            .insert(newPurchases)
        res.status(201).send({ message: "Compra realizada com sucesso!", newPurchases })
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}