import SocialFeed from "./SocialFeed";
import {MastodonStatus, useMastodonFeed} from "../../api/mastodon";
import React, {useEffect} from "react";
import {SocialPostProps} from "./SocialPost";
import LoadingIndicator from "./LoadingIndicator";

type MastodonFeedProps = {
    server: string,
    accountHandle: string,
    domain?: string,
    limit?: number
};

const mapPostToProps = (post: MastodonStatus): SocialPostProps => {
    let status = post;

    if (post.reblog) {
        status = post.reblog;
    }

    return {
        author: {
            name: status.account.display_name,
            handle: status.account.acct.indexOf("@") !== -1 ? status.account.acct.slice(0,status.account.acct.indexOf("@")) : status.account.acct,
            profileImageUrl: status.account.avatar,
            profileUrl: status.account.url
        },
        postedTime: status.edited_at || status.created_at,
        content: status.content,
        ...(post.reblog ? {
            accountInteractedWith: {
                interactionType: "repost",
                name: post.account.display_name,
                handle: post.account.acct,
                profileImageUrl: post.account.avatar,
                profileUrl: post.account.url
            }
        } : ""),
        ...((status.card && status.card.type === "photo") ? {
            card: {
                imageURL: status.card.image!,
                imageAltText: status.card.description,
                linkUrl: status.card.url
            }
        } : ""),
        ...(status.media_attachments.length > 0 ? {
            card: {
                imageURL: status.media_attachments[0].url,
                imageAltText: status.media_attachments[0].description,
                linkUrl: status.card ? status.card.url : ""
            }
        } : "")
    };
};

const MastodonFeed: React.FC<MastodonFeedProps> = ({ server, accountHandle, domain, limit}) => {

    const { posts, accountInfo, loadData, isLoading } = useMastodonFeed(server, accountHandle, domain, { limit });

    useEffect(() => {
        if(!posts && !isLoading) {
            loadData();
        }
    }, [isLoading, loadData, posts]);

    const formattedPosts: SocialPostProps[] | null = !posts ? null : posts.map(post => mapPostToProps(post));

    if(!formattedPosts) return <div><LoadingIndicator /></div>;

    return <SocialFeed posts={formattedPosts} />
};
export default MastodonFeed;