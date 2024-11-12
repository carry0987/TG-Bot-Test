import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { TelegrafContext } from '@/common/interface/telegraf.interface';

@Update()
export class BotService {
    @Start()
    async start(@Ctx() ctx: TelegrafContext) {
        await ctx.reply('Welcome');
    }

    @Help()
    async help(@Ctx() ctx: TelegrafContext) {
        await ctx.reply('Send me a sticker');
    }

    @On('sticker')
    @On('animation')
    async on(@Ctx() ctx: TelegrafContext) {
        await ctx.reply('👍');
    }

    @Hears('hi')
    async hears(@Ctx() ctx: TelegrafContext) {
        await ctx.reply('Hey there');
    }

    @On('message')
    async onMessage(@Ctx() ctx: TelegrafContext) {
        await ctx.reply(`Hello from message, ${ctx.text}`);
    }
}
