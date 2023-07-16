import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { _hashedpassword } from "src/helper/bcrypt";
import { JwtItem } from "src/helper/jwt";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { IsPublic } from "src/decorators/is-public.decorator";
import { authdtocreate } from "src/dto/auth.dto";
import { ResponseHelper } from "src/helper/response";
import { IsPrivate } from "src/decorators/is-private.decorator";

@Controller("auth")
export class AuthController {
  private hashedPassword: _hashedpassword;
  private jwtItem: JwtItem;

  constructor(
    private readonly _AuthService: AuthService,
    private _jwt: JwtService
  ) {
    this.hashedPassword = new _hashedpassword();
    this.jwtItem = new JwtItem(this._jwt);
  }

  @IsPublic()
  @Post("/create-user")
  async _create(@Res() response, @Body() data: authdtocreate) {
    try {
      let { email, password } = data;
      // hash password
      password = await this.hashedPassword.hash(password);
      // save into database
      const _auth = await this._AuthService._create({
        email,
        password,
      });
      // response
      return ResponseHelper._return(
        response,
        200,
        "user created successfully!"
      );
    } catch (error) {
      return ResponseHelper._return(response, 500, "something went wrong!");
    }
  }

  @IsPublic()
  @Post("/login_with_email")
  async _login(@Res() response, @Body() data: authdtocreate) {
    try {
      let { email, password } = data;
      // find user by email
      const _find = await this._AuthService._findByEmail(email, "");
      // validate if user exist
      if (!_find)
        return ResponseHelper._return(response, 400, "user not found!");

      // if exist compare password
      const _pass = await this.hashedPassword.compare(password, _find.password);
      if (!_pass)
        return ResponseHelper._return(response, 400, "credentials wrong!");
      // generate a token
      const _accesstoken = await this.jwtItem._generateTokenGlobal({
        id: _find._id,
      });
      const _refreshtoken = await this.jwtItem._generateTokenWithValidity(
        {
          _id: _find._id,
          refresh: true,
        },
        "1d"
      );
      // return response
      return ResponseHelper._return(response, 200, "user login succesfully!", {
        _accesstoken,
        _refreshtoken,
      });
    } catch (error) {
      return ResponseHelper._return(response, 500, "something went wrong!");
    }
  }

  @IsPrivate()
  @Get("/getAll")
  async _getAllAuth(@Res() response) {
    try {
      const _data = await this._AuthService._findAll();
      // return response
      return ResponseHelper._return(response, 200, "data succesfully!", _data);
    } catch (error) {
      return ResponseHelper._return(response, 500, "something went wrong!");
    }
  }
}
