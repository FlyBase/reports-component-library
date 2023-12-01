import React from "react";
import ReplyIcon from "./ReplyIcon";
import GenericAccountProfileIcon from "./GenericAccountProfileIcon";
import RepostIcon from "./RepostIcon";
import "../../styles/socialFeed.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: '%ds',
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1m",
        MM: "%dm",
        y: "1y",
        yy: "%dy"
    }
})

type SocialAccount = {
    name: string,
    handle: string,
    profileImageUrl?: string,
    profileUrl?: string
};

type SocialCard = {
    imageURL: string,
    imageAltText: string,
    linkUrl?: string
};

export type SocialPostProps = {
    author: SocialAccount,
    postedTime: string,
    content: string,
    accountInteractedWith?: SocialAccount & {
        interactionType: "repost" | "reply"
    },
    card?: SocialCard
};

const SocialPost: React.FC<SocialPostProps> = ({
    author,
    postedTime,
    accountInteractedWith,
    content,
    card
}) => {
    const ProfileIcon = () => {
        if (!author.profileImageUrl) return <GenericAccountProfileIcon />;
        const ProfileImage = () => <img src={author.profileImageUrl} alt={`${author.name}'s profile`} className="post-header-profile-image" />;
        if (author.profileUrl) return <a href={author.profileUrl}><ProfileImage/></a>;
        return <ProfileImage />;
    };

    const Interaction = () => {
        switch (accountInteractedWith?.interactionType) {
            case "reply": return <div className="post-header-interaction-info"><ReplyIcon /><span>Replied to {accountInteractedWith.name}</span></div>;
            case "repost": return <div className="post-header-interaction-info"><RepostIcon /><span>{accountInteractedWith.name} reposted</span></div>;
            default: return null;
        }
    };

    const UsernameAndHandle = () => {
        const UserInfo = () => <>
            <span className="post-author-name">{author.name}</span>
            <span className="post-author-handle">@{author.handle}</span>
        </>;

        if(author.profileUrl) return <a className="username-and-handle" href={author.profileUrl}><UserInfo /></a>
        return <div className="username-and-handle"><UserInfo /></div>;
    };

    const Card = () => {
        if (!card) return null;
        const CardImage = () => <img src={card.imageURL} alt={card.imageAltText} />;
        if (card.linkUrl) return <a href={card.linkUrl}><CardImage /></a>;
        return <CardImage />;
    };

    return (
        <div className="post">
            <div className="post-header">
                <ProfileIcon />
                <div className="post-header-info">
                    <Interaction />
                    <div className="post-header-author-info">
                        <UsernameAndHandle />
                        <span>•</span>
                        <span className="post-date">{dayjs().diff(postedTime, 'month', true) >= .9 ? dayjs(postedTime).format("M/D/YY") : dayjs(postedTime).fromNow(true)}</span>
                    </div>
                </div>
            </div>
            <div className="post-content">
                <section dangerouslySetInnerHTML={{ __html: content}}></section>
                <Card />
            </div>
        </div>
    );
};
export default SocialPost;