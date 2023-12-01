import {useAPI} from "./useApi";
import {useEffect} from "react";

type MastodonCustomEmoji = {
    shortcode: string,
    url: string,
    static_url: string,
    visible_in_picker: boolean,
    category: string,
};

type MastodonField = {
    name: string,
    value: string,
    verified_at: null | string,
};

type MastodonPreviewCard = {
    url: string,
    title: string,
    description: string,
    type: "link" | "photo" | "video" | "rich",
    author_name: string,
    author_url: string,
    provider_name: string,
    provider_url: string,
    html: string,
    width: number,
    height: number,
    image: null | string,
    blurhash: null | string,
};
type MastodonFilterKeyword = {
    id: string,
    keyword: string,
    whole_word: boolean
};
type MastodonFilterStatus = {
    id: string,
    status_id: string
};
type MastodonFilter = {
    id: string,
    title: string,
    context: ("home" | "notification" | "public" | "thread" | "account")[],
    expires_at: null | string,
    filter_action: "warn" | "hide",
    keywords: MastodonFilterKeyword[],
    statuses: MastodonFilterStatus[],
};
type MastodonFilterResult = {
    filter: MastodonFilter,
    keyword_matches: null | string[],
    status_matches: null | string[],
};
type MastodonPollOption = {
    title: string,
    votes_count: null | number,
};
type MastodonPoll = {
    id: string,
    expires_at: null | string;
    expired: boolean,
    multiple: boolean,
    votes_count: number,
    voters_count: null | number,
    options: MastodonPollOption[],
    emojis: MastodonCustomEmoji[],
    voted?: boolean,
    own_votes?: number[],
};
type MastodonMentions = {
    id: string,
    username: string,
    url: string,
    acct: string,
};
type MastodonTags = {
    name: string,
    url: string,
};

type MastodonAccount = {
    id: string,
    username: string,
    acct: string,
    url: string,
    display_name: string,
    note: string,
    avatar: string,
    avatar_static: string,
    header: string,
    header_static: string,
    locked: boolean,
    fields: MastodonField[],
    emojis: MastodonCustomEmoji[],
    bot: boolean,
    group: boolean,
    discoverable: boolean,
    noindex?: null | boolean,
    moved?: null | MastodonAccount,
    suspended?: boolean,
    limited?: boolean,
    created_at: string,
    last_status_at: null | string,
    statuses_count: number,
    followers_count: number,
    following_count: number,
};

type MastodonMediaAttachment = {
    id: string,
    type: "unknown" | "image" | "gifv" | "video" | "audio",
    url: string,
    preview_url: string,
    remote_url: null | string,
    meta: string,
    description: string,
    blurhash: string,
    text_url: string,

};

export type MastodonStatus = {
    id: string,
    uri: string,
    created_at: string,
    account: MastodonAccount,
    content: string,
    visibility: "public" | "unlisted" | "private" | "direct",
    sensitive: boolean,
    spoiler_text: string,
    media_attachments: MastodonMediaAttachment[],
    application?: {
        name: string,
        website: null | string,
    },
    mentions: MastodonMentions[],
    tags: MastodonTags[],
    emojis: MastodonCustomEmoji[],
    reblogs_count: number,
    favorites_count: number,
    replies_count: number,
    url: null | string,
    in_reply_to_id: null | string,
    in_reply_to_account_id: null | string,
    reblog: null | MastodonStatus,
    poll: null | MastodonPoll,
    card: null | MastodonPreviewCard,
    language: null | string,
    text: null | string,
    edited_at: null | string,
    favorited?: boolean,
    reblogged?: boolean,
    muted?: boolean,
    bookmarked?: boolean,
    pinned?: boolean,
    filtered?: MastodonFilterResult[],
};

export type UseMastodonFeedOptions = {
    limit?: number
};


export const useMastodonAccountInfo = (server: string, accountHandle: string, domain: string = server) =>
    useAPI<{}, MastodonAccount>(`https://${server}/api/v1/accounts/lookup`, undefined, {acct: `${accountHandle}@${domain}`});

export const useMastodonFeed = (server: string, accountHandle: string, domain: string = server, options?: UseMastodonFeedOptions) => {
    const { response: accountInfo, loadData: loadAccountInfo, isLoading: isLoadingAccountInfo } = useMastodonAccountInfo(server, accountHandle, domain);
    const { response: posts, loadData: loadPosts, isLoading: isLoadingPosts } = useAPI<{}, MastodonStatus[]>(`https://${server}/api/v1/accounts/${accountInfo?.id}/statuses`, {}, options);

    const loadData = () => {
        if(!accountInfo && !isLoadingAccountInfo) {
            loadAccountInfo();
        }
    };

    useEffect(() => {
        if(accountInfo?.id && !posts && !isLoadingPosts) {
            loadPosts();
        }
    }, [accountInfo, isLoadingPosts, loadPosts, posts]);

    return { posts, accountInfo, loadData, isLoading: isLoadingAccountInfo || isLoadingPosts }

}