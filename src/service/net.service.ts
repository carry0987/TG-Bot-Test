import { Injectable } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class NetService {
    constructor() {}

    public async isPortInUse(port: number): Promise<boolean> {
        return new Promise((resolve) => {
            const tester = net
                .createServer()
                .once('error', (err: any) => {
                    if (err.code === 'EADDRINUSE') {
                        resolve(true); // Port is in use
                    } else {
                        resolve(false);
                    }
                })
                .once('listening', () => {
                    tester
                        .once('close', () => resolve(false)) // Port is free
                        .close();
                })
                .listen(port);
        });
    }
}
