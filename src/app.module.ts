import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ShutdownService } from '@/service/shutdown.service';
import { NetService } from '@/service/net.service';
import { UtilsService } from '@/service/utils.service';
import { BotService } from '@/service/bot.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.local']
        }),
        TelegrafModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                token: configService.getOrThrow<string>('TG_BOT_TOKEN')
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        ShutdownService,
        NetService,
        UtilsService,
        BotService
    ]
})
export class AppModule {}
