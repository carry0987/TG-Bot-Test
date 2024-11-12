import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { promises as fsPromises } from 'fs';

@Injectable()
export class UtilsService {
    constructor() {}

    public async readFileAsync(filePath: string): Promise<Buffer> {
        return await fsPromises.readFile(filePath);
    }

    public async checkFileExists(filePath: string): Promise<boolean> {
        try {
            await fsPromises.access(filePath, fsPromises.constants.R_OK);
            return true;
        } catch (error) {
            console.error(`The file ${filePath} does not exist.`, error);
            return false;
        }
    }

    public handleResponse(
        res: Response | null,
        statusCode: number,
        logMessage: string,
        clientMessage?: string,
        error?: Error
    ) {
        if (error) {
            console.error(logMessage, error);
        } else {
            console.log(logMessage);
        }

        if (res) {
            if (statusCode >= 400 && error) {
                res.status(statusCode).send(clientMessage || error.message);
            } else {
                res.status(statusCode).send(clientMessage || logMessage);
            }
        }
    }
}
