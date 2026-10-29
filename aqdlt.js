// ============================================================
// 爱情岛 影视仓/TVBox 自定义JS源
// 站点: https://38.148.206.7:30018
// 特点: 全站 sojson.v4 加密(反转 + %XX)，本源内置解码
// 用法: 配置里 "spider" 不用填，站点 api 填 ./aqdlt.js
// ============================================================
var HOST = 'https://38.148.206.7:30018';
var UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36';

var CATES = [
    ['1', '中國大陸', '/videos/category/cn/'],
    ['2', 'West 歐美', '/videos/category/west/'],
    ['3', 'Japan 日本', '/videos/category/jp/'],
    ['4', '韓國 대한', '/videos/category/kr/'],
    ['5', '中國香港', '/videos/category/hk/'],
    ['6', '中國台灣', '/videos/category/tw/'],
    ['7', 'Asia 東南亞', '/videos/category/southeast-asia/'],
    ['101', '無碼', '/videos/tag/uncensored/'],
    ['102', 'H動畫', '/videos/tag/cartoon/'],
    ['103', '自拍', '/videos/tag/zipai/'],
    ['104', '偷拍', '/videos/tag/toupai/'],
    ['105', '中文字幕', '/videos/tag/caption/'],
    ['106', '酒店', '/videos/tag/hotel/'],
    ['107', 'KTV', '/videos/tag/ktv/'],
    ['108', '教室', '/videos/tag/classroom/'],
    ['109', '辦公室', '/videos/tag/office/'],
    ['110', '野外', '/videos/tag/outside/'],
    ['111', '洗手間', '/videos/tag/wc/'],
    ['112', '車震', '/videos/tag/car/'],
    ['113', '家裡', '/videos/tag/home/'],
    ['114', '少婦', '/videos/tag/woman/'],
    ['115', '學生', '/videos/tag/student/'],
    ['116', '老師', '/videos/tag/teacher/'],
    ['117', '小姐', '/videos/tag/lady/'],
    ['118', 'OL', '/videos/tag/ol/'],
    ['119', '嫩模', '/videos/tag/model/'],
    ['120', '網紅', '/videos/tag/celebrity/'],
    ['121', '主播', '/videos/tag/anchor/'],
    ['122', '媽媽', '/videos/tag/mother/'],
    ['123', '姐姐', '/videos/tag/sister/'],
    ['124', '巨乳', '/videos/tag/big-breast/'],
    ['125', '美乳', '/videos/tag/beauty-breast/'],
    ['126', '巨臀', '/videos/tag/big-ass/'],
    ['127', '美背', '/videos/tag/beauty-back/'],
    ['128', '三點粉', '/videos/tag/powder/'],
    ['129', '多汁', '/videos/tag/solppy/'],
    ['130', '處女', '/videos/tag/virgin/'],
    ['131', '美腿', '/videos/tag/beauty-leg/'],
    ['132', '巨屌', '/videos/tag/black-big/'],
    ['133', 'SM', '/videos/tag/sm/'],
    ['134', '捆綁', '/videos/tag/bundling/'],
    ['135', '戀足', '/videos/tag/foot-love/'],
    ['136', '強姦', '/videos/tag/rape/'],
    ['137', '同性', '/videos/tag/homosexual/'],
    ['138', '迷姦', '/videos/tag/fornication/'],
    ['139', '近親相姦', '/videos/tag/adultery/'],
    ['140', '制服誘惑', '/videos/tag/uniform/'],
    ['141', '絲襪', '/videos/tag/stockings/'],
    ['142', '護士', '/videos/tag/nurse/'],
    ['143', 'Cosplay', '/videos/tag/cosplay/'],
    ['144', '空姐', '/videos/tag/hostess/'],
    ['145', '情趣內衣', '/videos/tag/sexy-ingerie/'],
    ['146', '后入', '/videos/tag/back-fuck/'],
    ['147', '無套中出', '/videos/tag/injection/'],
    ['148', '自慰', '/videos/tag/masturbation/'],
    ['149', '口爆', '/videos/tag/oral-copulation/'],
    ['150', '深喉', '/videos/tag/deep-throat/'],
    ['151', '潮吹', '/videos/tag/spray-tide/'],
    ['152', '群P', '/videos/tag/group/'],
    ['153', '乳交', '/videos/tag/breast-fuck/'],
    ['154', '顏射', '/videos/tag/yan-shot/'],
    ['155', '肛交', '/videos/tag/anal-copulation/'],
    ['156', '素人', '/videos/tag/avlady/'],
    ['157', '清純可愛', '/videos/tag/pure/'],
    ['158', '白虎', '/videos/tag/hairless/'],
    ['159', '女優', '/videos/tag/star/'],
    ['160', '人獸', '/videos/tag/bestiality/'],
    ['161', '蘿莉', '/videos/tag/loli/'],
    ['162', '明星', '/videos/tag/celebrity/'],
    ['163', '情趣玩具', '/videos/tag/toys/'],
    ['164', '人妖', '/videos/tag/shemale/'],
    ['165', '另類', '/videos/tag/other/'],
    ['166', '按摩', '/videos/tag/massage/'],
    ['167', '露出', '/videos/tag/exhibitionism/'],
    ['168', '胸射', '/videos/tag/chest-shot/']
];

var HDRS = {
    'User-Agent': UA,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Referer': HOST + '/'
};

// ---------- sojson 解码：提取 -> 反转 -> %XX 还原 ----------
function decodeHtml(raw) {
    if (!raw) return '';
    var m = raw.match(/var\s+html\s*=\s*'([^']*)'/);
    if (!m) return raw;
    var s = m[1];
    // 反转
    var rev = '';
    for (var i = s.length - 1; i >= 0; i--) rev += s.charAt(i);
    // %XX 还原成字节
    var bytes = [];
    var p = 0;
    while (p < rev.length) {
        var ch = rev.charAt(p);
        if (ch === '%' && p + 2 < rev.length) {
            var hex = rev.substring(p + 1, p + 3);
            if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
                bytes.push(parseInt(hex, 16));
                p += 3;
                continue;
            }
        }
        var code = rev.charCodeAt(p);
        if (code < 128) {
            bytes.push(code);
        } else {
            // 非 ASCII 理论上不出现，空过
        }
        p++;
    }
    // UTF-8 字节 -> 字符串
    var out = '';
    var k = 0;
    while (k < bytes.length) {
        var b = bytes[k];
        if (b < 128) { out += String.fromCharCode(b); k++; }
        else if (b >= 192 && b < 224 && k + 1 < bytes.length) {
            out += String.fromCharCode(((b & 31) << 6) | (bytes[k + 1] & 63)); k += 2;
        } else if (b >= 224 && b < 240 && k + 2 < bytes.length) {
            out += String.fromCharCode(((b & 15) << 12) | ((bytes[k + 1] & 63) << 6) | (bytes[k + 2] & 63)); k += 3;
        } else if (b >= 240 && k + 3 < bytes.length) {
            var cp = ((b & 7) << 18) | ((bytes[k + 1] & 63) << 12) | ((bytes[k + 2] & 63) << 6) | (bytes[k + 3] & 63);
            cp -= 0x10000;
            out += String.fromCharCode(0xD800 + (cp >> 10), 0xDC00 + (cp & 1023)); k += 4;
        } else { k++; }
    }
    return out;
}

// ---------- 拉取并解码 ----------
function getHtml(url) {
    var raw = request(url, { headers: HDRS });
    return decodeHtml(raw);
}

// ---------- 解析列表（基于解密后的 HTML） ----------
function parseList(html) {
    var d = [];
    if (!html) return d;
    var items = pdfa(html, 'div.videos-item');
    items.forEach(function (it) {
        try {
            var href = pdfh(it, 'div.videos-title a&&href');
            if (!href) href = pdfh(it, 'a.thumbnail-cover-link&&href');
            if (!href) return;
            var mm = href.match(/\/play\/(\d+)/);
            if (!mm) return;
            var vid = mm[1];
            var name = pdfh(it, 'div.videos-title a&&Text');
            if (!name) name = pdfh(it, 'a.thumbnail-cover-link&&title');
            var pic = pdfh(it, 'img.videos-thumbnail&&data-original');
            if (!pic) pic = pdfh(it, 'img&&src');
            var dur = pdfh(it, 'span.video-duration&&Text');
            d.push({
                vod_id: vid,
                vod_name: name,
                vod_pic: pic,
                vod_remarks: dur,
                style: 'rect'
            });
        } catch (e) {}
    });
    return d;
}

// ---------- 最大页数 ----------
function maxPage(html) {
    try {
        var m = html.match(/\u5171\s*(\d+)\s*\u9801/);
        if (m) return parseInt(m[1]);
        m = html.match(/\u5171\s*(\d+)\s*\u9875/);
        if (m) return parseInt(m[1]);
    } catch (e) {}
    return 1;
}

// ---------- 分类路径 ----------
function pathOf(tid) {
    for (var i = 0; i < CATES.length; i++) {
        if (CATES[i][0] === tid) return CATES[i][2];
    }
    return '/videos/index/';
}

var rule = {
    title: '爱情岛',
    host: HOST,
    homeUrl: '/',
    url: '/videos/index/fypage.html',
    searchUrl: '/videos/search.html?key=**&page=fypage',
    searchable: 1,
    quickSearch: 1,
    filterable: 0,
    headers: HDRS,
    timeout: 20000,
    play_parse: true,

    class_name: '中國大陸&West 歐美&Japan 日本&韓國 대한&中國香港&中國台灣&Asia 東南亞&無碼&H動畫&自拍&偷拍&中文字幕&酒店&KTV&教室&辦公室&野外&洗手間&車震&家裡&少婦&學生&老師&小姐&OL&嫩模&網紅&主播&媽媽&姐姐&巨乳&美乳&巨臀&美背&三點粉&多汁&處女&美腿&巨屌&SM&捆綁&戀足&強姦&同性&迷姦&近親相姦&制服誘惑&絲襪&護士&Cosplay&空姐&情趣內衣&后入&無套中出&自慰&口爆&深喉&潮吹&群P&乳交&顏射&肛交&素人&清純可愛&白虎&女優&人獸&蘿莉&明星&情趣玩具&人妖&另類&按摩&露出&胸射',
    class_url: '1&2&3&4&5&6&7&101&102&103&104&105&106&107&108&109&110&111&112&113&114&115&116&117&118&119&120&121&122&123&124&125&126&127&128&129&130&131&132&133&134&135&136&137&138&139&140&141&142&143&144&145&146&147&148&149&150&151&152&153&154&155&156&157&158&159&160&161&162&163&164&165&166&167&168',

    // ================= 一级（列表页） =================
    一级: $js.toString(() => {
        var tid = input.match(/fyclass=([^&]+)/);
        var pg = input.match(/fypage=(\d+)/);
        var cls = tid ? tid[1] : '';
        var page = pg ? parseInt(pg[1]) : 1;
        var path = pathOf(cls);
        var url;
        if (path === '/videos/index/') {
            url = HOST + '/videos/index/' + page + '.html';
        } else if (page <= 1) {
            url = HOST + path + '.html';
        } else {
            url = HOST + path + page + '.html';
        }
        var html = getHtml(url);
        var list = parseList(html);
        var total = maxPage(html);
        return setResult(list, page, total, 18);
    }),

    // ================= 二级（详情页） =================
    二级: $js.toString(() => {
        var id = input.replace(/^.*\/play\//, '').replace(/\.html.*$/, '');
        var mm = id.match(/(\d+)/);
        if (mm) id = mm[1];
        var url = HOST + '/videos/play/' + id + '.html';
        var raw = request(url, { headers: HDRS });
        // 播放串必须从未解码原文里取
        var vm = raw.match(/video_url\s*=\s*'([^']+)'/);
        var playUrl = vm ? vm[1] : '';
        var html = decodeHtml(raw);
        var name = (html.match(/<div class="video-player-title"><h3>([^<]+)<\/h3>/) || [])[1] || '';
        if (!name) name = (html.match(/<title>([^<]+)<\/title>/) || [])[1] || '';
        var pic = (html.match(/<meta itemprop="image" content="([^"]+)"/) || [])[1] || '';
        if (!pic) pic = (html.match(/<img[^>]*data-original="([^"]+)"/) || [])[1] || '';
        var cate = (html.match(/<span class="detail-video-cate">([^<]+)<\/span>/) || [])[1] || '';
        var date = (html.match(/<span class="detail-video-date">([^<]+)<\/span>/) || [])[1] || '';
        var views = (html.match(/<span class="detail-video-views">([^<]+)<\/span>/) || [])[1] || '';
        VOD = {
            vod_id: id,
            vod_name: name.replace(/^\s+|\s+$/g, ''),
            vod_pic: pic,
            vod_year: '',
            vod_area: '',
            vod_remarks: '',
            vod_content: '分类：' + cate + '　日期：' + date + '　观看：' + views,
            vod_play_from: '爱情岛',
            vod_play_url: '正片$' + (playUrl ? playUrl : url)
        };
    }),

    // ================= 搜索 =================
    搜索: $js.toString(() => {
        var k = input;
        var pgm = k.match(/&page=(\d+)/);
        var page = pgm ? parseInt(pgm[1]) : 1;
        k = k.replace(/&page=\d+/, '');
        var url = HOST + '/videos/search.html?key=' + encodeURIComponent(k) + '&page=' + page;
        var html = getHtml(url);
        return setResult(parseList(html));
    }),

    // ================= 播放解析（直连 m3u8） =================
    lazy: $js.toString(() => {
        var m = input.match(/https?:\/\/[^\s"']+\.m3u8[^\s"']*/);
        if (m) {
            input = { parse: 0, url: m[0], header: HDRS };
        } else {
            input = { parse: 0, url: input, header: HDRS };
        }
    })
};
