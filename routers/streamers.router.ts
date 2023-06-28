import { Router } from "express";
import { StreamerRecord } from "../records/streamer.record";


export const streamersRouter = Router()
    .get('/', async (req, res) => {
        res.json(await StreamerRecord.findAll())
    })

    .post('/', async (req, res) => {
        const newStreamer = new StreamerRecord(req.body);

        await newStreamer.insert();

        res.send('Dodawanie nowego stremera');
    })

    .get('/:streamerId', async (req, res) => {
        if (req.params.streamerId.length !== 24) {
            res.send('Streamer does not exist.')
        }

        try {
            const singleStreamer = await StreamerRecord.find(req.params.streamerId);

            if (!singleStreamer) {
                res.send('Streamer does not exist.')
            }

            res.json(singleStreamer)
        } catch (e) {
            console.log(e.message)
        }
    })

    .put('/:streamerId/vote', async (req, res) => {

        const streamer = await StreamerRecord.find(req.params.streamerId);

        streamer.upvotes = streamer.upvotes + 1;
        streamer.downvotes = streamer.downvotes - 200;

        await StreamerRecord.update(streamer);

        res.json(streamer)
    })