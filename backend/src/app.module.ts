import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import config from './common/config';
import { UserModule } from './user/user.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        console.log(config.DATABASE.URI);

        return {
          uri: config.DATABASE.URI,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
          maxPoolSize: 10,
          socketTimeoutMS: 45000,
          family: 4,
        };
      },
      imports: [],
    }),
    AuthModule,
    UserModule,
    ScoreModule,
  ],
})
export class AppModule {}
