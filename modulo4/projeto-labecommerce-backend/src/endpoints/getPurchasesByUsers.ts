import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS, TABLE_PURCHASES, TABLE_USERS } from "../database/tableNames";

export const getPurchasesByUsers = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const user_id = req.params.user_id
        const result = await connection(TABLE_PURCHASES)
            .select('email', 'name', 'quantity', 'total_price')
            .innerJoin(TABLE_USERS, `${TABLE_USERS}.id`, `${TABLE_PURCHASES}.user_id`)
            .innerJoin(TABLE_PRODUCTS, `${TABLE_PRODUCTS}.id`, `${TABLE_PURCHASES}.product_id`)
            .where(`${TABLE_USERS}.id`, "=", `${user_id}`)
        res.status(200).send({message: "Usuários econtrados!", result})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}