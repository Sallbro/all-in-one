const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env['PORT'] || 9330;

app.get('/', (req, res) => {
    res.send('Welcome to all-in-one api it consists of multiple stores games!');
    res.end();
});

app.get('/single_game/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    let act_url = process.env['GET_SINGLE_GAME_URL'];
    act_url = act_url.replace("${game_id}", id);
    act_url = act_url.replace("${key}", process.env['KEY']);

    axios.get(act_url).then(async (response) => {
        const resp_data = {};
        const data = await response.data;
        resp_data.id = data?.id || id;
        resp_data.slug = data?.slug;
        resp_data.name = data?.name_original;
        resp_data.background_image = data?.background_image;
        resp_data.rating = data?.rating;
        resp_data.released = data?.released;
        resp_data.updated = data?.updated;
        resp_data.website = data?.website;
        resp_data.description = data?.description_raw;

        // clip
        if (data?.clip != null) {
            const clip = {};
            // console.log(data?.clip);
            if (Object.keys(data?.clip?.clips).length != 0) {
                clip.clips = data.clip.clips
            }
            clip.preview = data?.clip?.preview;
            console.log(clip);

            resp_data.clip = clip;
        }

        //short_screenshots
        if (data?.short_screenshots != null) {
            const short_screenshots = [];
            for (const str of data.short_screenshots) {
                short_screenshots.push(str.image);
            }
            resp_data.short_screenshots = short_screenshots;
        }

        //store
        const store = [];
        for (const str of data.stores) {
            const str_data = {};
            str_data.name = str?.store?.name;
            str_data.domain = str?.store?.domain;
            str_data.website = str?.url;
            store.push(str_data);
        }
        resp_data.store = store;

        //platform 
        const platforms = [];
        for (const str of data.platforms) {
            const platform = {};
            platform.name = str?.platform?.name;
            if (Object.keys(str?.requirements).length != 0) {
                platform.system_requirements = str.requirements;
            }
            platforms.push(platform);
        }
        resp_data.platforms = platforms;

        //genres
        const genres = [];
        for (const str of data.genres) {
            genres.push(str?.name);
        }
        resp_data.genres = genres;

        //tags
        const tags = [];
        for (const str of data.tags) {
            tags.push(str?.name);
        }
        resp_data.tags = tags;

        res.send(resp_data);
        res.end();

    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/page_no/:page_no', (req, res) => {
    const page_no = req.params.page_no;
    console.log(page_no);
    let act_url = process.env['GET_PAGE_URL'];
    if (page_no === undefined) {
        page_no = 1;
    }
    act_url = act_url.replace("${page_no}", page_no);
    act_url = act_url.replace("${key}", process.env['KEY']);
    console.log(act_url);
    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};
            // console.log(data);
            resp_data.id = data?.id || id;
            resp_data.slug = data?.slug;
            resp_data.name = data?.name_original;
            resp_data.background_image = data?.background_image;
            resp_data.rating = data?.rating;
            resp_data.released = data?.released;
            resp_data.updated = data?.updated;
            resp_data.website = data?.website;
            resp_data.description = data?.description_raw;

            // clip
            if (data?.clip != null) {
                const clip = {};
                // console.log(data?.clip);
                if (Object.keys(data?.clip?.clips).length != 0) {
                    clip.clips = data.clip.clips
                }
                clip.preview = data?.clip?.preview;
                console.log(clip);

                resp_data.clip = clip;
            }

            //short_screenshots
            if (data?.short_screenshots != null) {
                const short_screenshots = [];
                for (const str of data.short_screenshots) {
                    short_screenshots.push(str.image);
                }
                resp_data.short_screenshots = short_screenshots;
            }

            //store
            const store = [];
            for (const str of data.stores) {
                const str_data = {};
                str_data.name = str?.store?.name;
                str_data.domain = str?.store?.domain;
                str_data.website = str?.url;
                store.push(str_data);
            }
            resp_data.store = store;

            //genres
            const genres = [];
            for (const str of data.genres) {
                genres.push(str?.name);
            }
            resp_data.genres = genres;

            //tags
            const tags = [];
            for (const str of data.tags) {
                tags.push(str?.name);
            }
            resp_data.tags = tags;

            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();

    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/search', (req, res) => {
    const search = req.query.search;
    console.log(search);
    let act_url = process.env['GET_SEARCH_URL'];
    if (search === undefined) {
        search = gta;
    }
    act_url = act_url.replace("${sugg}", search);
    act_url = act_url.replace("${key}", process.env['KEY']);
    console.log(act_url);
    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};
            // console.log(data);
            resp_data.id = data?.id || id;
            resp_data.slug = data?.slug;
            resp_data.name = data?.name_original;
            resp_data.background_image = data?.background_image;
            resp_data.rating = data?.rating;
            resp_data.released = data?.released;
            resp_data.updated = data?.updated;
            resp_data.website = data?.website;
            resp_data.description = data?.description_raw;

            // clip
            if (data?.clip != null) {
                const clip = {};
                // console.log(data?.clip);
                if (Object.keys(data?.clip?.clips).length != 0) {
                    clip.clips = data.clip.clips
                }
                clip.preview = data?.clip?.preview;
                resp_data.clip = clip;
            }

            //short_screenshots
            if (data?.short_screenshots != null) {
                const short_screenshots = [];
                for (const str of data.short_screenshots) {
                    short_screenshots.push(str.image);
                }
                resp_data.short_screenshots = short_screenshots;
            }
            //platform
            if (data?.parent_platforms != null) {
                const platform = [];
                for (const str of data.parent_platforms) {
                    platform.push(str?.platform?.name);
                }
                resp_data.platform = platform;
            }

            //store
            if (data?.stores != null) {
                const store = [];
                for (const str of data?.stores) {
                    const str_data = {};
                    str_data.name = str?.store?.name;
                    str_data.domain = str?.store?.domain;
                    str_data.website = str?.url;
                    store.push(str_data);
                }
                resp_data.store = store;
            }
            //genres
            const genres = [];
            for (const str of data.genres) {
                genres.push(str?.name);
            }
            resp_data.genres = genres;

            //tags
            const tags = [];
            for (const str of data.tags) {
                tags.push(str?.name);
            }
            resp_data.tags = tags;

            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();

    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/category', (req, res) => {
    // ?genres&platform&page_no
    let genres = req.query.genres;
    let platform = req.query.platform;
    let page_no = req.query.page_no;
    console.log(genres + " " + platform + " " + page_no);
    let act_url = process.env['CATEGORY_URL'];
    if (page_no === undefined) {
        page_no = 1;
    }
    if (platform !== undefined && genres === undefined) {
        genres = process.env['GENRES1'];
        switch (platform) {
            case "pc":
                platform = process.env['PLATFORM1'];

                break;
            case "playstation":
                platform = process.env['PLATFORM2'];

                break;
            case "xbox":
                platform = process.env['PLATFORM3'];

                break;
            case "ios":
                platform = process.env['PLATFORM4'];

                break;
            case "mac":
                platform = process.env['PLATFORM5'];

                break;
            case "linux":
                platform = process.env['PLATFORM6'];

                break;
            case "nindento":
                platform = process.env['PLATFORM7'];

                break;
            case "android":
                platform = process.env['PLATFORM8'];

                break;
            default:
                platform = process.env['PLATFORM1'];
        }
    }
    else if (platform === undefined && genres !== undefined) {
        act_url = act_url.replace("&parent_platforms=", "");
        platform = "";

        switch (genres) {
            case "relevance":
                genres = process.env['GENRES1'];

                break;
            case "created":
                genres = process.env['GENRES2'];

                break;
            case "name":
                genres = process.env['GENRES3'];

                break;
            case "released":
                genres = process.env['GENRES4'];

                break;
            case "added":
                genres = process.env['GENRES5'];

                break;
            case "rating":
                genres = process.env['GENRES6'];

                break;
            default:
                genres = process.env['GENRES1'];
        }
    }
    else if (genres === undefined && platform === undefined) {
        act_url = act_url.replace("&parent_platforms=", "");
        platform = "";
        genres = process.env['GENRES1'];
    }
    act_url = act_url.replace("${genres}", genres);
    act_url = act_url.replace("${platform}", platform);
    act_url = act_url.replace("${page_no}", page_no);
    act_url = act_url.replace("${key}", process.env['KEY']);
    console.log(act_url);
    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};
            // console.log(data);
            resp_data.id = data?.id || id;
            resp_data.slug = data?.slug;
            resp_data.name = data?.name_original;
            resp_data.background_image = data?.background_image;
            resp_data.rating = data?.rating;
            resp_data.released = data?.released;
            resp_data.updated = data?.updated;
            resp_data.website = data?.website;
            resp_data.description = data?.description_raw;

            // clip
            if (data?.clip != null) {
                const clip = {};
                // console.log(data?.clip);
                if (Object.keys(data?.clip?.clips).length != 0) {
                    clip.clips = data.clip.clips
                }
                clip.preview = data?.clip?.preview;
                resp_data.clip = clip;
            }

            //short_screenshots
            if (data?.short_screenshots != null) {
                const short_screenshots = [];
                for (const str of data.short_screenshots) {
                    short_screenshots.push(str.image);
                }
                resp_data.short_screenshots = short_screenshots;
            }
            //store
            if (data?.stores != null) {
                const store = [];
                for (const str of data?.stores) {
                    const str_data = {};
                    str_data.name = str?.store?.name;
                    str_data.domain = str?.store?.domain;
                    str_data.website = str?.url;
                    store.push(str_data);
                }
                resp_data.store = store;
            }
            //genres
            const genres = [];
            for (const str of data.genres) {
                genres.push(str?.name);
            }
            resp_data.genres = genres;

            //tags
            const tags = [];
            for (const str of data.tags) {
                tags.push(str?.name);
            }
            resp_data.tags = tags;

            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();

    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/screenshots/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    let act_url = process.env['SCREENSHOTS_URL'];
    act_url = act_url.replace("${game_id}", id);
    act_url = act_url.replace("${key}", process.env['KEY']);
    console.log(act_url);
    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};

            resp_data.image = data?.image;
            resp_data.width = data?.width;
            resp_data.height = data?.height;

            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();
    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/suggested_game/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    let act_url = process.env['SUGGESTED_GAME_URL'];
    act_url = act_url.replace("${game_id}", id);
    act_url = act_url.replace("${key}", process.env['KEY']);
    console.log(act_url);
    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};
            // console.log(data);
            resp_data.id = data?.id || id;
            resp_data.slug = data?.slug;
            resp_data.name = data?.name_original;
            resp_data.background_image = data?.background_image;
            resp_data.rating = data?.rating;
            resp_data.released = data?.released;
            resp_data.updated = data?.updated;
            resp_data.website = data?.website;
            resp_data.description = data?.description_raw;

            // clip
            if (data?.clip != null) {
                const clip = {};
                // console.log(data?.clip);
                if (Object.keys(data?.clip?.clips).length != 0) {
                    clip.clips = data.clip.clips
                }
                clip.preview = data?.clip?.preview;
                resp_data.clip = clip;
            }

            //short_screenshots
            if (data?.short_screenshots != null) {
                const short_screenshots = [];
                for (const str of data.short_screenshots) {
                    short_screenshots.push(str.image);
                }
                resp_data.short_screenshots = short_screenshots;
            }

            //platform
            if (data?.parent_platforms != null) {
                const platform = [];
                for (const str of data.parent_platforms) {
                    platform.push(str?.platform?.name);
                }
                resp_data.platform = platform;
            }

            //store
            if (data?.stores != null) {
                const store = [];
                for (const str of data?.stores) {
                    const str_data = {};
                    str_data.name = str?.store?.name;
                    str_data.domain = str?.store?.domain;
                    str_data.website = str?.url;
                    store.push(str_data);
                }
                resp_data.store = store;
            }
            //genres
            const genres = [];
            for (const str of data.genres) {
                genres.push(str?.name);
            }
            resp_data.genres = genres;

            //tags
            const tags = [];
            for (const str of data.tags) {
                tags.push(str?.name);
            }
            resp_data.tags = tags;

            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();

    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/reviews/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    let act_url = process.env['REVIEWS_URL'];
    act_url = act_url.replace("${game_id}", id);
    act_url = act_url.replace("${genres}", "-created");
    act_url = act_url.replace("${key}", process.env['KEY']);
    console.log(act_url);
    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};
            if (data?.user != null) {
                const user = {};
                user.username = data?.user?.username;
                if (data?.user?.full_name != "") {
                    user.full_name = data?.user?.full_name;
                }
                if (data?.user?.avatar != null) {
                    user.avatar = data?.user?.avatar;
                }
                resp_data.user = user;
            }
            resp_data.text = data?.text;
            resp_data.rating = data?.rating;
            resp_data.created = data?.created;
            resp_data.share_image = data?.share_image;
            // if (data?.comments?.count != 0) {
            //     const comments = {};
            //     comments.count = data?.comments?.count;
            //     const results = [];
            //     for (comm_res of data?.comments?.results) {
            //         const res_data = {};
            //         if (comm_res?.user != null) {
            //             const user = {};
            //             for (comm_user in comm_res?.user) {
            //                 user.username = user?.comm_user;
            //                 if (comm_user?.full_name != "") {
            //                     user.full_name = comm_user.full_name;
            //                 }
            //                 if (comm_user?.avatar != null) {
            //                     user.avatar = comm_user.avatar;
            //                 }
            //             }
            //             res_data.user = user;
            //         }
            //         res_data.text = res?.text;
            //         results.push(res_data);
            //     }
            //     resp_data.comments = comments;
            // }
            // else {
            //     resp_data.comments = data?.comments;
            // }
            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();

    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/youtube/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    let act_url = process.env['YOUTUBE_VIDEO_URL'];
    act_url = act_url.replace("${game_id}", id);
    act_url = act_url.replace("${key}", process.env['KEY']);
    console.log(act_url);
    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};
            // console.log(data);
            resp_data.id = data?.id || id;
            resp_data.name = data?.name_original;
            if (data?.external_id != null) {
                resp_data.video_url = "https://www.youtube.com/watch?v=" + data?.external_id;
            }
            resp_data.channel_id = data?.channel_id;
            resp_data.channel_title = data?.channel_title;
            resp_data.description = data?.description;
            resp_data.created = data?.created;
            resp_data.like_count = data?.like_count;
            resp_data.dislike_count = data?.dislike_count;
            resp_data.view_count = data?.view_count;
            resp_data.comments_count = data?.comments_count;
            resp_data.thumbnails = data?.thumbnails;

            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();

    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/game_series/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    let act_url = process.env['GAME_SERIES_URL'];
    act_url = act_url.replace("${game_id}", id);
    act_url = act_url.replace("${key}", process.env['KEY']);
    console.log(act_url);
    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};
            // console.log(data);
            resp_data.id = data?.id || id;
            resp_data.slug = data?.slug;
            resp_data.name = data?.name_original;
            resp_data.background_image = data?.background_image;
            resp_data.rating = data?.rating;
            resp_data.released = data?.released;
            resp_data.updated = data?.updated;
            resp_data.website = data?.website;
            resp_data.description = data?.description_raw;

            // clip
            if (data?.clip != null) {
                const clip = {};
                // console.log(data?.clip);
                if (Object.keys(data?.clip?.clips).length != 0) {
                    clip.clips = data.clip.clips
                }
                clip.preview = data?.clip?.preview;
                resp_data.clip = clip;
            }

            //short_screenshots
            if (data?.short_screenshots != null) {
                const short_screenshots = [];
                for (const str of data.short_screenshots) {
                    short_screenshots.push(str.image);
                }
                resp_data.short_screenshots = short_screenshots;
            }

            //platform
            if (data?.parent_platforms != null) {
                const platform = [];
                for (const str of data.parent_platforms) {
                    platform.push(str?.platform?.name);
                }
                resp_data.platform = platform;
            }

            //store
            if (data?.stores != null) {
                const store = [];
                for (const str of data?.stores) {
                    const str_data = {};
                    str_data.name = str?.store?.name;
                    str_data.domain = str?.store?.domain;
                    str_data.website = str?.url;
                    store.push(str_data);
                }
                resp_data.store = store;
            }
            //genres
            const genres = [];
            for (const str of data.genres) {
                genres.push(str?.name);
            }
            resp_data.genres = genres;

            //tags
            const tags = [];
            for (const str of data.tags) {
                tags.push(str?.name);
            }
            resp_data.tags = tags;

            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();

    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/twitch/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    let act_url = process.env['TWITCH_URL'];
    act_url = act_url.replace("${game_id}", id);
    act_url = act_url.replace("${key}", process.env['KEY']);

    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};

            resp_data.name = data?.name;
            if (data?.external_id != null) {
                resp_data.video_url = "https://www.twitch.tv/videos/" + data?.external_id;
            }
            resp_data.created = data?.created;
            if (data?.thumbnail != null) {
                let thumbnail = data?.thumbnail;
                thumbnail = thumbnail.replace("%{width}", 1200);
                thumbnail = thumbnail.replace("%{height}", 630);
                resp_data.thumbnail = thumbnail;
            }
            resp_data.view_count = data?.view_count;
            resp_data.language = data?.language;

            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();
    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.get('/achievement/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    let act_url = process.env['ACHIEVEMENT_URL'];
    act_url = act_url.replace("${game_id}", id);
    act_url = act_url.replace("${key}", process.env['KEY']);

    axios.get(act_url).then(async (response) => {
        const datas = await response.data;
        const coll_resp_data = [];
        for (const data of datas?.results) {
            const resp_data = {};

            resp_data.name = data?.name;
            resp_data.description = data?.description;
            resp_data.image = data?.image;
            resp_data.percent = data?.percent;

            coll_resp_data.push(resp_data);
        }
        res.send(coll_resp_data);
        res.end();
    }).catch(e => {
        console.log(e);
        res.end();
    });
});

app.listen(3000, function () {
    console.log('listing on port 3000');
});