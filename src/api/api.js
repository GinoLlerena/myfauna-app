import * as faunadb from "faunadb";
import {serverClient} from "../utils/utils";

export const getElements = async (accessToken, cb) => {

    const q = faunadb.query;
    const {Documents, Collection} = q;

    serverClient
        .query(
            q.Map(
                q.Paginate(Documents(Collection('MDXElements'))),
                q.Lambda((x) => q.Get(x))
            )
        )
        .then((result) => {
            cb(null, result);
        })
        .catch((err) => {
            cb(err, null);
        });
}

export const addElement = (accessToken, obj, cb) => {

    const q = faunadb.query;

    serverClient
        .query(
            q.Create(
                q.Collection('MDXElements'),
                { data: obj },
            )
        )
        .then((result) => {
            cb(null, result);
        })
        .catch((err) => {
            cb(err, null);
        });
}

export const updateElement = (obj, cb) => {
    const q = faunadb.query;

    serverClient
        .query(
            q.Update(
                q.Ref(q.Collection('MDXElements'), obj.id),
                { data: obj },
            )
        )
        .then((result) => {
            cb(null, result);
        })
        .catch((err) => {
            cb(err, null);
        });
}

export const deleteElement = (obj, cb) => {

    const q = faunadb.query;

    serverClient
        .query(
            q.Delete(q.Ref(q.Collection('MDXElements'), obj.id))
        )
        .then((result) => {
            cb(null, result);
        })
        .catch((err) => {
            cb(err, null);
        });
}