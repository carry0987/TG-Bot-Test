import { Injectable } from '@nestjs/common';
import { Server } from 'http';
import { UtilsService } from '@/service/utils.service';

@Injectable()
export class ShutdownService {
    constructor(private readonly utilsService: UtilsService) {}

    public gracefulShutdown(server: Server, signal: string) {
        console.info(`\n${signal} signal received.`);
        this.utilsService.handleResponse(null, 200, 'Closing http server.');
        server.close(() => {
            this.utilsService.handleResponse(null, 200, 'Http server closed.');
            process.exit(0);
        });
    }
}
