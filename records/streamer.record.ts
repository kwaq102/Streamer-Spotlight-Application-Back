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
        await streamers.insertOne({
            _id: this._id,
            name: String(this.name),
            platform: String(this.platform),
            description: (this.description),
            upvotes: Number(this.upvotes),
            downvotes: Number(this.downvotes)
        })
    }

    static async find(id: string): Promise<StreamerRecord | null> {

        const singleStreamer = (await streamers.findOne({ _id: (new ObjectId(String(id))) }) as StreamerRecord);

        return singleStreamer === null ? null : new StreamerRecord(singleStreamer);
    }

    static async findAll(): Promise<StreamerRecord[]> {
        return (await ((await streamers.find()).toArray())).map((obj: StreamerRecord) => new StreamerRecord(obj));
    }

    async update(): Promise<void> {
        await streamers.replaceOne({
            _id: this._id,
        }, {
            _id: this._id,
            name: String(this.name),
            platform: String(this.platform),
            description: (this.description),
            upvotes: Number(this.upvotes),
            downvotes: Number(this.downvotes)
        })
    }
}

// TODO zastanowić się czy to rzutowanie ma sens w przypadku TS