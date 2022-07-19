import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";
import { Perfume } from "../models/Perfume";

export const createPerfume = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { name, brand, price, ml } = req.body
        const newPerfume : Perfume = {
            id : String(Date.now()),
            name,
            brand,
            price,
            ml
        }
        await connection(TABLE_PERFUMES)
            .insert(newPerfume)
        res.status(201).send({ message: "Perfume adicionado com sucesso.", newPerfume})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
} 