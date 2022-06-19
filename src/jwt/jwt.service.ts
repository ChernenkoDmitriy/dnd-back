import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  decodeToken = (token: string, key: string) => {
    try {
      return { result: jwt.verify(token, key) };
    } catch (error) {
      return { error };
    }
  };

  generateToken(data: any, key: string) {
    console.log(data, key);
    const { email, id } = data;

    return jwt.sign({ email, id }, key);
  }
}
