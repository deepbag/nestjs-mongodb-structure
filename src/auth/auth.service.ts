import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { authdtocreate } from "src/dto/auth.dto";
import { _Iauthinterface } from "src/interface/auth.interface";

@Injectable()
export class AuthService {
  constructor(@InjectModel("auth") private AuthModel: Model<_Iauthinterface>) {}

  async _create(data: authdtocreate): Promise<_Iauthinterface> {
    const _new = new this.AuthModel(data);
    return await _new.save();
  }

  async _findByEmail(
    email: string,
    exinclude: string
  ): Promise<_Iauthinterface> {
    return await this.AuthModel.findOne({ email }, exinclude).exec();
  }

  async _findAll(): Promise<_Iauthinterface[]> {
    return await this.AuthModel.find();
  }
}
