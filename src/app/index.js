import React, { useState } from 'react';

// Libraries
import ImageLoading from 'react-image-loading';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Styles
import styles from '../styles/app.module.scss';

// Icons
import socialityLogo from '../images/logos/sociality_logo.svg';
import notifications from '../images/icons/notifications.png';
import no_post from '../images/no-post.png';
import likes from '../images/icons/likes.png';
import comments from '../images/icons/comments.png';
import shares from '../images/icons/shares.png';
import shares_twitter from '../images/icons/shares_twitter.png';
import views from '../images/icons/views.png';
import heart from '../images/icons/heart.png';
import deleteIcon from '../images/icons/delete.png';
import cancel from '../images/icons/cancel.png';
import options from '../images/icons/options.png';
import approve from '../images/icons/approve.png';

// Avatars
import avatar from '../images/avatars/avatar.png';

// Data
import data from '../data/data.json';
import { dropdown, brands, months } from '../data';

const Img = (props) => (
    <ImageLoading>
        {(ref, status) => (
            <React.Fragment>
                {status === 'error' || !props.src
                    ? <div><img src={no_post} className={props.className} /></div>
                    : <img ref={ref} {...props} />
                }
            </React.Fragment>
        )}
    </ImageLoading>
);

const App = () => {
    const [brandSelected, setBrandSelected] = useState(3);
    const [toggleAccordion, setAccordion] = useState(1);
    const [selectedAlt, setAlt] = useState("Feed"); // The element selected in accordion. Temporarily used static variable.

    const _render = {
        brand: () => {
            const brandsRender = [];
            brands.map((element, index) => {
                brandsRender.push(
                    <div className={styles.brandWrapper}>
                        <button className={brandSelected == index ? styles.brand__selected : styles.brand} onClick={() => setBrandSelected(index)}>
                            <img src={element.logo} alt="brand" className={styles.logo} />
                        </button>
                        {element.notifications && <div className={styles.notification}>{element.notifications}</div>}
                        {brandSelected == index && <div className={styles.pill}></div>}
                    </div>
                )
            })
            return brandsRender
        },
        accordion: () => {
            const accordionRender = [];
            const toggle = index => {
                if (toggleAccordion === index) {
                    return setAccordion(null);
                }
                setAccordion(index);
            }
            dropdown.map((element, index) => {
                const selected = toggleAccordion === index;
                accordionRender.push(
                    <div className={styles.accordionWrapper}>
                        <div className={selected ? styles.accordion__selected : styles.accordion} onClick={() => toggle(index)}>
                            <div>
                                <img src={element.icon} alt="icon" className={styles.icon} />
                                {selected && <div className={styles.accordionTriang}></div>}
                            </div>
                            <div className={styles.text}>
                                {element.title}
                            </div>
                            <div className={styles.action}>
                                {selected ? <div>
                                    <FontAwesomeIcon icon={faMinus} color={"#1d1d1d"} className={styles.icon} />
                                </div> : <div>
                                    <FontAwesomeIcon icon={faPlus} color={"#1d1d1d"} className={styles.icon} />
                                </div>}

                            </div>
                        </div>
                        {selected && <ul className={styles.contentWrapper}>
                            {element.content.map((ele, ind) => {
                                return (
                                    <li className={ele.title == selectedAlt ? styles.accordionList__selected : styles.accordionList}>
                                        <a>
                                            {ele.title}
                                        </a>
                                    </li>
                                )
                            })}</ul>}
                    </div>
                )
            })
            return accordionRender
        },
        post: post => {
            console.log("post", post)

            const postDate = new Date(post.published_at);

            const { status } = post;
            let style = null;

            if (status == 0) style = styles.postStatus__approval
            else if (status == 1) style = styles.postStatus__scheduled
            else if (status == 2) style = styles.postStatus__notes // Normally this should be 'publishing' as described in project docs, but theres no such state in Mockup.
            else if (status == 3) style = styles.postStatus__published
            else if (status == 4) style = styles.postStatus__error

            const renderIcon = platform => {
                if (platform == 'facebook') return <FontAwesomeIcon icon={faFacebookF} color={"#fff"} />
                else if (platform == 'twitter') return <FontAwesomeIcon icon={faTwitter} color={"#fff"} />
                else if (platform == 'instagrambusiness') return <FontAwesomeIcon icon={faInstagram} color={"#fff"} />
            }

            const reaction = (amount, icon) => {
                return <div className={styles.reaction}>
                    <img src={icon} className={styles.reactionImage} />
                    <div className={styles.reactionText}>
                        {amount}
                    </div>
                </div>
            }

            const renderReactions = platform => {
                switch (platform) {
                    case 'facebook':
                        return <div className={styles.reactions}>
                            {reaction(0, likes)}
                            {reaction(0, comments)}
                            {reaction(0, shares)}
                            {reaction(0, views)}
                        </div>

                    case 'twitter':
                        return <div className={styles.reactions}>
                            {reaction(0, heart)}
                            {reaction(0, shares_twitter)}
                            {reaction(0, comments)}
                            {reaction(0, views)}
                        </div>

                    case 'instagrambusiness':
                        return <div className={styles.reactions}>
                            {reaction(0, likes)}
                            {reaction(0, comments)}
                            {reaction(0, shares)}
                            {reaction(0, views)}
                        </div>

                    default:
                        return <div className={styles.reaction}>
                            Error with renderReactions!
                        </div>
                }
            }

            const renderActions = status => {
                if (status == 0) {
                    return (
                        <div className={styles.action}>
                            <a className={styles.actionButton}>
                                <img src={approve} className={styles.actionImg} />
                            </a>
                            <a className={styles.actionButton}>
                                <img src={deleteIcon} className={styles.actionImg} />
                            </a>
                            <a className={styles.actionButton}>
                                <img src={options} className={styles.actionImg} />
                            </a>
                        </div>
                    )
                } else if (status == 1) {
                    return (
                        <div className={styles.action}>
                            <a className={styles.actionButton}>
                                <img src={cancel} className={styles.actionImg} />
                            </a>
                            <a className={styles.actionButton}>
                                <img src={deleteIcon} className={styles.actionImg} />
                            </a>
                            <a className={styles.actionButton}>
                                <img src={options} className={styles.actionImg} />
                            </a>
                        </div>
                    )
                } else if (status == 3) {
                    return (
                        <div className={styles.action}>
                            <a className={styles.actionButton}>
                                <img src={deleteIcon} className={styles.actionImg} />
                            </a>
                            <a className={styles.actionButton}>
                                <img src={options} className={styles.actionImg} />
                            </a>
                        </div>
                    )

                }
            }

            return (
                <div className={styles.post}>
                    <div className={style}>
                        {renderIcon(post.account.channel)}
                    </div>
                    <div className={styles.postContent}>
                        <div className={styles.postHeader}>
                            <div className={styles.title}>
                                {"" + postDate.getDate() + " " + months[postDate.getMonth()] + " " + postDate.getFullYear() + " - " + postDate.getHours() + ":" + postDate.getMinutes()}
                                <div className={styles.actions}>
                                    {renderActions(post.status)}
                                </div>
                            </div>
                            <div className={styles.desc}>
                                {post.entry.message}
                            </div>
                        </div>
                        <div className={styles.postImage}>
                            <Img src={post.entry.image} className={styles.image} />
                        </div>
                        <div className={styles.postReactions}>
                            {renderReactions(post.account.channel)}
                        </div>
                    </div>
                </div>
            )
        },
        content: () => {
            const contentRender = [];
            const { posts_by_date } = data;

            Object.keys(posts_by_date).map((element, index) => {
                const postDate = new Date(element);
                contentRender.push(
                    <div className={styles.postChannel}>
                        <div className={styles.postDate}>{"" + postDate.getDate() + " " + months[postDate.getMonth()] + " " + postDate.getFullYear()}</div>
                        <div className={styles.postWrapper}>
                            {posts_by_date[element].map((ele, indx) => {
                                return <div>{_render.post(ele)}</div>
                            })}
                        </div>
                    </div>
                )
            })

            return contentRender
        },
        avatar: () => {
            return (
                <div className={styles.avatarWrapper}>
                    <img src={avatar} className={styles.avatar} />
                </div>
            )
        }
    }

    return (
        <div className={styles.wrapper}>
            {_render.avatar()}
            <div className={styles.panel}>
                <div className={styles.panel_header}>
                    <div className={styles.header_logoContainer}>
                        <img src={socialityLogo} alt="Sociality Logo" className={styles.logo} />
                    </div>
                </div>
                <div className={styles.panel_content}>
                    <div className={styles.brandSelector}>
                        {_render.brand()}
                    </div>
                    <div className={styles.accordions}>
                        <div className={styles.notifications} onClick={() => { alert("Notifications") }}>
                            <img src={notifications} className={styles.icon} />
                            NOTIFICATIONS
                            <div className={styles.count}>
                                29
                            </div>
                        </div>
                        {_render.accordion()}
                    </div>
                </div>
            </div>
            <div className={styles.contentsWrapper}>
                <div className={styles.contentStatus}>
                    <div className={styles.status}>
                        <div className={styles.published}></div>
                        <div>Published</div>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.scheduled}></div>
                        <div>Scheduled</div>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.approval}></div>
                        <div>Need Approval</div>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.error}></div>
                        <div>Error</div>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.notes}></div>
                        <div>Notes</div>
                    </div>
                </div>
                <div className={styles.content}>
                    {_render.content()}
                </div>
            </div>
        </div>
    )
}

export default App