import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { DemoController } from '@/controller/demo.controller';
import { AppService } from '@/app.service';
import { ShutdownService } from '@/service/shutdown.service';
import { NetService } from '@/service/net.service';
import { UtilsService } from '@/service/utils.service';
import { DemoService } from './service/demo.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.local'],
        }),
    ],
    controllers: [AppController, DemoController],
    providers: [
        AppService,
        ShutdownService,
        NetService,
        UtilsService,
        DemoService,
    ],
})
export class AppModule {}
