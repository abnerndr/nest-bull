import { Process, Processor } from "@nestjs/bull";
import { TEST_QUEUE } from "./contants";
import { Job } from "bull";

@Processor(TEST_QUEUE)
export class TestProcessor {

    @Process()
    async test(job: Job<unknown>) {
        console.log(job.id, 'test')
    }
}