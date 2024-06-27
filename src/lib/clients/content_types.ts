import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArtistFields {
    name: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    thumbnail?: EntryFieldTypes.AssetLink;
    signature?: EntryFieldTypes.AssetLink;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    color?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
    service: EntryFieldTypes.EntryLink<TypeServiceSkeleton>;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeArtistSkeleton = EntrySkeletonType<TypeArtistFields, "artist">;
export type TypeArtist<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeArtistSkeleton, Modifiers, Locales>;

export function isTypeArtist<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeArtist<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'artist'
}

export interface TypeHeroFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    afterWord?: EntryFieldTypes.Integer;
    hideLast?: EntryFieldTypes.Integer;
}

export type TypeHeroSkeleton = EntrySkeletonType<TypeHeroFields, "hero">;
export type TypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHeroSkeleton, Modifiers, Locales>;

export function isTypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHero<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'hero'
}

export interface TypeLinkFields {
    label?: EntryFieldTypes.Symbol;
    path?: EntryFieldTypes.Symbol;
    external?: EntryFieldTypes.Boolean;
}

export type TypeLinkSkeleton = EntrySkeletonType<TypeLinkFields, "link">;
export type TypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLinkSkeleton, Modifiers, Locales>;

export function isTypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLink<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'link'
}

export interface TypeListFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeTextSkeleton>>;
}

export type TypeListSkeleton = EntrySkeletonType<TypeListFields, "list">;
export type TypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeListSkeleton, Modifiers, Locales>;

export function isTypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeList<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'list'
}

export interface TypeNavigationFields {
    title?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    links: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypePageFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArtistSkeleton | TypeHeroSkeleton | TypeListSkeleton | TypeProjectSkeleton | TypeTextSkeleton | TypeVimeoSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypeProjectFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    date?: EntryFieldTypes.Date;
    thumbnail?: EntryFieldTypes.AssetLink;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    vimeo?: EntryFieldTypes.Symbol;
    artists?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArtistSkeleton>>;
    services?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeServiceSkeleton>>;
    client?: EntryFieldTypes.Symbol;
    color?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
    related?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectSkeleton>>;
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;

export function isTypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeProject<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'project'
}

export interface TypeServiceFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    artist?: EntryFieldTypes.Symbol;
}

export type TypeServiceSkeleton = EntrySkeletonType<TypeServiceFields, "service">;
export type TypeService<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeServiceSkeleton, Modifiers, Locales>;

export function isTypeService<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeService<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'service'
}

export interface TypeTextFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}

export interface TypeVimeoFields {
    vimeoLink?: EntryFieldTypes.Symbol;
    scroll?: EntryFieldTypes.Boolean;
}

export type TypeVimeoSkeleton = EntrySkeletonType<TypeVimeoFields, "vimeo">;
export type TypeVimeo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeVimeoSkeleton, Modifiers, Locales>;

export function isTypeVimeo<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeVimeo<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'vimeo'
}
