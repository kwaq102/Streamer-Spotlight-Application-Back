import { Router } from "express";

export const homeRouter = Router()
    .get('/', async (req, res) => {
        res.send('Strona glówna')
    })
