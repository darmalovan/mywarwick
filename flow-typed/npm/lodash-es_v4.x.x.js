// flow-typed signature: 554384bc1c2235537d0c15bf2acefe99
// flow-typed version: c5a8c20937/lodash_v4.x.x/flow_>=v0.55.x

// This was created from
// `flow-typed install lodash@4.17.4`
// and then renamed to match lodash-es

declare module "lodash-es" {
  declare type __CurriedFunction1<A, R, AA: A> = (...r: [AA]) => R;
  declare type CurriedFunction1<A, R> = __CurriedFunction1<A, R, *>;

  declare type __CurriedFunction2<A, B, R, AA: A, BB: B> = ((
    ...r: [AA]
  ) => CurriedFunction1<BB, R>) &
    ((...r: [AA, BB]) => R);
  declare type CurriedFunction2<A, B, R> = __CurriedFunction2<A, B, R, *, *>;

  declare type __CurriedFunction3<A, B, C, R, AA: A, BB: B, CC: C> = ((
    ...r: [AA]
  ) => CurriedFunction2<BB, CC, R>) &
    ((...r: [AA, BB]) => CurriedFunction1<CC, R>) &
    ((...r: [AA, BB, CC]) => R);
  declare type CurriedFunction3<A, B, C, R> = __CurriedFunction3<
    A,
    B,
    C,
    R,
    *,
    *,
    *
  >;

  declare type __CurriedFunction4<
    A,
    B,
    C,
    D,
    R,
    AA: A,
    BB: B,
    CC: C,
    DD: D
  > = ((...r: [AA]) => CurriedFunction3<BB, CC, DD, R>) &
    ((...r: [AA, BB]) => CurriedFunction2<CC, DD, R>) &
    ((...r: [AA, BB, CC]) => CurriedFunction1<DD, R>) &
    ((...r: [AA, BB, CC, DD]) => R);
  declare type CurriedFunction4<A, B, C, D, R> = __CurriedFunction4<
    A,
    B,
    C,
    D,
    R,
    *,
    *,
    *,
    *
  >;

  declare type __CurriedFunction5<
    A,
    B,
    C,
    D,
    E,
    R,
    AA: A,
    BB: B,
    CC: C,
    DD: D,
    EE: E
  > = ((...r: [AA]) => CurriedFunction4<BB, CC, DD, EE, R>) &
    ((...r: [AA, BB]) => CurriedFunction3<CC, DD, EE, R>) &
    ((...r: [AA, BB, CC]) => CurriedFunction2<DD, EE, R>) &
    ((...r: [AA, BB, CC, DD]) => CurriedFunction1<EE, R>) &
    ((...r: [AA, BB, CC, DD, EE]) => R);
  declare type CurriedFunction5<A, B, C, D, E, R> = __CurriedFunction5<
    A,
    B,
    C,
    D,
    E,
    R,
    *,
    *,
    *,
    *,
    *
  >;

  declare type __CurriedFunction6<
    A,
    B,
    C,
    D,
    E,
    F,
    R,
    AA: A,
    BB: B,
    CC: C,
    DD: D,
    EE: E,
    FF: F
  > = ((...r: [AA]) => CurriedFunction5<BB, CC, DD, EE, FF, R>) &
    ((...r: [AA, BB]) => CurriedFunction4<CC, DD, EE, FF, R>) &
    ((...r: [AA, BB, CC]) => CurriedFunction3<DD, EE, FF, R>) &
    ((...r: [AA, BB, CC, DD]) => CurriedFunction2<EE, FF, R>) &
    ((...r: [AA, BB, CC, DD, EE]) => CurriedFunction1<FF, R>) &
    ((...r: [AA, BB, CC, DD, EE, FF]) => R);
  declare type CurriedFunction6<A, B, C, D, E, F, R> = __CurriedFunction6<
    A,
    B,
    C,
    D,
    E,
    F,
    R,
    *,
    *,
    *,
    *,
    *,
    *
  >;

  declare type Curry = (<A, R>((...r: [A]) => R) => CurriedFunction1<A, R>) &
    (<A, B, R>((...r: [A, B]) => R) => CurriedFunction2<A, B, R>) &
    (<A, B, C, R>((...r: [A, B, C]) => R) => CurriedFunction3<A, B, C, R>) &
    (<A, B, C, D, R>(
      (...r: [A, B, C, D]) => R
    ) => CurriedFunction4<A, B, C, D, R>) &
    (<A, B, C, D, E, R>(
      (...r: [A, B, C, D, E]) => R
    ) => CurriedFunction5<A, B, C, D, E, R>) &
    (<A, B, C, D, E, F, R>(
      (...r: [A, B, C, D, E, F]) => R
    ) => CurriedFunction6<A, B, C, D, E, F, R>);

  declare type UnaryFn<A, R> = (a: A) => R;

  declare type TemplateSettings = {
    escape?: RegExp,
    evaluate?: RegExp,
    imports?: Object,
    interpolate?: RegExp,
    variable?: string
  };

  declare type TruncateOptions = {
    length?: number,
    omission?: string,
    separator?: RegExp | string
  };

  declare type DebounceOptions = {
    leading?: boolean,
    maxWait?: number,
    trailing?: boolean
  };

  declare type ThrottleOptions = {
    leading?: boolean,
    trailing?: boolean
  };

  declare type NestedArray<T> = Array<Array<T>>;

  declare type matchesIterateeShorthand = Object;
  declare type matchesPropertyIterateeShorthand = [string, any];
  declare type propertyIterateeShorthand = string;

  declare type OPredicate<A, O> =
    | ((value: A, key: string, object: O) => any)
    | matchesIterateeShorthand
    | matchesPropertyIterateeShorthand
    | propertyIterateeShorthand;

  declare type OIterateeWithResult<V, O, R> =
    | Object
    | string
    | ((value: V, key: string, object: O) => R);
  declare type OIteratee<O> = OIterateeWithResult<any, O, any>;
  declare type OFlatMapIteratee<T, U> = OIterateeWithResult<any, T, Array<U>>;

  declare type Predicate<T> =
    | ((value: T, index: number, array: Array<T>) => any)
    | matchesIterateeShorthand
    | matchesPropertyIterateeShorthand
    | propertyIterateeShorthand;

  declare type _ValueOnlyIteratee<T> = (value: T) => mixed;
  declare type ValueOnlyIteratee<T> = _ValueOnlyIteratee<T> | string;
  declare type _Iteratee<T> = (
    item: T,
    index: number,
    array: ?Array<T>
  ) => mixed;
  declare type Iteratee<T> = _Iteratee<T> | Object | string;
  declare type FlatMapIteratee<T, U> =
    | ((item: T, index: number, array: ?Array<T>) => Array<U>)
    | Object
    | string;
  declare type Comparator<T> = (item: T, item2: T) => boolean;

  declare type MapIterator<T, U> =
    | ((item: T, index: number, array: Array<T>) => U)
    | propertyIterateeShorthand;

  declare type OMapIterator<T, O, U> =
    | ((item: T, key: string, object: O) => U)
    | propertyIterateeShorthand;

  declare class Lodash {
    // Array
    chunk<T>(array: ?Array<T>, size?: number): Array<Array<T>>;
    compact<T, N: ?T>(array: Array<N>): Array<T>;
    concat<T>(base: Array<T>, ...elements: Array<any>): Array<T | any>;
    difference<T>(array: ?Array<T>, values?: Array<T>): Array<T>;
    differenceBy<T>(
      array: ?Array<T>,
      values: Array<T>,
      iteratee: ValueOnlyIteratee<T>
    ): T[];
    differenceWith<T>(array: T[], values: T[], comparator?: Comparator<T>): T[];
    drop<T>(array: ?Array<T>, n?: number): Array<T>;
    dropRight<T>(array: ?Array<T>, n?: number): Array<T>;
    dropRightWhile<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    dropWhile<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    fill<T, U>(
      array: ?Array<T>,
      value: U,
      start?: number,
      end?: number
    ): Array<T | U>;
    findIndex<T>(
      array: ?$ReadOnlyArray<T>,
      predicate?: Predicate<T>,
      fromIndex?: number
    ): number;
    findLastIndex<T>(
      array: ?$ReadOnlyArray<T>,
      predicate?: Predicate<T>,
      fromIndex?: number
    ): number;
    // alias of _.head
    first<T>(array: ?Array<T>): T;
    flatten<T, X>(array: Array<Array<T> | X>): Array<T | X>;
    flattenDeep<T>(array: any[]): Array<T>;
    flattenDepth(array: any[], depth?: number): any[];
    fromPairs<A, B>(pairs: Array<[A, B]>): { [key: A]: B };
    head<T>(array: ?Array<T>): T;
    indexOf<T>(array: ?Array<T>, value: T, fromIndex?: number): number;
    initial<T>(array: ?Array<T>): Array<T>;
    intersection<T>(...arrays: Array<Array<T>>): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    intersectionBy<T>(a1: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    intersectionBy<T>(
      a1: Array<T>,
      a2: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    intersectionBy<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    intersectionBy<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      a4: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    intersectionWith<T>(a1: Array<T>, comparator: Comparator<T>): Array<T>;
    intersectionWith<T>(
      a1: Array<T>,
      a2: Array<T>,
      comparator: Comparator<T>
    ): Array<T>;
    intersectionWith<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      comparator: Comparator<T>
    ): Array<T>;
    intersectionWith<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      a4: Array<T>,
      comparator: Comparator<T>
    ): Array<T>;
    join<T>(array: ?Array<T>, separator?: string): string;
    last<T>(array: ?Array<T>): T;
    lastIndexOf<T>(array: ?Array<T>, value: T, fromIndex?: number): number;
    nth<T>(array: T[], n?: number): T;
    pull<T>(array: ?Array<T>, ...values?: Array<T>): Array<T>;
    pullAll<T>(array: ?Array<T>, values: Array<T>): Array<T>;
    pullAllBy<T>(
      array: ?Array<T>,
      values: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    pullAllWith<T>(array?: T[], values: T[], comparator?: Function): T[];
    pullAt<T>(array: ?Array<T>, ...indexed?: Array<number>): Array<T>;
    pullAt<T>(array: ?Array<T>, indexed?: Array<number>): Array<T>;
    remove<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    reverse<T>(array: ?Array<T>): Array<T>;
    slice<T>(array: ?Array<T>, start?: number, end?: number): Array<T>;
    sortedIndex<T>(array: ?Array<T>, value: T): number;
    sortedIndexBy<T>(
      array: ?Array<T>,
      value: T,
      iteratee?: ValueOnlyIteratee<T>
    ): number;
    sortedIndexOf<T>(array: ?Array<T>, value: T): number;
    sortedLastIndex<T>(array: ?Array<T>, value: T): number;
    sortedLastIndexBy<T>(
      array: ?Array<T>,
      value: T,
      iteratee?: ValueOnlyIteratee<T>
    ): number;
    sortedLastIndexOf<T>(array: ?Array<T>, value: T): number;
    sortedUniq<T>(array: ?Array<T>): Array<T>;
    sortedUniqBy<T>(array: ?Array<T>, iteratee?: (value: T) => mixed): Array<T>;
    tail<T>(array: ?Array<T>): Array<T>;
    take<T>(array: ?Array<T>, n?: number): Array<T>;
    takeRight<T>(array: ?Array<T>, n?: number): Array<T>;
    takeRightWhile<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    takeWhile<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    union<T>(...arrays?: Array<Array<T>>): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    unionBy<T>(a1: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    unionBy<T>(
      a1: Array<T>,
      a2: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    unionBy<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    unionBy<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      a4: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    unionWith<T>(a1: Array<T>, comparator?: Comparator<T>): Array<T>;
    unionWith<T>(
      a1: Array<T>,
      a2: Array<T>,
      comparator?: Comparator<T>
    ): Array<T>;
    unionWith<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      comparator?: Comparator<T>
    ): Array<T>;
    unionWith<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      a4: Array<T>,
      comparator?: Comparator<T>
    ): Array<T>;
    uniq<T>(array: ?Array<T>): Array<T>;
    uniqBy<T>(array: ?Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    uniqWith<T>(array: ?Array<T>, comparator?: Comparator<T>): Array<T>;
    unzip<T>(array: ?Array<T>): Array<T>;
    unzipWith<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    without<T>(array: ?Array<T>, ...values?: Array<T>): Array<T>;
    xor<T>(...array: Array<Array<T>>): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    xorBy<T>(a1: Array<T>, iteratee?: ValueOnlyIteratee<T>): Array<T>;
    xorBy<T>(
      a1: Array<T>,
      a2: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    xorBy<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    xorBy<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      a4: Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): Array<T>;
    //Workaround until (...parameter: T, parameter2: U) works
    xorWith<T>(a1: Array<T>, comparator?: Comparator<T>): Array<T>;
    xorWith<T>(
      a1: Array<T>,
      a2: Array<T>,
      comparator?: Comparator<T>
    ): Array<T>;
    xorWith<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      comparator?: Comparator<T>
    ): Array<T>;
    xorWith<T>(
      a1: Array<T>,
      a2: Array<T>,
      a3: Array<T>,
      a4: Array<T>,
      comparator?: Comparator<T>
    ): Array<T>;
    zip<A, B>(a1: A[], a2: B[]): Array<[A, B]>;
    zip<A, B, C>(a1: A[], a2: B[], a3: C[]): Array<[A, B, C]>;
    zip<A, B, C, D>(a1: A[], a2: B[], a3: C[], a4: D[]): Array<[A, B, C, D]>;
    zip<A, B, C, D, E>(
      a1: A[],
      a2: B[],
      a3: C[],
      a4: D[],
      a5: E[]
    ): Array<[A, B, C, D, E]>;

    zipObject<K, V>(props?: Array<K>, values?: Array<V>): { [key: K]: V };
    zipObjectDeep(props?: any[], values?: any): Object;
    //Workaround until (...parameter: T, parameter2: U) works
    zipWith<T>(a1: NestedArray<T>, iteratee?: Iteratee<T>): Array<T>;
    zipWith<T>(
      a1: NestedArray<T>,
      a2: NestedArray<T>,
      iteratee?: Iteratee<T>
    ): Array<T>;
    zipWith<T>(
      a1: NestedArray<T>,
      a2: NestedArray<T>,
      a3: NestedArray<T>,
      iteratee?: Iteratee<T>
    ): Array<T>;
    zipWith<T>(
      a1: NestedArray<T>,
      a2: NestedArray<T>,
      a3: NestedArray<T>,
      a4: NestedArray<T>,
      iteratee?: Iteratee<T>
    ): Array<T>;

    // Collection
    countBy<T>(array: ?Array<T>, iteratee?: ValueOnlyIteratee<T>): Object;
    countBy<T: Object>(object: T, iteratee?: ValueOnlyIteratee<T>): Object;
    // alias of _.forEach
    each<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    each<T: Object>(object: T, iteratee?: OIteratee<T>): T;
    // alias of _.forEachRight
    eachRight<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    eachRight<T: Object>(object: T, iteratee?: OIteratee<T>): T;
    every<T>(array: ?Array<T>, iteratee?: Iteratee<T>): boolean;
    every<T: Object>(object: T, iteratee?: OIteratee<T>): boolean;
    filter<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    filter<A, T: { [id: string]: A }>(
      object: T,
      predicate?: OPredicate<A, T>
    ): Array<A>;
    find<T>(
      array: ?$ReadOnlyArray<T>,
      predicate?: Predicate<T>,
      fromIndex?: number
    ): T | void;
    find<V, A, T: { [id: string]: A }>(
      object: T,
      predicate?: OPredicate<A, T>,
      fromIndex?: number
    ): V;
    findLast<T>(
      array: ?$ReadOnlyArray<T>,
      predicate?: Predicate<T>,
      fromIndex?: number
    ): T | void;
    findLast<V, A, T: { [id: string]: A }>(
      object: T,
      predicate?: OPredicate<A, T>
    ): V;
    flatMap<T, U>(array: ?Array<T>, iteratee?: FlatMapIteratee<T, U>): Array<U>;
    flatMap<T: Object, U>(
      object: T,
      iteratee?: OFlatMapIteratee<T, U>
    ): Array<U>;
    flatMapDeep<T, U>(
      array: ?Array<T>,
      iteratee?: FlatMapIteratee<T, U>
    ): Array<U>;
    flatMapDeep<T: Object, U>(
      object: T,
      iteratee?: OFlatMapIteratee<T, U>
    ): Array<U>;
    flatMapDepth<T, U>(
      array: ?Array<T>,
      iteratee?: FlatMapIteratee<T, U>,
      depth?: number
    ): Array<U>;
    flatMapDepth<T: Object, U>(
      object: T,
      iteratee?: OFlatMapIteratee<T, U>,
      depth?: number
    ): Array<U>;
    forEach<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    forEach<T: Object>(object: T, iteratee?: OIteratee<T>): T;
    forEachRight<T>(array: ?Array<T>, iteratee?: Iteratee<T>): Array<T>;
    forEachRight<T: Object>(object: T, iteratee?: OIteratee<T>): T;
    groupBy<V, T>(
      array: ?Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): { [key: V]: Array<T> };
    groupBy<V, A, T: { [id: string]: A }>(
      object: T,
      iteratee?: ValueOnlyIteratee<A>
    ): { [key: V]: Array<A> };
    includes<T>(array: ?Array<T>, value: T, fromIndex?: number): boolean;
    includes<T: Object>(object: T, value: any, fromIndex?: number): boolean;
    includes(str: string, value: string, fromIndex?: number): boolean;
    invokeMap<T>(
      array: ?Array<T>,
      path: ((value: T) => Array<string> | string) | Array<string> | string,
      ...args?: Array<any>
    ): Array<any>;
    invokeMap<T: Object>(
      object: T,
      path: ((value: any) => Array<string> | string) | Array<string> | string,
      ...args?: Array<any>
    ): Array<any>;
    keyBy<T, V>(
      array: ?Array<T>,
      iteratee?: ValueOnlyIteratee<T>
    ): { [key: V]: ?T };
    keyBy<V, A, I, T: { [id: I]: A }>(
      object: T,
      iteratee?: ValueOnlyIteratee<A>
    ): { [key: V]: ?A };
    map<T, U>(array: ?Array<T>, iteratee?: MapIterator<T, U>): Array<U>;
    map<V, T: Object, U>(
      object: ?T,
      iteratee?: OMapIterator<V, T, U>
    ): Array<U>;
    map(
      str: ?string,
      iteratee?: (char: string, index: number, str: string) => any
    ): string;
    orderBy<T>(
      array: ?Array<T>,
      iteratees?: Array<Iteratee<T>> | string,
      orders?: Array<"asc" | "desc"> | string
    ): Array<T>;
    orderBy<V, T: Object>(
      object: T,
      iteratees?: Array<OIteratee<*>> | string,
      orders?: Array<"asc" | "desc"> | string
    ): Array<V>;
    partition<T>(
      array: ?Array<T>,
      predicate?: Predicate<T>
    ): [Array<T>, Array<T>];
    partition<V, A, T: { [id: string]: A }>(
      object: T,
      predicate?: OPredicate<A, T>
    ): [Array<V>, Array<V>];
    reduce<T, U>(
      array: ?Array<T>,
      iteratee?: (
        accumulator: U,
        value: T,
        index: number,
        array: ?Array<T>
      ) => U,
      accumulator?: U
    ): U;
    reduce<T: Object, U>(
      object: T,
      iteratee?: (accumulator: U, value: any, key: string, object: T) => U,
      accumulator?: U
    ): U;
    reduceRight<T, U>(
      array: ?Array<T>,
      iteratee?: (
        accumulator: U,
        value: T,
        index: number,
        array: ?Array<T>
      ) => U,
      accumulator?: U
    ): U;
    reduceRight<T: Object, U>(
      object: T,
      iteratee?: (accumulator: U, value: any, key: string, object: T) => U,
      accumulator?: U
    ): U;
    reject<T>(array: ?Array<T>, predicate?: Predicate<T>): Array<T>;
    reject<V: Object, A, T: { [id: string]: A }>(
      object: T,
      predicate?: OPredicate<A, T>
    ): Array<V>;
    sample<T>(array: ?Array<T>): T;
    sample<V, T: Object>(object: T): V;
    sampleSize<T>(array: ?Array<T>, n?: number): Array<T>;
    sampleSize<V, T: Object>(object: T, n?: number): Array<V>;
    shuffle<T>(array: ?Array<T>): Array<T>;
    shuffle<V, T: Object>(object: T): Array<V>;
    size(collection: Array<any> | Object): number;
    some<T>(array: ?Array<T>, predicate?: Predicate<T>): boolean;
    some<A, T: { [id: string]: A }>(
      object?: ?T,
      predicate?: OPredicate<A, T>
    ): boolean;
    sortBy<T>(array: ?Array<T>, ...iteratees?: Array<Iteratee<T>>): Array<T>;
    sortBy<T>(array: ?Array<T>, iteratees?: Array<Iteratee<T>>): Array<T>;
    sortBy<V, T: Object>(
      object: T,
      ...iteratees?: Array<OIteratee<T>>
    ): Array<V>;
    sortBy<V, T: Object>(object: T, iteratees?: Array<OIteratee<T>>): Array<V>;

    // Date
    now(): number;

    // Function
    after(n: number, fn: Function): Function;
    ary(func: Function, n?: number): Function;
    before(n: number, fn: Function): Function;
    bind(func: Function, thisArg: any, ...partials: Array<any>): Function;
    bindKey(obj: Object, key: string, ...partials: Array<any>): Function;
    curry: Curry;
    curry(func: Function, arity?: number): Function;
    curryRight(func: Function, arity?: number): Function;
    debounce<F: Function>(func: F, wait?: number, options?: DebounceOptions): F;
    defer(func: Function, ...args?: Array<any>): number;
    delay(func: Function, wait: number, ...args?: Array<any>): number;
    flip(func: Function): Function;
    memoize<F: Function>(func: F, resolver?: Function): F;
    negate(predicate: Function): Function;
    once(func: Function): Function;
    overArgs(func: Function, ...transforms: Array<Function>): Function;
    overArgs(func: Function, transforms: Array<Function>): Function;
    partial(func: Function, ...partials: any[]): Function;
    partialRight(func: Function, ...partials: Array<any>): Function;
    partialRight(func: Function, partials: Array<any>): Function;
    rearg(func: Function, ...indexes: Array<number>): Function;
    rearg(func: Function, indexes: Array<number>): Function;
    rest(func: Function, start?: number): Function;
    spread(func: Function): Function;
    throttle(
      func: Function,
      wait?: number,
      options?: ThrottleOptions
    ): Function;
    unary(func: Function): Function;
    wrap(value: any, wrapper: Function): Function;

    // Lang
    castArray(value: *): any[];
    clone<T>(value: T): T;
    cloneDeep<T>(value: T): T;
    cloneDeepWith<T, U>(
      value: T,
      customizer?: ?(value: T, key: number | string, object: T, stack: any) => U
    ): U;
    cloneWith<T, U>(
      value: T,
      customizer?: ?(value: T, key: number | string, object: T, stack: any) => U
    ): U;
    conformsTo<T: { [key: string]: mixed }>(
      source: T,
      predicates: T & { [key: string]: (x: any) => boolean }
    ): boolean;
    eq(value: any, other: any): boolean;
    gt(value: any, other: any): boolean;
    gte(value: any, other: any): boolean;
    isArguments(value: any): boolean;
    isArray(value: any): boolean;
    isArrayBuffer(value: any): boolean;
    isArrayLike(value: any): boolean;
    isArrayLikeObject(value: any): boolean;
    isBoolean(value: any): boolean;
    isBuffer(value: any): boolean;
    isDate(value: any): boolean;
    isElement(value: any): boolean;
    isEmpty(value: any): boolean;
    isEqual(value: any, other: any): boolean;
    isEqualWith<T, U>(
      value: T,
      other: U,
      customizer?: (
        objValue: any,
        otherValue: any,
        key: number | string,
        object: T,
        other: U,
        stack: any
      ) => boolean | void
    ): boolean;
    isError(value: any): boolean;
    isFinite(value: any): boolean;
    isFunction(value: Function): true;
    isFunction(value: number | string | void | null | Object): false;
    isInteger(value: any): boolean;
    isLength(value: any): boolean;
    isMap(value: any): boolean;
    isMatch(object?: ?Object, source: Object): boolean;
    isMatchWith<T: Object, U: Object>(
      object: T,
      source: U,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: number | string,
        object: T,
        source: U
      ) => boolean | void
    ): boolean;
    isNaN(value: any): boolean;
    isNative(value: any): boolean;
    isNil(value: any): boolean;
    isNull(value: any): boolean;
    isNumber(value: any): boolean;
    isObject(value: any): boolean;
    isObjectLike(value: any): boolean;
    isPlainObject(value: any): boolean;
    isRegExp(value: any): boolean;
    isSafeInteger(value: any): boolean;
    isSet(value: any): boolean;
    isString(value: string): true;
    isString(
      value: number | boolean | Function | void | null | Object | Array<any>
    ): false;
    isSymbol(value: any): boolean;
    isTypedArray(value: any): boolean;
    isUndefined(value: any): boolean;
    isWeakMap(value: any): boolean;
    isWeakSet(value: any): boolean;
    lt(value: any, other: any): boolean;
    lte(value: any, other: any): boolean;
    toArray(value: any): Array<any>;
    toFinite(value: any): number;
    toInteger(value: any): number;
    toLength(value: any): number;
    toNumber(value: any): number;
    toPlainObject(value: any): Object;
    toSafeInteger(value: any): number;
    toString(value: any): string;

    // Math
    add(augend: number, addend: number): number;
    ceil(number: number, precision?: number): number;
    divide(dividend: number, divisor: number): number;
    floor(number: number, precision?: number): number;
    max<T>(array: ?Array<T>): T;
    maxBy<T>(array: ?Array<T>, iteratee?: Iteratee<T>): T;
    mean(array: Array<*>): number;
    meanBy<T>(array: Array<T>, iteratee?: Iteratee<T>): number;
    min<T>(array: ?Array<T>): T;
    minBy<T>(array: ?Array<T>, iteratee?: Iteratee<T>): T;
    multiply(multiplier: number, multiplicand: number): number;
    round(number: number, precision?: number): number;
    subtract(minuend: number, subtrahend: number): number;
    sum(array: Array<*>): number;
    sumBy<T>(array: Array<T>, iteratee?: Iteratee<T>): number;

    // number
    clamp(number: number, lower?: number, upper: number): number;
    inRange(number: number, start?: number, end: number): boolean;
    random(lower?: number, upper?: number, floating?: boolean): number;

    // Object
    assign(object?: ?Object, ...sources?: Array<Object>): Object;
    assignIn<A, B>(a: A, b: B): A & B;
    assignIn<A, B, C>(a: A, b: B, c: C): A & B & C;
    assignIn<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
    assignIn<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
    assignInWith<T: Object, A: Object>(
      object: T,
      s1: A,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void
    ): Object;
    assignInWith<T: Object, A: Object, B: Object>(
      object: T,
      s1: A,
      s2: B,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B
      ) => any | void
    ): Object;
    assignInWith<T: Object, A: Object, B: Object, C: Object>(
      object: T,
      s1: A,
      s2: B,
      s3: C,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B | C
      ) => any | void
    ): Object;
    assignInWith<T: Object, A: Object, B: Object, C: Object, D: Object>(
      object: T,
      s1: A,
      s2: B,
      s3: C,
      s4: D,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B | C | D
      ) => any | void
    ): Object;
    assignWith<T: Object, A: Object>(
      object: T,
      s1: A,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void
    ): Object;
    assignWith<T: Object, A: Object, B: Object>(
      object: T,
      s1: A,
      s2: B,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B
      ) => any | void
    ): Object;
    assignWith<T: Object, A: Object, B: Object, C: Object>(
      object: T,
      s1: A,
      s2: B,
      s3: C,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B | C
      ) => any | void
    ): Object;
    assignWith<T: Object, A: Object, B: Object, C: Object, D: Object>(
      object: T,
      s1: A,
      s2: B,
      s3: C,
      s4: D,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B | C | D
      ) => any | void
    ): Object;
    at(object?: ?Object, ...paths: Array<string>): Array<any>;
    at(object?: ?Object, paths: Array<string>): Array<any>;
    create<T>(prototype: T, properties?: Object): $Supertype<T>;
    defaults(object?: ?Object, ...sources?: Array<Object>): Object;
    defaultsDeep(object?: ?Object, ...sources?: Array<Object>): Object;
    // alias for _.toPairs
    entries(object?: ?Object): NestedArray<any>;
    // alias for _.toPairsIn
    entriesIn(object?: ?Object): NestedArray<any>;
    // alias for _.assignIn
    extend<A, B>(a: A, b: B): A & B;
    extend<A, B, C>(a: A, b: B, c: C): A & B & C;
    extend<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
    extend<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
    // alias for _.assignInWith
    extendWith<T: Object, A: Object>(
      object: T,
      s1: A,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void
    ): Object;
    extendWith<T: Object, A: Object, B: Object>(
      object: T,
      s1: A,
      s2: B,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B
      ) => any | void
    ): Object;
    extendWith<T: Object, A: Object, B: Object, C: Object>(
      object: T,
      s1: A,
      s2: B,
      s3: C,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B | C
      ) => any | void
    ): Object;
    extendWith<T: Object, A: Object, B: Object, C: Object, D: Object>(
      object: T,
      s1: A,
      s2: B,
      s3: C,
      s4: D,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B | C | D
      ) => any | void
    ): Object;
    findKey<A, T: { [id: string]: A }>(
      object?: ?T,
      predicate?: OPredicate<A, T>
    ): string | void;
    findLastKey<A, T: { [id: string]: A }>(
      object?: ?T,
      predicate?: OPredicate<A, T>
    ): string | void;
    forIn(object?: ?Object, iteratee?: OIteratee<*>): Object;
    forInRight(object?: ?Object, iteratee?: OIteratee<*>): Object;
    forOwn(object?: ?Object, iteratee?: OIteratee<*>): Object;
    forOwnRight(object?: ?Object, iteratee?: OIteratee<*>): Object;
    functions(object?: ?Object): Array<string>;
    functionsIn(object?: ?Object): Array<string>;
    get(
      object?: ?Object | ?Array<any>,
      path?: ?Array<string> | string,
      defaultValue?: any
    ): any;
    has(object?: ?Object, path?: ?Array<string> | string): boolean;
    hasIn(object?: ?Object, path?: ?Array<string> | string): boolean;
    invert(object?: ?Object, multiVal?: boolean): Object;
    invertBy(object: ?Object, iteratee?: Function): Object;
    invoke(
      object?: ?Object,
      path?: ?Array<string> | string,
      ...args?: Array<any>
    ): any;
    keys<K>(object?: ?{ [key: K]: any }): Array<K>;
    keys(object?: ?Object): Array<string>;
    keysIn(object?: ?Object): Array<string>;
    mapKeys(object?: ?Object, iteratee?: OIteratee<*>): Object;
    mapValues(object?: ?Object, iteratee?: OIteratee<*>): Object;
    merge(object?: ?Object, ...sources?: Array<?Object>): Object;
    mergeWith<T: Object, A: Object>(
      object: T,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void
    ): Object;
    mergeWith<T: Object, A: Object, B: Object>(
      object: T,
      s1: A,
      s2: B,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B
      ) => any | void
    ): Object;
    mergeWith<T: Object, A: Object, B: Object, C: Object>(
      object: T,
      s1: A,
      s2: B,
      s3: C,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B | C
      ) => any | void
    ): Object;
    mergeWith<T: Object, A: Object, B: Object, C: Object, D: Object>(
      object: T,
      s1: A,
      s2: B,
      s3: C,
      s4: D,
      customizer?: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B | C | D
      ) => any | void
    ): Object;
    omit(object?: ?Object, ...props: Array<string>): Object;
    omit(object?: ?Object, props: Array<string>): Object;
    omitBy<A, T: { [id: string]: A }>(
      object?: ?T,
      predicate?: OPredicate<A, T>
    ): Object;
    pick(object?: ?Object, ...props: Array<string>): Object;
    pick(object?: ?Object, props: Array<string>): Object;
    pickBy<A, T: { [id: string]: A }>(
      object?: ?T,
      predicate?: OPredicate<A, T>
    ): Object;
    result(
      object?: ?Object,
      path?: ?Array<string> | string,
      defaultValue?: any
    ): any;
    set(object?: ?Object, path?: ?Array<string> | string, value: any): Object;
    setWith<T>(
      object: T,
      path?: ?Array<string> | string,
      value: any,
      customizer?: (nsValue: any, key: string, nsObject: T) => any
    ): Object;
    toPairs(object?: ?Object | Array<*>): NestedArray<any>;
    toPairsIn(object?: ?Object): NestedArray<any>;
    transform(
      collection: Object | Array<any>,
      iteratee?: OIteratee<*>,
      accumulator?: any
    ): any;
    unset(object?: ?Object, path?: ?Array<string> | string): boolean;
    update(object: Object, path: string[] | string, updater: Function): Object;
    updateWith(
      object: Object,
      path: string[] | string,
      updater: Function,
      customizer?: Function
    ): Object;
    values(object?: ?Object): Array<any>;
    valuesIn(object?: ?Object): Array<any>;

    // Seq
    // harder to read, but this is _()
    (value: any): any;
    chain<T>(value: T): any;
    tap<T>(value: T, interceptor: (value: T) => any): T;
    thru<T1, T2>(value: T1, interceptor: (value: T1) => T2): T2;
    // TODO: _.prototype.*

    // String
    camelCase(string?: ?string): string;
    capitalize(string?: string): string;
    deburr(string?: string): string;
    endsWith(string?: string, target?: string, position?: number): boolean;
    escape(string?: string): string;
    escapeRegExp(string?: string): string;
    kebabCase(string?: string): string;
    lowerCase(string?: string): string;
    lowerFirst(string?: string): string;
    pad(string?: string, length?: number, chars?: string): string;
    padEnd(string?: string, length?: number, chars?: string): string;
    padStart(string?: string, length?: number, chars?: string): string;
    parseInt(string: string, radix?: number): number;
    repeat(string?: string, n?: number): string;
    replace(
      string?: string,
      pattern: RegExp | string,
      replacement: ((string: string) => string) | string
    ): string;
    snakeCase(string?: string): string;
    split(
      string?: string,
      separator: RegExp | string,
      limit?: number
    ): Array<string>;
    startCase(string?: string): string;
    startsWith(string?: string, target?: string, position?: number): boolean;
    template(string?: string, options?: TemplateSettings): Function;
    toLower(string?: string): string;
    toUpper(string?: string): string;
    trim(string?: string, chars?: string): string;
    trimEnd(string?: string, chars?: string): string;
    trimStart(string?: string, chars?: string): string;
    truncate(string?: string, options?: TruncateOptions): string;
    unescape(string?: string): string;
    upperCase(string?: string): string;
    upperFirst(string?: string): string;
    words(string?: string, pattern?: RegExp | string): Array<string>;

    // Util
    attempt(func: Function, ...args: Array<any>): any;
    bindAll(object?: ?Object, methodNames: Array<string>): Object;
    bindAll(object?: ?Object, ...methodNames: Array<string>): Object;
    cond(pairs: NestedArray<Function>): Function;
    conforms(source: Object): Function;
    constant<T>(value: T): () => T;
    defaultTo<T1: string | boolean | Object, T2>(
      value: T1,
      defaultValue: T2
    ): T1;
    // NaN is a number instead of its own type, otherwise it would behave like null/void
    defaultTo<T1: number, T2>(value: T1, defaultValue: T2): T1 | T2;
    defaultTo<T1: void | null, T2>(value: T1, defaultValue: T2): T2;
    flow: $ComposeReverse;
    flow(funcs?: Array<Function>): Function;
    flowRight: $Compose;
    flowRight(funcs?: Array<Function>): Function;
    identity<T>(value: T): T;
    iteratee(func?: any): Function;
    matches(source: Object): Function;
    matchesProperty(path?: ?Array<string> | string, srcValue: any): Function;
    method(path?: ?Array<string> | string, ...args?: Array<any>): Function;
    methodOf(object?: ?Object, ...args?: Array<any>): Function;
    mixin<T: Function | Object>(
      object?: T,
      source: Object,
      options?: { chain: boolean }
    ): T;
    noConflict(): Lodash;
    noop(...args: Array<mixed>): void;
    nthArg(n?: number): Function;
    over(...iteratees: Array<Function>): Function;
    over(iteratees: Array<Function>): Function;
    overEvery(...predicates: Array<Function>): Function;
    overEvery(predicates: Array<Function>): Function;
    overSome(...predicates: Array<Function>): Function;
    overSome(predicates: Array<Function>): Function;
    property(path?: ?Array<string> | string): Function;
    propertyOf(object?: ?Object): Function;
    range(start: number, end: number, step?: number): Array<number>;
    range(end: number, step?: number): Array<number>;
    rangeRight(start: number, end: number, step?: number): Array<number>;
    rangeRight(end: number, step?: number): Array<number>;
    runInContext(context?: Object): Function;

    stubArray(): Array<*>;
    stubFalse(): false;
    stubObject(): {};
    stubString(): "";
    stubTrue(): true;
    times(n: number, ...rest: Array<void>): Array<number>;
    times<T>(n: number, iteratee: (i: number) => T): Array<T>;
    toPath(value: any): Array<string>;
    uniqueId(prefix?: string): string;

    // Properties
    VERSION: string;
    templateSettings: TemplateSettings;
  }

  declare var exports: Lodash;
}

declare module "lodash-es/fp" {
  declare type __CurriedFunction1<A, R, AA: A> = (...r: [AA]) => R;
  declare type CurriedFunction1<A, R> = __CurriedFunction1<A, R, *>;

  declare type __CurriedFunction2<A, B, R, AA: A, BB: B> = ((
    ...r: [AA]
  ) => CurriedFunction1<BB, R>) &
    ((...r: [AA, BB]) => R);
  declare type CurriedFunction2<A, B, R> = __CurriedFunction2<A, B, R, *, *>;

  declare type __CurriedFunction3<A, B, C, R, AA: A, BB: B, CC: C> = ((
    ...r: [AA]
  ) => CurriedFunction2<BB, CC, R>) &
    ((...r: [AA, BB]) => CurriedFunction1<CC, R>) &
    ((...r: [AA, BB, CC]) => R);
  declare type CurriedFunction3<A, B, C, R> = __CurriedFunction3<
    A,
    B,
    C,
    R,
    *,
    *,
    *
  >;

  declare type __CurriedFunction4<
    A,
    B,
    C,
    D,
    R,
    AA: A,
    BB: B,
    CC: C,
    DD: D
  > = ((...r: [AA]) => CurriedFunction3<BB, CC, DD, R>) &
    ((...r: [AA, BB]) => CurriedFunction2<CC, DD, R>) &
    ((...r: [AA, BB, CC]) => CurriedFunction1<DD, R>) &
    ((...r: [AA, BB, CC, DD]) => R);
  declare type CurriedFunction4<A, B, C, D, R> = __CurriedFunction4<
    A,
    B,
    C,
    D,
    R,
    *,
    *,
    *,
    *
  >;

  declare type __CurriedFunction5<
    A,
    B,
    C,
    D,
    E,
    R,
    AA: A,
    BB: B,
    CC: C,
    DD: D,
    EE: E
  > = ((...r: [AA]) => CurriedFunction4<BB, CC, DD, EE, R>) &
    ((...r: [AA, BB]) => CurriedFunction3<CC, DD, EE, R>) &
    ((...r: [AA, BB, CC]) => CurriedFunction2<DD, EE, R>) &
    ((...r: [AA, BB, CC, DD]) => CurriedFunction1<EE, R>) &
    ((...r: [AA, BB, CC, DD, EE]) => R);
  declare type CurriedFunction5<A, B, C, D, E, R> = __CurriedFunction5<
    A,
    B,
    C,
    D,
    E,
    R,
    *,
    *,
    *,
    *,
    *
  >;

  declare type __CurriedFunction6<
    A,
    B,
    C,
    D,
    E,
    F,
    R,
    AA: A,
    BB: B,
    CC: C,
    DD: D,
    EE: E,
    FF: F
  > = ((...r: [AA]) => CurriedFunction5<BB, CC, DD, EE, FF, R>) &
    ((...r: [AA, BB]) => CurriedFunction4<CC, DD, EE, FF, R>) &
    ((...r: [AA, BB, CC]) => CurriedFunction3<DD, EE, FF, R>) &
    ((...r: [AA, BB, CC, DD]) => CurriedFunction2<EE, FF, R>) &
    ((...r: [AA, BB, CC, DD, EE]) => CurriedFunction1<FF, R>) &
    ((...r: [AA, BB, CC, DD, EE, FF]) => R);
  declare type CurriedFunction6<A, B, C, D, E, F, R> = __CurriedFunction6<
    A,
    B,
    C,
    D,
    E,
    F,
    R,
    *,
    *,
    *,
    *,
    *,
    *
  >;

  declare type Curry = (<A, R>((...r: [A]) => R) => CurriedFunction1<A, R>) &
    (<A, B, R>((...r: [A, B]) => R) => CurriedFunction2<A, B, R>) &
    (<A, B, C, R>((...r: [A, B, C]) => R) => CurriedFunction3<A, B, C, R>) &
    (<A, B, C, D, R>(
      (...r: [A, B, C, D]) => R
    ) => CurriedFunction4<A, B, C, D, R>) &
    (<A, B, C, D, E, R>(
      (...r: [A, B, C, D, E]) => R
    ) => CurriedFunction5<A, B, C, D, E, R>) &
    (<A, B, C, D, E, F, R>(
      (...r: [A, B, C, D, E, F]) => R
    ) => CurriedFunction6<A, B, C, D, E, F, R>);

  declare type UnaryFn<A, R> = (a: A) => R;

  declare type TemplateSettings = {
    escape?: RegExp,
    evaluate?: RegExp,
    imports?: Object,
    interpolate?: RegExp,
    variable?: string
  };

  declare type TruncateOptions = {
    length?: number,
    omission?: string,
    separator?: RegExp | string
  };

  declare type DebounceOptions = {
    leading?: boolean,
    maxWait?: number,
    trailing?: boolean
  };

  declare type ThrottleOptions = {
    leading?: boolean,
    trailing?: boolean
  };

  declare type NestedArray<T> = Array<Array<T>>;

  declare type matchesIterateeShorthand = Object;
  declare type matchesPropertyIterateeShorthand = [string, any];
  declare type propertyIterateeShorthand = string;

  declare type OPredicate<A> =
    | ((value: A) => any)
    | matchesIterateeShorthand
    | matchesPropertyIterateeShorthand
    | propertyIterateeShorthand;

  declare type OIterateeWithResult<V, R> = Object | string | ((value: V) => R);
  declare type OIteratee<O> = OIterateeWithResult<any, any>;
  declare type OFlatMapIteratee<T, U> = OIterateeWithResult<any, Array<U>>;

  declare type Predicate<T> =
    | ((value: T) => any)
    | matchesIterateeShorthand
    | matchesPropertyIterateeShorthand
    | propertyIterateeShorthand;

  declare type _ValueOnlyIteratee<T> = (value: T) => mixed;
  declare type ValueOnlyIteratee<T> = _ValueOnlyIteratee<T> | string;
  declare type _Iteratee<T> = (item: T) => mixed;
  declare type Iteratee<T> = _Iteratee<T> | Object | string;
  declare type FlatMapIteratee<T, U> =
    | ((item: T) => Array<U>)
    | Object
    | string;
  declare type Comparator<T> = (item: T, item2: T) => boolean;

  declare type MapIterator<T, U> = ((item: T) => U) | propertyIterateeShorthand;

  declare type OMapIterator<T, U> =
    | ((item: T) => U)
    | propertyIterateeShorthand;

  declare class Lodash {
    // Array
    chunk<T>(size: number): (array: Array<T>) => Array<Array<T>>;
    chunk<T>(size: number, array: Array<T>): Array<Array<T>>;
    compact<T, N: T>(array: Array<N>): Array<T>;
    concat<T, U, A: Array<T> | T, B: Array<U> | U>(
      base: A
    ): (elements: B) => Array<T | U>;
    concat<T, U, A: Array<T> | T, B: Array<U> | U>(
      base: A,
      elements: B
    ): Array<T | U>;
    difference<T>(values: Array<T>): (array: Array<T>) => Array<T>;
    difference<T>(values: Array<T>, array: Array<T>): Array<T>;
    differenceBy<T>(
      iteratee: ValueOnlyIteratee<T>
    ): ((values: Array<T>) => (array: Array<T>) => T[]) &
      ((values: Array<T>, array: Array<T>) => T[]);
    differenceBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      values: Array<T>
    ): (array: Array<T>) => T[];
    differenceBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      values: Array<T>,
      array: Array<T>
    ): T[];
    differenceWith<T>(
      values: T[]
    ): ((comparator: Comparator<T>) => (array: T[]) => T[]) &
      ((comparator: Comparator<T>, array: T[]) => T[]);
    differenceWith<T>(
      values: T[],
      comparator: Comparator<T>
    ): (array: T[]) => T[];
    differenceWith<T>(values: T[], comparator: Comparator<T>, array: T[]): T[];
    drop<T>(n: number): (array: Array<T>) => Array<T>;
    drop<T>(n: number, array: Array<T>): Array<T>;
    dropLast<T>(n: number): (array: Array<T>) => Array<T>;
    dropLast<T>(n: number, array: Array<T>): Array<T>;
    dropRight<T>(n: number): (array: Array<T>) => Array<T>;
    dropRight<T>(n: number, array: Array<T>): Array<T>;
    dropRightWhile<T>(predicate: Predicate<T>): (array: Array<T>) => Array<T>;
    dropRightWhile<T>(predicate: Predicate<T>, array: Array<T>): Array<T>;
    dropWhile<T>(predicate: Predicate<T>): (array: Array<T>) => Array<T>;
    dropWhile<T>(predicate: Predicate<T>, array: Array<T>): Array<T>;
    dropLastWhile<T>(predicate: Predicate<T>): (array: Array<T>) => Array<T>;
    dropLastWhile<T>(predicate: Predicate<T>, array: Array<T>): Array<T>;
    fill<T, U>(
      start: number
    ): ((
      end: number
    ) => ((value: U) => (array: Array<T>) => Array<T | U>) &
      ((value: U, array: Array<T>) => Array<T | U>)) &
      ((end: number, value: U) => (array: Array<T>) => Array<T | U>) &
      ((end: number, value: U, array: Array<T>) => Array<T | U>);
    fill<T, U>(
      start: number,
      end: number
    ): ((value: U) => (array: Array<T>) => Array<T | U>) &
      ((value: U, array: Array<T>) => Array<T | U>);
    fill<T, U>(
      start: number,
      end: number,
      value: U
    ): (array: Array<T>) => Array<T | U>;
    fill<T, U>(
      start: number,
      end: number,
      value: U,
      array: Array<T>
    ): Array<T | U>;
    findIndex<T>(predicate: Predicate<T>): (array: $ReadOnlyArray<T>) => number;
    findIndex<T>(predicate: Predicate<T>, array: $ReadOnlyArray<T>): number;
    findIndexFrom<T>(
      predicate: Predicate<T>
    ): ((fromIndex: number) => (array: $ReadOnlyArray<T>) => number) &
      ((fromIndex: number, array: $ReadOnlyArray<T>) => number);
    findIndexFrom<T>(
      predicate: Predicate<T>,
      fromIndex: number
    ): (array: $ReadOnlyArray<T>) => number;
    findIndexFrom<T>(
      predicate: Predicate<T>,
      fromIndex: number,
      array: $ReadOnlyArray<T>
    ): number;
    findLastIndex<T>(
      predicate: Predicate<T>
    ): (array: $ReadOnlyArray<T>) => number;
    findLastIndex<T>(predicate: Predicate<T>, array: $ReadOnlyArray<T>): number;
    findLastIndexFrom<T>(
      predicate: Predicate<T>
    ): ((fromIndex: number) => (array: $ReadOnlyArray<T>) => number) &
      ((fromIndex: number, array: $ReadOnlyArray<T>) => number);
    findLastIndexFrom<T>(
      predicate: Predicate<T>,
      fromIndex: number
    ): (array: $ReadOnlyArray<T>) => number;
    findLastIndexFrom<T>(
      predicate: Predicate<T>,
      fromIndex: number,
      array: $ReadOnlyArray<T>
    ): number;
    // alias of _.head
    first<T>(array: Array<T>): T;
    flatten<T, X>(array: Array<Array<T> | X>): Array<T | X>;
    unnest<T, X>(array: Array<Array<T> | X>): Array<T | X>;
    flattenDeep<T>(array: any[]): Array<T>;
    flattenDepth(depth: number): (array: any[]) => any[];
    flattenDepth(depth: number, array: any[]): any[];
    fromPairs<A, B>(pairs: Array<[A, B]>): { [key: A]: B };
    head<T>(array: Array<T>): T;
    indexOf<T>(value: T): (array: Array<T>) => number;
    indexOf<T>(value: T, array: Array<T>): number;
    indexOfFrom<T>(
      value: T
    ): ((fromIndex: number) => (array: Array<T>) => number) &
      ((fromIndex: number, array: Array<T>) => number);
    indexOfFrom<T>(value: T, fromIndex: number): (array: Array<T>) => number;
    indexOfFrom<T>(value: T, fromIndex: number, array: Array<T>): number;
    initial<T>(array: Array<T>): Array<T>;
    init<T>(array: Array<T>): Array<T>;
    intersection<T>(a1: Array<T>): (a2: Array<T>) => Array<T>;
    intersection<T>(a1: Array<T>, a2: Array<T>): Array<T>;
    intersectionBy<T>(
      iteratee: ValueOnlyIteratee<T>
    ): ((a1: Array<T>) => (a2: Array<T>) => Array<T>) &
      ((a1: Array<T>, a2: Array<T>) => Array<T>);
    intersectionBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      a1: Array<T>
    ): (a2: Array<T>) => Array<T>;
    intersectionBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      a1: Array<T>,
      a2: Array<T>
    ): Array<T>;
    intersectionWith<T>(
      comparator: Comparator<T>
    ): ((a1: Array<T>) => (a2: Array<T>) => Array<T>) &
      ((a1: Array<T>, a2: Array<T>) => Array<T>);
    intersectionWith<T>(
      comparator: Comparator<T>,
      a1: Array<T>
    ): (a2: Array<T>) => Array<T>;
    intersectionWith<T>(
      comparator: Comparator<T>,
      a1: Array<T>,
      a2: Array<T>
    ): Array<T>;
    join<T>(separator: string): (array: Array<T>) => string;
    join<T>(separator: string, array: Array<T>): string;
    last<T>(array: Array<T>): T;
    lastIndexOf<T>(value: T): (array: Array<T>) => number;
    lastIndexOf<T>(value: T, array: Array<T>): number;
    lastIndexOfFrom<T>(
      value: T
    ): ((fromIndex: number) => (array: Array<T>) => number) &
      ((fromIndex: number, array: Array<T>) => number);
    lastIndexOfFrom<T>(
      value: T,
      fromIndex: number
    ): (array: Array<T>) => number;
    lastIndexOfFrom<T>(value: T, fromIndex: number, array: Array<T>): number;
    nth<T>(n: number): (array: T[]) => T;
    nth<T>(n: number, array: T[]): T;
    pull<T>(value: T): (array: Array<T>) => Array<T>;
    pull<T>(value: T, array: Array<T>): Array<T>;
    pullAll<T>(values: Array<T>): (array: Array<T>) => Array<T>;
    pullAll<T>(values: Array<T>, array: Array<T>): Array<T>;
    pullAllBy<T>(
      iteratee: ValueOnlyIteratee<T>
    ): ((values: Array<T>) => (array: Array<T>) => Array<T>) &
      ((values: Array<T>, array: Array<T>) => Array<T>);
    pullAllBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      values: Array<T>
    ): (array: Array<T>) => Array<T>;
    pullAllBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      values: Array<T>,
      array: Array<T>
    ): Array<T>;
    pullAllWith<T>(
      comparator: Function
    ): ((values: T[]) => (array: T[]) => T[]) &
      ((values: T[], array: T[]) => T[]);
    pullAllWith<T>(comparator: Function, values: T[]): (array: T[]) => T[];
    pullAllWith<T>(comparator: Function, values: T[], array: T[]): T[];
    pullAt<T>(indexed: Array<number>): (array: Array<T>) => Array<T>;
    pullAt<T>(indexed: Array<number>, array: Array<T>): Array<T>;
    remove<T>(predicate: Predicate<T>): (array: Array<T>) => Array<T>;
    remove<T>(predicate: Predicate<T>, array: Array<T>): Array<T>;
    reverse<T>(array: Array<T>): Array<T>;
    slice<T>(
      start: number
    ): ((end: number) => (array: Array<T>) => Array<T>) &
      ((end: number, array: Array<T>) => Array<T>);
    slice<T>(start: number, end: number): (array: Array<T>) => Array<T>;
    slice<T>(start: number, end: number, array: Array<T>): Array<T>;
    sortedIndex<T>(value: T): (array: Array<T>) => number;
    sortedIndex<T>(value: T, array: Array<T>): number;
    sortedIndexBy<T>(
      iteratee: ValueOnlyIteratee<T>
    ): ((value: T) => (array: Array<T>) => number) &
      ((value: T, array: Array<T>) => number);
    sortedIndexBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      value: T
    ): (array: Array<T>) => number;
    sortedIndexBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      value: T,
      array: Array<T>
    ): number;
    sortedIndexOf<T>(value: T): (array: Array<T>) => number;
    sortedIndexOf<T>(value: T, array: Array<T>): number;
    sortedLastIndex<T>(value: T): (array: Array<T>) => number;
    sortedLastIndex<T>(value: T, array: Array<T>): number;
    sortedLastIndexBy<T>(
      iteratee: ValueOnlyIteratee<T>
    ): ((value: T) => (array: Array<T>) => number) &
      ((value: T, array: Array<T>) => number);
    sortedLastIndexBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      value: T
    ): (array: Array<T>) => number;
    sortedLastIndexBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      value: T,
      array: Array<T>
    ): number;
    sortedLastIndexOf<T>(value: T): (array: Array<T>) => number;
    sortedLastIndexOf<T>(value: T, array: Array<T>): number;
    sortedUniq<T>(array: Array<T>): Array<T>;
    sortedUniqBy<T>(
      iteratee: (value: T) => mixed
    ): (array: Array<T>) => Array<T>;
    sortedUniqBy<T>(iteratee: (value: T) => mixed, array: Array<T>): Array<T>;
    tail<T>(array: Array<T>): Array<T>;
    take<T>(n: number): (array: Array<T>) => Array<T>;
    take<T>(n: number, array: Array<T>): Array<T>;
    takeRight<T>(n: number): (array: Array<T>) => Array<T>;
    takeRight<T>(n: number, array: Array<T>): Array<T>;
    takeLast<T>(n: number): (array: Array<T>) => Array<T>;
    takeLast<T>(n: number, array: Array<T>): Array<T>;
    takeRightWhile<T>(predicate: Predicate<T>): (array: Array<T>) => Array<T>;
    takeRightWhile<T>(predicate: Predicate<T>, array: Array<T>): Array<T>;
    takeLastWhile<T>(predicate: Predicate<T>): (array: Array<T>) => Array<T>;
    takeLastWhile<T>(predicate: Predicate<T>, array: Array<T>): Array<T>;
    takeWhile<T>(predicate: Predicate<T>): (array: Array<T>) => Array<T>;
    takeWhile<T>(predicate: Predicate<T>, array: Array<T>): Array<T>;
    union<T>(a1: Array<T>): (a2: Array<T>) => Array<T>;
    union<T>(a1: Array<T>, a2: Array<T>): Array<T>;
    unionBy<T>(
      iteratee: ValueOnlyIteratee<T>
    ): ((a1: Array<T>) => (a2: Array<T>) => Array<T>) &
      ((a1: Array<T>, a2: Array<T>) => Array<T>);
    unionBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      a1: Array<T>
    ): (a2: Array<T>) => Array<T>;
    unionBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      a1: Array<T>,
      a2: Array<T>
    ): Array<T>;
    unionWith<T>(
      comparator: Comparator<T>
    ): ((a1: Array<T>) => (a2: Array<T>) => Array<T>) &
      ((a1: Array<T>, a2: Array<T>) => Array<T>);
    unionWith<T>(
      comparator: Comparator<T>,
      a1: Array<T>
    ): (a2: Array<T>) => Array<T>;
    unionWith<T>(
      comparator: Comparator<T>,
      a1: Array<T>,
      a2: Array<T>
    ): Array<T>;
    uniq<T>(array: Array<T>): Array<T>;
    uniqBy<T>(iteratee: ValueOnlyIteratee<T>): (array: Array<T>) => Array<T>;
    uniqBy<T>(iteratee: ValueOnlyIteratee<T>, array: Array<T>): Array<T>;
    uniqWith<T>(comparator: Comparator<T>): (array: Array<T>) => Array<T>;
    uniqWith<T>(comparator: Comparator<T>, array: Array<T>): Array<T>;
    unzip<T>(array: Array<T>): Array<T>;
    unzipWith<T>(iteratee: Iteratee<T>): (array: Array<T>) => Array<T>;
    unzipWith<T>(iteratee: Iteratee<T>, array: Array<T>): Array<T>;
    without<T>(values: Array<T>): (array: Array<T>) => Array<T>;
    without<T>(values: Array<T>, array: Array<T>): Array<T>;
    xor<T>(a1: Array<T>): (a2: Array<T>) => Array<T>;
    xor<T>(a1: Array<T>, a2: Array<T>): Array<T>;
    symmetricDifference<T>(a1: Array<T>): (a2: Array<T>) => Array<T>;
    symmetricDifference<T>(a1: Array<T>, a2: Array<T>): Array<T>;
    xorBy<T>(
      iteratee: ValueOnlyIteratee<T>
    ): ((a1: Array<T>) => (a2: Array<T>) => Array<T>) &
      ((a1: Array<T>, a2: Array<T>) => Array<T>);
    xorBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      a1: Array<T>
    ): (a2: Array<T>) => Array<T>;
    xorBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      a1: Array<T>,
      a2: Array<T>
    ): Array<T>;
    symmetricDifferenceBy<T>(
      iteratee: ValueOnlyIteratee<T>
    ): ((a1: Array<T>) => (a2: Array<T>) => Array<T>) &
      ((a1: Array<T>, a2: Array<T>) => Array<T>);
    symmetricDifferenceBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      a1: Array<T>
    ): (a2: Array<T>) => Array<T>;
    symmetricDifferenceBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      a1: Array<T>,
      a2: Array<T>
    ): Array<T>;
    xorWith<T>(
      comparator: Comparator<T>
    ): ((a1: Array<T>) => (a2: Array<T>) => Array<T>) &
      ((a1: Array<T>, a2: Array<T>) => Array<T>);
    xorWith<T>(
      comparator: Comparator<T>,
      a1: Array<T>
    ): (a2: Array<T>) => Array<T>;
    xorWith<T>(comparator: Comparator<T>, a1: Array<T>, a2: Array<T>): Array<T>;
    symmetricDifferenceWith<T>(
      comparator: Comparator<T>
    ): ((a1: Array<T>) => (a2: Array<T>) => Array<T>) &
      ((a1: Array<T>, a2: Array<T>) => Array<T>);
    symmetricDifferenceWith<T>(
      comparator: Comparator<T>,
      a1: Array<T>
    ): (a2: Array<T>) => Array<T>;
    symmetricDifferenceWith<T>(
      comparator: Comparator<T>,
      a1: Array<T>,
      a2: Array<T>
    ): Array<T>;
    zip<A, B>(a1: A[]): (a2: B[]) => Array<[A, B]>;
    zip<A, B>(a1: A[], a2: B[]): Array<[A, B]>;
    zipAll(arrays: Array<Array<any>>): Array<any>;
    zipObject<K, V>(props?: Array<K>): (values?: Array<V>) => { [key: K]: V };
    zipObject<K, V>(props?: Array<K>, values?: Array<V>): { [key: K]: V };
    zipObj(props: Array<any>): (values: Array<any>) => Object;
    zipObj(props: Array<any>, values: Array<any>): Object;
    zipObjectDeep(props: any[]): (values: any) => Object;
    zipObjectDeep(props: any[], values: any): Object;
    zipWith<T>(
      iteratee: Iteratee<T>
    ): ((a1: NestedArray<T>) => (a2: NestedArray<T>) => Array<T>) &
      ((a1: NestedArray<T>, a2: NestedArray<T>) => Array<T>);
    zipWith<T>(
      iteratee: Iteratee<T>,
      a1: NestedArray<T>
    ): (a2: NestedArray<T>) => Array<T>;
    zipWith<T>(
      iteratee: Iteratee<T>,
      a1: NestedArray<T>,
      a2: NestedArray<T>
    ): Array<T>;
    // Collection
    countBy<T>(
      iteratee: ValueOnlyIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => { [string]: number };
    countBy<T>(
      iteratee: ValueOnlyIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): { [string]: number };
    // alias of _.forEach
    each<T>(
      iteratee: Iteratee<T> | OIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => Array<T>;
    each<T>(
      iteratee: Iteratee<T> | OIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): Array<T>;
    // alias of _.forEachRight
    eachRight<T>(
      iteratee: Iteratee<T> | OIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => Array<T>;
    eachRight<T>(
      iteratee: Iteratee<T> | OIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): Array<T>;
    every<T>(
      iteratee: Iteratee<T> | OIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => boolean;
    every<T>(
      iteratee: Iteratee<T> | OIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): boolean;
    all<T>(
      iteratee: Iteratee<T> | OIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => boolean;
    all<T>(
      iteratee: Iteratee<T> | OIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): boolean;
    filter<T>(
      predicate: Predicate<T> | OPredicate<T>
    ): (collection: Array<T> | { [id: any]: T }) => Array<T>;
    filter<T>(
      predicate: Predicate<T> | OPredicate<T>,
      collection: Array<T> | { [id: any]: T }
    ): Array<T>;
    find<T>(
      predicate: Predicate<T> | OPredicate<T>
    ): (collection: $ReadOnlyArray<T> | { [id: any]: T }) => T | void;
    find<T>(
      predicate: Predicate<T> | OPredicate<T>,
      collection: $ReadOnlyArray<T> | { [id: any]: T }
    ): T | void;
    findFrom<T>(
      predicate: Predicate<T> | OPredicate<T>
    ): ((
      fromIndex: number
    ) => (collection: $ReadOnlyArray<T> | { [id: any]: T }) => T | void) &
      ((
        fromIndex: number,
        collection: $ReadOnlyArray<T> | { [id: any]: T }
      ) => T | void);
    findFrom<T>(
      predicate: Predicate<T> | OPredicate<T>,
      fromIndex: number
    ): (collection: Array<T> | { [id: any]: T }) => T | void;
    findFrom<T>(
      predicate: Predicate<T> | OPredicate<T>,
      fromIndex: number,
      collection: $ReadOnlyArray<T> | { [id: any]: T }
    ): T | void;
    findLast<T>(
      predicate: Predicate<T> | OPredicate<T>
    ): (collection: $ReadOnlyArray<T> | { [id: any]: T }) => T | void;
    findLast<T>(
      predicate: Predicate<T> | OPredicate<T>,
      collection: $ReadOnlyArray<T> | { [id: any]: T }
    ): T | void;
    findLastFrom<T>(
      predicate: Predicate<T> | OPredicate<T>
    ): ((
      fromIndex: number
    ) => (collection: $ReadOnlyArray<T> | { [id: any]: T }) => T | void) &
      ((
        fromIndex: number,
        collection: $ReadOnlyArray<T> | { [id: any]: T }
      ) => T | void);
    findLastFrom<T>(
      predicate: Predicate<T> | OPredicate<T>,
      fromIndex: number
    ): (collection: $ReadOnlyArray<T> | { [id: any]: T }) => T | void;
    findLastFrom<T>(
      predicate: Predicate<T> | OPredicate<T>,
      fromIndex: number,
      collection: $ReadOnlyArray<T> | { [id: any]: T }
    ): T | void;
    flatMap<T, U>(
      iteratee: FlatMapIteratee<T, U> | OFlatMapIteratee<T, U>
    ): (collection: Array<T> | { [id: any]: T }) => Array<U>;
    flatMap<T, U>(
      iteratee: FlatMapIteratee<T, U> | OFlatMapIteratee<T, U>,
      collection: Array<T> | { [id: any]: T }
    ): Array<U>;
    flatMapDeep<T, U>(
      iteratee: FlatMapIteratee<T, U> | OFlatMapIteratee<T, U>
    ): (collection: Array<T> | { [id: any]: T }) => Array<U>;
    flatMapDeep<T, U>(
      iteratee: FlatMapIteratee<T, U> | OFlatMapIteratee<T, U>,
      collection: Array<T> | { [id: any]: T }
    ): Array<U>;
    flatMapDepth<T, U>(
      iteratee: FlatMapIteratee<T, U> | OFlatMapIteratee<T, U>
    ): ((
      depth: number
    ) => (collection: Array<T> | { [id: any]: T }) => Array<U>) &
      ((depth: number, collection: Array<T> | { [id: any]: T }) => Array<U>);
    flatMapDepth<T, U>(
      iteratee: FlatMapIteratee<T, U> | OFlatMapIteratee<T, U>,
      depth: number
    ): (collection: Array<T> | { [id: any]: T }) => Array<U>;
    flatMapDepth<T, U>(
      iteratee: FlatMapIteratee<T, U> | OFlatMapIteratee<T, U>,
      depth: number,
      collection: Array<T> | { [id: any]: T }
    ): Array<U>;
    forEach<T>(
      iteratee: Iteratee<T> | OIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => Array<T>;
    forEach<T>(
      iteratee: Iteratee<T> | OIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): Array<T>;
    forEachRight<T>(
      iteratee: Iteratee<T> | OIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => Array<T>;
    forEachRight<T>(
      iteratee: Iteratee<T> | OIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): Array<T>;
    groupBy<V, T>(
      iteratee: ValueOnlyIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => { [key: V]: Array<T> };
    groupBy<V, T>(
      iteratee: ValueOnlyIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): { [key: V]: Array<T> };
    includes(value: string): (str: string) => boolean;
    includes(value: string, str: string): boolean;
    includes<T>(value: T): (collection: Array<T> | { [id: any]: T }) => boolean;
    includes<T>(value: T, collection: Array<T> | { [id: any]: T }): boolean;
    contains(value: string): (str: string) => boolean;
    contains(value: string, str: string): boolean;
    contains<T>(value: T): (collection: Array<T> | { [id: any]: T }) => boolean;
    contains<T>(value: T, collection: Array<T> | { [id: any]: T }): boolean;
    includesFrom(
      value: string
    ): ((fromIndex: number) => (str: string) => boolean) &
      ((fromIndex: number, str: string) => boolean);
    includesFrom(value: string, fromIndex: number): (str: string) => boolean;
    includesFrom(value: string, fromIndex: number, str: string): boolean;
    includesFrom<T>(
      value: T
    ): ((fromIndex: number) => (collection: Array<T>) => boolean) &
      ((fromIndex: number, collection: Array<T>) => boolean);
    includesFrom<T>(
      value: T,
      fromIndex: number
    ): (collection: Array<T>) => boolean;
    includesFrom<T>(value: T, fromIndex: number, collection: Array<T>): boolean;
    invokeMap<T>(
      path: ((value: T) => Array<string> | string) | Array<string> | string
    ): (collection: Array<T> | { [id: any]: T }) => Array<any>;
    invokeMap<T>(
      path: ((value: T) => Array<string> | string) | Array<string> | string,
      collection: Array<T> | { [id: any]: T }
    ): Array<any>;
    invokeArgsMap<T>(
      path: ((value: T) => Array<string> | string) | Array<string> | string
    ): ((
      collection: Array<T> | { [id: any]: T }
    ) => (args: Array<any>) => Array<any>) &
      ((
        collection: Array<T> | { [id: any]: T },
        args: Array<any>
      ) => Array<any>);
    invokeArgsMap<T>(
      path: ((value: T) => Array<string> | string) | Array<string> | string,
      collection: Array<T> | { [id: any]: T }
    ): (args: Array<any>) => Array<any>;
    invokeArgsMap<T>(
      path: ((value: T) => Array<string> | string) | Array<string> | string,
      collection: Array<T> | { [id: any]: T },
      args: Array<any>
    ): Array<any>;
    keyBy<T, V>(
      iteratee: ValueOnlyIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => { [key: V]: T };
    keyBy<T, V>(
      iteratee: ValueOnlyIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): { [key: V]: T };
    indexBy<T, V>(
      iteratee: ValueOnlyIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => { [key: V]: T };
    indexBy<T, V>(
      iteratee: ValueOnlyIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): { [key: V]: T };
    map<T, U>(
      iteratee: MapIterator<T, U> | OMapIterator<T, U>
    ): (collection: Array<T> | { [id: any]: T }) => Array<U>;
    map<T, U>(
      iteratee: MapIterator<T, U> | OMapIterator<T, U>,
      collection: Array<T> | { [id: any]: T }
    ): Array<U>;
    map(iteratee: (char: string) => any): (str: string) => string;
    map(iteratee: (char: string) => any, str: string): string;
    pluck<T, U>(
      iteratee: MapIterator<T, U> | OMapIterator<T, U>
    ): (collection: Array<T> | { [id: any]: T }) => Array<U>;
    pluck<T, U>(
      iteratee: MapIterator<T, U> | OMapIterator<T, U>,
      collection: Array<T> | { [id: any]: T }
    ): Array<U>;
    pluck(iteratee: (char: string) => any): (str: string) => string;
    pluck(iteratee: (char: string) => any, str: string): string;
    orderBy<T>(
      iteratees: Array<Iteratee<T> | OIteratee<*>> | string
    ): ((
      orders: Array<"asc" | "desc"> | string
    ) => (collection: Array<T> | { [id: any]: T }) => Array<T>) &
      ((
        orders: Array<"asc" | "desc"> | string,
        collection: Array<T> | { [id: any]: T }
      ) => Array<T>);
    orderBy<T>(
      iteratees: Array<Iteratee<T> | OIteratee<*>> | string,
      orders: Array<"asc" | "desc"> | string
    ): (collection: Array<T> | { [id: any]: T }) => Array<T>;
    orderBy<T>(
      iteratees: Array<Iteratee<T> | OIteratee<*>> | string,
      orders: Array<"asc" | "desc"> | string,
      collection: Array<T> | { [id: any]: T }
    ): Array<T>;
    partition<T>(
      predicate: Predicate<T> | OPredicate<T>
    ): (collection: Array<T> | { [id: any]: T }) => [Array<T>, Array<T>];
    partition<T>(
      predicate: Predicate<T> | OPredicate<T>,
      collection: Array<T> | { [id: any]: T }
    ): [Array<T>, Array<T>];
    reduce<T, U>(
      iteratee: (accumulator: U, value: T) => U
    ): ((accumulator: U) => (collection: Array<T> | { [id: any]: T }) => U) &
      ((accumulator: U, collection: Array<T> | { [id: any]: T }) => U);
    reduce<T, U>(
      iteratee: (accumulator: U, value: T) => U,
      accumulator: U
    ): (collection: Array<T> | { [id: any]: T }) => U;
    reduce<T, U>(
      iteratee: (accumulator: U, value: T) => U,
      accumulator: U,
      collection: Array<T> | { [id: any]: T }
    ): U;
    reduceRight<T, U>(
      iteratee: (value: T, accumulator: U) => U
    ): ((accumulator: U) => (collection: Array<T> | { [id: any]: T }) => U) &
      ((accumulator: U, collection: Array<T> | { [id: any]: T }) => U);
    reduceRight<T, U>(
      iteratee: (value: T, accumulator: U) => U,
      accumulator: U
    ): (collection: Array<T> | { [id: any]: T }) => U;
    reduceRight<T, U>(
      iteratee: (value: T, accumulator: U) => U,
      accumulator: U,
      collection: Array<T> | { [id: any]: T }
    ): U;
    reject<T>(
      predicate: Predicate<T> | OPredicate<T>
    ): (collection: Array<T> | { [id: any]: T }) => Array<T>;
    reject<T>(
      predicate: Predicate<T> | OPredicate<T>,
      collection: Array<T> | { [id: any]: T }
    ): Array<T>;
    sample<T>(collection: Array<T> | { [id: any]: T }): T;
    sampleSize<T>(
      n: number
    ): (collection: Array<T> | { [id: any]: T }) => Array<T>;
    sampleSize<T>(n: number, collection: Array<T> | { [id: any]: T }): Array<T>;
    shuffle<T>(collection: Array<T> | { [id: any]: T }): Array<T>;
    size(collection: Array<any> | Object): number;
    some<T>(
      predicate: Predicate<T> | OPredicate<T>
    ): (collection: Array<T> | { [id: any]: T }) => boolean;
    some<T>(
      predicate: Predicate<T> | OPredicate<T>,
      collection: Array<T> | { [id: any]: T }
    ): boolean;
    any<T>(
      predicate: Predicate<T> | OPredicate<T>
    ): (collection: Array<T> | { [id: any]: T }) => boolean;
    any<T>(
      predicate: Predicate<T> | OPredicate<T>,
      collection: Array<T> | { [id: any]: T }
    ): boolean;
    sortBy<T>(
      iteratees: Array<Iteratee<T> | OIteratee<T>> | Iteratee<T> | OIteratee<T>
    ): (collection: Array<T> | { [id: any]: T }) => Array<T>;
    sortBy<T>(
      iteratees: Array<Iteratee<T> | OIteratee<T>> | Iteratee<T> | OIteratee<T>,
      collection: Array<T> | { [id: any]: T }
    ): Array<T>;

    // Date
    now(): number;

    // Function
    after(fn: Function): (n: number) => Function;
    after(fn: Function, n: number): Function;
    ary(func: Function): Function;
    nAry(n: number): (func: Function) => Function;
    nAry(n: number, func: Function): Function;
    before(fn: Function): (n: number) => Function;
    before(fn: Function, n: number): Function;
    bind(func: Function): (thisArg: any) => Function;
    bind(func: Function, thisArg: any): Function;
    bindKey(obj: Object): (key: string) => Function;
    bindKey(obj: Object, key: string): Function;
    curry: Curry;
    curryN(arity: number): (func: Function) => Function;
    curryN(arity: number, func: Function): Function;
    curryRight(func: Function): Function;
    curryRightN(arity: number): (func: Function) => Function;
    curryRightN(arity: number, func: Function): Function;
    debounce(wait: number): <F: Function>(func: F) => F;
    debounce<F: Function>(wait: number, func: F): F;
    defer(func: Function): number;
    delay(wait: number): (func: Function) => number;
    delay(wait: number, func: Function): number;
    flip(func: Function): Function;
    memoize<F: Function>(func: F): F;
    negate(predicate: Function): Function;
    complement(predicate: Function): Function;
    once(func: Function): Function;
    overArgs(func: Function): (transforms: Array<Function>) => Function;
    overArgs(func: Function, transforms: Array<Function>): Function;
    useWith(func: Function): (transforms: Array<Function>) => Function;
    useWith(func: Function, transforms: Array<Function>): Function;
    partial(func: Function): (partials: any[]) => Function;
    partial(func: Function, partials: any[]): Function;
    partialRight(func: Function): (partials: Array<any>) => Function;
    partialRight(func: Function, partials: Array<any>): Function;
    rearg(indexes: Array<number>): (func: Function) => Function;
    rearg(indexes: Array<number>, func: Function): Function;
    rest(func: Function): Function;
    unapply(func: Function): Function;
    restFrom(start: number): (func: Function) => Function;
    restFrom(start: number, func: Function): Function;
    spread(func: Function): Function;
    apply(func: Function): Function;
    spreadFrom(start: number): (func: Function) => Function;
    spreadFrom(start: number, func: Function): Function;
    throttle(wait: number): (func: Function) => Function;
    throttle(wait: number, func: Function): Function;
    unary(func: Function): Function;
    wrap(wrapper: Function): (value: any) => Function;
    wrap(wrapper: Function, value: any): Function;

    // Lang
    castArray(value: *): any[];
    clone<T>(value: T): T;
    cloneDeep<T>(value: T): T;
    cloneDeepWith<T, U>(
      customizer: (value: T, key: number | string, object: T, stack: any) => U
    ): (value: T) => U;
    cloneDeepWith<T, U>(
      customizer: (value: T, key: number | string, object: T, stack: any) => U,
      value: T
    ): U;
    cloneWith<T, U>(
      customizer: (value: T, key: number | string, object: T, stack: any) => U
    ): (value: T) => U;
    cloneWith<T, U>(
      customizer: (value: T, key: number | string, object: T, stack: any) => U,
      value: T
    ): U;
    conformsTo<T: { [key: string]: mixed }>(
      predicates: T & { [key: string]: (x: any) => boolean }
    ): (source: T) => boolean;
    conformsTo<T: { [key: string]: mixed }>(
      predicates: T & { [key: string]: (x: any) => boolean },
      source: T
    ): boolean;
    where<T: { [key: string]: mixed }>(
      predicates: T & { [key: string]: (x: any) => boolean }
    ): (source: T) => boolean;
    where<T: { [key: string]: mixed }>(
      predicates: T & { [key: string]: (x: any) => boolean },
      source: T
    ): boolean;
    conforms<T: { [key: string]: mixed }>(
      predicates: T & { [key: string]: (x: any) => boolean }
    ): (source: T) => boolean;
    conforms<T: { [key: string]: mixed }>(
      predicates: T & { [key: string]: (x: any) => boolean },
      source: T
    ): boolean;
    eq(value: any): (other: any) => boolean;
    eq(value: any, other: any): boolean;
    identical(value: any): (other: any) => boolean;
    identical(value: any, other: any): boolean;
    gt(value: any): (other: any) => boolean;
    gt(value: any, other: any): boolean;
    gte(value: any): (other: any) => boolean;
    gte(value: any, other: any): boolean;
    isArguments(value: any): boolean;
    isArray(value: any): boolean;
    isArrayBuffer(value: any): boolean;
    isArrayLike(value: any): boolean;
    isArrayLikeObject(value: any): boolean;
    isBoolean(value: any): boolean;
    isBuffer(value: any): boolean;
    isDate(value: any): boolean;
    isElement(value: any): boolean;
    isEmpty(value: any): boolean;
    isEqual(value: any): (other: any) => boolean;
    isEqual(value: any, other: any): boolean;
    equals(value: any): (other: any) => boolean;
    equals(value: any, other: any): boolean;
    isEqualWith<T, U>(
      customizer: (
        objValue: any,
        otherValue: any,
        key: number | string,
        object: T,
        other: U,
        stack: any
      ) => boolean | void
    ): ((value: T) => (other: U) => boolean) &
      ((value: T, other: U) => boolean);
    isEqualWith<T, U>(
      customizer: (
        objValue: any,
        otherValue: any,
        key: number | string,
        object: T,
        other: U,
        stack: any
      ) => boolean | void,
      value: T
    ): (other: U) => boolean;
    isEqualWith<T, U>(
      customizer: (
        objValue: any,
        otherValue: any,
        key: number | string,
        object: T,
        other: U,
        stack: any
      ) => boolean | void,
      value: T,
      other: U
    ): boolean;
    isError(value: any): boolean;
    isFinite(value: any): boolean;
    isFunction(value: Function): true;
    isFunction(value: number | string | void | null | Object): false;
    isInteger(value: any): boolean;
    isLength(value: any): boolean;
    isMap(value: any): boolean;
    isMatch(source: Object): (object: Object) => boolean;
    isMatch(source: Object, object: Object): boolean;
    whereEq(source: Object): (object: Object) => boolean;
    whereEq(source: Object, object: Object): boolean;
    isMatchWith<T: Object, U: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: number | string,
        object: T,
        source: U
      ) => boolean | void
    ): ((source: U) => (object: T) => boolean) &
      ((source: U, object: T) => boolean);
    isMatchWith<T: Object, U: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: number | string,
        object: T,
        source: U
      ) => boolean | void,
      source: U
    ): (object: T) => boolean;
    isMatchWith<T: Object, U: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: number | string,
        object: T,
        source: U
      ) => boolean | void,
      source: U,
      object: T
    ): boolean;
    isNaN(value: any): boolean;
    isNative(value: any): boolean;
    isNil(value: any): boolean;
    isNull(value: any): boolean;
    isNumber(value: any): boolean;
    isObject(value: any): boolean;
    isObjectLike(value: any): boolean;
    isPlainObject(value: any): boolean;
    isRegExp(value: any): boolean;
    isSafeInteger(value: any): boolean;
    isSet(value: any): boolean;
    isString(value: string): true;
    isString(
      value: number | boolean | Function | void | null | Object | Array<any>
    ): false;
    isSymbol(value: any): boolean;
    isTypedArray(value: any): boolean;
    isUndefined(value: any): boolean;
    isWeakMap(value: any): boolean;
    isWeakSet(value: any): boolean;
    lt(value: any): (other: any) => boolean;
    lt(value: any, other: any): boolean;
    lte(value: any): (other: any) => boolean;
    lte(value: any, other: any): boolean;
    toArray(value: any): Array<any>;
    toFinite(value: any): number;
    toInteger(value: any): number;
    toLength(value: any): number;
    toNumber(value: any): number;
    toPlainObject(value: any): Object;
    toSafeInteger(value: any): number;
    toString(value: any): string;

    // Math
    add(augend: number): (addend: number) => number;
    add(augend: number, addend: number): number;
    ceil(number: number): number;
    divide(dividend: number): (divisor: number) => number;
    divide(dividend: number, divisor: number): number;
    floor(number: number): number;
    max<T>(array: Array<T>): T;
    maxBy<T>(iteratee: Iteratee<T>): (array: Array<T>) => T;
    maxBy<T>(iteratee: Iteratee<T>, array: Array<T>): T;
    mean(array: Array<*>): number;
    meanBy<T>(iteratee: Iteratee<T>): (array: Array<T>) => number;
    meanBy<T>(iteratee: Iteratee<T>, array: Array<T>): number;
    min<T>(array: Array<T>): T;
    minBy<T>(iteratee: Iteratee<T>): (array: Array<T>) => T;
    minBy<T>(iteratee: Iteratee<T>, array: Array<T>): T;
    multiply(multiplier: number): (multiplicand: number) => number;
    multiply(multiplier: number, multiplicand: number): number;
    round(number: number): number;
    subtract(minuend: number): (subtrahend: number) => number;
    subtract(minuend: number, subtrahend: number): number;
    sum(array: Array<*>): number;
    sumBy<T>(iteratee: Iteratee<T>): (array: Array<T>) => number;
    sumBy<T>(iteratee: Iteratee<T>, array: Array<T>): number;

    // number
    clamp(
      lower: number
    ): ((upper: number) => (number: number) => number) &
      ((upper: number, number: number) => number);
    clamp(lower: number, upper: number): (number: number) => number;
    clamp(lower: number, upper: number, number: number): number;
    inRange(
      start: number
    ): ((end: number) => (number: number) => boolean) &
      ((end: number, number: number) => boolean);
    inRange(start: number, end: number): (number: number) => boolean;
    inRange(start: number, end: number, number: number): boolean;
    random(lower: number): (upper: number) => number;
    random(lower: number, upper: number): number;

    // Object
    assign(object: Object): (source: Object) => Object;
    assign(object: Object, source: Object): Object;
    assignAll(objects: Array<Object>): Object;
    assignInAll(objects: Array<Object>): Object;
    extendAll(objects: Array<Object>): Object;
    assignIn<A, B>(a: A): (b: B) => A & B;
    assignIn<A, B>(a: A, b: B): A & B;
    assignInWith<T: Object, A: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void
    ): ((object: T) => (s1: A) => Object) & ((object: T, s1: A) => Object);
    assignInWith<T: Object, A: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void,
      object: T
    ): (s1: A) => Object;
    assignInWith<T: Object, A: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void,
      object: T,
      s1: A
    ): Object;
    assignWith<T: Object, A: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void
    ): ((object: T) => (s1: A) => Object) & ((object: T, s1: A) => Object);
    assignWith<T: Object, A: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void,
      object: T
    ): (s1: A) => Object;
    assignWith<T: Object, A: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void,
      object: T,
      s1: A
    ): Object;
    assignInAllWith(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: Object,
        source: Object
      ) => any | void
    ): (objects: Array<Object>) => Object;
    assignInAllWith(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: Object,
        source: Object
      ) => any | void,
      objects: Array<Object>
    ): Object;
    extendAllWith(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: Object,
        source: Object
      ) => any | void
    ): (objects: Array<Object>) => Object;
    extendAllWith(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: Object,
        source: Object
      ) => any | void,
      objects: Array<Object>
    ): Object;
    assignAllWith(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: Object,
        source: Object
      ) => any | void
    ): (objects: Array<Object>) => Object;
    assignAllWith(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: Object,
        source: Object
      ) => any | void,
      objects: Array<Object>
    ): Object;
    at(paths: Array<string>): (object: Object) => Array<any>;
    at(paths: Array<string>, object: Object): Array<any>;
    props(paths: Array<string>): (object: Object) => Array<any>;
    props(paths: Array<string>, object: Object): Array<any>;
    paths(paths: Array<string>): (object: Object) => Array<any>;
    paths(paths: Array<string>, object: Object): Array<any>;
    create<T>(prototype: T): $Supertype<T>;
    defaults(source: Object): (object: Object) => Object;
    defaults(source: Object, object: Object): Object;
    defaultsAll(objects: Array<Object>): Object;
    defaultsDeep(source: Object): (object: Object) => Object;
    defaultsDeep(source: Object, object: Object): Object;
    defaultsDeepAll(objects: Array<Object>): Object;
    // alias for _.toPairs
    entries(object: Object): NestedArray<any>;
    // alias for _.toPairsIn
    entriesIn(object: Object): NestedArray<any>;
    // alias for _.assignIn
    extend<A, B>(a: A): (b: B) => A & B;
    extend<A, B>(a: A, b: B): A & B;
    // alias for _.assignInWith
    extendWith<T: Object, A: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void
    ): ((object: T) => (s1: A) => Object) & ((object: T, s1: A) => Object);
    extendWith<T: Object, A: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void,
      object: T
    ): (s1: A) => Object;
    extendWith<T: Object, A: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A
      ) => any | void,
      object: T,
      s1: A
    ): Object;
    findKey<A, T: { [id: any]: A }>(
      predicate: OPredicate<A>
    ): (object: T) => string | void;
    findKey<A, T: { [id: any]: A }>(
      predicate: OPredicate<A>,
      object: T
    ): string | void;
    findLastKey<A, T: { [id: any]: A }>(
      predicate: OPredicate<A>
    ): (object: T) => string | void;
    findLastKey<A, T: { [id: any]: A }>(
      predicate: OPredicate<A>,
      object: T
    ): string | void;
    forIn(iteratee: OIteratee<*>): (object: Object) => Object;
    forIn(iteratee: OIteratee<*>, object: Object): Object;
    forInRight(iteratee: OIteratee<*>): (object: Object) => Object;
    forInRight(iteratee: OIteratee<*>, object: Object): Object;
    forOwn(iteratee: OIteratee<*>): (object: Object) => Object;
    forOwn(iteratee: OIteratee<*>, object: Object): Object;
    forOwnRight(iteratee: OIteratee<*>): (object: Object) => Object;
    forOwnRight(iteratee: OIteratee<*>, object: Object): Object;
    functions(object: Object): Array<string>;
    functionsIn(object: Object): Array<string>;
    get(path: Array<string> | string): (object: Object | Array<any>) => any;
    get(path: Array<string> | string, object: Object | Array<any>): any;
    prop(path: Array<string> | string): (object: Object | Array<any>) => any;
    prop(path: Array<string> | string, object: Object | Array<any>): any;
    path(path: Array<string> | string): (object: Object | Array<any>) => any;
    path(path: Array<string> | string, object: Object | Array<any>): any;
    getOr(
      defaultValue: any
    ): ((
      path: Array<string> | string
    ) => (object: Object | Array<any>) => any) &
      ((path: Array<string> | string, object: Object | Array<any>) => any);
    getOr(
      defaultValue: any,
      path: Array<string> | string
    ): (object: Object | Array<any>) => any;
    getOr(
      defaultValue: any,
      path: Array<string> | string,
      object: Object | Array<any>
    ): any;
    propOr(
      defaultValue: any
    ): ((
      path: Array<string> | string
    ) => (object: Object | Array<any>) => any) &
      ((path: Array<string> | string, object: Object | Array<any>) => any);
    propOr(
      defaultValue: any,
      path: Array<string> | string
    ): (object: Object | Array<any>) => any;
    propOr(
      defaultValue: any,
      path: Array<string> | string,
      object: Object | Array<any>
    ): any;
    pathOr(
      defaultValue: any
    ): ((
      path: Array<string> | string
    ) => (object: Object | Array<any>) => any) &
      ((path: Array<string> | string, object: Object | Array<any>) => any);
    pathOr(
      defaultValue: any,
      path: Array<string> | string
    ): (object: Object | Array<any>) => any;
    pathOr(
      defaultValue: any,
      path: Array<string> | string,
      object: Object | Array<any>
    ): any;
    has(path: Array<string> | string): (object: Object) => boolean;
    has(path: Array<string> | string, object: Object): boolean;
    hasIn(path: Array<string> | string): (object: Object) => boolean;
    hasIn(path: Array<string> | string, object: Object): boolean;
    invert(object: Object): Object;
    invertObj(object: Object): Object;
    invertBy(iteratee: Function): (object: Object) => Object;
    invertBy(iteratee: Function, object: Object): Object;
    invoke(path: Array<string> | string): (object: Object) => any;
    invoke(path: Array<string> | string, object: Object): any;
    invokeArgs(
      path: Array<string> | string
    ): ((object: Object) => (args: Array<any>) => any) &
      ((object: Object, args: Array<any>) => any);
    invokeArgs(
      path: Array<string> | string,
      object: Object
    ): (args: Array<any>) => any;
    invokeArgs(
      path: Array<string> | string,
      object: Object,
      args: Array<any>
    ): any;
    keys<K>(object: { [key: K]: any }): Array<K>;
    keys(object: Object): Array<string>;
    keysIn(object: Object): Array<string>;
    mapKeys(iteratee: OIteratee<*>): (object: Object) => Object;
    mapKeys(iteratee: OIteratee<*>, object: Object): Object;
    mapValues(iteratee: OIteratee<*>): (object: Object) => Object;
    mapValues(iteratee: OIteratee<*>, object: Object): Object;
    merge(object: Object): (source: Object) => Object;
    merge(object: Object, source: Object): Object;
    mergeAll(objects: Array<Object>): Object;
    mergeWith<T: Object, A: Object, B: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B
      ) => any | void
    ): ((object: T) => (s1: A) => Object) & ((object: T, s1: A) => Object);
    mergeWith<T: Object, A: Object, B: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B
      ) => any | void,
      object: T
    ): (s1: A) => Object;
    mergeWith<T: Object, A: Object, B: Object>(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: T,
        source: A | B
      ) => any | void,
      object: T,
      s1: A
    ): Object;
    mergeAllWith(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: Object,
        source: Object
      ) => any | void
    ): (objects: Array<Object>) => Object;
    mergeAllWith(
      customizer: (
        objValue: any,
        srcValue: any,
        key: string,
        object: Object,
        source: Object
      ) => any | void,
      objects: Array<Object>
    ): Object;
    omit(props: Array<string>): (object: Object) => Object;
    omit(props: Array<string>, object: Object): Object;
    omitAll(props: Array<string>): (object: Object) => Object;
    omitAll(props: Array<string>, object: Object): Object;
    omitBy<A, T: { [id: any]: A }>(
      predicate: OPredicate<A>
    ): (object: T) => Object;
    omitBy<A, T: { [id: any]: A }>(predicate: OPredicate<A>, object: T): Object;
    pick(props: Array<string>): (object: Object) => Object;
    pick(props: Array<string>, object: Object): Object;
    pickAll(props: Array<string>): (object: Object) => Object;
    pickAll(props: Array<string>, object: Object): Object;
    pickBy<A, T: { [id: any]: A }>(
      predicate: OPredicate<A>
    ): (object: T) => Object;
    pickBy<A, T: { [id: any]: A }>(predicate: OPredicate<A>, object: T): Object;
    result(path: Array<string> | string): (object: Object) => any;
    result(path: Array<string> | string, object: Object): any;
    set(
      path: Array<string> | string
    ): ((value: any) => (object: Object) => Object) &
      ((value: any, object: Object) => Object);
    set(path: Array<string> | string, value: any): (object: Object) => Object;
    set(path: Array<string> | string, value: any, object: Object): Object;
    assoc(
      path: Array<string> | string
    ): ((value: any) => (object: Object) => Object) &
      ((value: any, object: Object) => Object);
    assoc(path: Array<string> | string, value: any): (object: Object) => Object;
    assoc(path: Array<string> | string, value: any, object: Object): Object;
    assocPath(
      path: Array<string> | string
    ): ((value: any) => (object: Object) => Object) &
      ((value: any, object: Object) => Object);
    assocPath(
      path: Array<string> | string,
      value: any
    ): (object: Object) => Object;
    assocPath(path: Array<string> | string, value: any, object: Object): Object;
    setWith<T>(
      customizer: (nsValue: any, key: string, nsObject: T) => any
    ): ((
      path: Array<string> | string
    ) => ((value: any) => (object: T) => Object) &
      ((value: any, object: T) => Object)) &
      ((path: Array<string> | string, value: any) => (object: T) => Object) &
      ((path: Array<string> | string, value: any, object: T) => Object);
    setWith<T>(
      customizer: (nsValue: any, key: string, nsObject: T) => any,
      path: Array<string> | string
    ): ((value: any) => (object: T) => Object) &
      ((value: any, object: T) => Object);
    setWith<T>(
      customizer: (nsValue: any, key: string, nsObject: T) => any,
      path: Array<string> | string,
      value: any
    ): (object: T) => Object;
    setWith<T>(
      customizer: (nsValue: any, key: string, nsObject: T) => any,
      path: Array<string> | string,
      value: any,
      object: T
    ): Object;
    toPairs(object: Object | Array<*>): NestedArray<any>;
    toPairsIn(object: Object): NestedArray<any>;
    transform(
      iteratee: OIteratee<*>
    ): ((accumulator: any) => (collection: Object | Array<any>) => any) &
      ((accumulator: any, collection: Object | Array<any>) => any);
    transform(
      iteratee: OIteratee<*>,
      accumulator: any
    ): (collection: Object | Array<any>) => any;
    transform(
      iteratee: OIteratee<*>,
      accumulator: any,
      collection: Object | Array<any>
    ): any;
    unset(path: Array<string> | string): (object: Object) => boolean;
    unset(path: Array<string> | string, object: Object): boolean;
    dissoc(path: Array<string> | string): (object: Object) => boolean;
    dissoc(path: Array<string> | string, object: Object): boolean;
    dissocPath(path: Array<string> | string): (object: Object) => boolean;
    dissocPath(path: Array<string> | string, object: Object): boolean;
    update(
      path: string[] | string
    ): ((updater: Function) => (object: Object) => Object) &
      ((updater: Function, object: Object) => Object);
    update(
      path: string[] | string,
      updater: Function
    ): (object: Object) => Object;
    update(path: string[] | string, updater: Function, object: Object): Object;
    updateWith(
      customizer: Function
    ): ((
      path: string[] | string
    ) => ((updater: Function) => (object: Object) => Object) &
      ((updater: Function, object: Object) => Object)) &
      ((
        path: string[] | string,
        updater: Function
      ) => (object: Object) => Object) &
      ((path: string[] | string, updater: Function, object: Object) => Object);
    updateWith(
      customizer: Function,
      path: string[] | string
    ): ((updater: Function) => (object: Object) => Object) &
      ((updater: Function, object: Object) => Object);
    updateWith(
      customizer: Function,
      path: string[] | string,
      updater: Function
    ): (object: Object) => Object;
    updateWith(
      customizer: Function,
      path: string[] | string,
      updater: Function,
      object: Object
    ): Object;
    values(object: Object): Array<any>;
    valuesIn(object: Object): Array<any>;

    tap<T>(interceptor: (value: T) => any): (value: T) => T;
    tap<T>(interceptor: (value: T) => any, value: T): T;
    thru<T1, T2>(interceptor: (value: T1) => T2): (value: T1) => T2;
    thru<T1, T2>(interceptor: (value: T1) => T2, value: T1): T2;

    // String
    camelCase(string: string): string;
    capitalize(string: string): string;
    deburr(string: string): string;
    endsWith(target: string): (string: string) => boolean;
    endsWith(target: string, string: string): boolean;
    escape(string: string): string;
    escapeRegExp(string: string): string;
    kebabCase(string: string): string;
    lowerCase(string: string): string;
    lowerFirst(string: string): string;
    pad(length: number): (string: string) => string;
    pad(length: number, string: string): string;
    padChars(
      chars: string
    ): ((length: number) => (string: string) => string) &
      ((length: number, string: string) => string);
    padChars(chars: string, length: number): (string: string) => string;
    padChars(chars: string, length: number, string: string): string;
    padEnd(length: number): (string: string) => string;
    padEnd(length: number, string: string): string;
    padCharsEnd(
      chars: string
    ): ((length: number) => (string: string) => string) &
      ((length: number, string: string) => string);
    padCharsEnd(chars: string, length: number): (string: string) => string;
    padCharsEnd(chars: string, length: number, string: string): string;
    padStart(length: number): (string: string) => string;
    padStart(length: number, string: string): string;
    padCharsStart(
      chars: string
    ): ((length: number) => (string: string) => string) &
      ((length: number, string: string) => string);
    padCharsStart(chars: string, length: number): (string: string) => string;
    padCharsStart(chars: string, length: number, string: string): string;
    parseInt(radix: number): (string: string) => number;
    parseInt(radix: number, string: string): number;
    repeat(n: number): (string: string) => string;
    repeat(n: number, string: string): string;
    replace(
      pattern: RegExp | string
    ): ((
      replacement: ((string: string) => string) | string
    ) => (string: string) => string) &
      ((
        replacement: ((string: string) => string) | string,
        string: string
      ) => string);
    replace(
      pattern: RegExp | string,
      replacement: ((string: string) => string) | string
    ): (string: string) => string;
    replace(
      pattern: RegExp | string,
      replacement: ((string: string) => string) | string,
      string: string
    ): string;
    snakeCase(string: string): string;
    split(separator: RegExp | string): (string: string) => Array<string>;
    split(separator: RegExp | string, string: string): Array<string>;
    startCase(string: string): string;
    startsWith(target: string): (string: string) => boolean;
    startsWith(target: string, string: string): boolean;
    template(string: string): Function;
    toLower(string: string): string;
    toUpper(string: string): string;
    trim(string: string): string;
    trimChars(chars: string): (string: string) => string;
    trimChars(chars: string, string: string): string;
    trimEnd(string: string): string;
    trimCharsEnd(chars: string): (string: string) => string;
    trimCharsEnd(chars: string, string: string): string;
    trimStart(string: string): string;
    trimCharsStart(chars: string): (string: string) => string;
    trimCharsStart(chars: string, string: string): string;
    truncate(options: TruncateOptions): (string: string) => string;
    truncate(options: TruncateOptions, string: string): string;
    unescape(string: string): string;
    upperCase(string: string): string;
    upperFirst(string: string): string;
    words(string: string): Array<string>;

    // Util
    attempt(func: Function): any;
    bindAll(methodNames: Array<string>): (object: Object) => Object;
    bindAll(methodNames: Array<string>, object: Object): Object;
    cond(pairs: NestedArray<Function>): Function;
    constant<T>(value: T): () => T;
    always<T>(value: T): () => T;
    defaultTo<T1: string | boolean | Object, T2>(
      defaultValue: T2
    ): (value: T1) => T1;
    defaultTo<T1: string | boolean | Object, T2>(
      defaultValue: T2,
      value: T1
    ): T1;
    // NaN is a number instead of its own type, otherwise it would behave like null/void
    defaultTo<T1: number, T2>(defaultValue: T2): (value: T1) => T1 | T2;
    defaultTo<T1: number, T2>(defaultValue: T2, value: T1): T1 | T2;
    defaultTo<T1: void | null, T2>(defaultValue: T2): (value: T1) => T2;
    defaultTo<T1: void | null, T2>(defaultValue: T2, value: T1): T2;
    flow: $ComposeReverse;
    flow(funcs: Array<Function>): Function;
    pipe: $ComposeReverse;
    pipe(funcs: Array<Function>): Function;
    flowRight: $Compose;
    flowRight(funcs: Array<Function>): Function;
    compose: $Compose;
    compose(funcs: Array<Function>): Function;
    identity<T>(value: T): T;
    iteratee(func: any): Function;
    matches(source: Object): (object: Object) => boolean;
    matches(source: Object, object: Object): boolean;
    matchesProperty(path: Array<string> | string): (srcValue: any) => Function;
    matchesProperty(path: Array<string> | string, srcValue: any): Function;
    propEq(path: Array<string> | string): (srcValue: any) => Function;
    propEq(path: Array<string> | string, srcValue: any): Function;
    pathEq(path: Array<string> | string): (srcValue: any) => Function;
    pathEq(path: Array<string> | string, srcValue: any): Function;
    method(path: Array<string> | string): Function;
    methodOf(object: Object): Function;
    mixin<T: Function | Object>(
      object: T
    ): ((source: Object) => (options: { chain: boolean }) => T) &
      ((source: Object, options: { chain: boolean }) => T);
    mixin<T: Function | Object>(
      object: T,
      source: Object
    ): (options: { chain: boolean }) => T;
    mixin<T: Function | Object>(
      object: T,
      source: Object,
      options: { chain: boolean }
    ): T;
    noConflict(): Lodash;
    noop(...args: Array<mixed>): void;
    nthArg(n: number): Function;
    over(iteratees: Array<Function>): Function;
    juxt(iteratees: Array<Function>): Function;
    overEvery(predicates: Array<Function>): Function;
    allPass(predicates: Array<Function>): Function;
    overSome(predicates: Array<Function>): Function;
    anyPass(predicates: Array<Function>): Function;
    property(
      path: Array<string> | string
    ): (object: Object | Array<any>) => any;
    property(path: Array<string> | string, object: Object | Array<any>): any;
    propertyOf(object: Object): (path: Array<string> | string) => Function;
    propertyOf(object: Object, path: Array<string> | string): Function;
    range(start: number): (end: number) => Array<number>;
    range(start: number, end: number): Array<number>;
    rangeStep(
      step: number
    ): ((start: number) => (end: number) => Array<number>) &
      ((start: number, end: number) => Array<number>);
    rangeStep(step: number, start: number): (end: number) => Array<number>;
    rangeStep(step: number, start: number, end: number): Array<number>;
    rangeRight(start: number): (end: number) => Array<number>;
    rangeRight(start: number, end: number): Array<number>;
    rangeStepRight(
      step: number
    ): ((start: number) => (end: number) => Array<number>) &
      ((start: number, end: number) => Array<number>);
    rangeStepRight(step: number, start: number): (end: number) => Array<number>;
    rangeStepRight(step: number, start: number, end: number): Array<number>;
    runInContext(context: Object): Function;

    stubArray(): Array<*>;
    stubFalse(): false;
    F(): false;
    stubObject(): {};
    stubString(): "";
    stubTrue(): true;
    T(): true;
    times<T>(iteratee: (i: number) => T): (n: number) => Array<T>;
    times<T>(iteratee: (i: number) => T, n: number): Array<T>;
    toPath(value: any): Array<string>;
    uniqueId(prefix: string): string;

    __: any;
    placeholder: any;

    convert(options: {
      cap?: boolean,
      curry?: boolean,
      fixed?: boolean,
      immutable?: boolean,
      rearg?: boolean
    }): void;

    // Properties
    VERSION: string;
    templateSettings: TemplateSettings;
  }

  declare var exports: Lodash;
}

declare module "lodash-es/chunk" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "chunk">;
}

declare module "lodash-es/compact" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "compact">;
}

declare module "lodash-es/concat" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "concat">;
}

declare module "lodash-es/difference" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "difference">;
}

declare module "lodash-es/differenceBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "differenceBy">;
}

declare module "lodash-es/differenceWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "differenceWith">;
}

declare module "lodash-es/drop" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "drop">;
}

declare module "lodash-es/dropRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "dropRight">;
}

declare module "lodash-es/dropRightWhile" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "dropRightWhile">;
}

declare module "lodash-es/dropWhile" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "dropWhile">;
}

declare module "lodash-es/fill" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "fill">;
}

declare module "lodash-es/findIndex" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "findIndex">;
}

declare module "lodash-es/findLastIndex" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "findLastIndex">;
}

declare module "lodash-es/first" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "first">;
}

declare module "lodash-es/flatten" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "flatten">;
}

declare module "lodash-es/flattenDeep" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "flattenDeep">;
}

declare module "lodash-es/flattenDepth" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "flattenDepth">;
}

declare module "lodash-es/fromPairs" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "fromPairs">;
}

declare module "lodash-es/head" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "head">;
}

declare module "lodash-es/indexOf" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "indexOf">;
}

declare module "lodash-es/initial" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "initial">;
}

declare module "lodash-es/intersection" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "intersection">;
}

declare module "lodash-es/intersectionBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "intersectionBy">;
}

declare module "lodash-es/intersectionWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "intersectionWith">;
}

declare module "lodash-es/join" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "join">;
}

declare module "lodash-es/last" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "last">;
}

declare module "lodash-es/lastIndexOf" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "lastIndexOf">;
}

declare module "lodash-es/nth" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "nth">;
}

declare module "lodash-es/pull" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "pull">;
}

declare module "lodash-es/pullAll" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "pullAll">;
}

declare module "lodash-es/pullAllBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "pullAllBy">;
}

declare module "lodash-es/pullAllWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "pullAllWith">;
}

declare module "lodash-es/pullAt" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "pullAt">;
}

declare module "lodash-es/remove" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "remove">;
}

declare module "lodash-es/reverse" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "reverse">;
}

declare module "lodash-es/slice" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "slice">;
}

declare module "lodash-es/sortedIndex" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sortedIndex">;
}

declare module "lodash-es/sortedIndexBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sortedIndexBy">;
}

declare module "lodash-es/sortedIndexOf" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sortedIndexOf">;
}

declare module "lodash-es/sortedLastIndex" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sortedLastIndex">;
}

declare module "lodash-es/sortedLastIndexBy" {
  declare module.exports: $PropertyType<
    $Exports<"lodash-es">,
    "sortedLastIndexBy"
  >;
}

declare module "lodash-es/sortedLastIndexOf" {
  declare module.exports: $PropertyType<
    $Exports<"lodash-es">,
    "sortedLastIndexOf"
  >;
}

declare module "lodash-es/sortedUniq" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sortedUniq">;
}

declare module "lodash-es/sortedUniqBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sortedUniqBy">;
}

declare module "lodash-es/tail" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "tail">;
}

declare module "lodash-es/take" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "take">;
}

declare module "lodash-es/takeRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "takeRight">;
}

declare module "lodash-es/takeRightWhile" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "takeRightWhile">;
}

declare module "lodash-es/takeWhile" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "takeWhile">;
}

declare module "lodash-es/union" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "union">;
}

declare module "lodash-es/unionBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "unionBy">;
}

declare module "lodash-es/unionWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "unionWith">;
}

declare module "lodash-es/uniq" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "uniq">;
}

declare module "lodash-es/uniqBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "uniqBy">;
}

declare module "lodash-es/uniqWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "uniqWith">;
}

declare module "lodash-es/unzip" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "unzip">;
}

declare module "lodash-es/unzipWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "unzipWith">;
}

declare module "lodash-es/without" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "without">;
}

declare module "lodash-es/xor" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "xor">;
}

declare module "lodash-es/xorBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "xorBy">;
}

declare module "lodash-es/xorWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "xorWith">;
}

declare module "lodash-es/zip" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "zip">;
}

declare module "lodash-es/zipObject" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "zipObject">;
}

declare module "lodash-es/zipObjectDeep" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "zipObjectDeep">;
}

declare module "lodash-es/zipWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "zipWith">;
}

declare module "lodash-es/countBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "countBy">;
}

declare module "lodash-es/each" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "each">;
}

declare module "lodash-es/eachRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "eachRight">;
}

declare module "lodash-es/every" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "every">;
}

declare module "lodash-es/filter" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "filter">;
}

declare module "lodash-es/find" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "find">;
}

declare module "lodash-es/findLast" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "findLast">;
}

declare module "lodash-es/flatMap" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "flatMap">;
}

declare module "lodash-es/flatMapDeep" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "flatMapDeep">;
}

declare module "lodash-es/flatMapDepth" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "flatMapDepth">;
}

declare module "lodash-es/forEach" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "forEach">;
}

declare module "lodash-es/forEachRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "forEachRight">;
}

declare module "lodash-es/groupBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "groupBy">;
}

declare module "lodash-es/includes" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "includes">;
}

declare module "lodash-es/invokeMap" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "invokeMap">;
}

declare module "lodash-es/keyBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "keyBy">;
}

declare module "lodash-es/map" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "map">;
}

declare module "lodash-es/orderBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "orderBy">;
}

declare module "lodash-es/partition" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "partition">;
}

declare module "lodash-es/reduce" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "reduce">;
}

declare module "lodash-es/reduceRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "reduceRight">;
}

declare module "lodash-es/reject" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "reject">;
}

declare module "lodash-es/sample" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sample">;
}

declare module "lodash-es/sampleSize" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sampleSize">;
}

declare module "lodash-es/shuffle" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "shuffle">;
}

declare module "lodash-es/size" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "size">;
}

declare module "lodash-es/some" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "some">;
}

declare module "lodash-es/sortBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sortBy">;
}

declare module "lodash-es/now" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "now">;
}

declare module "lodash-es/after" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "after">;
}

declare module "lodash-es/ary" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "ary">;
}

declare module "lodash-es/before" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "before">;
}

declare module "lodash-es/bind" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "bind">;
}

declare module "lodash-es/bindKey" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "bindKey">;
}

declare module "lodash-es/curry" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "curry">;
}

declare module "lodash-es/curryRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "curryRight">;
}

declare module "lodash-es/debounce" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "debounce">;
}

declare module "lodash-es/defer" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "defer">;
}

declare module "lodash-es/delay" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "delay">;
}

declare module "lodash-es/flip" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "flip">;
}

declare module "lodash-es/memoize" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "memoize">;
}

declare module "lodash-es/negate" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "negate">;
}

declare module "lodash-es/once" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "once">;
}

declare module "lodash-es/overArgs" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "overArgs">;
}

declare module "lodash-es/partial" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "partial">;
}

declare module "lodash-es/partialRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "partialRight">;
}

declare module "lodash-es/rearg" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "rearg">;
}

declare module "lodash-es/rest" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "rest">;
}

declare module "lodash-es/spread" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "spread">;
}

declare module "lodash-es/throttle" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "throttle">;
}

declare module "lodash-es/unary" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "unary">;
}

declare module "lodash-es/wrap" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "wrap">;
}

declare module "lodash-es/castArray" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "castArray">;
}

declare module "lodash-es/clone" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "clone">;
}

declare module "lodash-es/cloneDeep" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "cloneDeep">;
}

declare module "lodash-es/cloneDeepWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "cloneDeepWith">;
}

declare module "lodash-es/cloneWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "cloneWith">;
}

declare module "lodash-es/conformsTo" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "conformsTo">;
}

declare module "lodash-es/eq" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "eq">;
}

declare module "lodash-es/gt" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "gt">;
}

declare module "lodash-es/gte" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "gte">;
}

declare module "lodash-es/isArguments" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isArguments">;
}

declare module "lodash-es/isArray" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isArray">;
}

declare module "lodash-es/isArrayBuffer" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isArrayBuffer">;
}

declare module "lodash-es/isArrayLike" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isArrayLike">;
}

declare module "lodash-es/isArrayLikeObject" {
  declare module.exports: $PropertyType<
    $Exports<"lodash-es">,
    "isArrayLikeObject"
  >;
}

declare module "lodash-es/isBoolean" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isBoolean">;
}

declare module "lodash-es/isBuffer" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isBuffer">;
}

declare module "lodash-es/isDate" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isDate">;
}

declare module "lodash-es/isElement" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isElement">;
}

declare module "lodash-es/isEmpty" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isEmpty">;
}

declare module "lodash-es/isEqual" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isEqual">;
}

declare module "lodash-es/isEqualWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isEqualWith">;
}

declare module "lodash-es/isError" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isError">;
}

declare module "lodash-es/isFinite" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isFinite">;
}

declare module "lodash-es/isFunction" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isFunction">;
}

declare module "lodash-es/isInteger" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isInteger">;
}

declare module "lodash-es/isLength" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isLength">;
}

declare module "lodash-es/isMap" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isMap">;
}

declare module "lodash-es/isMatch" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isMatch">;
}

declare module "lodash-es/isMatchWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isMatchWith">;
}

declare module "lodash-es/isNaN" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isNaN">;
}

declare module "lodash-es/isNative" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isNative">;
}

declare module "lodash-es/isNil" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isNil">;
}

declare module "lodash-es/isNull" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isNull">;
}

declare module "lodash-es/isNumber" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isNumber">;
}

declare module "lodash-es/isObject" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isObject">;
}

declare module "lodash-es/isObjectLike" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isObjectLike">;
}

declare module "lodash-es/isPlainObject" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isPlainObject">;
}

declare module "lodash-es/isRegExp" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isRegExp">;
}

declare module "lodash-es/isSafeInteger" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isSafeInteger">;
}

declare module "lodash-es/isSet" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isSet">;
}

declare module "lodash-es/isString" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isString">;
}

declare module "lodash-es/isSymbol" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isSymbol">;
}

declare module "lodash-es/isTypedArray" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isTypedArray">;
}

declare module "lodash-es/isUndefined" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isUndefined">;
}

declare module "lodash-es/isWeakMap" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isWeakMap">;
}

declare module "lodash-es/isWeakSet" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "isWeakSet">;
}

declare module "lodash-es/lt" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "lt">;
}

declare module "lodash-es/lte" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "lte">;
}

declare module "lodash-es/toArray" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toArray">;
}

declare module "lodash-es/toFinite" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toFinite">;
}

declare module "lodash-es/toInteger" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toInteger">;
}

declare module "lodash-es/toLength" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toLength">;
}

declare module "lodash-es/toNumber" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toNumber">;
}

declare module "lodash-es/toPlainObject" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toPlainObject">;
}

declare module "lodash-es/toSafeInteger" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toSafeInteger">;
}

declare module "lodash-es/toString" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toString">;
}

declare module "lodash-es/add" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "add">;
}

declare module "lodash-es/ceil" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "ceil">;
}

declare module "lodash-es/divide" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "divide">;
}

declare module "lodash-es/floor" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "floor">;
}

declare module "lodash-es/max" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "max">;
}

declare module "lodash-es/maxBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "maxBy">;
}

declare module "lodash-es/mean" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "mean">;
}

declare module "lodash-es/meanBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "meanBy">;
}

declare module "lodash-es/min" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "min">;
}

declare module "lodash-es/minBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "minBy">;
}

declare module "lodash-es/multiply" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "multiply">;
}

declare module "lodash-es/round" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "round">;
}

declare module "lodash-es/subtract" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "subtract">;
}

declare module "lodash-es/sum" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sum">;
}

declare module "lodash-es/sumBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "sumBy">;
}

declare module "lodash-es/clamp" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "clamp">;
}

declare module "lodash-es/inRange" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "inRange">;
}

declare module "lodash-es/random" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "random">;
}

declare module "lodash-es/assign" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "assign">;
}

declare module "lodash-es/assignIn" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "assignIn">;
}

declare module "lodash-es/assignInWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "assignInWith">;
}

declare module "lodash-es/assignWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "assignWith">;
}

declare module "lodash-es/at" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "at">;
}

declare module "lodash-es/create" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "create">;
}

declare module "lodash-es/defaults" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "defaults">;
}

declare module "lodash-es/defaultsDeep" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "defaultsDeep">;
}

declare module "lodash-es/entries" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "entries">;
}

declare module "lodash-es/entriesIn" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "entriesIn">;
}

declare module "lodash-es/extend" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "extend">;
}

declare module "lodash-es/extendWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "extendWith">;
}

declare module "lodash-es/findKey" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "findKey">;
}

declare module "lodash-es/findLastKey" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "findLastKey">;
}

declare module "lodash-es/forIn" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "forIn">;
}

declare module "lodash-es/forInRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "forInRight">;
}

declare module "lodash-es/forOwn" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "forOwn">;
}

declare module "lodash-es/forOwnRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "forOwnRight">;
}

declare module "lodash-es/functions" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "functions">;
}

declare module "lodash-es/functionsIn" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "functionsIn">;
}

declare module "lodash-es/get" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "get">;
}

declare module "lodash-es/has" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "has">;
}

declare module "lodash-es/hasIn" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "hasIn">;
}

declare module "lodash-es/invert" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "invert">;
}

declare module "lodash-es/invertBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "invertBy">;
}

declare module "lodash-es/invoke" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "invoke">;
}

declare module "lodash-es/keys" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "keys">;
}

declare module "lodash-es/keysIn" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "keysIn">;
}

declare module "lodash-es/mapKeys" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "mapKeys">;
}

declare module "lodash-es/mapValues" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "mapValues">;
}

declare module "lodash-es/merge" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "merge">;
}

declare module "lodash-es/mergeWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "mergeWith">;
}

declare module "lodash-es/omit" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "omit">;
}

declare module "lodash-es/omitBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "omitBy">;
}

declare module "lodash-es/pick" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "pick">;
}

declare module "lodash-es/pickBy" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "pickBy">;
}

declare module "lodash-es/result" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "result">;
}

declare module "lodash-es/set" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "set">;
}

declare module "lodash-es/setWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "setWith">;
}

declare module "lodash-es/toPairs" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toPairs">;
}

declare module "lodash-es/toPairsIn" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toPairsIn">;
}

declare module "lodash-es/transform" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "transform">;
}

declare module "lodash-es/unset" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "unset">;
}

declare module "lodash-es/update" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "update">;
}

declare module "lodash-es/updateWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "updateWith">;
}

declare module "lodash-es/values" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "values">;
}

declare module "lodash-es/valuesIn" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "valuesIn">;
}

declare module "lodash-es/chain" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "chain">;
}

declare module "lodash-es/tap" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "tap">;
}

declare module "lodash-es/thru" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "thru">;
}

declare module "lodash-es/camelCase" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "camelCase">;
}

declare module "lodash-es/capitalize" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "capitalize">;
}

declare module "lodash-es/deburr" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "deburr">;
}

declare module "lodash-es/endsWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "endsWith">;
}

declare module "lodash-es/escape" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "escape">;
}

declare module "lodash-es/escapeRegExp" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "escapeRegExp">;
}

declare module "lodash-es/kebabCase" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "kebabCase">;
}

declare module "lodash-es/lowerCase" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "lowerCase">;
}

declare module "lodash-es/lowerFirst" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "lowerFirst">;
}

declare module "lodash-es/pad" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "pad">;
}

declare module "lodash-es/padEnd" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "padEnd">;
}

declare module "lodash-es/padStart" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "padStart">;
}

declare module "lodash-es/parseInt" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "parseInt">;
}

declare module "lodash-es/repeat" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "repeat">;
}

declare module "lodash-es/replace" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "replace">;
}

declare module "lodash-es/snakeCase" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "snakeCase">;
}

declare module "lodash-es/split" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "split">;
}

declare module "lodash-es/startCase" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "startCase">;
}

declare module "lodash-es/startsWith" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "startsWith">;
}

declare module "lodash-es/template" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "template">;
}

declare module "lodash-es/toLower" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toLower">;
}

declare module "lodash-es/toUpper" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toUpper">;
}

declare module "lodash-es/trim" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "trim">;
}

declare module "lodash-es/trimEnd" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "trimEnd">;
}

declare module "lodash-es/trimStart" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "trimStart">;
}

declare module "lodash-es/truncate" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "truncate">;
}

declare module "lodash-es/unescape" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "unescape">;
}

declare module "lodash-es/upperCase" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "upperCase">;
}

declare module "lodash-es/upperFirst" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "upperFirst">;
}

declare module "lodash-es/words" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "words">;
}

declare module "lodash-es/attempt" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "attempt">;
}

declare module "lodash-es/bindAll" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "bindAll">;
}

declare module "lodash-es/cond" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "cond">;
}

declare module "lodash-es/conforms" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "conforms">;
}

declare module "lodash-es/constant" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "constant">;
}

declare module "lodash-es/defaultTo" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "defaultTo">;
}

declare module "lodash-es/flow" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "flow">;
}

declare module "lodash-es/flowRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "flowRight">;
}

declare module "lodash-es/identity" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "identity">;
}

declare module "lodash-es/iteratee" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "iteratee">;
}

declare module "lodash-es/matches" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "matches">;
}

declare module "lodash-es/matchesProperty" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "matchesProperty">;
}

declare module "lodash-es/method" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "method">;
}

declare module "lodash-es/methodOf" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "methodOf">;
}

declare module "lodash-es/mixin" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "mixin">;
}

declare module "lodash-es/noConflict" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "noConflict">;
}

declare module "lodash-es/noop" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "noop">;
}

declare module "lodash-es/nthArg" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "nthArg">;
}

declare module "lodash-es/over" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "over">;
}

declare module "lodash-es/overEvery" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "overEvery">;
}

declare module "lodash-es/overSome" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "overSome">;
}

declare module "lodash-es/property" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "property">;
}

declare module "lodash-es/propertyOf" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "propertyOf">;
}

declare module "lodash-es/range" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "range">;
}

declare module "lodash-es/rangeRight" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "rangeRight">;
}

declare module "lodash-es/runInContext" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "runInContext">;
}

declare module "lodash-es/stubArray" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "stubArray">;
}

declare module "lodash-es/stubFalse" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "stubFalse">;
}

declare module "lodash-es/stubObject" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "stubObject">;
}

declare module "lodash-es/stubString" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "stubString">;
}

declare module "lodash-es/stubTrue" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "stubTrue">;
}

declare module "lodash-es/times" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "times">;
}

declare module "lodash-es/toPath" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "toPath">;
}

declare module "lodash-es/uniqueId" {
  declare module.exports: $PropertyType<$Exports<"lodash-es">, "uniqueId">;
}
