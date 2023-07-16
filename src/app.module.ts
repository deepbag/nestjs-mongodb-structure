import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { authschema } from "./schema/auth.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot("mongodb://localhost:27017/nestjs"),
    MongooseModule.forFeature([{ name: "auth", schema: authschema }]),
    // jwt module
    JwtModule.register({
      global: true,
      secret: "s3TRyVwqPc4oWQasTRyG",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
