import { Router } from "express";
import { StreamerRecord } from "../records/streamer.record";

export const streamersRouter = Router()
    .get('/', async (req, res) => {
        const allStreamers = await StreamerRecord.findAll();
        res.json(allStreamers);
    })

    .post('/', async (req, res) => {
        const newStreamer = new StreamerRecord(req.body);
        await newStreamer.insert();
        res.end();
    })

    .get('/:streamerId', async (req, res) => {
        if (req.params.streamerId.length !== 24) {
            res.send('Streamer does not exist.')
        }

        try {
            const singleStreamer = await StreamerRecord.find(req.params.streamerId);

            if (!singleStreamer) {
                res.send('Streamer does not exist.')
                return;
            }

            res.json(singleStreamer)
        } catch (e) {
            console.log(e.message)
        }
    })

    .put('/:streamerId/vote', async (req, res) => {
        const streamer = await StreamerRecord.find(req.params.streamerId);

        streamer.upvotes = req.body.upvotes;
        streamer.downvotes = req.body.downvotes;

        await streamer.update();

        res.json(streamer)
    })