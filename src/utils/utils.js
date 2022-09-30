import faunadb from 'faunadb';
import {SERVER_KEY} from "../constants/constants";

export const serverClient = new faunadb.Client({
    domain: 'db.fauna.com',
    secret: process.env.FAUNA_SERVER_KEY || SERVER_KEY,
    scheme: 'https'
});

export const getFaunaItem = (item) => {
    const id = item.ref.value.id
    return ({ ...item.data, id })
}