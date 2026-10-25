# 影视源配置

影视TV / TVBox / FongMi 可直用的多源聚合配置。所有源均实测可用。

## 快速使用

在影视TV「设置 → 配置地址」中填入对应地址即可。

| 配置 | 说明 | 推荐 |
|---|---|---|
| `config.json` | 9个点播源 + 4个直播源 | ⭐ 推荐 |
| `config/vod.json` | 仅 9 个点播源 | |
| `config/live.json` | 仅 4 个直播源 | |
| `config/lite.json` | 精简版（3点播+1直播） | 加载快 |

地址格式（把 OWNER/REPO 换成你的）：

```
https://raw.githubusercontent.com/OWNER/REPO/main/config.json
```

国内加速通道（raw 打不开时用）：

```
https://jsdelivr.net/gh/OWNER/REPO@main/config.json
https://ghproxy.net/https://raw.githubusercontent.com/OWNER/REPO/main/config.json
```

## 点播源（9个，合计 86 万+ 部）

| 资源站 | 片量 | 接口 |
|---|---|---|
| 量子资源 | 160,866 | cj.lziapi.com |
| 无尽资源 | 123,456 | api.wujinapi.com |
| 光速资源 | 116,414 | api.guangsuapi.com |
| 非凡资源 | 98,789 | api.ffzyapi.com |
| 魔都资源 | 90,790 | www.mdzyapi.com |
| 如意资源 | 88,531 | cj.rycjapi.com |
| 天涯影视 | 73,170 | tyyszyapi.com |
| 快看资源 | 59,653 | api.ukuapi.com |
| 百度资源 | 49,441 | api.apibdzy.com |

全部为苹果CMS V10 标准接口，`type: 1`，m3u8 裸直链，**无需解析器**。

## 直播源（4个）

| 名称 | 频道数 | 来源 |
|---|---|---|
| 综合直播 | 507 | vbskycn/iptv |
| 央视高清 | 100+ | fanmingming/live |
| Aptv直播 | 120 | Kimentanm/aptv |
| IPv6直播 | 82 | fanmingming/live（需IPv6网络） |

均带 EPG 节目表，时区 Asia/Shanghai。

## 注意

- **直播源寿命短**（几周到几月），失效属正常，优先查 fanmingming 和 vbskycn 两个上游仓库
- **IPv6 源需要网络支持 IPv6**，否则播放器显示黑屏；不确定就从 `lives` 里删掉那一条
- **302 跳转是正常的**，带 streamid / livekey 的源会跳转，客户端自动跟随
- 本仓库仅收集公开接口，不含任何视频内容

## 目录结构

```
.
├── config.json          点播+直播一体（主入口）
├── config/
│   ├── vod.json         仅点播
│   ├── live.json        仅直播
│   ├── lite.json        精简版
│   └── main.json        分离式（引用外部）
└── README.md
```

## 更新记录

- 2026-10-25 首版，9 点播源 + 4 直播源均实测通过
