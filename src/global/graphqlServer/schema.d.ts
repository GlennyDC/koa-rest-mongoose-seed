/* eslint-disable */
/* Manual changes to this file will be overwritten if the code is regenerated. */
/* This file is auto generated by graphql code generator. */
import { GraphQLResolveInfo } from 'graphql';
import { Organisation as IOrganisation } from '../../modules/organisation/organisation';
import { Location as ILocation } from '../../modules/location/location';
import { Context } from './context';
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  capsule: Capsule;
  capsules: Array<Capsule>;
  organisation: Organisation;
  organisations: Array<Organisation>;
  viewer: User;
};


export type QueryCapsuleArgs = {
  id: Scalars['ID'];
};


export type QueryCapsulesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['String']>;
  sort?: Maybe<Sort>;
};


export type QueryOrganisationArgs = {
  id: Scalars['ID'];
};


export type QueryOrganisationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  order?: Maybe<Array<OrganisationsOrderInput>>;
};

export type Capsule = {
  __typename?: 'Capsule';
  id: Scalars['ID'];
  landings: Scalars['Int'];
  status: Scalars['String'];
  originalLaunch: Scalars['String'];
  type: Scalars['String'];
  reuseCount: Scalars['Int'];
};

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['ID'];
  location: Location;
  locations: Array<Location>;
  name: Scalars['String'];
};


export type OrganisationLocationArgs = {
  id: Scalars['ID'];
};


export type OrganisationLocationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLocation: Location;
  createOrganisation: Organisation;
  login: Auth;
  register: Auth;
  updateViewer: User;
};


export type MutationCreateLocationArgs = {
  organisationId: Scalars['ID'];
  location: CreateLocationInput;
};


export type MutationCreateOrganisationArgs = {
  organisation: CreateOrganisationInput;
};


export type MutationLoginArgs = {
  emailAddress: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  emailAddress: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateViewerArgs = {
  user: UpdateUserInput;
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['ID'];
  name: Scalars['String'];
  organisation: Organisation;
};

export type CreateLocationInput = {
  name: Scalars['String'];
};

export type CreateOrganisationInput = {
  name: Scalars['String'];
};

export type OrganisationsOrderInput = {
  field: OrganisationsOrderFieldInput;
  sort?: Maybe<Sort>;
};

export enum OrganisationsOrderFieldInput {
  Name = 'name',
  OwnerId = 'ownerId'
}

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Auth = {
  __typename?: 'Auth';
  accessToken: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  emailAddress: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type UpdateUserInput = {
  emailAddress?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Capsule: ResolverTypeWrapper<Capsule>;
  Organisation: ResolverTypeWrapper<IOrganisation>;
  Mutation: ResolverTypeWrapper<{}>;
  Location: ResolverTypeWrapper<ILocation>;
  CreateLocationInput: CreateLocationInput;
  CreateOrganisationInput: CreateOrganisationInput;
  OrganisationsOrderInput: OrganisationsOrderInput;
  OrganisationsOrderFieldInput: OrganisationsOrderFieldInput;
  Sort: Sort;
  Auth: ResolverTypeWrapper<Auth>;
  User: ResolverTypeWrapper<User>;
  UpdateUserInput: UpdateUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  String: Scalars['String'];
  Capsule: Capsule;
  Organisation: IOrganisation;
  Mutation: {};
  Location: ILocation;
  CreateLocationInput: CreateLocationInput;
  CreateOrganisationInput: CreateOrganisationInput;
  OrganisationsOrderInput: OrganisationsOrderInput;
  Auth: Auth;
  User: User;
  UpdateUserInput: UpdateUserInput;
  Boolean: Scalars['Boolean'];
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  capsule?: Resolver<ResolversTypes['Capsule'], ParentType, ContextType, RequireFields<QueryCapsuleArgs, 'id'>>;
  capsules?: Resolver<Array<ResolversTypes['Capsule']>, ParentType, ContextType, RequireFields<QueryCapsulesArgs, 'limit' | 'offset' | 'order' | 'sort'>>;
  organisation?: Resolver<ResolversTypes['Organisation'], ParentType, ContextType, RequireFields<QueryOrganisationArgs, 'id'>>;
  organisations?: Resolver<Array<ResolversTypes['Organisation']>, ParentType, ContextType, RequireFields<QueryOrganisationsArgs, 'offset' | 'limit'>>;
  viewer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type CapsuleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Capsule'] = ResolversParentTypes['Capsule']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  landings?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalLaunch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reuseCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganisationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Organisation'] = ResolversParentTypes['Organisation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType, RequireFields<OrganisationLocationArgs, 'id'>>;
  locations?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<OrganisationLocationsArgs, 'offset' | 'limit'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createLocation?: Resolver<ResolversTypes['Location'], ParentType, ContextType, RequireFields<MutationCreateLocationArgs, 'organisationId' | 'location'>>;
  createOrganisation?: Resolver<ResolversTypes['Organisation'], ParentType, ContextType, RequireFields<MutationCreateOrganisationArgs, 'organisation'>>;
  login?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'emailAddress' | 'password'>>;
  register?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'emailAddress' | 'password'>>;
  updateViewer?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateViewerArgs, 'user'>>;
};

export type LocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organisation?: Resolver<ResolversTypes['Organisation'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Query?: QueryResolvers<ContextType>;
  Capsule?: CapsuleResolvers<ContextType>;
  Organisation?: OrganisationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Auth?: AuthResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
