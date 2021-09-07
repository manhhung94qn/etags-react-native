import * as SQLite from 'expo-sqlite';
import { AddNewWordType } from '../types/AddNewWordType';

const config = {
    name: 'ETags',
    version: 'alpha',
    description: 'Test app'
}

const db = SQLite.openDatabase(config.name, config.version, config.description);

const initDatabase = () => {
    const queryCreateTableWord = `
    CREATE TABLE IF NOT EXISTS Word (
        Id                  INTEGER                 PRIMARY KEY AUTOINCREMENT,
        English             TEXT                    NOT NULL,
        VietNam             TEXT                    NOT NULL,
        Type                TEXT                    NOT NULL,
        Pronuncation        TEXT                    NOT NULL,
        ImageUrl            TEXT                    NOT NULL
    )`;

    const queryCreateTableUserGuid = `
    CREATE TABLE IF NOT EXISTS UserGuid (
        Id                  INTEGER                 PRIMARY KEY AUTOINCREMENT,
        WordId              INTEGER                 NOT NULL,
        EnglishText         TEXT                    NOT NULL,
        VietNameText        TEXT                    NOT NULL
    )`;

    const queryCreateTableSetting = `
    CREATE TABLE IF NOT EXISTS Setting (
        Id                  INTEGER                 PRIMARY KEY AUTOINCREMENT,
        Key                 TEXT                    NOT NULL,
        Value               TEXT                    NOT NULL
    )`;

    db.transaction(
        tx => {
            tx.executeSql(queryCreateTableWord)
            tx.executeSql(queryCreateTableUserGuid)
            tx.executeSql(queryCreateTableSetting)
        },
        error => console.log(`Lỗi khi khởi tạo database: ${error}`),
        () => console.log('Khởi tạo database thành công.')
    )
}

const addNewWord: (input: AddNewWordType) => Promise<number> = ({ word, userGuids }: AddNewWordType) => {
    const queryInsetWord: string = `
        INSERT INTO Word 
        (English, VietNam, Type, Pronuncation, ImageUrl) VALUES 
        (  ?    ,    ?   ,   ? ,      ?      ,     ?   )
    `
    const queryInsertUserGuid: string = `
        INSERT INTO UserGuid 
        (WordId, EnglishText, VietNameText) VALUES 
        (   ?  ,      ?     ,       ?     )
    `
    const rusult = new Promise<number>((resolve, reject) => {
        db.transaction((tx) => {
            let wordId: number | undefined = undefined;
            tx.executeSql(
                queryInsetWord,
                [word.english, word.vietNam, word.type, word.pronuncation, word.imageUrl],
                (data, resultSet) => {
                    wordId = resultSet.insertId;
                    if (userGuids && userGuids.length > 0) {
                        for (const userGuid of userGuids) {
                            tx.executeSql(queryInsertUserGuid, [wordId, userGuid.englishText, userGuid.vietNameText])
                        }
                    }
                    resolve(wordId);
                }
            )
        })
    });
    return rusult;
}

const getWordsByKeyword = (keyword?: string | null) => {
    const query: string = `
        SELECT *
        FROM Word
        WHERE English LIKE ? OR ? = ''
    `
    const result = new Promise(
        (resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(query, [`%${keyword}%`, keyword ? keyword : ''], (ntx, resultSet) => {
                        console.log('rows', resultSet.rows);
                        resolve(1);
                    })
                },
                error=> console.log(`getWordsByKeyword has error: ${error}`),
                ()=>console.log('Lấy danh sách thành công')
            )
        },
    );
    return result;
}

export {
    initDatabase,
    addNewWord,
    getWordsByKeyword
}