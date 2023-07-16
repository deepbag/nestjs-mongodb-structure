import { Response } from "express";

export class ResponseHelper {
  static _return(
    response: Response,
    status: number,
    message: string,
    data: any = undefined
  ) {
    const _responseitem: any = {
      status: status,
    };

    if (message) _responseitem.message = message;
    if (data) _responseitem.data = data;

    response.status(status).json(_responseitem);
  }
}
