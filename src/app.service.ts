import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { TEST_QUEUE } from './contants';
import { Queue } from 'bull';

@Injectable()
export class AppService {

  constructor(@InjectQueue(TEST_QUEUE) private testQueue: Queue) { }

  queueTest() {
    return this.testQueue.add({ foo: 'test' })
  }
}
