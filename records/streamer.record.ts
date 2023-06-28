import { streamers } from "../utils/db";
import { ObjectId } from "mongodb";

export class StreamerRecord {
    _id: ObjectId;
    name: string;
    platform: string;
    description: string;
    upvotes: number;
    downvotes: number;

    constructor(streamerObj: StreamerRecord) {
        // TODO zzrobić walidację

        this._id = streamerObj._id;
        this.name = streamerObj.name;
        this.platform = streamerObj.platform;
        this.description = streamerObj.description;
        this.upvotes = streamerObj.upvotes;
        this.downvotes = streamerObj.downvotes;
    }

    async insert(): Promise<void> {
        await streamers.insertOne(StreamerRecord)
    }

    static async find(id: string): Promise<StreamerRecord | null> {

        const singleStreamer = (await streamers.findOne({ _id: (new ObjectId(String(id))) }) as StreamerRecord);

        return singleStreamer === null ? null : new StreamerRecord(singleStreamer);
    }

    static async findAll() {
        return (await streamers.find()).toArray();
    }

    static async update(streamer: StreamerRecord): Promise<void> {
        //TODO może jakaś walidacja?

        await streamers.replaceOne({
            _id: streamer._id,
        }, streamer)
    }

}