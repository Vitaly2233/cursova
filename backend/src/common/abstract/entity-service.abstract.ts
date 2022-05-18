import {
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';

export abstract class EntityService<EntityDocument> {
  constructor(private _model: Model<EntityDocument>) {}

  async find(
    filters: FilterQuery<EntityDocument>,
    projection?: string,
    options?: QueryOptions,
  ) {
    return this._model.find(filters, projection, options);
  }

  findOne(
    filters: FilterQuery<EntityDocument>,
    projection?: string,
    options?: QueryOptions,
  ) {
    return this._model.findOne(filters, projection, options);
  }

  async create(data: Partial<EntityDocument>) {
    return this._model.create(data);
  }

  async updateOne(
    filters: Partial<EntityDocument>,
    update: UpdateWithAggregationPipeline | UpdateQuery<EntityDocument>,
    options?: QueryOptions,
  ) {
    return this._model.updateOne(filters, update, options);
  }

  async updateMany(
    filters: FilterQuery<EntityDocument>,
    update: UpdateWithAggregationPipeline | UpdateQuery<EntityDocument>,
    options?: QueryOptions,
  ) {
    return this._model.updateMany(filters, update, options);
  }

  async updateManyByIds(
    objectIds: any[],
    update?: UpdateWithAggregationPipeline | UpdateQuery<EntityDocument>,
    options?: QueryOptions,
  ) {
    return this._model.updateMany(
      {
        _id: {
          $in: objectIds,
        },
      },
      update,
      options,
    );
  }

  async deleteOne(data: Partial<EntityDocument>, options?: QueryOptions) {
    return this._model.deleteOne(data, options);
  }

  async deleteMany(
    filter?: FilterQuery<EntityDocument>,
    options?: QueryOptions,
  ) {
    return this._model.deleteMany(filter, options);
  }

  async aggregate(pipeline?: any[], options?: Record<string, unknown>) {
    return this._model.aggregate(pipeline, options);
  }

  async count(filter: FilterQuery<EntityDocument>) {
    return this._model.count(filter);
  }
}
