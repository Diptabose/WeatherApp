export interface BatchResult<TReturn> {
  batchCount: number;
  success: TReturn[];
  error: PromiseRejectedResult[];
}

export class BatchWorker {
  private maxConcurrency: number;
  private delay: number;

  constructor(options: { maxConcurrency: number; delay?: number }) {
    this.maxConcurrency = options.maxConcurrency;
    const delay = options?.delay ?? 0;
    this.delay = delay >= 0 ? delay : 0;
  }

  private wait(ms: number) {
    return new Promise<void>((res) => setTimeout(res, ms));
  }

  private batchData = <TData>(
    data: TData[],
    chunkSize: number = this.maxConcurrency,
  ) => {
    if (!Array.isArray(data)) {
      throw new Error("Input data is not an Array");
    }

    function* chunkGenerator() {
      for (let i = 0; i < data.length; i += chunkSize) {
        yield data.slice(i, i + chunkSize);
      }
    }
    return chunkGenerator();
  };

  private async *batchIterableData<TData>(
    iterator: AsyncIterable<TData>,
    chunkSize: number = this.maxConcurrency,
  ) {
    let accumulator: TData[] = [];
    for await (let data of iterator) {
      accumulator.push(data);
      if (accumulator.length === chunkSize) {
        yield accumulator;
        accumulator = [];
      }
    }
    yield accumulator;
  }

  serializedStartIterable = async <
    TData,
    TReturn,
    TBeforeBatchReturn,
    TAfterBatchReturn,
  >(
    iterable: AsyncIterable<TData>,
    worker: (
      data: TData,
      beforeBatchData?: Awaited<TBeforeBatchReturn>,
    ) => Promise<TReturn>,
    beforeBatch?: () => Promise<TBeforeBatchReturn>,
    afterBatch?: () => Promise<TAfterBatchReturn>,
  ) => {
    let results: BatchResult<TReturn>[] = [];
    for await (let batch of this.batchIterableData(iterable)) {
      const result = await this.serialisedStart(
        batch,
        worker,
        beforeBatch,
        afterBatch,
      );
      results = results.concat(result);
    }
    return results;
  };

  serialisedStart = async <
    TData,
    TReturn,
    TBeforeBatchReturn,
    TAfterBatchReturn,
  >(
    data: TData[],
    worker: (
      data: TData,
      beforeBatchData?: Awaited<TBeforeBatchReturn>,
    ) => Promise<TReturn>,
    beforeBatch?: () => Promise<TBeforeBatchReturn>,
    afterBatch?: () => Promise<TAfterBatchReturn>,
  ): Promise<BatchResult<TReturn>[]> => {
    const batches = this.batchData(data);
    let batchCount = 0;
    const result: BatchResult<TReturn>[] = [];
    for (let batch of batches) {
      batchCount++;
      let beforeBatchData: Awaited<TBeforeBatchReturn> | undefined;
      try {
        beforeBatchData = await beforeBatch?.();
      } catch (err) {
        console.log(
          "Batch Worker - serialisedStart: Error occured in beforeBatch",
          err,
        );
      }

      const batchOfPromises = batch.map((bat) => {
        return worker(bat, beforeBatchData);
      });
      try {
        const resolvedPromises = await Promise.allSettled(batchOfPromises);
        const successfullPromises = resolvedPromises.filter(
          (rp) => rp.status === "fulfilled",
        );
        const erroredPromises = resolvedPromises.filter(
          (rp) => rp.status === "rejected",
        );
        result.push({
          batchCount: batchCount,
          success: successfullPromises.map((sp) => sp.value),
          error: erroredPromises,
        });
      } catch (err) {
        console.log(
          "Batch Worker: Error occured in processing the batch",
          batch,
          err,
        );
      }

      try {
        await afterBatch?.();
      } catch (err) {
        console.log(
          "Batch Worker - serialisedStart: Error occured in afterBatch",
          err,
        );
      }
      if (this.delay !== 0) {
        await this.wait(this.delay);
      }
    }
    return result;
  };

  async *serialisedStartGenerator<
    TData,
    TReturn,
    TBeforeBatchReturn,
    TAfterBatchReturn,
  >(
    data: TData[],
    worker: (
      data: TData,
      beforeBatchData?: Awaited<TBeforeBatchReturn>,
    ) => Promise<TReturn>,
    beforeBatch?: () => Promise<TBeforeBatchReturn>,
    afterBatch?: () => Promise<TAfterBatchReturn>,
  ) {
    const batches = this.batchData(data);
    const result: TReturn[][] = [];
    let batchCount = 0;

    for (let batch of batches) {
      batchCount++;
      let beforeBatchData: Awaited<TBeforeBatchReturn> | undefined;
      try {
        beforeBatchData = await beforeBatch?.();
      } catch (err) {
        console.log(
          "Batch Worker - serialisedStart: Error occured in beforeBatch",
          err,
        );
      }

      const batchOfPromises = batch.map((bat) => {
        return worker(bat, beforeBatchData);
      });

      try {
        const resolvedPromises = await Promise.allSettled(batchOfPromises);
        const successfullPromises = resolvedPromises.filter(
          (rp) => rp.status === "fulfilled",
        );
        const erroredPromises = resolvedPromises.filter(
          (rp) => rp.status === "rejected",
        );
        yield {
          batchCount: batchCount,
          success: successfullPromises.map((sp) => sp.value),
          error: erroredPromises,
        };
      } catch (err) {
        console.log(
          "Batch Worker - serialisedStartGenerator: Error occured in processing batch",
          batch,
          err,
        );
      }

      try {
        await afterBatch?.();
      } catch (err) {
        console.log(
          "Batch Worker - serialisedStart: Error occured in afterBatch",
          err,
        );
      }
      if (this.delay !== 0) {
        await this.wait(this.delay);
      }
    }
    return result;
  }
}

export class SerialisedWorker {
  constructor() {}

  serialisedAccumulator = async <TData, TReturnData>(
    data: TData[],
    worker: (args: TData) => Promise<TReturnData>,
  ) => {
    let result: TReturnData[] = [];
    for (let item of data) {
      try {
        const response = await worker(item);
        result.push(response);
      } catch (err) {
        console.error(
          "Serialised Worker - serialisedAccumulator: Error occured in processing item",
          item,
          err,
        );
      }
    }
    return result;
  };

  async *serialisedAccumulatedGenerator<TData, TReturnData>(
    data: TData[],
    worker: (...args: any) => Promise<TReturnData>,
    { yieldAfter }: { yieldAfter: number },
  ) {
    let result: TReturnData[] = [];
    for (let item of data) {
      try {
        const response = await worker(item);
        result.push(response);
      } catch (err) {
        console.error(
          "Serialised Worker - serialisedAccumulatedGenerator: Error occured in processing item",
          item,
          err,
        );
      }
      if (result.length % yieldAfter === 0) {
        yield result;
        result = [];
      }
    }
    if (result.length > 0) {
      yield result;
    }
  }
}
