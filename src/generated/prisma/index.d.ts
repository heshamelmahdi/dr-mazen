
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ProgramVideo
 * 
 */
export type ProgramVideo = $Result.DefaultSelection<Prisma.$ProgramVideoPayload>
/**
 * Model VideoProgress
 * 
 */
export type VideoProgress = $Result.DefaultSelection<Prisma.$VideoProgressPayload>
/**
 * Model Recipe
 * 
 */
export type Recipe = $Result.DefaultSelection<Prisma.$RecipePayload>
/**
 * Model QAEntry
 * 
 */
export type QAEntry = $Result.DefaultSelection<Prisma.$QAEntryPayload>
/**
 * Model UserQuestion
 * 
 */
export type UserQuestion = $Result.DefaultSelection<Prisma.$UserQuestionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const RecipeType: {
  YOUTUBE: 'YOUTUBE',
  SELF_HOSTED: 'SELF_HOSTED'
};

export type RecipeType = (typeof RecipeType)[keyof typeof RecipeType]


export const AnswerType: {
  TEXT: 'TEXT',
  AUDIO: 'AUDIO'
};

export type AnswerType = (typeof AnswerType)[keyof typeof AnswerType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type RecipeType = $Enums.RecipeType

export const RecipeType: typeof $Enums.RecipeType

export type AnswerType = $Enums.AnswerType

export const AnswerType: typeof $Enums.AnswerType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.programVideo`: Exposes CRUD operations for the **ProgramVideo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgramVideos
    * const programVideos = await prisma.programVideo.findMany()
    * ```
    */
  get programVideo(): Prisma.ProgramVideoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.videoProgress`: Exposes CRUD operations for the **VideoProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VideoProgresses
    * const videoProgresses = await prisma.videoProgress.findMany()
    * ```
    */
  get videoProgress(): Prisma.VideoProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipe`: Exposes CRUD operations for the **Recipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipes
    * const recipes = await prisma.recipe.findMany()
    * ```
    */
  get recipe(): Prisma.RecipeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qAEntry`: Exposes CRUD operations for the **QAEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QAEntries
    * const qAEntries = await prisma.qAEntry.findMany()
    * ```
    */
  get qAEntry(): Prisma.QAEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userQuestion`: Exposes CRUD operations for the **UserQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserQuestions
    * const userQuestions = await prisma.userQuestion.findMany()
    * ```
    */
  get userQuestion(): Prisma.UserQuestionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    ProgramVideo: 'ProgramVideo',
    VideoProgress: 'VideoProgress',
    Recipe: 'Recipe',
    QAEntry: 'QAEntry',
    UserQuestion: 'UserQuestion'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "programVideo" | "videoProgress" | "recipe" | "qAEntry" | "userQuestion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ProgramVideo: {
        payload: Prisma.$ProgramVideoPayload<ExtArgs>
        fields: Prisma.ProgramVideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramVideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramVideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload>
          }
          findFirst: {
            args: Prisma.ProgramVideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramVideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload>
          }
          findMany: {
            args: Prisma.ProgramVideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload>[]
          }
          create: {
            args: Prisma.ProgramVideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload>
          }
          createMany: {
            args: Prisma.ProgramVideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramVideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload>[]
          }
          delete: {
            args: Prisma.ProgramVideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload>
          }
          update: {
            args: Prisma.ProgramVideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload>
          }
          deleteMany: {
            args: Prisma.ProgramVideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramVideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgramVideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload>[]
          }
          upsert: {
            args: Prisma.ProgramVideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramVideoPayload>
          }
          aggregate: {
            args: Prisma.ProgramVideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgramVideo>
          }
          groupBy: {
            args: Prisma.ProgramVideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgramVideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramVideoCountArgs<ExtArgs>
            result: $Utils.Optional<ProgramVideoCountAggregateOutputType> | number
          }
        }
      }
      VideoProgress: {
        payload: Prisma.$VideoProgressPayload<ExtArgs>
        fields: Prisma.VideoProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload>
          }
          findFirst: {
            args: Prisma.VideoProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload>
          }
          findMany: {
            args: Prisma.VideoProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload>[]
          }
          create: {
            args: Prisma.VideoProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload>
          }
          createMany: {
            args: Prisma.VideoProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload>[]
          }
          delete: {
            args: Prisma.VideoProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload>
          }
          update: {
            args: Prisma.VideoProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload>
          }
          deleteMany: {
            args: Prisma.VideoProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload>[]
          }
          upsert: {
            args: Prisma.VideoProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProgressPayload>
          }
          aggregate: {
            args: Prisma.VideoProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideoProgress>
          }
          groupBy: {
            args: Prisma.VideoProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoProgressCountArgs<ExtArgs>
            result: $Utils.Optional<VideoProgressCountAggregateOutputType> | number
          }
        }
      }
      Recipe: {
        payload: Prisma.$RecipePayload<ExtArgs>
        fields: Prisma.RecipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findFirst: {
            args: Prisma.RecipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findMany: {
            args: Prisma.RecipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          create: {
            args: Prisma.RecipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          createMany: {
            args: Prisma.RecipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          delete: {
            args: Prisma.RecipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          update: {
            args: Prisma.RecipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          deleteMany: {
            args: Prisma.RecipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecipeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          upsert: {
            args: Prisma.RecipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          aggregate: {
            args: Prisma.RecipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipe>
          }
          groupBy: {
            args: Prisma.RecipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeCountAggregateOutputType> | number
          }
        }
      }
      QAEntry: {
        payload: Prisma.$QAEntryPayload<ExtArgs>
        fields: Prisma.QAEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QAEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QAEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload>
          }
          findFirst: {
            args: Prisma.QAEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QAEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload>
          }
          findMany: {
            args: Prisma.QAEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload>[]
          }
          create: {
            args: Prisma.QAEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload>
          }
          createMany: {
            args: Prisma.QAEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QAEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload>[]
          }
          delete: {
            args: Prisma.QAEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload>
          }
          update: {
            args: Prisma.QAEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload>
          }
          deleteMany: {
            args: Prisma.QAEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QAEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QAEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload>[]
          }
          upsert: {
            args: Prisma.QAEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QAEntryPayload>
          }
          aggregate: {
            args: Prisma.QAEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQAEntry>
          }
          groupBy: {
            args: Prisma.QAEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<QAEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.QAEntryCountArgs<ExtArgs>
            result: $Utils.Optional<QAEntryCountAggregateOutputType> | number
          }
        }
      }
      UserQuestion: {
        payload: Prisma.$UserQuestionPayload<ExtArgs>
        fields: Prisma.UserQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload>
          }
          findFirst: {
            args: Prisma.UserQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload>
          }
          findMany: {
            args: Prisma.UserQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload>[]
          }
          create: {
            args: Prisma.UserQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload>
          }
          createMany: {
            args: Prisma.UserQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload>[]
          }
          delete: {
            args: Prisma.UserQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload>
          }
          update: {
            args: Prisma.UserQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload>
          }
          deleteMany: {
            args: Prisma.UserQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload>[]
          }
          upsert: {
            args: Prisma.UserQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuestionPayload>
          }
          aggregate: {
            args: Prisma.UserQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserQuestion>
          }
          groupBy: {
            args: Prisma.UserQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<UserQuestionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    programVideo?: ProgramVideoOmit
    videoProgress?: VideoProgressOmit
    recipe?: RecipeOmit
    qAEntry?: QAEntryOmit
    userQuestion?: UserQuestionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    videoProgress: number
    userQuestions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videoProgress?: boolean | UserCountOutputTypeCountVideoProgressArgs
    userQuestions?: boolean | UserCountOutputTypeCountUserQuestionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVideoProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserQuestionWhereInput
  }


  /**
   * Count Type ProgramVideoCountOutputType
   */

  export type ProgramVideoCountOutputType = {
    videoProgress: number
  }

  export type ProgramVideoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videoProgress?: boolean | ProgramVideoCountOutputTypeCountVideoProgressArgs
  }

  // Custom InputTypes
  /**
   * ProgramVideoCountOutputType without action
   */
  export type ProgramVideoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideoCountOutputType
     */
    select?: ProgramVideoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProgramVideoCountOutputType without action
   */
  export type ProgramVideoCountOutputTypeCountVideoProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoProgressWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
    subscriptionEndDate: Date | null
    isActive: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
    subscriptionEndDate: Date | null
    isActive: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    subscriptionEndDate: number
    isActive: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    subscriptionEndDate?: true
    isActive?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    subscriptionEndDate?: true
    isActive?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    subscriptionEndDate?: true
    isActive?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    subscriptionEndDate: Date | null
    isActive: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptionEndDate?: boolean
    isActive?: boolean
    videoProgress?: boolean | User$videoProgressArgs<ExtArgs>
    userQuestions?: boolean | User$userQuestionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptionEndDate?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptionEndDate?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptionEndDate?: boolean
    isActive?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "createdAt" | "updatedAt" | "subscriptionEndDate" | "isActive", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videoProgress?: boolean | User$videoProgressArgs<ExtArgs>
    userQuestions?: boolean | User$userQuestionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      videoProgress: Prisma.$VideoProgressPayload<ExtArgs>[]
      userQuestions: Prisma.$UserQuestionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
      subscriptionEndDate: Date | null
      isActive: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    videoProgress<T extends User$videoProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$videoProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userQuestions<T extends User$userQuestionsArgs<ExtArgs> = {}>(args?: Subset<T, User$userQuestionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly subscriptionEndDate: FieldRef<"User", 'DateTime'>
    readonly isActive: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.videoProgress
   */
  export type User$videoProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    where?: VideoProgressWhereInput
    orderBy?: VideoProgressOrderByWithRelationInput | VideoProgressOrderByWithRelationInput[]
    cursor?: VideoProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoProgressScalarFieldEnum | VideoProgressScalarFieldEnum[]
  }

  /**
   * User.userQuestions
   */
  export type User$userQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    where?: UserQuestionWhereInput
    orderBy?: UserQuestionOrderByWithRelationInput | UserQuestionOrderByWithRelationInput[]
    cursor?: UserQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserQuestionScalarFieldEnum | UserQuestionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ProgramVideo
   */

  export type AggregateProgramVideo = {
    _count: ProgramVideoCountAggregateOutputType | null
    _avg: ProgramVideoAvgAggregateOutputType | null
    _sum: ProgramVideoSumAggregateOutputType | null
    _min: ProgramVideoMinAggregateOutputType | null
    _max: ProgramVideoMaxAggregateOutputType | null
  }

  export type ProgramVideoAvgAggregateOutputType = {
    sequenceNumber: number | null
    durationSeconds: number | null
  }

  export type ProgramVideoSumAggregateOutputType = {
    sequenceNumber: number | null
    durationSeconds: number | null
  }

  export type ProgramVideoMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    videoPath: string | null
    thumbnailPath: string | null
    sequenceNumber: number | null
    durationSeconds: number | null
    videoType: string | null
    youtubeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type ProgramVideoMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    videoPath: string | null
    thumbnailPath: string | null
    sequenceNumber: number | null
    durationSeconds: number | null
    videoType: string | null
    youtubeId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type ProgramVideoCountAggregateOutputType = {
    id: number
    title: number
    description: number
    videoPath: number
    thumbnailPath: number
    sequenceNumber: number
    durationSeconds: number
    videoType: number
    youtubeId: number
    createdAt: number
    updatedAt: number
    isActive: number
    _all: number
  }


  export type ProgramVideoAvgAggregateInputType = {
    sequenceNumber?: true
    durationSeconds?: true
  }

  export type ProgramVideoSumAggregateInputType = {
    sequenceNumber?: true
    durationSeconds?: true
  }

  export type ProgramVideoMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    videoPath?: true
    thumbnailPath?: true
    sequenceNumber?: true
    durationSeconds?: true
    videoType?: true
    youtubeId?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type ProgramVideoMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    videoPath?: true
    thumbnailPath?: true
    sequenceNumber?: true
    durationSeconds?: true
    videoType?: true
    youtubeId?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type ProgramVideoCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    videoPath?: true
    thumbnailPath?: true
    sequenceNumber?: true
    durationSeconds?: true
    videoType?: true
    youtubeId?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    _all?: true
  }

  export type ProgramVideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgramVideo to aggregate.
     */
    where?: ProgramVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramVideos to fetch.
     */
    orderBy?: ProgramVideoOrderByWithRelationInput | ProgramVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgramVideos
    **/
    _count?: true | ProgramVideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgramVideoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgramVideoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramVideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramVideoMaxAggregateInputType
  }

  export type GetProgramVideoAggregateType<T extends ProgramVideoAggregateArgs> = {
        [P in keyof T & keyof AggregateProgramVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgramVideo[P]>
      : GetScalarType<T[P], AggregateProgramVideo[P]>
  }




  export type ProgramVideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramVideoWhereInput
    orderBy?: ProgramVideoOrderByWithAggregationInput | ProgramVideoOrderByWithAggregationInput[]
    by: ProgramVideoScalarFieldEnum[] | ProgramVideoScalarFieldEnum
    having?: ProgramVideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramVideoCountAggregateInputType | true
    _avg?: ProgramVideoAvgAggregateInputType
    _sum?: ProgramVideoSumAggregateInputType
    _min?: ProgramVideoMinAggregateInputType
    _max?: ProgramVideoMaxAggregateInputType
  }

  export type ProgramVideoGroupByOutputType = {
    id: string
    title: string
    description: string | null
    videoPath: string
    thumbnailPath: string | null
    sequenceNumber: number
    durationSeconds: number | null
    videoType: string | null
    youtubeId: string | null
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    _count: ProgramVideoCountAggregateOutputType | null
    _avg: ProgramVideoAvgAggregateOutputType | null
    _sum: ProgramVideoSumAggregateOutputType | null
    _min: ProgramVideoMinAggregateOutputType | null
    _max: ProgramVideoMaxAggregateOutputType | null
  }

  type GetProgramVideoGroupByPayload<T extends ProgramVideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramVideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramVideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramVideoGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramVideoGroupByOutputType[P]>
        }
      >
    >


  export type ProgramVideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    videoPath?: boolean
    thumbnailPath?: boolean
    sequenceNumber?: boolean
    durationSeconds?: boolean
    videoType?: boolean
    youtubeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    videoProgress?: boolean | ProgramVideo$videoProgressArgs<ExtArgs>
    _count?: boolean | ProgramVideoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["programVideo"]>

  export type ProgramVideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    videoPath?: boolean
    thumbnailPath?: boolean
    sequenceNumber?: boolean
    durationSeconds?: boolean
    videoType?: boolean
    youtubeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["programVideo"]>

  export type ProgramVideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    videoPath?: boolean
    thumbnailPath?: boolean
    sequenceNumber?: boolean
    durationSeconds?: boolean
    videoType?: boolean
    youtubeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["programVideo"]>

  export type ProgramVideoSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    videoPath?: boolean
    thumbnailPath?: boolean
    sequenceNumber?: boolean
    durationSeconds?: boolean
    videoType?: boolean
    youtubeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }

  export type ProgramVideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "videoPath" | "thumbnailPath" | "sequenceNumber" | "durationSeconds" | "videoType" | "youtubeId" | "createdAt" | "updatedAt" | "isActive", ExtArgs["result"]["programVideo"]>
  export type ProgramVideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videoProgress?: boolean | ProgramVideo$videoProgressArgs<ExtArgs>
    _count?: boolean | ProgramVideoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProgramVideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProgramVideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProgramVideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProgramVideo"
    objects: {
      videoProgress: Prisma.$VideoProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      videoPath: string
      thumbnailPath: string | null
      sequenceNumber: number
      durationSeconds: number | null
      videoType: string | null
      youtubeId: string | null
      createdAt: Date
      updatedAt: Date
      isActive: boolean
    }, ExtArgs["result"]["programVideo"]>
    composites: {}
  }

  type ProgramVideoGetPayload<S extends boolean | null | undefined | ProgramVideoDefaultArgs> = $Result.GetResult<Prisma.$ProgramVideoPayload, S>

  type ProgramVideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgramVideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgramVideoCountAggregateInputType | true
    }

  export interface ProgramVideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProgramVideo'], meta: { name: 'ProgramVideo' } }
    /**
     * Find zero or one ProgramVideo that matches the filter.
     * @param {ProgramVideoFindUniqueArgs} args - Arguments to find a ProgramVideo
     * @example
     * // Get one ProgramVideo
     * const programVideo = await prisma.programVideo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramVideoFindUniqueArgs>(args: SelectSubset<T, ProgramVideoFindUniqueArgs<ExtArgs>>): Prisma__ProgramVideoClient<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProgramVideo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgramVideoFindUniqueOrThrowArgs} args - Arguments to find a ProgramVideo
     * @example
     * // Get one ProgramVideo
     * const programVideo = await prisma.programVideo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramVideoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramVideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramVideoClient<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgramVideo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramVideoFindFirstArgs} args - Arguments to find a ProgramVideo
     * @example
     * // Get one ProgramVideo
     * const programVideo = await prisma.programVideo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramVideoFindFirstArgs>(args?: SelectSubset<T, ProgramVideoFindFirstArgs<ExtArgs>>): Prisma__ProgramVideoClient<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgramVideo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramVideoFindFirstOrThrowArgs} args - Arguments to find a ProgramVideo
     * @example
     * // Get one ProgramVideo
     * const programVideo = await prisma.programVideo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramVideoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramVideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramVideoClient<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProgramVideos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramVideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgramVideos
     * const programVideos = await prisma.programVideo.findMany()
     * 
     * // Get first 10 ProgramVideos
     * const programVideos = await prisma.programVideo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programVideoWithIdOnly = await prisma.programVideo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramVideoFindManyArgs>(args?: SelectSubset<T, ProgramVideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProgramVideo.
     * @param {ProgramVideoCreateArgs} args - Arguments to create a ProgramVideo.
     * @example
     * // Create one ProgramVideo
     * const ProgramVideo = await prisma.programVideo.create({
     *   data: {
     *     // ... data to create a ProgramVideo
     *   }
     * })
     * 
     */
    create<T extends ProgramVideoCreateArgs>(args: SelectSubset<T, ProgramVideoCreateArgs<ExtArgs>>): Prisma__ProgramVideoClient<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProgramVideos.
     * @param {ProgramVideoCreateManyArgs} args - Arguments to create many ProgramVideos.
     * @example
     * // Create many ProgramVideos
     * const programVideo = await prisma.programVideo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramVideoCreateManyArgs>(args?: SelectSubset<T, ProgramVideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProgramVideos and returns the data saved in the database.
     * @param {ProgramVideoCreateManyAndReturnArgs} args - Arguments to create many ProgramVideos.
     * @example
     * // Create many ProgramVideos
     * const programVideo = await prisma.programVideo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProgramVideos and only return the `id`
     * const programVideoWithIdOnly = await prisma.programVideo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramVideoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramVideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProgramVideo.
     * @param {ProgramVideoDeleteArgs} args - Arguments to delete one ProgramVideo.
     * @example
     * // Delete one ProgramVideo
     * const ProgramVideo = await prisma.programVideo.delete({
     *   where: {
     *     // ... filter to delete one ProgramVideo
     *   }
     * })
     * 
     */
    delete<T extends ProgramVideoDeleteArgs>(args: SelectSubset<T, ProgramVideoDeleteArgs<ExtArgs>>): Prisma__ProgramVideoClient<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProgramVideo.
     * @param {ProgramVideoUpdateArgs} args - Arguments to update one ProgramVideo.
     * @example
     * // Update one ProgramVideo
     * const programVideo = await prisma.programVideo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramVideoUpdateArgs>(args: SelectSubset<T, ProgramVideoUpdateArgs<ExtArgs>>): Prisma__ProgramVideoClient<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProgramVideos.
     * @param {ProgramVideoDeleteManyArgs} args - Arguments to filter ProgramVideos to delete.
     * @example
     * // Delete a few ProgramVideos
     * const { count } = await prisma.programVideo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramVideoDeleteManyArgs>(args?: SelectSubset<T, ProgramVideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgramVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramVideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgramVideos
     * const programVideo = await prisma.programVideo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramVideoUpdateManyArgs>(args: SelectSubset<T, ProgramVideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgramVideos and returns the data updated in the database.
     * @param {ProgramVideoUpdateManyAndReturnArgs} args - Arguments to update many ProgramVideos.
     * @example
     * // Update many ProgramVideos
     * const programVideo = await prisma.programVideo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProgramVideos and only return the `id`
     * const programVideoWithIdOnly = await prisma.programVideo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgramVideoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgramVideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProgramVideo.
     * @param {ProgramVideoUpsertArgs} args - Arguments to update or create a ProgramVideo.
     * @example
     * // Update or create a ProgramVideo
     * const programVideo = await prisma.programVideo.upsert({
     *   create: {
     *     // ... data to create a ProgramVideo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgramVideo we want to update
     *   }
     * })
     */
    upsert<T extends ProgramVideoUpsertArgs>(args: SelectSubset<T, ProgramVideoUpsertArgs<ExtArgs>>): Prisma__ProgramVideoClient<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProgramVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramVideoCountArgs} args - Arguments to filter ProgramVideos to count.
     * @example
     * // Count the number of ProgramVideos
     * const count = await prisma.programVideo.count({
     *   where: {
     *     // ... the filter for the ProgramVideos we want to count
     *   }
     * })
    **/
    count<T extends ProgramVideoCountArgs>(
      args?: Subset<T, ProgramVideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramVideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgramVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramVideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgramVideoAggregateArgs>(args: Subset<T, ProgramVideoAggregateArgs>): Prisma.PrismaPromise<GetProgramVideoAggregateType<T>>

    /**
     * Group by ProgramVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramVideoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgramVideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramVideoGroupByArgs['orderBy'] }
        : { orderBy?: ProgramVideoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgramVideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProgramVideo model
   */
  readonly fields: ProgramVideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgramVideo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramVideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    videoProgress<T extends ProgramVideo$videoProgressArgs<ExtArgs> = {}>(args?: Subset<T, ProgramVideo$videoProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProgramVideo model
   */
  interface ProgramVideoFieldRefs {
    readonly id: FieldRef<"ProgramVideo", 'String'>
    readonly title: FieldRef<"ProgramVideo", 'String'>
    readonly description: FieldRef<"ProgramVideo", 'String'>
    readonly videoPath: FieldRef<"ProgramVideo", 'String'>
    readonly thumbnailPath: FieldRef<"ProgramVideo", 'String'>
    readonly sequenceNumber: FieldRef<"ProgramVideo", 'Int'>
    readonly durationSeconds: FieldRef<"ProgramVideo", 'Int'>
    readonly videoType: FieldRef<"ProgramVideo", 'String'>
    readonly youtubeId: FieldRef<"ProgramVideo", 'String'>
    readonly createdAt: FieldRef<"ProgramVideo", 'DateTime'>
    readonly updatedAt: FieldRef<"ProgramVideo", 'DateTime'>
    readonly isActive: FieldRef<"ProgramVideo", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProgramVideo findUnique
   */
  export type ProgramVideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
    /**
     * Filter, which ProgramVideo to fetch.
     */
    where: ProgramVideoWhereUniqueInput
  }

  /**
   * ProgramVideo findUniqueOrThrow
   */
  export type ProgramVideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
    /**
     * Filter, which ProgramVideo to fetch.
     */
    where: ProgramVideoWhereUniqueInput
  }

  /**
   * ProgramVideo findFirst
   */
  export type ProgramVideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
    /**
     * Filter, which ProgramVideo to fetch.
     */
    where?: ProgramVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramVideos to fetch.
     */
    orderBy?: ProgramVideoOrderByWithRelationInput | ProgramVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgramVideos.
     */
    cursor?: ProgramVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgramVideos.
     */
    distinct?: ProgramVideoScalarFieldEnum | ProgramVideoScalarFieldEnum[]
  }

  /**
   * ProgramVideo findFirstOrThrow
   */
  export type ProgramVideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
    /**
     * Filter, which ProgramVideo to fetch.
     */
    where?: ProgramVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramVideos to fetch.
     */
    orderBy?: ProgramVideoOrderByWithRelationInput | ProgramVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgramVideos.
     */
    cursor?: ProgramVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgramVideos.
     */
    distinct?: ProgramVideoScalarFieldEnum | ProgramVideoScalarFieldEnum[]
  }

  /**
   * ProgramVideo findMany
   */
  export type ProgramVideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
    /**
     * Filter, which ProgramVideos to fetch.
     */
    where?: ProgramVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgramVideos to fetch.
     */
    orderBy?: ProgramVideoOrderByWithRelationInput | ProgramVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgramVideos.
     */
    cursor?: ProgramVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgramVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgramVideos.
     */
    skip?: number
    distinct?: ProgramVideoScalarFieldEnum | ProgramVideoScalarFieldEnum[]
  }

  /**
   * ProgramVideo create
   */
  export type ProgramVideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
    /**
     * The data needed to create a ProgramVideo.
     */
    data: XOR<ProgramVideoCreateInput, ProgramVideoUncheckedCreateInput>
  }

  /**
   * ProgramVideo createMany
   */
  export type ProgramVideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProgramVideos.
     */
    data: ProgramVideoCreateManyInput | ProgramVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProgramVideo createManyAndReturn
   */
  export type ProgramVideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * The data used to create many ProgramVideos.
     */
    data: ProgramVideoCreateManyInput | ProgramVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProgramVideo update
   */
  export type ProgramVideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
    /**
     * The data needed to update a ProgramVideo.
     */
    data: XOR<ProgramVideoUpdateInput, ProgramVideoUncheckedUpdateInput>
    /**
     * Choose, which ProgramVideo to update.
     */
    where: ProgramVideoWhereUniqueInput
  }

  /**
   * ProgramVideo updateMany
   */
  export type ProgramVideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProgramVideos.
     */
    data: XOR<ProgramVideoUpdateManyMutationInput, ProgramVideoUncheckedUpdateManyInput>
    /**
     * Filter which ProgramVideos to update
     */
    where?: ProgramVideoWhereInput
    /**
     * Limit how many ProgramVideos to update.
     */
    limit?: number
  }

  /**
   * ProgramVideo updateManyAndReturn
   */
  export type ProgramVideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * The data used to update ProgramVideos.
     */
    data: XOR<ProgramVideoUpdateManyMutationInput, ProgramVideoUncheckedUpdateManyInput>
    /**
     * Filter which ProgramVideos to update
     */
    where?: ProgramVideoWhereInput
    /**
     * Limit how many ProgramVideos to update.
     */
    limit?: number
  }

  /**
   * ProgramVideo upsert
   */
  export type ProgramVideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
    /**
     * The filter to search for the ProgramVideo to update in case it exists.
     */
    where: ProgramVideoWhereUniqueInput
    /**
     * In case the ProgramVideo found by the `where` argument doesn't exist, create a new ProgramVideo with this data.
     */
    create: XOR<ProgramVideoCreateInput, ProgramVideoUncheckedCreateInput>
    /**
     * In case the ProgramVideo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramVideoUpdateInput, ProgramVideoUncheckedUpdateInput>
  }

  /**
   * ProgramVideo delete
   */
  export type ProgramVideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
    /**
     * Filter which ProgramVideo to delete.
     */
    where: ProgramVideoWhereUniqueInput
  }

  /**
   * ProgramVideo deleteMany
   */
  export type ProgramVideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgramVideos to delete
     */
    where?: ProgramVideoWhereInput
    /**
     * Limit how many ProgramVideos to delete.
     */
    limit?: number
  }

  /**
   * ProgramVideo.videoProgress
   */
  export type ProgramVideo$videoProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    where?: VideoProgressWhereInput
    orderBy?: VideoProgressOrderByWithRelationInput | VideoProgressOrderByWithRelationInput[]
    cursor?: VideoProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoProgressScalarFieldEnum | VideoProgressScalarFieldEnum[]
  }

  /**
   * ProgramVideo without action
   */
  export type ProgramVideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramVideo
     */
    select?: ProgramVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgramVideo
     */
    omit?: ProgramVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramVideoInclude<ExtArgs> | null
  }


  /**
   * Model VideoProgress
   */

  export type AggregateVideoProgress = {
    _count: VideoProgressCountAggregateOutputType | null
    _avg: VideoProgressAvgAggregateOutputType | null
    _sum: VideoProgressSumAggregateOutputType | null
    _min: VideoProgressMinAggregateOutputType | null
    _max: VideoProgressMaxAggregateOutputType | null
  }

  export type VideoProgressAvgAggregateOutputType = {
    watchedSeconds: number | null
  }

  export type VideoProgressSumAggregateOutputType = {
    watchedSeconds: number | null
  }

  export type VideoProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    videoId: string | null
    watchedSeconds: number | null
    isCompleted: boolean | null
    lastWatchedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    videoId: string | null
    watchedSeconds: number | null
    isCompleted: boolean | null
    lastWatchedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoProgressCountAggregateOutputType = {
    id: number
    userId: number
    videoId: number
    watchedSeconds: number
    isCompleted: number
    lastWatchedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VideoProgressAvgAggregateInputType = {
    watchedSeconds?: true
  }

  export type VideoProgressSumAggregateInputType = {
    watchedSeconds?: true
  }

  export type VideoProgressMinAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    watchedSeconds?: true
    isCompleted?: true
    lastWatchedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    watchedSeconds?: true
    isCompleted?: true
    lastWatchedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoProgressCountAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    watchedSeconds?: true
    isCompleted?: true
    lastWatchedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VideoProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoProgress to aggregate.
     */
    where?: VideoProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoProgresses to fetch.
     */
    orderBy?: VideoProgressOrderByWithRelationInput | VideoProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VideoProgresses
    **/
    _count?: true | VideoProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VideoProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VideoProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoProgressMaxAggregateInputType
  }

  export type GetVideoProgressAggregateType<T extends VideoProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateVideoProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideoProgress[P]>
      : GetScalarType<T[P], AggregateVideoProgress[P]>
  }




  export type VideoProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoProgressWhereInput
    orderBy?: VideoProgressOrderByWithAggregationInput | VideoProgressOrderByWithAggregationInput[]
    by: VideoProgressScalarFieldEnum[] | VideoProgressScalarFieldEnum
    having?: VideoProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoProgressCountAggregateInputType | true
    _avg?: VideoProgressAvgAggregateInputType
    _sum?: VideoProgressSumAggregateInputType
    _min?: VideoProgressMinAggregateInputType
    _max?: VideoProgressMaxAggregateInputType
  }

  export type VideoProgressGroupByOutputType = {
    id: string
    userId: string
    videoId: string
    watchedSeconds: number
    isCompleted: boolean
    lastWatchedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VideoProgressCountAggregateOutputType | null
    _avg: VideoProgressAvgAggregateOutputType | null
    _sum: VideoProgressSumAggregateOutputType | null
    _min: VideoProgressMinAggregateOutputType | null
    _max: VideoProgressMaxAggregateOutputType | null
  }

  type GetVideoProgressGroupByPayload<T extends VideoProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoProgressGroupByOutputType[P]>
            : GetScalarType<T[P], VideoProgressGroupByOutputType[P]>
        }
      >
    >


  export type VideoProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    watchedSeconds?: boolean
    isCompleted?: boolean
    lastWatchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | ProgramVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoProgress"]>

  export type VideoProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    watchedSeconds?: boolean
    isCompleted?: boolean
    lastWatchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | ProgramVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoProgress"]>

  export type VideoProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    watchedSeconds?: boolean
    isCompleted?: boolean
    lastWatchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | ProgramVideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoProgress"]>

  export type VideoProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    videoId?: boolean
    watchedSeconds?: boolean
    isCompleted?: boolean
    lastWatchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VideoProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "videoId" | "watchedSeconds" | "isCompleted" | "lastWatchedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["videoProgress"]>
  export type VideoProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | ProgramVideoDefaultArgs<ExtArgs>
  }
  export type VideoProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | ProgramVideoDefaultArgs<ExtArgs>
  }
  export type VideoProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | ProgramVideoDefaultArgs<ExtArgs>
  }

  export type $VideoProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      video: Prisma.$ProgramVideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      videoId: string
      watchedSeconds: number
      isCompleted: boolean
      lastWatchedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["videoProgress"]>
    composites: {}
  }

  type VideoProgressGetPayload<S extends boolean | null | undefined | VideoProgressDefaultArgs> = $Result.GetResult<Prisma.$VideoProgressPayload, S>

  type VideoProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoProgressCountAggregateInputType | true
    }

  export interface VideoProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VideoProgress'], meta: { name: 'VideoProgress' } }
    /**
     * Find zero or one VideoProgress that matches the filter.
     * @param {VideoProgressFindUniqueArgs} args - Arguments to find a VideoProgress
     * @example
     * // Get one VideoProgress
     * const videoProgress = await prisma.videoProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoProgressFindUniqueArgs>(args: SelectSubset<T, VideoProgressFindUniqueArgs<ExtArgs>>): Prisma__VideoProgressClient<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VideoProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoProgressFindUniqueOrThrowArgs} args - Arguments to find a VideoProgress
     * @example
     * // Get one VideoProgress
     * const videoProgress = await prisma.videoProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoProgressClient<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProgressFindFirstArgs} args - Arguments to find a VideoProgress
     * @example
     * // Get one VideoProgress
     * const videoProgress = await prisma.videoProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoProgressFindFirstArgs>(args?: SelectSubset<T, VideoProgressFindFirstArgs<ExtArgs>>): Prisma__VideoProgressClient<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProgressFindFirstOrThrowArgs} args - Arguments to find a VideoProgress
     * @example
     * // Get one VideoProgress
     * const videoProgress = await prisma.videoProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoProgressClient<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VideoProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VideoProgresses
     * const videoProgresses = await prisma.videoProgress.findMany()
     * 
     * // Get first 10 VideoProgresses
     * const videoProgresses = await prisma.videoProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoProgressWithIdOnly = await prisma.videoProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoProgressFindManyArgs>(args?: SelectSubset<T, VideoProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VideoProgress.
     * @param {VideoProgressCreateArgs} args - Arguments to create a VideoProgress.
     * @example
     * // Create one VideoProgress
     * const VideoProgress = await prisma.videoProgress.create({
     *   data: {
     *     // ... data to create a VideoProgress
     *   }
     * })
     * 
     */
    create<T extends VideoProgressCreateArgs>(args: SelectSubset<T, VideoProgressCreateArgs<ExtArgs>>): Prisma__VideoProgressClient<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VideoProgresses.
     * @param {VideoProgressCreateManyArgs} args - Arguments to create many VideoProgresses.
     * @example
     * // Create many VideoProgresses
     * const videoProgress = await prisma.videoProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoProgressCreateManyArgs>(args?: SelectSubset<T, VideoProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VideoProgresses and returns the data saved in the database.
     * @param {VideoProgressCreateManyAndReturnArgs} args - Arguments to create many VideoProgresses.
     * @example
     * // Create many VideoProgresses
     * const videoProgress = await prisma.videoProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VideoProgresses and only return the `id`
     * const videoProgressWithIdOnly = await prisma.videoProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VideoProgress.
     * @param {VideoProgressDeleteArgs} args - Arguments to delete one VideoProgress.
     * @example
     * // Delete one VideoProgress
     * const VideoProgress = await prisma.videoProgress.delete({
     *   where: {
     *     // ... filter to delete one VideoProgress
     *   }
     * })
     * 
     */
    delete<T extends VideoProgressDeleteArgs>(args: SelectSubset<T, VideoProgressDeleteArgs<ExtArgs>>): Prisma__VideoProgressClient<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VideoProgress.
     * @param {VideoProgressUpdateArgs} args - Arguments to update one VideoProgress.
     * @example
     * // Update one VideoProgress
     * const videoProgress = await prisma.videoProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoProgressUpdateArgs>(args: SelectSubset<T, VideoProgressUpdateArgs<ExtArgs>>): Prisma__VideoProgressClient<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VideoProgresses.
     * @param {VideoProgressDeleteManyArgs} args - Arguments to filter VideoProgresses to delete.
     * @example
     * // Delete a few VideoProgresses
     * const { count } = await prisma.videoProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoProgressDeleteManyArgs>(args?: SelectSubset<T, VideoProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VideoProgresses
     * const videoProgress = await prisma.videoProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoProgressUpdateManyArgs>(args: SelectSubset<T, VideoProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoProgresses and returns the data updated in the database.
     * @param {VideoProgressUpdateManyAndReturnArgs} args - Arguments to update many VideoProgresses.
     * @example
     * // Update many VideoProgresses
     * const videoProgress = await prisma.videoProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VideoProgresses and only return the `id`
     * const videoProgressWithIdOnly = await prisma.videoProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VideoProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VideoProgress.
     * @param {VideoProgressUpsertArgs} args - Arguments to update or create a VideoProgress.
     * @example
     * // Update or create a VideoProgress
     * const videoProgress = await prisma.videoProgress.upsert({
     *   create: {
     *     // ... data to create a VideoProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VideoProgress we want to update
     *   }
     * })
     */
    upsert<T extends VideoProgressUpsertArgs>(args: SelectSubset<T, VideoProgressUpsertArgs<ExtArgs>>): Prisma__VideoProgressClient<$Result.GetResult<Prisma.$VideoProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VideoProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProgressCountArgs} args - Arguments to filter VideoProgresses to count.
     * @example
     * // Count the number of VideoProgresses
     * const count = await prisma.videoProgress.count({
     *   where: {
     *     // ... the filter for the VideoProgresses we want to count
     *   }
     * })
    **/
    count<T extends VideoProgressCountArgs>(
      args?: Subset<T, VideoProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VideoProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VideoProgressAggregateArgs>(args: Subset<T, VideoProgressAggregateArgs>): Prisma.PrismaPromise<GetVideoProgressAggregateType<T>>

    /**
     * Group by VideoProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VideoProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoProgressGroupByArgs['orderBy'] }
        : { orderBy?: VideoProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VideoProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VideoProgress model
   */
  readonly fields: VideoProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VideoProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    video<T extends ProgramVideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProgramVideoDefaultArgs<ExtArgs>>): Prisma__ProgramVideoClient<$Result.GetResult<Prisma.$ProgramVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VideoProgress model
   */
  interface VideoProgressFieldRefs {
    readonly id: FieldRef<"VideoProgress", 'String'>
    readonly userId: FieldRef<"VideoProgress", 'String'>
    readonly videoId: FieldRef<"VideoProgress", 'String'>
    readonly watchedSeconds: FieldRef<"VideoProgress", 'Int'>
    readonly isCompleted: FieldRef<"VideoProgress", 'Boolean'>
    readonly lastWatchedAt: FieldRef<"VideoProgress", 'DateTime'>
    readonly createdAt: FieldRef<"VideoProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"VideoProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VideoProgress findUnique
   */
  export type VideoProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    /**
     * Filter, which VideoProgress to fetch.
     */
    where: VideoProgressWhereUniqueInput
  }

  /**
   * VideoProgress findUniqueOrThrow
   */
  export type VideoProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    /**
     * Filter, which VideoProgress to fetch.
     */
    where: VideoProgressWhereUniqueInput
  }

  /**
   * VideoProgress findFirst
   */
  export type VideoProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    /**
     * Filter, which VideoProgress to fetch.
     */
    where?: VideoProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoProgresses to fetch.
     */
    orderBy?: VideoProgressOrderByWithRelationInput | VideoProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoProgresses.
     */
    cursor?: VideoProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoProgresses.
     */
    distinct?: VideoProgressScalarFieldEnum | VideoProgressScalarFieldEnum[]
  }

  /**
   * VideoProgress findFirstOrThrow
   */
  export type VideoProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    /**
     * Filter, which VideoProgress to fetch.
     */
    where?: VideoProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoProgresses to fetch.
     */
    orderBy?: VideoProgressOrderByWithRelationInput | VideoProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoProgresses.
     */
    cursor?: VideoProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoProgresses.
     */
    distinct?: VideoProgressScalarFieldEnum | VideoProgressScalarFieldEnum[]
  }

  /**
   * VideoProgress findMany
   */
  export type VideoProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    /**
     * Filter, which VideoProgresses to fetch.
     */
    where?: VideoProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoProgresses to fetch.
     */
    orderBy?: VideoProgressOrderByWithRelationInput | VideoProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VideoProgresses.
     */
    cursor?: VideoProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoProgresses.
     */
    skip?: number
    distinct?: VideoProgressScalarFieldEnum | VideoProgressScalarFieldEnum[]
  }

  /**
   * VideoProgress create
   */
  export type VideoProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a VideoProgress.
     */
    data: XOR<VideoProgressCreateInput, VideoProgressUncheckedCreateInput>
  }

  /**
   * VideoProgress createMany
   */
  export type VideoProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VideoProgresses.
     */
    data: VideoProgressCreateManyInput | VideoProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoProgress createManyAndReturn
   */
  export type VideoProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * The data used to create many VideoProgresses.
     */
    data: VideoProgressCreateManyInput | VideoProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VideoProgress update
   */
  export type VideoProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a VideoProgress.
     */
    data: XOR<VideoProgressUpdateInput, VideoProgressUncheckedUpdateInput>
    /**
     * Choose, which VideoProgress to update.
     */
    where: VideoProgressWhereUniqueInput
  }

  /**
   * VideoProgress updateMany
   */
  export type VideoProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VideoProgresses.
     */
    data: XOR<VideoProgressUpdateManyMutationInput, VideoProgressUncheckedUpdateManyInput>
    /**
     * Filter which VideoProgresses to update
     */
    where?: VideoProgressWhereInput
    /**
     * Limit how many VideoProgresses to update.
     */
    limit?: number
  }

  /**
   * VideoProgress updateManyAndReturn
   */
  export type VideoProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * The data used to update VideoProgresses.
     */
    data: XOR<VideoProgressUpdateManyMutationInput, VideoProgressUncheckedUpdateManyInput>
    /**
     * Filter which VideoProgresses to update
     */
    where?: VideoProgressWhereInput
    /**
     * Limit how many VideoProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VideoProgress upsert
   */
  export type VideoProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the VideoProgress to update in case it exists.
     */
    where: VideoProgressWhereUniqueInput
    /**
     * In case the VideoProgress found by the `where` argument doesn't exist, create a new VideoProgress with this data.
     */
    create: XOR<VideoProgressCreateInput, VideoProgressUncheckedCreateInput>
    /**
     * In case the VideoProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoProgressUpdateInput, VideoProgressUncheckedUpdateInput>
  }

  /**
   * VideoProgress delete
   */
  export type VideoProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
    /**
     * Filter which VideoProgress to delete.
     */
    where: VideoProgressWhereUniqueInput
  }

  /**
   * VideoProgress deleteMany
   */
  export type VideoProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoProgresses to delete
     */
    where?: VideoProgressWhereInput
    /**
     * Limit how many VideoProgresses to delete.
     */
    limit?: number
  }

  /**
   * VideoProgress without action
   */
  export type VideoProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProgress
     */
    select?: VideoProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProgress
     */
    omit?: VideoProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProgressInclude<ExtArgs> | null
  }


  /**
   * Model Recipe
   */

  export type AggregateRecipe = {
    _count: RecipeCountAggregateOutputType | null
    _avg: RecipeAvgAggregateOutputType | null
    _sum: RecipeSumAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  export type RecipeAvgAggregateOutputType = {
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
  }

  export type RecipeSumAggregateOutputType = {
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
  }

  export type RecipeMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    recipeType: $Enums.RecipeType | null
    youtubeUrl: string | null
    videoPath: string | null
    thumbnailPath: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    mealType: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type RecipeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    recipeType: $Enums.RecipeType | null
    youtubeUrl: string | null
    videoPath: string | null
    thumbnailPath: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    mealType: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type RecipeCountAggregateOutputType = {
    id: number
    title: number
    description: number
    recipeType: number
    youtubeUrl: number
    videoPath: number
    thumbnailPath: number
    calories: number
    protein: number
    carbs: number
    fat: number
    mealType: number
    tags: number
    createdAt: number
    updatedAt: number
    isActive: number
    _all: number
  }


  export type RecipeAvgAggregateInputType = {
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
  }

  export type RecipeSumAggregateInputType = {
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
  }

  export type RecipeMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    recipeType?: true
    youtubeUrl?: true
    videoPath?: true
    thumbnailPath?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    mealType?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type RecipeMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    recipeType?: true
    youtubeUrl?: true
    videoPath?: true
    thumbnailPath?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    mealType?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type RecipeCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    recipeType?: true
    youtubeUrl?: true
    videoPath?: true
    thumbnailPath?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    mealType?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    _all?: true
  }

  export type RecipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipe to aggregate.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recipes
    **/
    _count?: true | RecipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeMaxAggregateInputType
  }

  export type GetRecipeAggregateType<T extends RecipeAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipe[P]>
      : GetScalarType<T[P], AggregateRecipe[P]>
  }




  export type RecipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithAggregationInput | RecipeOrderByWithAggregationInput[]
    by: RecipeScalarFieldEnum[] | RecipeScalarFieldEnum
    having?: RecipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeCountAggregateInputType | true
    _avg?: RecipeAvgAggregateInputType
    _sum?: RecipeSumAggregateInputType
    _min?: RecipeMinAggregateInputType
    _max?: RecipeMaxAggregateInputType
  }

  export type RecipeGroupByOutputType = {
    id: string
    title: string
    description: string | null
    recipeType: $Enums.RecipeType
    youtubeUrl: string | null
    videoPath: string | null
    thumbnailPath: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    mealType: string | null
    tags: string[]
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    _count: RecipeCountAggregateOutputType | null
    _avg: RecipeAvgAggregateOutputType | null
    _sum: RecipeSumAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  type GetRecipeGroupByPayload<T extends RecipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeGroupByOutputType[P]>
        }
      >
    >


  export type RecipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    recipeType?: boolean
    youtubeUrl?: boolean
    videoPath?: boolean
    thumbnailPath?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    mealType?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    recipeType?: boolean
    youtubeUrl?: boolean
    videoPath?: boolean
    thumbnailPath?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    mealType?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    recipeType?: boolean
    youtubeUrl?: boolean
    videoPath?: boolean
    thumbnailPath?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    mealType?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    recipeType?: boolean
    youtubeUrl?: boolean
    videoPath?: boolean
    thumbnailPath?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    mealType?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }

  export type RecipeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "recipeType" | "youtubeUrl" | "videoPath" | "thumbnailPath" | "calories" | "protein" | "carbs" | "fat" | "mealType" | "tags" | "createdAt" | "updatedAt" | "isActive", ExtArgs["result"]["recipe"]>

  export type $RecipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recipe"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      recipeType: $Enums.RecipeType
      youtubeUrl: string | null
      videoPath: string | null
      thumbnailPath: string | null
      calories: number | null
      protein: number | null
      carbs: number | null
      fat: number | null
      mealType: string | null
      tags: string[]
      createdAt: Date
      updatedAt: Date
      isActive: boolean
    }, ExtArgs["result"]["recipe"]>
    composites: {}
  }

  type RecipeGetPayload<S extends boolean | null | undefined | RecipeDefaultArgs> = $Result.GetResult<Prisma.$RecipePayload, S>

  type RecipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeCountAggregateInputType | true
    }

  export interface RecipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recipe'], meta: { name: 'Recipe' } }
    /**
     * Find zero or one Recipe that matches the filter.
     * @param {RecipeFindUniqueArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeFindUniqueArgs>(args: SelectSubset<T, RecipeFindUniqueArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeFindUniqueOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeFindFirstArgs>(args?: SelectSubset<T, RecipeFindFirstArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipes
     * const recipes = await prisma.recipe.findMany()
     * 
     * // Get first 10 Recipes
     * const recipes = await prisma.recipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeWithIdOnly = await prisma.recipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeFindManyArgs>(args?: SelectSubset<T, RecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recipe.
     * @param {RecipeCreateArgs} args - Arguments to create a Recipe.
     * @example
     * // Create one Recipe
     * const Recipe = await prisma.recipe.create({
     *   data: {
     *     // ... data to create a Recipe
     *   }
     * })
     * 
     */
    create<T extends RecipeCreateArgs>(args: SelectSubset<T, RecipeCreateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recipes.
     * @param {RecipeCreateManyArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeCreateManyArgs>(args?: SelectSubset<T, RecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recipes and returns the data saved in the database.
     * @param {RecipeCreateManyAndReturnArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recipes and only return the `id`
     * const recipeWithIdOnly = await prisma.recipe.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recipe.
     * @param {RecipeDeleteArgs} args - Arguments to delete one Recipe.
     * @example
     * // Delete one Recipe
     * const Recipe = await prisma.recipe.delete({
     *   where: {
     *     // ... filter to delete one Recipe
     *   }
     * })
     * 
     */
    delete<T extends RecipeDeleteArgs>(args: SelectSubset<T, RecipeDeleteArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recipe.
     * @param {RecipeUpdateArgs} args - Arguments to update one Recipe.
     * @example
     * // Update one Recipe
     * const recipe = await prisma.recipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeUpdateArgs>(args: SelectSubset<T, RecipeUpdateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recipes.
     * @param {RecipeDeleteManyArgs} args - Arguments to filter Recipes to delete.
     * @example
     * // Delete a few Recipes
     * const { count } = await prisma.recipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeDeleteManyArgs>(args?: SelectSubset<T, RecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeUpdateManyArgs>(args: SelectSubset<T, RecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes and returns the data updated in the database.
     * @param {RecipeUpdateManyAndReturnArgs} args - Arguments to update many Recipes.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recipes and only return the `id`
     * const recipeWithIdOnly = await prisma.recipe.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecipeUpdateManyAndReturnArgs>(args: SelectSubset<T, RecipeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recipe.
     * @param {RecipeUpsertArgs} args - Arguments to update or create a Recipe.
     * @example
     * // Update or create a Recipe
     * const recipe = await prisma.recipe.upsert({
     *   create: {
     *     // ... data to create a Recipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipe we want to update
     *   }
     * })
     */
    upsert<T extends RecipeUpsertArgs>(args: SelectSubset<T, RecipeUpsertArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCountArgs} args - Arguments to filter Recipes to count.
     * @example
     * // Count the number of Recipes
     * const count = await prisma.recipe.count({
     *   where: {
     *     // ... the filter for the Recipes we want to count
     *   }
     * })
    **/
    count<T extends RecipeCountArgs>(
      args?: Subset<T, RecipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeAggregateArgs>(args: Subset<T, RecipeAggregateArgs>): Prisma.PrismaPromise<GetRecipeAggregateType<T>>

    /**
     * Group by Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeGroupByArgs['orderBy'] }
        : { orderBy?: RecipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recipe model
   */
  readonly fields: RecipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recipe model
   */
  interface RecipeFieldRefs {
    readonly id: FieldRef<"Recipe", 'String'>
    readonly title: FieldRef<"Recipe", 'String'>
    readonly description: FieldRef<"Recipe", 'String'>
    readonly recipeType: FieldRef<"Recipe", 'RecipeType'>
    readonly youtubeUrl: FieldRef<"Recipe", 'String'>
    readonly videoPath: FieldRef<"Recipe", 'String'>
    readonly thumbnailPath: FieldRef<"Recipe", 'String'>
    readonly calories: FieldRef<"Recipe", 'Int'>
    readonly protein: FieldRef<"Recipe", 'Float'>
    readonly carbs: FieldRef<"Recipe", 'Float'>
    readonly fat: FieldRef<"Recipe", 'Float'>
    readonly mealType: FieldRef<"Recipe", 'String'>
    readonly tags: FieldRef<"Recipe", 'String[]'>
    readonly createdAt: FieldRef<"Recipe", 'DateTime'>
    readonly updatedAt: FieldRef<"Recipe", 'DateTime'>
    readonly isActive: FieldRef<"Recipe", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Recipe findUnique
   */
  export type RecipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findUniqueOrThrow
   */
  export type RecipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findFirst
   */
  export type RecipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findFirstOrThrow
   */
  export type RecipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findMany
   */
  export type RecipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe create
   */
  export type RecipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data needed to create a Recipe.
     */
    data: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
  }

  /**
   * Recipe createMany
   */
  export type RecipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recipe createManyAndReturn
   */
  export type RecipeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recipe update
   */
  export type RecipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data needed to update a Recipe.
     */
    data: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
    /**
     * Choose, which Recipe to update.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe updateMany
   */
  export type RecipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to update.
     */
    limit?: number
  }

  /**
   * Recipe updateManyAndReturn
   */
  export type RecipeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to update.
     */
    limit?: number
  }

  /**
   * Recipe upsert
   */
  export type RecipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The filter to search for the Recipe to update in case it exists.
     */
    where: RecipeWhereUniqueInput
    /**
     * In case the Recipe found by the `where` argument doesn't exist, create a new Recipe with this data.
     */
    create: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
    /**
     * In case the Recipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
  }

  /**
   * Recipe delete
   */
  export type RecipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Filter which Recipe to delete.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe deleteMany
   */
  export type RecipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipes to delete
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to delete.
     */
    limit?: number
  }

  /**
   * Recipe without action
   */
  export type RecipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
  }


  /**
   * Model QAEntry
   */

  export type AggregateQAEntry = {
    _count: QAEntryCountAggregateOutputType | null
    _min: QAEntryMinAggregateOutputType | null
    _max: QAEntryMaxAggregateOutputType | null
  }

  export type QAEntryMinAggregateOutputType = {
    id: string | null
    question: string | null
    answerType: $Enums.AnswerType | null
    answerText: string | null
    answerAudioPath: string | null
    isPrivate: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type QAEntryMaxAggregateOutputType = {
    id: string | null
    question: string | null
    answerType: $Enums.AnswerType | null
    answerText: string | null
    answerAudioPath: string | null
    isPrivate: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type QAEntryCountAggregateOutputType = {
    id: number
    question: number
    answerType: number
    answerText: number
    answerAudioPath: number
    isPrivate: number
    createdAt: number
    updatedAt: number
    isActive: number
    _all: number
  }


  export type QAEntryMinAggregateInputType = {
    id?: true
    question?: true
    answerType?: true
    answerText?: true
    answerAudioPath?: true
    isPrivate?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type QAEntryMaxAggregateInputType = {
    id?: true
    question?: true
    answerType?: true
    answerText?: true
    answerAudioPath?: true
    isPrivate?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type QAEntryCountAggregateInputType = {
    id?: true
    question?: true
    answerType?: true
    answerText?: true
    answerAudioPath?: true
    isPrivate?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    _all?: true
  }

  export type QAEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QAEntry to aggregate.
     */
    where?: QAEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QAEntries to fetch.
     */
    orderBy?: QAEntryOrderByWithRelationInput | QAEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QAEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QAEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QAEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QAEntries
    **/
    _count?: true | QAEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QAEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QAEntryMaxAggregateInputType
  }

  export type GetQAEntryAggregateType<T extends QAEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateQAEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQAEntry[P]>
      : GetScalarType<T[P], AggregateQAEntry[P]>
  }




  export type QAEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QAEntryWhereInput
    orderBy?: QAEntryOrderByWithAggregationInput | QAEntryOrderByWithAggregationInput[]
    by: QAEntryScalarFieldEnum[] | QAEntryScalarFieldEnum
    having?: QAEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QAEntryCountAggregateInputType | true
    _min?: QAEntryMinAggregateInputType
    _max?: QAEntryMaxAggregateInputType
  }

  export type QAEntryGroupByOutputType = {
    id: string
    question: string
    answerType: $Enums.AnswerType
    answerText: string | null
    answerAudioPath: string | null
    isPrivate: boolean
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    _count: QAEntryCountAggregateOutputType | null
    _min: QAEntryMinAggregateOutputType | null
    _max: QAEntryMaxAggregateOutputType | null
  }

  type GetQAEntryGroupByPayload<T extends QAEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QAEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QAEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QAEntryGroupByOutputType[P]>
            : GetScalarType<T[P], QAEntryGroupByOutputType[P]>
        }
      >
    >


  export type QAEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    answerType?: boolean
    answerText?: boolean
    answerAudioPath?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["qAEntry"]>

  export type QAEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    answerType?: boolean
    answerText?: boolean
    answerAudioPath?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["qAEntry"]>

  export type QAEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    answerType?: boolean
    answerText?: boolean
    answerAudioPath?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["qAEntry"]>

  export type QAEntrySelectScalar = {
    id?: boolean
    question?: boolean
    answerType?: boolean
    answerText?: boolean
    answerAudioPath?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }

  export type QAEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question" | "answerType" | "answerText" | "answerAudioPath" | "isPrivate" | "createdAt" | "updatedAt" | "isActive", ExtArgs["result"]["qAEntry"]>

  export type $QAEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QAEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      question: string
      answerType: $Enums.AnswerType
      answerText: string | null
      answerAudioPath: string | null
      isPrivate: boolean
      createdAt: Date
      updatedAt: Date
      isActive: boolean
    }, ExtArgs["result"]["qAEntry"]>
    composites: {}
  }

  type QAEntryGetPayload<S extends boolean | null | undefined | QAEntryDefaultArgs> = $Result.GetResult<Prisma.$QAEntryPayload, S>

  type QAEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QAEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QAEntryCountAggregateInputType | true
    }

  export interface QAEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QAEntry'], meta: { name: 'QAEntry' } }
    /**
     * Find zero or one QAEntry that matches the filter.
     * @param {QAEntryFindUniqueArgs} args - Arguments to find a QAEntry
     * @example
     * // Get one QAEntry
     * const qAEntry = await prisma.qAEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QAEntryFindUniqueArgs>(args: SelectSubset<T, QAEntryFindUniqueArgs<ExtArgs>>): Prisma__QAEntryClient<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QAEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QAEntryFindUniqueOrThrowArgs} args - Arguments to find a QAEntry
     * @example
     * // Get one QAEntry
     * const qAEntry = await prisma.qAEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QAEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, QAEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QAEntryClient<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QAEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QAEntryFindFirstArgs} args - Arguments to find a QAEntry
     * @example
     * // Get one QAEntry
     * const qAEntry = await prisma.qAEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QAEntryFindFirstArgs>(args?: SelectSubset<T, QAEntryFindFirstArgs<ExtArgs>>): Prisma__QAEntryClient<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QAEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QAEntryFindFirstOrThrowArgs} args - Arguments to find a QAEntry
     * @example
     * // Get one QAEntry
     * const qAEntry = await prisma.qAEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QAEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, QAEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__QAEntryClient<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QAEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QAEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QAEntries
     * const qAEntries = await prisma.qAEntry.findMany()
     * 
     * // Get first 10 QAEntries
     * const qAEntries = await prisma.qAEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qAEntryWithIdOnly = await prisma.qAEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QAEntryFindManyArgs>(args?: SelectSubset<T, QAEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QAEntry.
     * @param {QAEntryCreateArgs} args - Arguments to create a QAEntry.
     * @example
     * // Create one QAEntry
     * const QAEntry = await prisma.qAEntry.create({
     *   data: {
     *     // ... data to create a QAEntry
     *   }
     * })
     * 
     */
    create<T extends QAEntryCreateArgs>(args: SelectSubset<T, QAEntryCreateArgs<ExtArgs>>): Prisma__QAEntryClient<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QAEntries.
     * @param {QAEntryCreateManyArgs} args - Arguments to create many QAEntries.
     * @example
     * // Create many QAEntries
     * const qAEntry = await prisma.qAEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QAEntryCreateManyArgs>(args?: SelectSubset<T, QAEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QAEntries and returns the data saved in the database.
     * @param {QAEntryCreateManyAndReturnArgs} args - Arguments to create many QAEntries.
     * @example
     * // Create many QAEntries
     * const qAEntry = await prisma.qAEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QAEntries and only return the `id`
     * const qAEntryWithIdOnly = await prisma.qAEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QAEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, QAEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QAEntry.
     * @param {QAEntryDeleteArgs} args - Arguments to delete one QAEntry.
     * @example
     * // Delete one QAEntry
     * const QAEntry = await prisma.qAEntry.delete({
     *   where: {
     *     // ... filter to delete one QAEntry
     *   }
     * })
     * 
     */
    delete<T extends QAEntryDeleteArgs>(args: SelectSubset<T, QAEntryDeleteArgs<ExtArgs>>): Prisma__QAEntryClient<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QAEntry.
     * @param {QAEntryUpdateArgs} args - Arguments to update one QAEntry.
     * @example
     * // Update one QAEntry
     * const qAEntry = await prisma.qAEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QAEntryUpdateArgs>(args: SelectSubset<T, QAEntryUpdateArgs<ExtArgs>>): Prisma__QAEntryClient<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QAEntries.
     * @param {QAEntryDeleteManyArgs} args - Arguments to filter QAEntries to delete.
     * @example
     * // Delete a few QAEntries
     * const { count } = await prisma.qAEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QAEntryDeleteManyArgs>(args?: SelectSubset<T, QAEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QAEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QAEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QAEntries
     * const qAEntry = await prisma.qAEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QAEntryUpdateManyArgs>(args: SelectSubset<T, QAEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QAEntries and returns the data updated in the database.
     * @param {QAEntryUpdateManyAndReturnArgs} args - Arguments to update many QAEntries.
     * @example
     * // Update many QAEntries
     * const qAEntry = await prisma.qAEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QAEntries and only return the `id`
     * const qAEntryWithIdOnly = await prisma.qAEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QAEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, QAEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QAEntry.
     * @param {QAEntryUpsertArgs} args - Arguments to update or create a QAEntry.
     * @example
     * // Update or create a QAEntry
     * const qAEntry = await prisma.qAEntry.upsert({
     *   create: {
     *     // ... data to create a QAEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QAEntry we want to update
     *   }
     * })
     */
    upsert<T extends QAEntryUpsertArgs>(args: SelectSubset<T, QAEntryUpsertArgs<ExtArgs>>): Prisma__QAEntryClient<$Result.GetResult<Prisma.$QAEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QAEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QAEntryCountArgs} args - Arguments to filter QAEntries to count.
     * @example
     * // Count the number of QAEntries
     * const count = await prisma.qAEntry.count({
     *   where: {
     *     // ... the filter for the QAEntries we want to count
     *   }
     * })
    **/
    count<T extends QAEntryCountArgs>(
      args?: Subset<T, QAEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QAEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QAEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QAEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QAEntryAggregateArgs>(args: Subset<T, QAEntryAggregateArgs>): Prisma.PrismaPromise<GetQAEntryAggregateType<T>>

    /**
     * Group by QAEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QAEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QAEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QAEntryGroupByArgs['orderBy'] }
        : { orderBy?: QAEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QAEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQAEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QAEntry model
   */
  readonly fields: QAEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QAEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QAEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QAEntry model
   */
  interface QAEntryFieldRefs {
    readonly id: FieldRef<"QAEntry", 'String'>
    readonly question: FieldRef<"QAEntry", 'String'>
    readonly answerType: FieldRef<"QAEntry", 'AnswerType'>
    readonly answerText: FieldRef<"QAEntry", 'String'>
    readonly answerAudioPath: FieldRef<"QAEntry", 'String'>
    readonly isPrivate: FieldRef<"QAEntry", 'Boolean'>
    readonly createdAt: FieldRef<"QAEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"QAEntry", 'DateTime'>
    readonly isActive: FieldRef<"QAEntry", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * QAEntry findUnique
   */
  export type QAEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * Filter, which QAEntry to fetch.
     */
    where: QAEntryWhereUniqueInput
  }

  /**
   * QAEntry findUniqueOrThrow
   */
  export type QAEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * Filter, which QAEntry to fetch.
     */
    where: QAEntryWhereUniqueInput
  }

  /**
   * QAEntry findFirst
   */
  export type QAEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * Filter, which QAEntry to fetch.
     */
    where?: QAEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QAEntries to fetch.
     */
    orderBy?: QAEntryOrderByWithRelationInput | QAEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QAEntries.
     */
    cursor?: QAEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QAEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QAEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QAEntries.
     */
    distinct?: QAEntryScalarFieldEnum | QAEntryScalarFieldEnum[]
  }

  /**
   * QAEntry findFirstOrThrow
   */
  export type QAEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * Filter, which QAEntry to fetch.
     */
    where?: QAEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QAEntries to fetch.
     */
    orderBy?: QAEntryOrderByWithRelationInput | QAEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QAEntries.
     */
    cursor?: QAEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QAEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QAEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QAEntries.
     */
    distinct?: QAEntryScalarFieldEnum | QAEntryScalarFieldEnum[]
  }

  /**
   * QAEntry findMany
   */
  export type QAEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * Filter, which QAEntries to fetch.
     */
    where?: QAEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QAEntries to fetch.
     */
    orderBy?: QAEntryOrderByWithRelationInput | QAEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QAEntries.
     */
    cursor?: QAEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QAEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QAEntries.
     */
    skip?: number
    distinct?: QAEntryScalarFieldEnum | QAEntryScalarFieldEnum[]
  }

  /**
   * QAEntry create
   */
  export type QAEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * The data needed to create a QAEntry.
     */
    data: XOR<QAEntryCreateInput, QAEntryUncheckedCreateInput>
  }

  /**
   * QAEntry createMany
   */
  export type QAEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QAEntries.
     */
    data: QAEntryCreateManyInput | QAEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QAEntry createManyAndReturn
   */
  export type QAEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * The data used to create many QAEntries.
     */
    data: QAEntryCreateManyInput | QAEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QAEntry update
   */
  export type QAEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * The data needed to update a QAEntry.
     */
    data: XOR<QAEntryUpdateInput, QAEntryUncheckedUpdateInput>
    /**
     * Choose, which QAEntry to update.
     */
    where: QAEntryWhereUniqueInput
  }

  /**
   * QAEntry updateMany
   */
  export type QAEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QAEntries.
     */
    data: XOR<QAEntryUpdateManyMutationInput, QAEntryUncheckedUpdateManyInput>
    /**
     * Filter which QAEntries to update
     */
    where?: QAEntryWhereInput
    /**
     * Limit how many QAEntries to update.
     */
    limit?: number
  }

  /**
   * QAEntry updateManyAndReturn
   */
  export type QAEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * The data used to update QAEntries.
     */
    data: XOR<QAEntryUpdateManyMutationInput, QAEntryUncheckedUpdateManyInput>
    /**
     * Filter which QAEntries to update
     */
    where?: QAEntryWhereInput
    /**
     * Limit how many QAEntries to update.
     */
    limit?: number
  }

  /**
   * QAEntry upsert
   */
  export type QAEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * The filter to search for the QAEntry to update in case it exists.
     */
    where: QAEntryWhereUniqueInput
    /**
     * In case the QAEntry found by the `where` argument doesn't exist, create a new QAEntry with this data.
     */
    create: XOR<QAEntryCreateInput, QAEntryUncheckedCreateInput>
    /**
     * In case the QAEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QAEntryUpdateInput, QAEntryUncheckedUpdateInput>
  }

  /**
   * QAEntry delete
   */
  export type QAEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
    /**
     * Filter which QAEntry to delete.
     */
    where: QAEntryWhereUniqueInput
  }

  /**
   * QAEntry deleteMany
   */
  export type QAEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QAEntries to delete
     */
    where?: QAEntryWhereInput
    /**
     * Limit how many QAEntries to delete.
     */
    limit?: number
  }

  /**
   * QAEntry without action
   */
  export type QAEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QAEntry
     */
    select?: QAEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QAEntry
     */
    omit?: QAEntryOmit<ExtArgs> | null
  }


  /**
   * Model UserQuestion
   */

  export type AggregateUserQuestion = {
    _count: UserQuestionCountAggregateOutputType | null
    _min: UserQuestionMinAggregateOutputType | null
    _max: UserQuestionMaxAggregateOutputType | null
  }

  export type UserQuestionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    question: string | null
    isAnswered: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserQuestionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    question: string | null
    isAnswered: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserQuestionCountAggregateOutputType = {
    id: number
    userId: number
    question: number
    isAnswered: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserQuestionMinAggregateInputType = {
    id?: true
    userId?: true
    question?: true
    isAnswered?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserQuestionMaxAggregateInputType = {
    id?: true
    userId?: true
    question?: true
    isAnswered?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserQuestionCountAggregateInputType = {
    id?: true
    userId?: true
    question?: true
    isAnswered?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserQuestion to aggregate.
     */
    where?: UserQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuestions to fetch.
     */
    orderBy?: UserQuestionOrderByWithRelationInput | UserQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserQuestions
    **/
    _count?: true | UserQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserQuestionMaxAggregateInputType
  }

  export type GetUserQuestionAggregateType<T extends UserQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserQuestion[P]>
      : GetScalarType<T[P], AggregateUserQuestion[P]>
  }




  export type UserQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserQuestionWhereInput
    orderBy?: UserQuestionOrderByWithAggregationInput | UserQuestionOrderByWithAggregationInput[]
    by: UserQuestionScalarFieldEnum[] | UserQuestionScalarFieldEnum
    having?: UserQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserQuestionCountAggregateInputType | true
    _min?: UserQuestionMinAggregateInputType
    _max?: UserQuestionMaxAggregateInputType
  }

  export type UserQuestionGroupByOutputType = {
    id: string
    userId: string
    question: string
    isAnswered: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserQuestionCountAggregateOutputType | null
    _min: UserQuestionMinAggregateOutputType | null
    _max: UserQuestionMaxAggregateOutputType | null
  }

  type GetUserQuestionGroupByPayload<T extends UserQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], UserQuestionGroupByOutputType[P]>
        }
      >
    >


  export type UserQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    question?: boolean
    isAnswered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userQuestion"]>

  export type UserQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    question?: boolean
    isAnswered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userQuestion"]>

  export type UserQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    question?: boolean
    isAnswered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userQuestion"]>

  export type UserQuestionSelectScalar = {
    id?: boolean
    userId?: boolean
    question?: boolean
    isAnswered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "question" | "isAnswered" | "createdAt" | "updatedAt", ExtArgs["result"]["userQuestion"]>
  export type UserQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserQuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserQuestion"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      question: string
      isAnswered: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userQuestion"]>
    composites: {}
  }

  type UserQuestionGetPayload<S extends boolean | null | undefined | UserQuestionDefaultArgs> = $Result.GetResult<Prisma.$UserQuestionPayload, S>

  type UserQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserQuestionCountAggregateInputType | true
    }

  export interface UserQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserQuestion'], meta: { name: 'UserQuestion' } }
    /**
     * Find zero or one UserQuestion that matches the filter.
     * @param {UserQuestionFindUniqueArgs} args - Arguments to find a UserQuestion
     * @example
     * // Get one UserQuestion
     * const userQuestion = await prisma.userQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserQuestionFindUniqueArgs>(args: SelectSubset<T, UserQuestionFindUniqueArgs<ExtArgs>>): Prisma__UserQuestionClient<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserQuestionFindUniqueOrThrowArgs} args - Arguments to find a UserQuestion
     * @example
     * // Get one UserQuestion
     * const userQuestion = await prisma.userQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserQuestionClient<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionFindFirstArgs} args - Arguments to find a UserQuestion
     * @example
     * // Get one UserQuestion
     * const userQuestion = await prisma.userQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserQuestionFindFirstArgs>(args?: SelectSubset<T, UserQuestionFindFirstArgs<ExtArgs>>): Prisma__UserQuestionClient<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionFindFirstOrThrowArgs} args - Arguments to find a UserQuestion
     * @example
     * // Get one UserQuestion
     * const userQuestion = await prisma.userQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserQuestionClient<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserQuestions
     * const userQuestions = await prisma.userQuestion.findMany()
     * 
     * // Get first 10 UserQuestions
     * const userQuestions = await prisma.userQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userQuestionWithIdOnly = await prisma.userQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserQuestionFindManyArgs>(args?: SelectSubset<T, UserQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserQuestion.
     * @param {UserQuestionCreateArgs} args - Arguments to create a UserQuestion.
     * @example
     * // Create one UserQuestion
     * const UserQuestion = await prisma.userQuestion.create({
     *   data: {
     *     // ... data to create a UserQuestion
     *   }
     * })
     * 
     */
    create<T extends UserQuestionCreateArgs>(args: SelectSubset<T, UserQuestionCreateArgs<ExtArgs>>): Prisma__UserQuestionClient<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserQuestions.
     * @param {UserQuestionCreateManyArgs} args - Arguments to create many UserQuestions.
     * @example
     * // Create many UserQuestions
     * const userQuestion = await prisma.userQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserQuestionCreateManyArgs>(args?: SelectSubset<T, UserQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserQuestions and returns the data saved in the database.
     * @param {UserQuestionCreateManyAndReturnArgs} args - Arguments to create many UserQuestions.
     * @example
     * // Create many UserQuestions
     * const userQuestion = await prisma.userQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserQuestions and only return the `id`
     * const userQuestionWithIdOnly = await prisma.userQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserQuestion.
     * @param {UserQuestionDeleteArgs} args - Arguments to delete one UserQuestion.
     * @example
     * // Delete one UserQuestion
     * const UserQuestion = await prisma.userQuestion.delete({
     *   where: {
     *     // ... filter to delete one UserQuestion
     *   }
     * })
     * 
     */
    delete<T extends UserQuestionDeleteArgs>(args: SelectSubset<T, UserQuestionDeleteArgs<ExtArgs>>): Prisma__UserQuestionClient<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserQuestion.
     * @param {UserQuestionUpdateArgs} args - Arguments to update one UserQuestion.
     * @example
     * // Update one UserQuestion
     * const userQuestion = await prisma.userQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserQuestionUpdateArgs>(args: SelectSubset<T, UserQuestionUpdateArgs<ExtArgs>>): Prisma__UserQuestionClient<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserQuestions.
     * @param {UserQuestionDeleteManyArgs} args - Arguments to filter UserQuestions to delete.
     * @example
     * // Delete a few UserQuestions
     * const { count } = await prisma.userQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserQuestionDeleteManyArgs>(args?: SelectSubset<T, UserQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserQuestions
     * const userQuestion = await prisma.userQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserQuestionUpdateManyArgs>(args: SelectSubset<T, UserQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserQuestions and returns the data updated in the database.
     * @param {UserQuestionUpdateManyAndReturnArgs} args - Arguments to update many UserQuestions.
     * @example
     * // Update many UserQuestions
     * const userQuestion = await prisma.userQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserQuestions and only return the `id`
     * const userQuestionWithIdOnly = await prisma.userQuestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserQuestion.
     * @param {UserQuestionUpsertArgs} args - Arguments to update or create a UserQuestion.
     * @example
     * // Update or create a UserQuestion
     * const userQuestion = await prisma.userQuestion.upsert({
     *   create: {
     *     // ... data to create a UserQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserQuestion we want to update
     *   }
     * })
     */
    upsert<T extends UserQuestionUpsertArgs>(args: SelectSubset<T, UserQuestionUpsertArgs<ExtArgs>>): Prisma__UserQuestionClient<$Result.GetResult<Prisma.$UserQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionCountArgs} args - Arguments to filter UserQuestions to count.
     * @example
     * // Count the number of UserQuestions
     * const count = await prisma.userQuestion.count({
     *   where: {
     *     // ... the filter for the UserQuestions we want to count
     *   }
     * })
    **/
    count<T extends UserQuestionCountArgs>(
      args?: Subset<T, UserQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserQuestionAggregateArgs>(args: Subset<T, UserQuestionAggregateArgs>): Prisma.PrismaPromise<GetUserQuestionAggregateType<T>>

    /**
     * Group by UserQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserQuestionGroupByArgs['orderBy'] }
        : { orderBy?: UserQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserQuestion model
   */
  readonly fields: UserQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserQuestion model
   */
  interface UserQuestionFieldRefs {
    readonly id: FieldRef<"UserQuestion", 'String'>
    readonly userId: FieldRef<"UserQuestion", 'String'>
    readonly question: FieldRef<"UserQuestion", 'String'>
    readonly isAnswered: FieldRef<"UserQuestion", 'Boolean'>
    readonly createdAt: FieldRef<"UserQuestion", 'DateTime'>
    readonly updatedAt: FieldRef<"UserQuestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserQuestion findUnique
   */
  export type UserQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestion to fetch.
     */
    where: UserQuestionWhereUniqueInput
  }

  /**
   * UserQuestion findUniqueOrThrow
   */
  export type UserQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestion to fetch.
     */
    where: UserQuestionWhereUniqueInput
  }

  /**
   * UserQuestion findFirst
   */
  export type UserQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestion to fetch.
     */
    where?: UserQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuestions to fetch.
     */
    orderBy?: UserQuestionOrderByWithRelationInput | UserQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserQuestions.
     */
    cursor?: UserQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserQuestions.
     */
    distinct?: UserQuestionScalarFieldEnum | UserQuestionScalarFieldEnum[]
  }

  /**
   * UserQuestion findFirstOrThrow
   */
  export type UserQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestion to fetch.
     */
    where?: UserQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuestions to fetch.
     */
    orderBy?: UserQuestionOrderByWithRelationInput | UserQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserQuestions.
     */
    cursor?: UserQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserQuestions.
     */
    distinct?: UserQuestionScalarFieldEnum | UserQuestionScalarFieldEnum[]
  }

  /**
   * UserQuestion findMany
   */
  export type UserQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    /**
     * Filter, which UserQuestions to fetch.
     */
    where?: UserQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuestions to fetch.
     */
    orderBy?: UserQuestionOrderByWithRelationInput | UserQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserQuestions.
     */
    cursor?: UserQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuestions.
     */
    skip?: number
    distinct?: UserQuestionScalarFieldEnum | UserQuestionScalarFieldEnum[]
  }

  /**
   * UserQuestion create
   */
  export type UserQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserQuestion.
     */
    data: XOR<UserQuestionCreateInput, UserQuestionUncheckedCreateInput>
  }

  /**
   * UserQuestion createMany
   */
  export type UserQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserQuestions.
     */
    data: UserQuestionCreateManyInput | UserQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserQuestion createManyAndReturn
   */
  export type UserQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many UserQuestions.
     */
    data: UserQuestionCreateManyInput | UserQuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserQuestion update
   */
  export type UserQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserQuestion.
     */
    data: XOR<UserQuestionUpdateInput, UserQuestionUncheckedUpdateInput>
    /**
     * Choose, which UserQuestion to update.
     */
    where: UserQuestionWhereUniqueInput
  }

  /**
   * UserQuestion updateMany
   */
  export type UserQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserQuestions.
     */
    data: XOR<UserQuestionUpdateManyMutationInput, UserQuestionUncheckedUpdateManyInput>
    /**
     * Filter which UserQuestions to update
     */
    where?: UserQuestionWhereInput
    /**
     * Limit how many UserQuestions to update.
     */
    limit?: number
  }

  /**
   * UserQuestion updateManyAndReturn
   */
  export type UserQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * The data used to update UserQuestions.
     */
    data: XOR<UserQuestionUpdateManyMutationInput, UserQuestionUncheckedUpdateManyInput>
    /**
     * Filter which UserQuestions to update
     */
    where?: UserQuestionWhereInput
    /**
     * Limit how many UserQuestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserQuestion upsert
   */
  export type UserQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserQuestion to update in case it exists.
     */
    where: UserQuestionWhereUniqueInput
    /**
     * In case the UserQuestion found by the `where` argument doesn't exist, create a new UserQuestion with this data.
     */
    create: XOR<UserQuestionCreateInput, UserQuestionUncheckedCreateInput>
    /**
     * In case the UserQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserQuestionUpdateInput, UserQuestionUncheckedUpdateInput>
  }

  /**
   * UserQuestion delete
   */
  export type UserQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
    /**
     * Filter which UserQuestion to delete.
     */
    where: UserQuestionWhereUniqueInput
  }

  /**
   * UserQuestion deleteMany
   */
  export type UserQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserQuestions to delete
     */
    where?: UserQuestionWhereInput
    /**
     * Limit how many UserQuestions to delete.
     */
    limit?: number
  }

  /**
   * UserQuestion without action
   */
  export type UserQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuestion
     */
    select?: UserQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuestion
     */
    omit?: UserQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuestionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    subscriptionEndDate: 'subscriptionEndDate',
    isActive: 'isActive'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProgramVideoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    videoPath: 'videoPath',
    thumbnailPath: 'thumbnailPath',
    sequenceNumber: 'sequenceNumber',
    durationSeconds: 'durationSeconds',
    videoType: 'videoType',
    youtubeId: 'youtubeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive'
  };

  export type ProgramVideoScalarFieldEnum = (typeof ProgramVideoScalarFieldEnum)[keyof typeof ProgramVideoScalarFieldEnum]


  export const VideoProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    videoId: 'videoId',
    watchedSeconds: 'watchedSeconds',
    isCompleted: 'isCompleted',
    lastWatchedAt: 'lastWatchedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VideoProgressScalarFieldEnum = (typeof VideoProgressScalarFieldEnum)[keyof typeof VideoProgressScalarFieldEnum]


  export const RecipeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    recipeType: 'recipeType',
    youtubeUrl: 'youtubeUrl',
    videoPath: 'videoPath',
    thumbnailPath: 'thumbnailPath',
    calories: 'calories',
    protein: 'protein',
    carbs: 'carbs',
    fat: 'fat',
    mealType: 'mealType',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive'
  };

  export type RecipeScalarFieldEnum = (typeof RecipeScalarFieldEnum)[keyof typeof RecipeScalarFieldEnum]


  export const QAEntryScalarFieldEnum: {
    id: 'id',
    question: 'question',
    answerType: 'answerType',
    answerText: 'answerText',
    answerAudioPath: 'answerAudioPath',
    isPrivate: 'isPrivate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive'
  };

  export type QAEntryScalarFieldEnum = (typeof QAEntryScalarFieldEnum)[keyof typeof QAEntryScalarFieldEnum]


  export const UserQuestionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    question: 'question',
    isAnswered: 'isAnswered',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserQuestionScalarFieldEnum = (typeof UserQuestionScalarFieldEnum)[keyof typeof UserQuestionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RecipeType'
   */
  export type EnumRecipeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecipeType'>
    


  /**
   * Reference to a field of type 'RecipeType[]'
   */
  export type ListEnumRecipeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecipeType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'AnswerType'
   */
  export type EnumAnswerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnswerType'>
    


  /**
   * Reference to a field of type 'AnswerType[]'
   */
  export type ListEnumAnswerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnswerType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscriptionEndDate?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    videoProgress?: VideoProgressListRelationFilter
    userQuestions?: UserQuestionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionEndDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    videoProgress?: VideoProgressOrderByRelationAggregateInput
    userQuestions?: UserQuestionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscriptionEndDate?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    videoProgress?: VideoProgressListRelationFilter
    userQuestions?: UserQuestionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionEndDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    subscriptionEndDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type ProgramVideoWhereInput = {
    AND?: ProgramVideoWhereInput | ProgramVideoWhereInput[]
    OR?: ProgramVideoWhereInput[]
    NOT?: ProgramVideoWhereInput | ProgramVideoWhereInput[]
    id?: StringFilter<"ProgramVideo"> | string
    title?: StringFilter<"ProgramVideo"> | string
    description?: StringNullableFilter<"ProgramVideo"> | string | null
    videoPath?: StringFilter<"ProgramVideo"> | string
    thumbnailPath?: StringNullableFilter<"ProgramVideo"> | string | null
    sequenceNumber?: IntFilter<"ProgramVideo"> | number
    durationSeconds?: IntNullableFilter<"ProgramVideo"> | number | null
    videoType?: StringNullableFilter<"ProgramVideo"> | string | null
    youtubeId?: StringNullableFilter<"ProgramVideo"> | string | null
    createdAt?: DateTimeFilter<"ProgramVideo"> | Date | string
    updatedAt?: DateTimeFilter<"ProgramVideo"> | Date | string
    isActive?: BoolFilter<"ProgramVideo"> | boolean
    videoProgress?: VideoProgressListRelationFilter
  }

  export type ProgramVideoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    videoPath?: SortOrder
    thumbnailPath?: SortOrderInput | SortOrder
    sequenceNumber?: SortOrder
    durationSeconds?: SortOrderInput | SortOrder
    videoType?: SortOrderInput | SortOrder
    youtubeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    videoProgress?: VideoProgressOrderByRelationAggregateInput
  }

  export type ProgramVideoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgramVideoWhereInput | ProgramVideoWhereInput[]
    OR?: ProgramVideoWhereInput[]
    NOT?: ProgramVideoWhereInput | ProgramVideoWhereInput[]
    title?: StringFilter<"ProgramVideo"> | string
    description?: StringNullableFilter<"ProgramVideo"> | string | null
    videoPath?: StringFilter<"ProgramVideo"> | string
    thumbnailPath?: StringNullableFilter<"ProgramVideo"> | string | null
    sequenceNumber?: IntFilter<"ProgramVideo"> | number
    durationSeconds?: IntNullableFilter<"ProgramVideo"> | number | null
    videoType?: StringNullableFilter<"ProgramVideo"> | string | null
    youtubeId?: StringNullableFilter<"ProgramVideo"> | string | null
    createdAt?: DateTimeFilter<"ProgramVideo"> | Date | string
    updatedAt?: DateTimeFilter<"ProgramVideo"> | Date | string
    isActive?: BoolFilter<"ProgramVideo"> | boolean
    videoProgress?: VideoProgressListRelationFilter
  }, "id">

  export type ProgramVideoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    videoPath?: SortOrder
    thumbnailPath?: SortOrderInput | SortOrder
    sequenceNumber?: SortOrder
    durationSeconds?: SortOrderInput | SortOrder
    videoType?: SortOrderInput | SortOrder
    youtubeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    _count?: ProgramVideoCountOrderByAggregateInput
    _avg?: ProgramVideoAvgOrderByAggregateInput
    _max?: ProgramVideoMaxOrderByAggregateInput
    _min?: ProgramVideoMinOrderByAggregateInput
    _sum?: ProgramVideoSumOrderByAggregateInput
  }

  export type ProgramVideoScalarWhereWithAggregatesInput = {
    AND?: ProgramVideoScalarWhereWithAggregatesInput | ProgramVideoScalarWhereWithAggregatesInput[]
    OR?: ProgramVideoScalarWhereWithAggregatesInput[]
    NOT?: ProgramVideoScalarWhereWithAggregatesInput | ProgramVideoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProgramVideo"> | string
    title?: StringWithAggregatesFilter<"ProgramVideo"> | string
    description?: StringNullableWithAggregatesFilter<"ProgramVideo"> | string | null
    videoPath?: StringWithAggregatesFilter<"ProgramVideo"> | string
    thumbnailPath?: StringNullableWithAggregatesFilter<"ProgramVideo"> | string | null
    sequenceNumber?: IntWithAggregatesFilter<"ProgramVideo"> | number
    durationSeconds?: IntNullableWithAggregatesFilter<"ProgramVideo"> | number | null
    videoType?: StringNullableWithAggregatesFilter<"ProgramVideo"> | string | null
    youtubeId?: StringNullableWithAggregatesFilter<"ProgramVideo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProgramVideo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProgramVideo"> | Date | string
    isActive?: BoolWithAggregatesFilter<"ProgramVideo"> | boolean
  }

  export type VideoProgressWhereInput = {
    AND?: VideoProgressWhereInput | VideoProgressWhereInput[]
    OR?: VideoProgressWhereInput[]
    NOT?: VideoProgressWhereInput | VideoProgressWhereInput[]
    id?: StringFilter<"VideoProgress"> | string
    userId?: StringFilter<"VideoProgress"> | string
    videoId?: StringFilter<"VideoProgress"> | string
    watchedSeconds?: IntFilter<"VideoProgress"> | number
    isCompleted?: BoolFilter<"VideoProgress"> | boolean
    lastWatchedAt?: DateTimeFilter<"VideoProgress"> | Date | string
    createdAt?: DateTimeFilter<"VideoProgress"> | Date | string
    updatedAt?: DateTimeFilter<"VideoProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    video?: XOR<ProgramVideoScalarRelationFilter, ProgramVideoWhereInput>
  }

  export type VideoProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    watchedSeconds?: SortOrder
    isCompleted?: SortOrder
    lastWatchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    video?: ProgramVideoOrderByWithRelationInput
  }

  export type VideoProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_videoId?: VideoProgressUserIdVideoIdCompoundUniqueInput
    AND?: VideoProgressWhereInput | VideoProgressWhereInput[]
    OR?: VideoProgressWhereInput[]
    NOT?: VideoProgressWhereInput | VideoProgressWhereInput[]
    userId?: StringFilter<"VideoProgress"> | string
    videoId?: StringFilter<"VideoProgress"> | string
    watchedSeconds?: IntFilter<"VideoProgress"> | number
    isCompleted?: BoolFilter<"VideoProgress"> | boolean
    lastWatchedAt?: DateTimeFilter<"VideoProgress"> | Date | string
    createdAt?: DateTimeFilter<"VideoProgress"> | Date | string
    updatedAt?: DateTimeFilter<"VideoProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    video?: XOR<ProgramVideoScalarRelationFilter, ProgramVideoWhereInput>
  }, "id" | "userId_videoId">

  export type VideoProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    watchedSeconds?: SortOrder
    isCompleted?: SortOrder
    lastWatchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VideoProgressCountOrderByAggregateInput
    _avg?: VideoProgressAvgOrderByAggregateInput
    _max?: VideoProgressMaxOrderByAggregateInput
    _min?: VideoProgressMinOrderByAggregateInput
    _sum?: VideoProgressSumOrderByAggregateInput
  }

  export type VideoProgressScalarWhereWithAggregatesInput = {
    AND?: VideoProgressScalarWhereWithAggregatesInput | VideoProgressScalarWhereWithAggregatesInput[]
    OR?: VideoProgressScalarWhereWithAggregatesInput[]
    NOT?: VideoProgressScalarWhereWithAggregatesInput | VideoProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VideoProgress"> | string
    userId?: StringWithAggregatesFilter<"VideoProgress"> | string
    videoId?: StringWithAggregatesFilter<"VideoProgress"> | string
    watchedSeconds?: IntWithAggregatesFilter<"VideoProgress"> | number
    isCompleted?: BoolWithAggregatesFilter<"VideoProgress"> | boolean
    lastWatchedAt?: DateTimeWithAggregatesFilter<"VideoProgress"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"VideoProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VideoProgress"> | Date | string
  }

  export type RecipeWhereInput = {
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    id?: StringFilter<"Recipe"> | string
    title?: StringFilter<"Recipe"> | string
    description?: StringNullableFilter<"Recipe"> | string | null
    recipeType?: EnumRecipeTypeFilter<"Recipe"> | $Enums.RecipeType
    youtubeUrl?: StringNullableFilter<"Recipe"> | string | null
    videoPath?: StringNullableFilter<"Recipe"> | string | null
    thumbnailPath?: StringNullableFilter<"Recipe"> | string | null
    calories?: IntNullableFilter<"Recipe"> | number | null
    protein?: FloatNullableFilter<"Recipe"> | number | null
    carbs?: FloatNullableFilter<"Recipe"> | number | null
    fat?: FloatNullableFilter<"Recipe"> | number | null
    mealType?: StringNullableFilter<"Recipe"> | string | null
    tags?: StringNullableListFilter<"Recipe">
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    isActive?: BoolFilter<"Recipe"> | boolean
  }

  export type RecipeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    recipeType?: SortOrder
    youtubeUrl?: SortOrderInput | SortOrder
    videoPath?: SortOrderInput | SortOrder
    thumbnailPath?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    protein?: SortOrderInput | SortOrder
    carbs?: SortOrderInput | SortOrder
    fat?: SortOrderInput | SortOrder
    mealType?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type RecipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    title?: StringFilter<"Recipe"> | string
    description?: StringNullableFilter<"Recipe"> | string | null
    recipeType?: EnumRecipeTypeFilter<"Recipe"> | $Enums.RecipeType
    youtubeUrl?: StringNullableFilter<"Recipe"> | string | null
    videoPath?: StringNullableFilter<"Recipe"> | string | null
    thumbnailPath?: StringNullableFilter<"Recipe"> | string | null
    calories?: IntNullableFilter<"Recipe"> | number | null
    protein?: FloatNullableFilter<"Recipe"> | number | null
    carbs?: FloatNullableFilter<"Recipe"> | number | null
    fat?: FloatNullableFilter<"Recipe"> | number | null
    mealType?: StringNullableFilter<"Recipe"> | string | null
    tags?: StringNullableListFilter<"Recipe">
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    isActive?: BoolFilter<"Recipe"> | boolean
  }, "id">

  export type RecipeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    recipeType?: SortOrder
    youtubeUrl?: SortOrderInput | SortOrder
    videoPath?: SortOrderInput | SortOrder
    thumbnailPath?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    protein?: SortOrderInput | SortOrder
    carbs?: SortOrderInput | SortOrder
    fat?: SortOrderInput | SortOrder
    mealType?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    _count?: RecipeCountOrderByAggregateInput
    _avg?: RecipeAvgOrderByAggregateInput
    _max?: RecipeMaxOrderByAggregateInput
    _min?: RecipeMinOrderByAggregateInput
    _sum?: RecipeSumOrderByAggregateInput
  }

  export type RecipeScalarWhereWithAggregatesInput = {
    AND?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    OR?: RecipeScalarWhereWithAggregatesInput[]
    NOT?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recipe"> | string
    title?: StringWithAggregatesFilter<"Recipe"> | string
    description?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    recipeType?: EnumRecipeTypeWithAggregatesFilter<"Recipe"> | $Enums.RecipeType
    youtubeUrl?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    videoPath?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    thumbnailPath?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    calories?: IntNullableWithAggregatesFilter<"Recipe"> | number | null
    protein?: FloatNullableWithAggregatesFilter<"Recipe"> | number | null
    carbs?: FloatNullableWithAggregatesFilter<"Recipe"> | number | null
    fat?: FloatNullableWithAggregatesFilter<"Recipe"> | number | null
    mealType?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    tags?: StringNullableListFilter<"Recipe">
    createdAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Recipe"> | boolean
  }

  export type QAEntryWhereInput = {
    AND?: QAEntryWhereInput | QAEntryWhereInput[]
    OR?: QAEntryWhereInput[]
    NOT?: QAEntryWhereInput | QAEntryWhereInput[]
    id?: StringFilter<"QAEntry"> | string
    question?: StringFilter<"QAEntry"> | string
    answerType?: EnumAnswerTypeFilter<"QAEntry"> | $Enums.AnswerType
    answerText?: StringNullableFilter<"QAEntry"> | string | null
    answerAudioPath?: StringNullableFilter<"QAEntry"> | string | null
    isPrivate?: BoolFilter<"QAEntry"> | boolean
    createdAt?: DateTimeFilter<"QAEntry"> | Date | string
    updatedAt?: DateTimeFilter<"QAEntry"> | Date | string
    isActive?: BoolFilter<"QAEntry"> | boolean
  }

  export type QAEntryOrderByWithRelationInput = {
    id?: SortOrder
    question?: SortOrder
    answerType?: SortOrder
    answerText?: SortOrderInput | SortOrder
    answerAudioPath?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type QAEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QAEntryWhereInput | QAEntryWhereInput[]
    OR?: QAEntryWhereInput[]
    NOT?: QAEntryWhereInput | QAEntryWhereInput[]
    question?: StringFilter<"QAEntry"> | string
    answerType?: EnumAnswerTypeFilter<"QAEntry"> | $Enums.AnswerType
    answerText?: StringNullableFilter<"QAEntry"> | string | null
    answerAudioPath?: StringNullableFilter<"QAEntry"> | string | null
    isPrivate?: BoolFilter<"QAEntry"> | boolean
    createdAt?: DateTimeFilter<"QAEntry"> | Date | string
    updatedAt?: DateTimeFilter<"QAEntry"> | Date | string
    isActive?: BoolFilter<"QAEntry"> | boolean
  }, "id">

  export type QAEntryOrderByWithAggregationInput = {
    id?: SortOrder
    question?: SortOrder
    answerType?: SortOrder
    answerText?: SortOrderInput | SortOrder
    answerAudioPath?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    _count?: QAEntryCountOrderByAggregateInput
    _max?: QAEntryMaxOrderByAggregateInput
    _min?: QAEntryMinOrderByAggregateInput
  }

  export type QAEntryScalarWhereWithAggregatesInput = {
    AND?: QAEntryScalarWhereWithAggregatesInput | QAEntryScalarWhereWithAggregatesInput[]
    OR?: QAEntryScalarWhereWithAggregatesInput[]
    NOT?: QAEntryScalarWhereWithAggregatesInput | QAEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QAEntry"> | string
    question?: StringWithAggregatesFilter<"QAEntry"> | string
    answerType?: EnumAnswerTypeWithAggregatesFilter<"QAEntry"> | $Enums.AnswerType
    answerText?: StringNullableWithAggregatesFilter<"QAEntry"> | string | null
    answerAudioPath?: StringNullableWithAggregatesFilter<"QAEntry"> | string | null
    isPrivate?: BoolWithAggregatesFilter<"QAEntry"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"QAEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QAEntry"> | Date | string
    isActive?: BoolWithAggregatesFilter<"QAEntry"> | boolean
  }

  export type UserQuestionWhereInput = {
    AND?: UserQuestionWhereInput | UserQuestionWhereInput[]
    OR?: UserQuestionWhereInput[]
    NOT?: UserQuestionWhereInput | UserQuestionWhereInput[]
    id?: StringFilter<"UserQuestion"> | string
    userId?: StringFilter<"UserQuestion"> | string
    question?: StringFilter<"UserQuestion"> | string
    isAnswered?: BoolFilter<"UserQuestion"> | boolean
    createdAt?: DateTimeFilter<"UserQuestion"> | Date | string
    updatedAt?: DateTimeFilter<"UserQuestion"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserQuestionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    isAnswered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserQuestionWhereInput | UserQuestionWhereInput[]
    OR?: UserQuestionWhereInput[]
    NOT?: UserQuestionWhereInput | UserQuestionWhereInput[]
    userId?: StringFilter<"UserQuestion"> | string
    question?: StringFilter<"UserQuestion"> | string
    isAnswered?: BoolFilter<"UserQuestion"> | boolean
    createdAt?: DateTimeFilter<"UserQuestion"> | Date | string
    updatedAt?: DateTimeFilter<"UserQuestion"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    isAnswered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserQuestionCountOrderByAggregateInput
    _max?: UserQuestionMaxOrderByAggregateInput
    _min?: UserQuestionMinOrderByAggregateInput
  }

  export type UserQuestionScalarWhereWithAggregatesInput = {
    AND?: UserQuestionScalarWhereWithAggregatesInput | UserQuestionScalarWhereWithAggregatesInput[]
    OR?: UserQuestionScalarWhereWithAggregatesInput[]
    NOT?: UserQuestionScalarWhereWithAggregatesInput | UserQuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserQuestion"> | string
    userId?: StringWithAggregatesFilter<"UserQuestion"> | string
    question?: StringWithAggregatesFilter<"UserQuestion"> | string
    isAnswered?: BoolWithAggregatesFilter<"UserQuestion"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserQuestion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserQuestion"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionEndDate?: Date | string | null
    isActive?: boolean
    videoProgress?: VideoProgressCreateNestedManyWithoutUserInput
    userQuestions?: UserQuestionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionEndDate?: Date | string | null
    isActive?: boolean
    videoProgress?: VideoProgressUncheckedCreateNestedManyWithoutUserInput
    userQuestions?: UserQuestionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    videoProgress?: VideoProgressUpdateManyWithoutUserNestedInput
    userQuestions?: UserQuestionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    videoProgress?: VideoProgressUncheckedUpdateManyWithoutUserNestedInput
    userQuestions?: UserQuestionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionEndDate?: Date | string | null
    isActive?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgramVideoCreateInput = {
    id?: string
    title: string
    description?: string | null
    videoPath: string
    thumbnailPath?: string | null
    sequenceNumber: number
    durationSeconds?: number | null
    videoType?: string | null
    youtubeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    videoProgress?: VideoProgressCreateNestedManyWithoutVideoInput
  }

  export type ProgramVideoUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    videoPath: string
    thumbnailPath?: string | null
    sequenceNumber: number
    durationSeconds?: number | null
    videoType?: string | null
    youtubeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    videoProgress?: VideoProgressUncheckedCreateNestedManyWithoutVideoInput
  }

  export type ProgramVideoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: StringFieldUpdateOperationsInput | string
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    videoType?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    videoProgress?: VideoProgressUpdateManyWithoutVideoNestedInput
  }

  export type ProgramVideoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: StringFieldUpdateOperationsInput | string
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    videoType?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    videoProgress?: VideoProgressUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type ProgramVideoCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    videoPath: string
    thumbnailPath?: string | null
    sequenceNumber: number
    durationSeconds?: number | null
    videoType?: string | null
    youtubeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type ProgramVideoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: StringFieldUpdateOperationsInput | string
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    videoType?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgramVideoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: StringFieldUpdateOperationsInput | string
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    videoType?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VideoProgressCreateInput = {
    id?: string
    watchedSeconds?: number
    isCompleted?: boolean
    lastWatchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutVideoProgressInput
    video: ProgramVideoCreateNestedOneWithoutVideoProgressInput
  }

  export type VideoProgressUncheckedCreateInput = {
    id?: string
    userId: string
    videoId: string
    watchedSeconds?: number
    isCompleted?: boolean
    lastWatchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVideoProgressNestedInput
    video?: ProgramVideoUpdateOneRequiredWithoutVideoProgressNestedInput
  }

  export type VideoProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoProgressCreateManyInput = {
    id?: string
    userId: string
    videoId: string
    watchedSeconds?: number
    isCompleted?: boolean
    lastWatchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeCreateInput = {
    id?: string
    title: string
    description?: string | null
    recipeType: $Enums.RecipeType
    youtubeUrl?: string | null
    videoPath?: string | null
    thumbnailPath?: string | null
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    mealType?: string | null
    tags?: RecipeCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type RecipeUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    recipeType: $Enums.RecipeType
    youtubeUrl?: string | null
    videoPath?: string | null
    thumbnailPath?: string | null
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    mealType?: string | null
    tags?: RecipeCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type RecipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recipeType?: EnumRecipeTypeFieldUpdateOperationsInput | $Enums.RecipeType
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: RecipeUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RecipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recipeType?: EnumRecipeTypeFieldUpdateOperationsInput | $Enums.RecipeType
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: RecipeUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RecipeCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    recipeType: $Enums.RecipeType
    youtubeUrl?: string | null
    videoPath?: string | null
    thumbnailPath?: string | null
    calories?: number | null
    protein?: number | null
    carbs?: number | null
    fat?: number | null
    mealType?: string | null
    tags?: RecipeCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type RecipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recipeType?: EnumRecipeTypeFieldUpdateOperationsInput | $Enums.RecipeType
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: RecipeUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RecipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    recipeType?: EnumRecipeTypeFieldUpdateOperationsInput | $Enums.RecipeType
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    protein?: NullableFloatFieldUpdateOperationsInput | number | null
    carbs?: NullableFloatFieldUpdateOperationsInput | number | null
    fat?: NullableFloatFieldUpdateOperationsInput | number | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: RecipeUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QAEntryCreateInput = {
    id?: string
    question: string
    answerType: $Enums.AnswerType
    answerText?: string | null
    answerAudioPath?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type QAEntryUncheckedCreateInput = {
    id?: string
    question: string
    answerType: $Enums.AnswerType
    answerText?: string | null
    answerAudioPath?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type QAEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answerType?: EnumAnswerTypeFieldUpdateOperationsInput | $Enums.AnswerType
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    answerAudioPath?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QAEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answerType?: EnumAnswerTypeFieldUpdateOperationsInput | $Enums.AnswerType
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    answerAudioPath?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QAEntryCreateManyInput = {
    id?: string
    question: string
    answerType: $Enums.AnswerType
    answerText?: string | null
    answerAudioPath?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type QAEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answerType?: EnumAnswerTypeFieldUpdateOperationsInput | $Enums.AnswerType
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    answerAudioPath?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QAEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answerType?: EnumAnswerTypeFieldUpdateOperationsInput | $Enums.AnswerType
    answerText?: NullableStringFieldUpdateOperationsInput | string | null
    answerAudioPath?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserQuestionCreateInput = {
    id?: string
    question: string
    isAnswered?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserQuestionsInput
  }

  export type UserQuestionUncheckedCreateInput = {
    id?: string
    userId: string
    question: string
    isAnswered?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserQuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserQuestionsNestedInput
  }

  export type UserQuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionCreateManyInput = {
    id?: string
    userId: string
    question: string
    isAnswered?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserQuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type VideoProgressListRelationFilter = {
    every?: VideoProgressWhereInput
    some?: VideoProgressWhereInput
    none?: VideoProgressWhereInput
  }

  export type UserQuestionListRelationFilter = {
    every?: UserQuestionWhereInput
    some?: UserQuestionWhereInput
    none?: UserQuestionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VideoProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionEndDate?: SortOrder
    isActive?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionEndDate?: SortOrder
    isActive?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptionEndDate?: SortOrder
    isActive?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ProgramVideoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    videoPath?: SortOrder
    thumbnailPath?: SortOrder
    sequenceNumber?: SortOrder
    durationSeconds?: SortOrder
    videoType?: SortOrder
    youtubeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type ProgramVideoAvgOrderByAggregateInput = {
    sequenceNumber?: SortOrder
    durationSeconds?: SortOrder
  }

  export type ProgramVideoMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    videoPath?: SortOrder
    thumbnailPath?: SortOrder
    sequenceNumber?: SortOrder
    durationSeconds?: SortOrder
    videoType?: SortOrder
    youtubeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type ProgramVideoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    videoPath?: SortOrder
    thumbnailPath?: SortOrder
    sequenceNumber?: SortOrder
    durationSeconds?: SortOrder
    videoType?: SortOrder
    youtubeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type ProgramVideoSumOrderByAggregateInput = {
    sequenceNumber?: SortOrder
    durationSeconds?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProgramVideoScalarRelationFilter = {
    is?: ProgramVideoWhereInput
    isNot?: ProgramVideoWhereInput
  }

  export type VideoProgressUserIdVideoIdCompoundUniqueInput = {
    userId: string
    videoId: string
  }

  export type VideoProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    watchedSeconds?: SortOrder
    isCompleted?: SortOrder
    lastWatchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoProgressAvgOrderByAggregateInput = {
    watchedSeconds?: SortOrder
  }

  export type VideoProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    watchedSeconds?: SortOrder
    isCompleted?: SortOrder
    lastWatchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    watchedSeconds?: SortOrder
    isCompleted?: SortOrder
    lastWatchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoProgressSumOrderByAggregateInput = {
    watchedSeconds?: SortOrder
  }

  export type EnumRecipeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeType | EnumRecipeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecipeType[] | ListEnumRecipeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecipeType[] | ListEnumRecipeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecipeTypeFilter<$PrismaModel> | $Enums.RecipeType
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type RecipeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    recipeType?: SortOrder
    youtubeUrl?: SortOrder
    videoPath?: SortOrder
    thumbnailPath?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    mealType?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type RecipeAvgOrderByAggregateInput = {
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
  }

  export type RecipeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    recipeType?: SortOrder
    youtubeUrl?: SortOrder
    videoPath?: SortOrder
    thumbnailPath?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    mealType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type RecipeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    recipeType?: SortOrder
    youtubeUrl?: SortOrder
    videoPath?: SortOrder
    thumbnailPath?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    mealType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type RecipeSumOrderByAggregateInput = {
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
  }

  export type EnumRecipeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeType | EnumRecipeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecipeType[] | ListEnumRecipeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecipeType[] | ListEnumRecipeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecipeTypeWithAggregatesFilter<$PrismaModel> | $Enums.RecipeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecipeTypeFilter<$PrismaModel>
    _max?: NestedEnumRecipeTypeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumAnswerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerType | EnumAnswerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerType[] | ListEnumAnswerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerType[] | ListEnumAnswerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerTypeFilter<$PrismaModel> | $Enums.AnswerType
  }

  export type QAEntryCountOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answerType?: SortOrder
    answerText?: SortOrder
    answerAudioPath?: SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type QAEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answerType?: SortOrder
    answerText?: SortOrder
    answerAudioPath?: SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type QAEntryMinOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answerType?: SortOrder
    answerText?: SortOrder
    answerAudioPath?: SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type EnumAnswerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerType | EnumAnswerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerType[] | ListEnumAnswerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerType[] | ListEnumAnswerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnswerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnswerTypeFilter<$PrismaModel>
    _max?: NestedEnumAnswerTypeFilter<$PrismaModel>
  }

  export type UserQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    isAnswered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    isAnswered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    question?: SortOrder
    isAnswered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoProgressCreateWithoutUserInput, VideoProgressUncheckedCreateWithoutUserInput> | VideoProgressCreateWithoutUserInput[] | VideoProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoProgressCreateOrConnectWithoutUserInput | VideoProgressCreateOrConnectWithoutUserInput[]
    createMany?: VideoProgressCreateManyUserInputEnvelope
    connect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
  }

  export type UserQuestionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserQuestionCreateWithoutUserInput, UserQuestionUncheckedCreateWithoutUserInput> | UserQuestionCreateWithoutUserInput[] | UserQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserQuestionCreateOrConnectWithoutUserInput | UserQuestionCreateOrConnectWithoutUserInput[]
    createMany?: UserQuestionCreateManyUserInputEnvelope
    connect?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
  }

  export type VideoProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VideoProgressCreateWithoutUserInput, VideoProgressUncheckedCreateWithoutUserInput> | VideoProgressCreateWithoutUserInput[] | VideoProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoProgressCreateOrConnectWithoutUserInput | VideoProgressCreateOrConnectWithoutUserInput[]
    createMany?: VideoProgressCreateManyUserInputEnvelope
    connect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
  }

  export type UserQuestionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserQuestionCreateWithoutUserInput, UserQuestionUncheckedCreateWithoutUserInput> | UserQuestionCreateWithoutUserInput[] | UserQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserQuestionCreateOrConnectWithoutUserInput | UserQuestionCreateOrConnectWithoutUserInput[]
    createMany?: UserQuestionCreateManyUserInputEnvelope
    connect?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type VideoProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoProgressCreateWithoutUserInput, VideoProgressUncheckedCreateWithoutUserInput> | VideoProgressCreateWithoutUserInput[] | VideoProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoProgressCreateOrConnectWithoutUserInput | VideoProgressCreateOrConnectWithoutUserInput[]
    upsert?: VideoProgressUpsertWithWhereUniqueWithoutUserInput | VideoProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoProgressCreateManyUserInputEnvelope
    set?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    disconnect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    delete?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    connect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    update?: VideoProgressUpdateWithWhereUniqueWithoutUserInput | VideoProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoProgressUpdateManyWithWhereWithoutUserInput | VideoProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoProgressScalarWhereInput | VideoProgressScalarWhereInput[]
  }

  export type UserQuestionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserQuestionCreateWithoutUserInput, UserQuestionUncheckedCreateWithoutUserInput> | UserQuestionCreateWithoutUserInput[] | UserQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserQuestionCreateOrConnectWithoutUserInput | UserQuestionCreateOrConnectWithoutUserInput[]
    upsert?: UserQuestionUpsertWithWhereUniqueWithoutUserInput | UserQuestionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserQuestionCreateManyUserInputEnvelope
    set?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
    disconnect?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
    delete?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
    connect?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
    update?: UserQuestionUpdateWithWhereUniqueWithoutUserInput | UserQuestionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserQuestionUpdateManyWithWhereWithoutUserInput | UserQuestionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserQuestionScalarWhereInput | UserQuestionScalarWhereInput[]
  }

  export type VideoProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VideoProgressCreateWithoutUserInput, VideoProgressUncheckedCreateWithoutUserInput> | VideoProgressCreateWithoutUserInput[] | VideoProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VideoProgressCreateOrConnectWithoutUserInput | VideoProgressCreateOrConnectWithoutUserInput[]
    upsert?: VideoProgressUpsertWithWhereUniqueWithoutUserInput | VideoProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VideoProgressCreateManyUserInputEnvelope
    set?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    disconnect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    delete?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    connect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    update?: VideoProgressUpdateWithWhereUniqueWithoutUserInput | VideoProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VideoProgressUpdateManyWithWhereWithoutUserInput | VideoProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VideoProgressScalarWhereInput | VideoProgressScalarWhereInput[]
  }

  export type UserQuestionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserQuestionCreateWithoutUserInput, UserQuestionUncheckedCreateWithoutUserInput> | UserQuestionCreateWithoutUserInput[] | UserQuestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserQuestionCreateOrConnectWithoutUserInput | UserQuestionCreateOrConnectWithoutUserInput[]
    upsert?: UserQuestionUpsertWithWhereUniqueWithoutUserInput | UserQuestionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserQuestionCreateManyUserInputEnvelope
    set?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
    disconnect?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
    delete?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
    connect?: UserQuestionWhereUniqueInput | UserQuestionWhereUniqueInput[]
    update?: UserQuestionUpdateWithWhereUniqueWithoutUserInput | UserQuestionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserQuestionUpdateManyWithWhereWithoutUserInput | UserQuestionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserQuestionScalarWhereInput | UserQuestionScalarWhereInput[]
  }

  export type VideoProgressCreateNestedManyWithoutVideoInput = {
    create?: XOR<VideoProgressCreateWithoutVideoInput, VideoProgressUncheckedCreateWithoutVideoInput> | VideoProgressCreateWithoutVideoInput[] | VideoProgressUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoProgressCreateOrConnectWithoutVideoInput | VideoProgressCreateOrConnectWithoutVideoInput[]
    createMany?: VideoProgressCreateManyVideoInputEnvelope
    connect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
  }

  export type VideoProgressUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<VideoProgressCreateWithoutVideoInput, VideoProgressUncheckedCreateWithoutVideoInput> | VideoProgressCreateWithoutVideoInput[] | VideoProgressUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoProgressCreateOrConnectWithoutVideoInput | VideoProgressCreateOrConnectWithoutVideoInput[]
    createMany?: VideoProgressCreateManyVideoInputEnvelope
    connect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VideoProgressUpdateManyWithoutVideoNestedInput = {
    create?: XOR<VideoProgressCreateWithoutVideoInput, VideoProgressUncheckedCreateWithoutVideoInput> | VideoProgressCreateWithoutVideoInput[] | VideoProgressUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoProgressCreateOrConnectWithoutVideoInput | VideoProgressCreateOrConnectWithoutVideoInput[]
    upsert?: VideoProgressUpsertWithWhereUniqueWithoutVideoInput | VideoProgressUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: VideoProgressCreateManyVideoInputEnvelope
    set?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    disconnect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    delete?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    connect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    update?: VideoProgressUpdateWithWhereUniqueWithoutVideoInput | VideoProgressUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: VideoProgressUpdateManyWithWhereWithoutVideoInput | VideoProgressUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: VideoProgressScalarWhereInput | VideoProgressScalarWhereInput[]
  }

  export type VideoProgressUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<VideoProgressCreateWithoutVideoInput, VideoProgressUncheckedCreateWithoutVideoInput> | VideoProgressCreateWithoutVideoInput[] | VideoProgressUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoProgressCreateOrConnectWithoutVideoInput | VideoProgressCreateOrConnectWithoutVideoInput[]
    upsert?: VideoProgressUpsertWithWhereUniqueWithoutVideoInput | VideoProgressUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: VideoProgressCreateManyVideoInputEnvelope
    set?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    disconnect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    delete?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    connect?: VideoProgressWhereUniqueInput | VideoProgressWhereUniqueInput[]
    update?: VideoProgressUpdateWithWhereUniqueWithoutVideoInput | VideoProgressUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: VideoProgressUpdateManyWithWhereWithoutVideoInput | VideoProgressUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: VideoProgressScalarWhereInput | VideoProgressScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutVideoProgressInput = {
    create?: XOR<UserCreateWithoutVideoProgressInput, UserUncheckedCreateWithoutVideoProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutVideoProgressInput
    connect?: UserWhereUniqueInput
  }

  export type ProgramVideoCreateNestedOneWithoutVideoProgressInput = {
    create?: XOR<ProgramVideoCreateWithoutVideoProgressInput, ProgramVideoUncheckedCreateWithoutVideoProgressInput>
    connectOrCreate?: ProgramVideoCreateOrConnectWithoutVideoProgressInput
    connect?: ProgramVideoWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutVideoProgressNestedInput = {
    create?: XOR<UserCreateWithoutVideoProgressInput, UserUncheckedCreateWithoutVideoProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutVideoProgressInput
    upsert?: UserUpsertWithoutVideoProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVideoProgressInput, UserUpdateWithoutVideoProgressInput>, UserUncheckedUpdateWithoutVideoProgressInput>
  }

  export type ProgramVideoUpdateOneRequiredWithoutVideoProgressNestedInput = {
    create?: XOR<ProgramVideoCreateWithoutVideoProgressInput, ProgramVideoUncheckedCreateWithoutVideoProgressInput>
    connectOrCreate?: ProgramVideoCreateOrConnectWithoutVideoProgressInput
    upsert?: ProgramVideoUpsertWithoutVideoProgressInput
    connect?: ProgramVideoWhereUniqueInput
    update?: XOR<XOR<ProgramVideoUpdateToOneWithWhereWithoutVideoProgressInput, ProgramVideoUpdateWithoutVideoProgressInput>, ProgramVideoUncheckedUpdateWithoutVideoProgressInput>
  }

  export type RecipeCreatetagsInput = {
    set: string[]
  }

  export type EnumRecipeTypeFieldUpdateOperationsInput = {
    set?: $Enums.RecipeType
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RecipeUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumAnswerTypeFieldUpdateOperationsInput = {
    set?: $Enums.AnswerType
  }

  export type UserCreateNestedOneWithoutUserQuestionsInput = {
    create?: XOR<UserCreateWithoutUserQuestionsInput, UserUncheckedCreateWithoutUserQuestionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserQuestionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserQuestionsNestedInput = {
    create?: XOR<UserCreateWithoutUserQuestionsInput, UserUncheckedCreateWithoutUserQuestionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserQuestionsInput
    upsert?: UserUpsertWithoutUserQuestionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserQuestionsInput, UserUpdateWithoutUserQuestionsInput>, UserUncheckedUpdateWithoutUserQuestionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRecipeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeType | EnumRecipeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecipeType[] | ListEnumRecipeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecipeType[] | ListEnumRecipeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecipeTypeFilter<$PrismaModel> | $Enums.RecipeType
  }

  export type NestedEnumRecipeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeType | EnumRecipeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecipeType[] | ListEnumRecipeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecipeType[] | ListEnumRecipeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecipeTypeWithAggregatesFilter<$PrismaModel> | $Enums.RecipeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecipeTypeFilter<$PrismaModel>
    _max?: NestedEnumRecipeTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumAnswerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerType | EnumAnswerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerType[] | ListEnumAnswerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerType[] | ListEnumAnswerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerTypeFilter<$PrismaModel> | $Enums.AnswerType
  }

  export type NestedEnumAnswerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerType | EnumAnswerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerType[] | ListEnumAnswerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerType[] | ListEnumAnswerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnswerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnswerTypeFilter<$PrismaModel>
    _max?: NestedEnumAnswerTypeFilter<$PrismaModel>
  }

  export type VideoProgressCreateWithoutUserInput = {
    id?: string
    watchedSeconds?: number
    isCompleted?: boolean
    lastWatchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    video: ProgramVideoCreateNestedOneWithoutVideoProgressInput
  }

  export type VideoProgressUncheckedCreateWithoutUserInput = {
    id?: string
    videoId: string
    watchedSeconds?: number
    isCompleted?: boolean
    lastWatchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoProgressCreateOrConnectWithoutUserInput = {
    where: VideoProgressWhereUniqueInput
    create: XOR<VideoProgressCreateWithoutUserInput, VideoProgressUncheckedCreateWithoutUserInput>
  }

  export type VideoProgressCreateManyUserInputEnvelope = {
    data: VideoProgressCreateManyUserInput | VideoProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserQuestionCreateWithoutUserInput = {
    id?: string
    question: string
    isAnswered?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserQuestionUncheckedCreateWithoutUserInput = {
    id?: string
    question: string
    isAnswered?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserQuestionCreateOrConnectWithoutUserInput = {
    where: UserQuestionWhereUniqueInput
    create: XOR<UserQuestionCreateWithoutUserInput, UserQuestionUncheckedCreateWithoutUserInput>
  }

  export type UserQuestionCreateManyUserInputEnvelope = {
    data: UserQuestionCreateManyUserInput | UserQuestionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VideoProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: VideoProgressWhereUniqueInput
    update: XOR<VideoProgressUpdateWithoutUserInput, VideoProgressUncheckedUpdateWithoutUserInput>
    create: XOR<VideoProgressCreateWithoutUserInput, VideoProgressUncheckedCreateWithoutUserInput>
  }

  export type VideoProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: VideoProgressWhereUniqueInput
    data: XOR<VideoProgressUpdateWithoutUserInput, VideoProgressUncheckedUpdateWithoutUserInput>
  }

  export type VideoProgressUpdateManyWithWhereWithoutUserInput = {
    where: VideoProgressScalarWhereInput
    data: XOR<VideoProgressUpdateManyMutationInput, VideoProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type VideoProgressScalarWhereInput = {
    AND?: VideoProgressScalarWhereInput | VideoProgressScalarWhereInput[]
    OR?: VideoProgressScalarWhereInput[]
    NOT?: VideoProgressScalarWhereInput | VideoProgressScalarWhereInput[]
    id?: StringFilter<"VideoProgress"> | string
    userId?: StringFilter<"VideoProgress"> | string
    videoId?: StringFilter<"VideoProgress"> | string
    watchedSeconds?: IntFilter<"VideoProgress"> | number
    isCompleted?: BoolFilter<"VideoProgress"> | boolean
    lastWatchedAt?: DateTimeFilter<"VideoProgress"> | Date | string
    createdAt?: DateTimeFilter<"VideoProgress"> | Date | string
    updatedAt?: DateTimeFilter<"VideoProgress"> | Date | string
  }

  export type UserQuestionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserQuestionWhereUniqueInput
    update: XOR<UserQuestionUpdateWithoutUserInput, UserQuestionUncheckedUpdateWithoutUserInput>
    create: XOR<UserQuestionCreateWithoutUserInput, UserQuestionUncheckedCreateWithoutUserInput>
  }

  export type UserQuestionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserQuestionWhereUniqueInput
    data: XOR<UserQuestionUpdateWithoutUserInput, UserQuestionUncheckedUpdateWithoutUserInput>
  }

  export type UserQuestionUpdateManyWithWhereWithoutUserInput = {
    where: UserQuestionScalarWhereInput
    data: XOR<UserQuestionUpdateManyMutationInput, UserQuestionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserQuestionScalarWhereInput = {
    AND?: UserQuestionScalarWhereInput | UserQuestionScalarWhereInput[]
    OR?: UserQuestionScalarWhereInput[]
    NOT?: UserQuestionScalarWhereInput | UserQuestionScalarWhereInput[]
    id?: StringFilter<"UserQuestion"> | string
    userId?: StringFilter<"UserQuestion"> | string
    question?: StringFilter<"UserQuestion"> | string
    isAnswered?: BoolFilter<"UserQuestion"> | boolean
    createdAt?: DateTimeFilter<"UserQuestion"> | Date | string
    updatedAt?: DateTimeFilter<"UserQuestion"> | Date | string
  }

  export type VideoProgressCreateWithoutVideoInput = {
    id?: string
    watchedSeconds?: number
    isCompleted?: boolean
    lastWatchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutVideoProgressInput
  }

  export type VideoProgressUncheckedCreateWithoutVideoInput = {
    id?: string
    userId: string
    watchedSeconds?: number
    isCompleted?: boolean
    lastWatchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoProgressCreateOrConnectWithoutVideoInput = {
    where: VideoProgressWhereUniqueInput
    create: XOR<VideoProgressCreateWithoutVideoInput, VideoProgressUncheckedCreateWithoutVideoInput>
  }

  export type VideoProgressCreateManyVideoInputEnvelope = {
    data: VideoProgressCreateManyVideoInput | VideoProgressCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type VideoProgressUpsertWithWhereUniqueWithoutVideoInput = {
    where: VideoProgressWhereUniqueInput
    update: XOR<VideoProgressUpdateWithoutVideoInput, VideoProgressUncheckedUpdateWithoutVideoInput>
    create: XOR<VideoProgressCreateWithoutVideoInput, VideoProgressUncheckedCreateWithoutVideoInput>
  }

  export type VideoProgressUpdateWithWhereUniqueWithoutVideoInput = {
    where: VideoProgressWhereUniqueInput
    data: XOR<VideoProgressUpdateWithoutVideoInput, VideoProgressUncheckedUpdateWithoutVideoInput>
  }

  export type VideoProgressUpdateManyWithWhereWithoutVideoInput = {
    where: VideoProgressScalarWhereInput
    data: XOR<VideoProgressUpdateManyMutationInput, VideoProgressUncheckedUpdateManyWithoutVideoInput>
  }

  export type UserCreateWithoutVideoProgressInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionEndDate?: Date | string | null
    isActive?: boolean
    userQuestions?: UserQuestionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVideoProgressInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionEndDate?: Date | string | null
    isActive?: boolean
    userQuestions?: UserQuestionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVideoProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVideoProgressInput, UserUncheckedCreateWithoutVideoProgressInput>
  }

  export type ProgramVideoCreateWithoutVideoProgressInput = {
    id?: string
    title: string
    description?: string | null
    videoPath: string
    thumbnailPath?: string | null
    sequenceNumber: number
    durationSeconds?: number | null
    videoType?: string | null
    youtubeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type ProgramVideoUncheckedCreateWithoutVideoProgressInput = {
    id?: string
    title: string
    description?: string | null
    videoPath: string
    thumbnailPath?: string | null
    sequenceNumber: number
    durationSeconds?: number | null
    videoType?: string | null
    youtubeId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type ProgramVideoCreateOrConnectWithoutVideoProgressInput = {
    where: ProgramVideoWhereUniqueInput
    create: XOR<ProgramVideoCreateWithoutVideoProgressInput, ProgramVideoUncheckedCreateWithoutVideoProgressInput>
  }

  export type UserUpsertWithoutVideoProgressInput = {
    update: XOR<UserUpdateWithoutVideoProgressInput, UserUncheckedUpdateWithoutVideoProgressInput>
    create: XOR<UserCreateWithoutVideoProgressInput, UserUncheckedCreateWithoutVideoProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVideoProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVideoProgressInput, UserUncheckedUpdateWithoutVideoProgressInput>
  }

  export type UserUpdateWithoutVideoProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userQuestions?: UserQuestionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVideoProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userQuestions?: UserQuestionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProgramVideoUpsertWithoutVideoProgressInput = {
    update: XOR<ProgramVideoUpdateWithoutVideoProgressInput, ProgramVideoUncheckedUpdateWithoutVideoProgressInput>
    create: XOR<ProgramVideoCreateWithoutVideoProgressInput, ProgramVideoUncheckedCreateWithoutVideoProgressInput>
    where?: ProgramVideoWhereInput
  }

  export type ProgramVideoUpdateToOneWithWhereWithoutVideoProgressInput = {
    where?: ProgramVideoWhereInput
    data: XOR<ProgramVideoUpdateWithoutVideoProgressInput, ProgramVideoUncheckedUpdateWithoutVideoProgressInput>
  }

  export type ProgramVideoUpdateWithoutVideoProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: StringFieldUpdateOperationsInput | string
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    videoType?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProgramVideoUncheckedUpdateWithoutVideoProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    videoPath?: StringFieldUpdateOperationsInput | string
    thumbnailPath?: NullableStringFieldUpdateOperationsInput | string | null
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    videoType?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateWithoutUserQuestionsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionEndDate?: Date | string | null
    isActive?: boolean
    videoProgress?: VideoProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserQuestionsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionEndDate?: Date | string | null
    isActive?: boolean
    videoProgress?: VideoProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserQuestionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserQuestionsInput, UserUncheckedCreateWithoutUserQuestionsInput>
  }

  export type UserUpsertWithoutUserQuestionsInput = {
    update: XOR<UserUpdateWithoutUserQuestionsInput, UserUncheckedUpdateWithoutUserQuestionsInput>
    create: XOR<UserCreateWithoutUserQuestionsInput, UserUncheckedCreateWithoutUserQuestionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserQuestionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserQuestionsInput, UserUncheckedUpdateWithoutUserQuestionsInput>
  }

  export type UserUpdateWithoutUserQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    videoProgress?: VideoProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    videoProgress?: VideoProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VideoProgressCreateManyUserInput = {
    id?: string
    videoId: string
    watchedSeconds?: number
    isCompleted?: boolean
    lastWatchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserQuestionCreateManyUserInput = {
    id?: string
    question: string
    isAnswered?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: ProgramVideoUpdateOneRequiredWithoutVideoProgressNestedInput
  }

  export type VideoProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuestionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    isAnswered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoProgressCreateManyVideoInput = {
    id?: string
    userId: string
    watchedSeconds?: number
    isCompleted?: boolean
    lastWatchedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoProgressUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVideoProgressNestedInput
  }

  export type VideoProgressUncheckedUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoProgressUncheckedUpdateManyWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    watchedSeconds?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    lastWatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}