import {
	Collection,
	Connection,
	Schema,
	DocumentQuery,
	Document,
	Model,
	Aggregate,
	Query,
	ModelFindByIdAndUpdateOptions,
	ModelFindOneAndUpdateOptions,
	ModelMapReduceOption,
	ModelPopulateOptions,
	ModelUpdateOptions
} from 'mongoose';

import mongoose = require("mongoose");


declare class AbstractModel<T extends Document> extends Object {

	// ModelProperties
	base: typeof mongoose;
	baseModelName: string | undefined;
	collection: Collection;
	db: Connection;
	discriminators: any;
	modelName: string;
	schema: Schema;

	// event emitter
	addListener(event: string | symbol, listener: (...args: any[]) => void): this;
	on(event: string | symbol, listener: (...args: any[]) => void): this;
	once(event: string | symbol, listener: (...args: any[]) => void): this;
	removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
	off(event: string | symbol, listener: (...args: any[]) => void): this;
	removeAllListeners(event?: string | symbol): this;
	setMaxListeners(n: number): this;
	getMaxListeners(): number;
	listeners(event: string | symbol): Function[];
	rawListeners(event: string | symbol): Function[];
	emit(event: string | symbol, ...args: any[]): boolean;
	listenerCount(type: string | symbol): number;
	// Added in Node 6...
	prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
	prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
	eventNames(): Array<string | symbol>;

	// model methods
	// new(doc?: any): T;

	findById(id: any | string | number,
			 callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;
	findById(id: any | string | number, projection: any,
			 callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;
	findById(id: any | string | number, projection: any, options: any,
			 callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;

	model(name: string): Model<T>;

	$where(argument: string | Function): DocumentQuery<T, T>;

	aggregate(...aggregations: any[]): Aggregate<any[]>;
	aggregate(...aggregationsWithCallback: any[]): Promise<any[]>;

	count(conditions: any, callback?: (err: any, count: number) => void): Query<number>;

	create(docs: any[], callback?: (err: any, res: T[]) => void): Promise<T[]>;
	create(...docs: any[]): Promise<T>;
	create(...docsWithCallback: any[]): Promise<T>;

	discriminator<U extends Document>(name: string, schema: Schema): Model<U>;

	distinct(field: string, callback?: (err: any, res: any[]) => void): Query<any[]>;
	distinct(field: string, conditions: any,
			 callback?: (err: any, res: any[]) => void): Query<any[]>;

	ensureIndexes(callback?: (err: any) => void): Promise<void>;
	ensureIndexes(options: any, callback?: (err: any) => void): Promise<void>;

	find(callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T>;
	find(conditions: any, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T>;
	find(conditions: any, projection?: any | null,
		 callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T>;
	find(conditions: any, projection?: any | null, options?: any | null,
		 callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T>;

	findByIdAndRemove(): DocumentQuery<T | null, T>;
	findByIdAndRemove(id: any | number | string,
					  callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;
	findByIdAndRemove(id: any | number | string, options: {
		sort?: any;
		select?: any;
	}, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;

	findByIdAndUpdate(): DocumentQuery<T | null, T>;
	findByIdAndUpdate(id: any | number | string, update: any,
					  callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;
	findByIdAndUpdate(id: any | number | string, update: any,
					  options: { upsert: true, new: true } & ModelFindByIdAndUpdateOptions,
					  callback?: (err: any, res: T) => void): DocumentQuery<T, T>;
	findByIdAndUpdate(id: any | number | string, update: any,
					  options: ModelFindByIdAndUpdateOptions,
					  callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;

	findOne(conditions?: any,
			callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;
	findOne(conditions: any, projection: any,
			callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;
	findOne(conditions: any, projection: any, options: any,
			callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;

	findOneAndRemove(): DocumentQuery<T | null, T>;
	findOneAndRemove(conditions: any,
					 callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;
	findOneAndRemove(conditions: any, options: {
		sort?: any;
		maxTimeMS?: number;
		select?: any;
	}, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T>;

	findOneAndUpdate(): DocumentQuery<T | null, T>;
	findOneAndUpdate(conditions: any, update: any,
					 callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T>;
	findOneAndUpdate(conditions: any, update: any,
					 options: { upsert: true, new: true } & ModelFindOneAndUpdateOptions,
					 callback?: (err: any, doc: T, res: any) => void): DocumentQuery<T, T>;
	findOneAndUpdate(conditions: any, update: any,
					 options: ModelFindOneAndUpdateOptions,
					 callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T>;

	geoNear(point: number[] | {
		type: string;
		coordinates: number[]
	}, options: {
		lean?: boolean;
		[other: string]: any;
	}, callback?: (err: any, res: T[], stats: any) => void): DocumentQuery<T[], T>;

	geoSearch(conditions: any, options: {
		near: number[];
		maxDistance: number;
		limit?: number;
		lean?: boolean;
	}, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T>;

	hydrate(obj: any): T;

	insertMany(docs: any[], callback?: (error: any, docs: T[]) => void): Promise<T[]>;
	insertMany(doc: any, callback?: (error: any, doc: T) => void): Promise<T>;
	insertMany(...docsWithCallback: any[]): Promise<T>;

	mapReduce<Key, Value>(
		o: ModelMapReduceOption<T, Key, Value>,
		callback?: (err: any, res: any) => void
	): Promise<any>;

	populate(docs: any[], options: ModelPopulateOptions | ModelPopulateOptions[],
			 callback?: (err: any, res: T[]) => void): Promise<T[]>;
	populate<T>(docs: any, options: ModelPopulateOptions | ModelPopulateOptions[],
				callback?: (err: any, res: T) => void): Promise<T>;

	/** Removes documents from the collection. */
	remove(conditions: any, callback?: (err: any) => void): Query<void>;
	deleteOne(conditions: any, callback?: (err: any) => void): Query<void>;
	deleteMany(conditions: any, callback?: (err: any) => void): Query<void>;

	update(conditions: any, doc: any,
		   callback?: (err: any, raw: any) => void): Query<any>;
	update(conditions: any, doc: any, options: ModelUpdateOptions,
		   callback?: (err: any, raw: any) => void): Query<any>;
	updateOne(conditions: any, doc: any,
			  callback?: (err: any, raw: any) => void): Query<any>;
	updateOne(conditions: any, doc: any, options: ModelUpdateOptions,
			  callback?: (err: any, raw: any) => void): Query<any>;
	updateMany(conditions: any, doc: any,
			   callback?: (err: any, raw: any) => void): Query<any>;
	updateMany(conditions: any, doc: any, options: ModelUpdateOptions,
			   callback?: (err: any, raw: any) => void): Query<any>;

	where(path: string, val?: any): Query<any>;
}