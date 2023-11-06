import "../../styles/socialFeed.scss";
import SocialPost, {SocialPostProps} from "./SocialPost";
import React from "react";

type SocialFeedProps = {
    posts: SocialPostProps[];
};

const SocialFeed: React.FC<SocialFeedProps> = ({ posts }) => {

    return (
        <ul className="social-feed">
            {
                posts.map((post, index) =>
                    <li key={`social-feed:${index}`}>
                        <SocialPost {...post}/>
                    </li>
                )
            }
        </ul>
    );
};
export default SocialFeed;