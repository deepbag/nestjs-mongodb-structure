import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { authschema } from 'src/schema/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "auth", schema: authschema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
