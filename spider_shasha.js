// 傻傻视频 TVBox JS 扩展源
// 站点: https://www.sbdgt.com  (Yii CMS, 详情页直出 m3u8)
// 规则依据实测结构: 列表 div#videos > div.item / 详情 /v/短码 / 视频源 <source src="...m3u8">

var rule = {
    title: '傻傻视频',
    host: 'https://www.sbdgt.com',
    homeUrl: '/',
    url: '/?page=fypage',
    searchUrl: '/search?q=**',
    searchable: 1,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36',
        'Referer': 'https://www.sbdgt.com/'
    },
    timeout: 8000,
    class_name: '',
    class_url: '',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input, { headers: rule.headers });
        let m = html.match(/<source\s+src=["']([^"']+\.m3u8[^"']*)["']/i);
        if (m) {
            input = { parse: 0, url: m[1], header: rule.headers };
        } else {
            input = { parse: 0, url: input, header: rule.headers };
        }
    }),
    一级: $js.toString(() => {
        let d = [];
        let html = request(input, { headers: rule.headers });
        let items = pdfa(html, 'div#videos&&div.item');
        items.forEach(it => {
            let href = pdfh(it, 'a.visited&&href');
            let name = pdfh(it, 'div.two-lines a&&Text');
            let pic = pdfh(it, 'img.card-img-top&&src');
            d.push({
                title: name,
                desc: name,
                pic_url: pic,
                url: href,
                content: ''
            });
        });
        return setResult(d);
    }),
    二级: $js.toString(() => {
        let html = request(input, { headers: rule.headers });
        let m = html.match(/<source\s+src=["']([^"']+\.m3u8[^"']*)["']/i);
        let pic = (html.match(/poster=['"]([^'"]+)['"]/i) || [])[1] || '';
        let name = (html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || [])[1] ||
                   (html.match(/<title>([^<]+)<\/title>/i) || [])[1] ||
                   pdfh(html, 'title&&Text');
        VOD = {
            vod_name: name,
            vod_pic: pic,
            vod_content: '',
            vod_play_from: '傻傻视频',
            vod_play_url: '正片$' + (m ? m[1] : input)
        };
    })
};
