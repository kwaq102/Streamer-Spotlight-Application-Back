import { Router } from "express";

export const streamersRouter = Router()
    .get('/', async (req, res) => {
        res.send('Wszyscy streamerzy');
    })
    .post('/', async (req, res) => {
        res.send('Dodawanie nowego stremera');
    })
    .get('/:streamerId', async (req, res) => {
        res.send(`info o konkretnym streamerze ${req.params.streamerId}`)
    })
    .put('/:streamerId/vote', async (req, res) => {
        res.send('Liczna głosów +/-')
    })