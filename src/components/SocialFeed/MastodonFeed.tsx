import SocialFeed from "./SocialFeed";
import {MastodonStatus, useMastodonFeed} from "../../api/mastodon";
import React, {useEffect} from "react";
import {SocialPostProps} from "./SocialPost";

type MastodonFeedProps = {
    server: string,
    accountHandle: string,
    domain?: string
};

const mapPostToProps = (post: MastodonStatus): SocialPostProps => {
    let status = post;

    if (post.reblog) {
        status = post.reblog;
    }

    return {
        author: {
            name: status.account.display_name,
            handle: status.account.acct,
            profileImageUrl: status.account.avatar,
            profileUrl: status.account.url
        },
        postedTime: status.edited_at || status.created_at,
        content: status.content,
        // ...(status.in_reply_to_account_id ? {
        //     accountInteractedWith: {
        //         interactionType: "reply",
        //         name: "",
        //         handle: "",
        //         profileImageUrl: "",
        //         profileUrl: ""
        //     }
        // } : ""),
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

const MastodonFeed: React.FC<MastodonFeedProps> = ({ server, accountHandle, domain}) => {

    const { posts, accountInfo, loadData, isLoading } = useMastodonFeed(server, accountHandle, domain);

    useEffect(() => {
        if(!posts && !isLoading) {
            loadData();
        }
    }, [isLoading, loadData, posts]);

    const formattedPosts: SocialPostProps[] | null = !posts ? null : posts.map(post => mapPostToProps(post));

    if(!formattedPosts) return <div>Loading...</div>;

    return <SocialFeed posts={formattedPosts} />
};
export default MastodonFeed;