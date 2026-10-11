// 傻傻视频 TVBox JS 源（本地JS源规范）
// 站点: https://www.sbdgt.com  分类: /cat/{编号}  详情: /v/{短码} -> 直出 m3u8
var rule = {
    title: '傻傻视频',
    host: 'https://www.sbdgt.com',
    homeUrl: '/',
    url: '/cat/fyclass?page=fypage',
    searchUrl: '/search?q=**',
    searchable: 1,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36',
        'Referer': 'https://www.sbdgt.com/'
    },
    timeout: 8000,
    class_name: '中文字幕&强奸乱伦&日本无码&日本有码&制服诱惑&AV明星&日韩无码&无码专区&动漫精品&女优明星&巨乳美乳&成人动漫&亚洲情色&亚洲有码&伦理三级&欧美精品&AV解说&卡通动漫&SWAG&欧美性爱&激情动漫&童颜巨乳&女同性恋&日韩精品&美乳巨乳&欧美情色&欧美极品&性感人妻&人妻熟女&欧美-高清无码&黑丝诱惑&三级伦理&邻家人妻&人妻系列&巨乳系列&绝美少女&麻豆传媒&熟女人妻&日本片商&多人群交&空姐模特&丝袜OL&激情口交&SM重味&动漫卡通&口交视频&VR视角&欧美系列&AI换脸&亚洲无码&女同性爱&日本精品&高潮喷吹&日本-中文字幕&禁漫&韩国-主播&日本女优&伦理片&日本-高清有码&韩国明星学生&伦理影片&换脸明星&日本-素人&韩国伦理&欧美无码&HEYZO',
    class_url: '48&13&270&269&92&401&259&254&86&438&93&274&22&105&367&260&392&130&452&52&453&125&115&275&111&265&266&425&23&658&454&84&273&101&99&109&416&267&403&129&5&424&134&106&149&110&451&131&357&64&132&467&96&657&643&653&432&644&666&54&120&516&717&44&246&124',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input, { headers: rule.headers });
        let m = html.match(/<source\s+src=["']([^"']+\.m3u8[^"']*)["']/i);
        input = { parse: 0, url: m ? m[1] : input, header: rule.headers };
    }),
    一级: $js.toString(() => {
        let d = [];
        let html = request(input, { headers: rule.headers });
        let items = pdfa(html, 'div#videos&&div.item');
        items.forEach(it => {
            let href = pdfh(it, 'a.visited&&href');
            let name = pdfh(it, 'div.lines a&&Text') || pdfh(it, 'div.two-lines a&&Text');
            let pic = pdfh(it, 'img.card-img-top&&src');
            d.push({ title: name, desc: '', pic_url: pic, url: href, content: '' });
        });
        return setResult(d);
    }),
    二级: $js.toString(() => {
        let html = request(input, { headers: rule.headers });
        let m = html.match(/<source\s+src=["']([^"']+\.m3u8[^"']*)["']/i);
        let pic = (html.match(/poster=['"]([^'"]+)['"]/i) || [])[1] || '';
        let name = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || '';
        VOD = {
            vod_name: name, vod_pic: pic, vod_content: '',
            vod_play_from: '傻傻视频',
            vod_play_url: '正片$' + (m ? m[1] : input)
        };
    })
};
