import * as SQLite from 'expo-sqlite';
import { AddNewWordType } from '../types/AddNewWordType';
import { Word } from '../types/models/Word';

const config = {
    name: 'ETags',
    version: 'alpha',
    description: 'Test app'
}

const db = SQLite.openDatabase(config.name, config.version, config.description);

const initDatabase = () => {
    const queryCreateTableWord = `
    CREATE TABLE IF NOT EXISTS Word (
        id                  INTEGER                 PRIMARY KEY AUTOINCREMENT,
        english             TEXT                    NOT NULL,
        vietNam             TEXT                    NOT NULL,
        type                TEXT                    NOT NULL,
        pronuncation        TEXT                    NOT NULL,
        imageUrl            TEXT                    NOT NULL
    )`;

    const queryCreateTableUserGuid = `
    CREATE TABLE IF NOT EXISTS UserGuid (
        id                  INTEGER                 PRIMARY KEY AUTOINCREMENT,
        wordId              INTEGER                 NOT NULL,
        englishText         TEXT                    NOT NULL,
        vietNameText        TEXT                    NOT NULL
    )`;

    const queryCreateTableSetting = `
    CREATE TABLE IF NOT EXISTS Setting (
        id                  INTEGER                 PRIMARY KEY AUTOINCREMENT,
        key                 TEXT                    NOT NULL,
        value               TEXT                    NOT NULL
    )`;

    db.transaction(
        tx => {
            // tx.executeSql('DROP TABLE IF EXISTS Word;')
            // tx.executeSql('DROP TABLE IF EXISTS UserGuid;')
            // tx.executeSql('DROP TABLE IF EXISTS Setting;')
            tx.executeSql(queryCreateTableWord)
            tx.executeSql(queryCreateTableUserGuid)
            tx.executeSql(queryCreateTableSetting)
        },
        error => console.log(`Lỗi khi khởi tạo database: ${error}`),
        () => console.log('Khởi tạo database thành công.')
    )
}

const addNewWord: (input: AddNewWordType) => Promise<number> = ({ word, userGuids }: AddNewWordType) => {
    console.log('addNewWord: ', word)
    const queryInsetWord: string = `
        INSERT INTO Word 
        (english, vietNam, type, pronuncation, imageUrl) VALUES 
        (  ?    ,    ?   ,   ? ,      ?      ,     ?   )
    `
    const queryInsertUserGuid: string = `
        INSERT INTO UserGuid 
        (wordId, englishText, vietNameText) VALUES 
        (   ?  ,      ?     ,       ?     )
    `
    const rusult = new Promise<number>((resolve, reject) => {
        db.transaction((tx) => {
            let wordId: number | undefined = undefined;
            tx.executeSql(
                queryInsetWord,
                [word?.english, word?.vietNam, word?.type, word?.pronuncation, word?.imageUrl],
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

const getWordsByKeyword = (keyword?: string | null): Promise<Items<Word>> => {
    const query: string = `
        SELECT *
        FROM Word
        WHERE English LIKE ? OR ? = ''
    `
    return new Promise<Items<Word>>(
        (resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(query, [`%${keyword}%`, keyword ? keyword : ''], (ntx, resultSet: SQLite.SQLResultSet) => {
                        const data: Items<Word> = {
                            length: resultSet.rows.length,
                            items: []

                        };
                        for (let index = 0; index < resultSet.rows.length; index++) {
                            data.items.push(resultSet.rows.item(index));
                        }
                        resolve(data);
                    })
                },
                error => () => {
                    console.log(`getWordsByKeyword has error: ${error}`);
                    reject(error);
                }
            )
        },
    );
}

const getRandomWord = () => {
    const query = `
        SELECT * FROM Word ORDER BY RANDOM() LIMIT 1;
    `
    return new Promise<AddNewWordType | undefined | null>((reslove, reject) => {
        db.transaction(
            tx => {
                tx.executeSql(query, undefined, (ntx, resultSet)=>{
                    const result: AddNewWordType = {
                    };
                    if(resultSet.rows.length == 0)
                        reslove(null);
                    result.word = resultSet.rows.item(0);
                    reslove(result);
                })
            },
            error => () => {
                console.log(`getRandomWork has error: ${error}`);
                reject(error);
            }
        )
    });
}

export {
    initDatabase,
    addNewWord,
    getWordsByKeyword,
    getRandomWord
}