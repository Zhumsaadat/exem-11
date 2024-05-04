import mongoose from "mongoose";
import config from "./config";
import {randomUUID} from "crypto";
import User from "./models/User";
import Products from "./models/Products";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (err) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['products', 'users'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2] = await User.create(
        {
            username: 'Anna',
            password: '1234',
            token: randomUUID(),
        },
        {
            username: 'John',
            password: '12345',
            token: randomUUID(),
        },
    );

    await Products.create(
        {
            user: user1,
            title: 'Fridge',
            description: 'Description fridge',
            price: 17000,
            image: 'images/12344.jpeg',
            category: 'appliances',
        },
        {
            user: user1,
            title: 'microwave',
            description: 'Description microwave',
            price: 3500,
            image: 'images/mik.jpeg',
            category: 'appliances',
        },
        {
            user: user2,
            title: 'Bmv',
            description: 'Description bmw x5',
            price: 300000,
            image: 'images/bmw.jpeg',
            category: 'cars',
        },
        {
            user: user2,
            title: 'dress',
            description: 'Description black dress',
            price: 5000,
            image: 'images/dress.jpg',
            category: 'other',
        },
        {
            user: user2,
            title: 'Blankets',
            description: 'Description warm Blankets',
            price: 2000,
            image: 'images/textil.jpeg',
            category: 'textile',
        },

    );

    await db.close();
};

void run();