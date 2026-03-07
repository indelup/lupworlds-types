import { z } from "zod";

// ENUMS
export enum ROLE {
    STREAMER = "streamer",
    VIEWER = "viewer",
}

export enum PITYMODE {
    PULL = "pull",
    SHOP = "shop",
}

// SCHEMAS & INFERRED TYPES

export const TwitchDataSchema = z.object({
    id: z.string(),
    token: z.string(),
    name: z.string(),
});
export type TwitchData = z.infer<typeof TwitchDataSchema>;

export const UserSchema = z.object({
    id: z.string(),
    twitchId: z.string(),
    alias: z.string(),
    allowedRoles: z.array(z.nativeEnum(ROLE)),
    // Worlds belonging to this user as a streamer. Initially capped to 1 world.
    worldIds: z.array(z.string()),
});
export type User = z.infer<typeof UserSchema>;

export const RecipeIngredientSchema = z.object({
    materialId: z.string(),
    quantity: z.number(),
});
export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>;

export const RecipeSchema = z.object({
    ingredients: z.array(RecipeIngredientSchema),
    currencyId: z.string(),
    currencyAmount: z.number(),
});
export type Recipe = z.infer<typeof RecipeSchema>;

export const BannerRedeemSchema = z.object({
    redeemId: z.string(),
    // Stored for display — avoids re-fetching Twitch API on each render
    redeemName: z.string(),
    bannerId: z.string(),
});
export type BannerRedeem = z.infer<typeof BannerRedeemSchema>;

export const CurrencySchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
});
export type Currency = z.infer<typeof CurrencySchema>;

export const WorldSchema = z.object({
    id: z.string(),
    name: z.string(),
    streamerIds: z.array(z.string()),
    maxRarity: z.number(),
    // S3 key for the world logo image
    logoSrc: z.string().optional(),
    // S3 key for the world background image
    backgroundSrc: z.string().optional(),
    // Twitch channel point redeem → banner mappings
    redeems: z.array(BannerRedeemSchema).optional(),
    // S3 keys for card back images, keyed by rarity (1–5)
    cardBacks: z.record(z.string(), z.string()).optional(),
    currencies: z.array(CurrencySchema).optional(),
    // Crafting recipes: key = output item ID (character or action), value = recipe
    recipes: z.record(z.string(), RecipeSchema).optional(),
});
export type World = z.infer<typeof WorldSchema>;

// Streamer Assets

export const CharacterSchema = z.object({
    id: z.string(),
    worldId: z.string(),
    name: z.string(),
    description: z.string(),
    artist: z.string(),
    characterSrc: z.string(),
    backgroundSrc: z.string(),
    rarity: z.number(),
    createdAt: z.string().optional(),
});
export type Character = z.infer<typeof CharacterSchema>;

export const MaterialSchema = z.object({
    id: z.string(),
    worldId: z.string(),
    name: z.string(),
    description: z.string(),
    artist: z.string(),
    materialSrc: z.string(),
    backgroundSrc: z.string(),
    rarity: z.number(),
    createdAt: z.string().optional(),
});
export type Material = z.infer<typeof MaterialSchema>;

export const ActionSchema = z.object({
    id: z.string(),
    worldId: z.string(),
    name: z.string(),
    description: z.string(),
    artist: z.string(),
    actionSrc: z.string(),
    backgroundSrc: z.string(),
    rarity: z.number(),
    createdAt: z.string().optional(),
});
export type Action = z.infer<typeof ActionSchema>;

export const BannerBagItemSchema = z.object({
    id: z.string(),
    type: z.enum(["character", "material", "action"]),
    itemId: z.string(),
});
export type BannerBagItem = z.infer<typeof BannerBagItemSchema>;

export const BannerBagSchema = z.object({
    id: z.string(),
    items: z.array(BannerBagItemSchema),
    chance: z.number(),
});
export type BannerBag = z.infer<typeof BannerBagSchema>;

export const BannerSchema = z.object({
    id: z.string(),
    worldId: z.string(),
    imageSrc: z.string(),
    bags: z.array(BannerBagSchema),
    createdAt: z.string().optional(),
});
export type Banner = z.infer<typeof BannerSchema>;

export const PullsPitySchema = z.object({
    mode: z.literal(PITYMODE.PULL),
});
export type PullsPity = z.infer<typeof PullsPitySchema>;

export const ShopPitySchema = z.object({
    mode: z.literal(PITYMODE.SHOP),
    shopId: z.string(),
});
export type ShopPity = z.infer<typeof ShopPitySchema>;

export const PitySchema = z.discriminatedUnion("mode", [
    PullsPitySchema,
    ShopPitySchema,
]);
export type Pity = z.infer<typeof PitySchema>;

// Shop

export const ShopItemSchema = z.object({
    type: z.string(),
    id: z.string(),
    quantity: z.string(),
});
export type ShopItem = z.infer<typeof ShopItemSchema>;

export const ShopSchema = z.object({
    items: z.array(ShopItemSchema),
    currencyId: z.string(),
});
export type Shop = z.infer<typeof ShopSchema>;

// Player Data

export const GachaItemSchema = z.object({
    itemId: z.string(),
    quantity: z.number(),
});
export type GachaItem = z.infer<typeof GachaItemSchema>;

export const PlayerWorldDataSchema = z.object({
    userId: z.string(),
    worldId: z.string(),
    characters: z.array(GachaItemSchema),
    materials: z.array(GachaItemSchema),
});
export type PlayerWorldData = z.infer<typeof PlayerWorldDataSchema>;
