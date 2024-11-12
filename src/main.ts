import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { ShutdownService } from '@/service/shutdown.service';
import { NetService } from '@/service/net.service';

async function logServiceInfo(app: INestApplication, port: number) {
    const configService = app.get(ConfigService);

    const { version } = await import('../package.json');
    const ENV_TEST = configService.get<boolean>('ENV_TEST', false);

    console.log(`\x1b[36m`);
    console.log(`============================================`);
    console.log(`NestJS-Example is running on port ${port}`);
    console.log(`============================================`);
    console.log(`Program Version: ${version}`);
    console.log(`Node Version: ${process.version}`);
    console.log(`============================================`);
    console.log(`ENV TEST: ${ENV_TEST}`);
    console.log(`============================================`);
    console.log(`\x1b[0m`);
}

async function bootstrap() {
    // Initialize the NestJS application
    const app = await NestFactory.create(AppModule);

    // Get the services from the app
    const configService = app.get(ConfigService);
    const shutdownService = app.get(ShutdownService);
    const netService = app.get(NetService);

    // Get the port from the configuration
    const port = configService.get<number>('PORT', 3000);

    // Check if the port is already in use
    const portInUse = await netService.isPortInUse(port);
    if (portInUse) {
        console.error(`Port ${port} is already in use.`);
        process.exit(1);
    }

    // Start the application
    const server = await app.listen(port);

    // Log the service information
    await logServiceInfo(app, port);

    // Handle shutdown signals
    process.on('SIGTERM', () =>
        shutdownService.gracefulShutdown(server, 'SIGTERM')
    );
    process.on('SIGINT', () =>
        shutdownService.gracefulShutdown(server, 'SIGINT')
    );
}

bootstrap();
