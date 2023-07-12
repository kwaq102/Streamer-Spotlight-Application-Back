import { streamers } from "../utils/db";
import { ObjectId } from "mongodb";
import { ValidationError } from "../utils/errors";

export class StreamerRecord {
    _id: ObjectId;
    name: string;
    platform: string;
    description: string;
    upvotes: number;
    downvotes: number;

    constructor(streamerObj: StreamerRecord) {
        this._id = streamerObj._id;
        this.name = streamerObj.name;
        this.platform = streamerObj.platform;
        this.description = streamerObj.description;
        this.upvotes = streamerObj.upvotes;
        this.downvotes = streamerObj.downvotes;

        this._validate();
    }

    async _validate() {
        if (!this.name || this.name.length < 3 || this.name.length > 50) {
            throw new ValidationError('The streamer name is wrong. Name should be consist between 3 and 50 characters');
        }

        if (!this.description || this.description.length < 5 || this.description.length > 5000) {
            throw new ValidationError('Description is incorrect. Description length should be between 5 and 50 characters.')
        }

        if (!this.platform) {
            throw new ValidationError('The platform was not selected.')
        }
    }

    async insert(): Promise<void> {
        const streamer = await streamers.findOne({ name: this.name });
        if (streamer) {
            throw new ValidationError('The same name is exist.');
        }
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