import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionGuard {
  constructor() {}

  async canActivate() {
    return true;
  }
}
