import type { ImageMetadata } from "astro";
import {
  locales,
  themeSlugs,
  type LocalizedText,
  type ThemeSlug,
} from "./site";

export type GalleryPhoto = {
  id: string;
  imagePath: string;
  alt: LocalizedText;
  title?: LocalizedText;
  capturedOn?: string;
  camera?: string;
  lens?: string;
  focalLengthMm?: number;
  aperture?: number;
  shutter?: string;
  iso?: number;
  exposureCompensationEv?: string;
};

export type ResolvedGalleryPhoto = GalleryPhoto & {
  image: ImageMetadata;
};

// Keep each array in the intended viewing order. Add only sanitized public
// derivatives under /src/assets/photos/; original photographs stay outside the repo.
export const galleries: Record<ThemeSlug, readonly GalleryPhoto[]> = {
  "cloud-fuji": [
    {
      id: "cloud-fuji-001",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/001.jpg",
      alt: {
        zh: "红色富士急行列车驶过站台，铁轨、电线与远山铺展在云层下。",
        ja: "雲の下、線路と架線のあいだを赤い富士急行の列車がホームへ走り込む。",
        en: "A red Fujikyu Railway train passes the platform beneath tracks, overhead wires, clouds, and distant mountains.",
      },
      capturedOn: "2026-08-04",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 6.3,
      shutter: "1/20 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "cloud-fuji-002",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/002.jpg",
      alt: {
        zh: "河口湖对岸的富士山峰从层层白云间露出，平静湖面横展在前景。",
        ja: "河口湖の向こうで、幾重もの白い雲のあいだから富士山頂が姿を見せる。",
        en: "The summit of Mount Fuji emerges through layers of white cloud beyond the calm waters of Lake Kawaguchi.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 6.3,
      shutter: "1/160 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "cloud-fuji-003",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/003.jpg",
      alt: {
        zh: "云层环绕富士山，一艘小船从河口湖面与山脚之间驶过。",
        ja: "雲に包まれた富士山の麓を背に、一艘の小舟が河口湖を進む。",
        en: "A small boat crosses Lake Kawaguchi below Mount Fuji as clouds gather around the mountain.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 86,
      aperture: 6.3,
      shutter: "1/160 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "cloud-fuji-004",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/004.jpg",
      alt: {
        zh: "富士山的山顶从横贯山腰的白云后露出，山脚城镇与树林铺满下方。",
        ja: "山腹を横切る白い雲の向こうに富士山頂がのぞき、麓の町と森が眼下に広がる。",
        en: "The summit of Mount Fuji rises behind a band of white cloud, above the town and forest at its foot.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 8,
      shutter: "1/100 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "cloud-fuji-005",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/005.jpg",
      alt: {
        zh: "富士山从明亮云团间显现，前景的玫瑰与绿树在阳光下虚化。",
        ja: "明るい雲間から富士山が姿を見せ、手前のバラと緑が陽射しの中でぼける。",
        en: "Mount Fuji appears between bright clouds beyond softly focused roses and greenery in the foreground.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 90,
      aperture: 8,
      shutter: "1/125 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "cloud-fuji-006",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/006.jpg",
      alt: {
        zh: "缀满藤叶的圆形花架围出一扇窗口，富士山在蓝天与低云之间居中显现。",
        ja: "つる葉に覆われた円形のアーチが窓となり、青空と低い雲のあいだに富士山を望む。",
        en: "A circular arbor covered in climbing leaves frames Mount Fuji between blue sky and low clouds.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 8,
      shutter: "1/100 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "cloud-fuji-007",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/007.jpg",
      alt: {
        zh: "缆车钢索与横梁框住高处视野，河口湖、湖畔城镇和群山在下方展开。",
        ja: "ロープウェイの索条と梁の向こうに、河口湖と湖畔の町、山並みが眼下へ広がる。",
        en: "Ropeway cables and beams frame a high view over Lake Kawaguchi, the lakeside town, and surrounding mountains.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 8,
      shutter: "1/50 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "cloud-fuji-008",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/008.jpg",
      alt: {
        zh: "黄色花丛铺满前景，富士山从白云间升起，背后是澄澈的蓝天。",
        ja: "黄色い花畑の向こうで、白い雲間から富士山が澄んだ青空へそびえる。",
        en: "Mount Fuji rises through white clouds beyond a field of yellow flowers under a clear blue sky.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 69,
      aperture: 8,
      shutter: "1/100 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "cloud-fuji-009",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/009.jpg",
      alt: {
        zh: "夕阳照亮山城中的旧楼，电线横穿画面，远山藏在厚云后。",
        ja: "夕日に照らされた山あいの古い建物を電線が横切り、遠くの山は厚い雲に隠れる。",
        en: "Evening light falls across an old building in a mountain town as wires cross the frame and thick cloud hides the distant peak.",
      },
      capturedOn: "2026-08-04",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 39,
      aperture: 6.3,
      shutter: "1/125 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "cloud-fuji-010",
      imagePath: "/src/assets/photos/fuji/cloud-fuji/010.jpg",
      alt: {
        zh: "从列车驾驶室后方望向前方，司机的身影映在车窗旁，轨道伸向暮光中的街区。",
        ja: "列車の運転室越しに前方を望み、運転士の姿の先で線路が夕暮れの町へ延びる。",
        en: "Seen through the train cab, the driver sits in silhouette as the track runs ahead into a town at dusk.",
      },
      capturedOn: "2026-08-04",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 29,
      aperture: 6.3,
      shutter: "1/40 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
  ],
  "kawaguchiko-festival": [
    {
      id: "kawaguchiko-festival-001",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/001.jpg",
      alt: {
        zh: "橙红色烟火在夜空中层层绽放，湖畔观众的身影铺在画面下方。",
        ja: "橙赤色の花火が夜空に幾重にも開き、湖畔の観客が下方に影を落とす。",
        en: "Orange-red fireworks bloom in layers above the silhouettes of spectators by the lake.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 800,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-002",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/002.jpg",
      alt: {
        zh: "金红色烟火在湖畔上空聚成明亮花团，观众举起手机凝望。",
        ja: "金赤色の花火が湖畔の空に明るい花を結び、観客がスマートフォンを掲げて見上げる。",
        en: "Gold and red fireworks gather into a bright bloom as spectators raise their phones below.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 800,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-003",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/003.jpg",
      alt: {
        zh: "蓝白色烟火穿过烟雾在高处炸开，前景观众静静仰望。",
        ja: "青白い花火が煙を抜けて高く開き、手前の観客が静かに見上げる。",
        en: "Blue-white fireworks burst high through drifting smoke above the watching crowd.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 800,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-004",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/004.jpg",
      alt: {
        zh: "红、蓝与金色烟火在夜空中交叠，彩色烟雾笼罩湖畔上空。",
        ja: "赤、青、金色の花火が夜空で重なり、色づいた煙が湖畔を覆う。",
        en: "Red, blue, and gold fireworks overlap as colored smoke gathers above the lakeshore.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 800,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-005",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/005.jpg",
      alt: {
        zh: "一轮金色菊形烟火在漆黑夜空中完整舒展。",
        ja: "一輪の金色の菊花火が漆黒の夜空いっぱいに端正に開く。",
        en: "A single golden chrysanthemum firework opens fully against the black night sky.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2.8,
      shutter: "1/10 s",
      iso: 800,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-006",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/006.jpg",
      alt: {
        zh: "冰蓝色烟火从幽暗云烟中央亮起，细密光点向四周散开。",
        ja: "氷青色の花火が暗い煙の中心に灯り、細かな光が四方へ広がる。",
        en: "An ice-blue firework glows through dark smoke, scattering fine points of light outward.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 200,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-007",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/007.jpg",
      alt: {
        zh: "红、绿、紫与金色烟火密集绽放，照亮湖畔观众与翻涌烟雾。",
        ja: "赤、緑、紫、金色の花火が密集して開き、湖畔の観客と渦巻く煙を照らす。",
        en: "Dense red, green, purple, and gold fireworks illuminate the crowd and rolling smoke.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 500,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-008",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/008.jpg",
      alt: {
        zh: "紫蓝色烟火在烟雾中铺开，几束金色光芒点亮远处夜空。",
        ja: "紫青色の花火が煙の中に広がり、数輪の金色の光が遠い夜空を彩る。",
        en: "Violet-blue fireworks spread through smoke with small golden bursts glowing above.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 500,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-009",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/009.jpg",
      alt: {
        zh: "青白色烟火从蓝色烟云中绽开，一名观众的背影占据前景。",
        ja: "青白い花火が青い煙雲から開き、一人の観客の後ろ姿が手前に浮かぶ。",
        en: "A blue-white firework opens through blue smoke behind the silhouette of a spectator.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 200,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-010",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/010.jpg",
      alt: {
        zh: "一轮洋红色烟火在紫色烟雾中盛开，观众身影沉入画面下方。",
        ja: "一輪の紅紫色の花火が紫の煙に咲き、観客の影が画面下に沈む。",
        en: "A magenta firework blooms through violet smoke above the darkened crowd.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 200,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-011",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/011.jpg",
      alt: {
        zh: "红、绿与金色烟火层层相叠，灿亮烟雾悬在湖畔人群上方。",
        ja: "赤、緑、金色の花火が幾重にも重なり、明るい煙が湖畔の人波の上に漂う。",
        en: "Red, green, and gold fireworks layer across bright smoke above the lakeside crowd.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 500,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-012",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/012.jpg",
      alt: {
        zh: "橙金色菊形烟火悬在远处夜空，前景观众仰头凝望。",
        ja: "橙金色の菊花火が遠い夜空に浮かび、手前の観客が見上げる。",
        en: "An orange-gold chrysanthemum firework hangs in the distance above the watching crowd.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 200,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-013",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/013.jpg",
      alt: {
        zh: "两束白金色烟火在烟云高处伸展，细长光轨如枝叶般散开。",
        ja: "二つの白金色の花火が煙雲の高みで伸び、細い光跡が枝葉のように広がる。",
        en: "Two pale-gold fireworks stretch above the smoke, their slender trails branching outward.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 250,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-014",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/014.jpg",
      alt: {
        zh: "远处蓝白色烟火沿湖面上方铺开，岸边灯火与观众沉在暗处。",
        ja: "遠い青白色の花火が湖面の上に広がり、岸辺の灯と観客が暗がりに沈む。",
        en: "Distant blue-white fireworks spread above the lake while shore lights and spectators remain in shadow.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 250,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-015",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/015.jpg",
      alt: {
        zh: "大片白金与红色烟火挤满夜空，浓烟和观众被瞬间照亮。",
        ja: "白金と赤の大輪が夜空を埋め尽くし、濃い煙と観客を一瞬に照らす。",
        en: "Great white-gold and red fireworks fill the sky, lighting the smoke and spectators at once.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 500,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-016",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/016.jpg",
      alt: {
        zh: "绿色与紫色烟火分列夜空两侧，低处红色光点从湖畔升起。",
        ja: "緑と紫の花火が夜空の左右に並び、低く赤い光が湖畔から昇る。",
        en: "Green and violet fireworks hang apart in the sky as red sparks rise from the lakeshore.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 500,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-017",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/017.jpg",
      alt: {
        zh: "橙色与白蓝色烟火上下交叠，细密光雨穿过烟雾倾落。",
        ja: "橙色と白青色の花火が上下に重なり、細かな光の雨が煙を抜けて降り注ぐ。",
        en: "Orange and blue-white fireworks overlap as a dense rain of light falls through the smoke.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 80,
      exposureCompensationEv: "0",
    },
    {
      id: "kawaguchiko-festival-018",
      imagePath: "/src/assets/photos/fuji/kawaguchiko-festival/018.jpg",
      alt: {
        zh: "蓝白色烟火密集铺满夜空，层层光轨与烟雾在观众头顶倾泻。",
        ja: "青白い花火が夜空を埋め、幾重もの光跡と煙が観客の頭上へ降り注ぐ。",
        en: "Dense blue-white fireworks cover the sky, cascading in layers of light and smoke above the crowd.",
      },
      capturedOn: "2026-08-05",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 2,
      shutter: "1/10 s",
      iso: 80,
      exposureCompensationEv: "0",
    },
  ],
  "tokyo-shrines-temples": [],
  "tokyo-views": [
    {
      id: "tokyo-views-001",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/001.jpg",
      alt: {
        zh: "夕阳从层云间照向东京，密集街区与远方天际线在高处视野中铺开。",
        ja: "層雲のあいだから夕日が東京を照らし、密集した街並みと遠い地平線が眼下に広がる。",
        en: "The setting sun breaks through layered clouds above Tokyo, with dense neighborhoods stretching to the horizon below.",
      },
      capturedOn: "2026-08-07",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 8,
      shutter: "1/50 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-002",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/002.jpg",
      alt: {
        zh: "暮色笼罩涩谷，十字路口、楼群与亮起的广告屏在高楼之间交汇。",
        ja: "暮色に包まれた渋谷で、スクランブル交差点とビル群、灯り始めた広告画面が交わる。",
        en: "Dusk settles over Shibuya as the scramble crossing, surrounding towers, and illuminated signs converge below.",
      },
      capturedOn: "2026-08-07",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 4,
      shutter: "1/20 s",
      iso: 100,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-003",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/003.jpg",
      alt: {
        zh: "从正上方望向涩谷十字路口，白色斑马线与深色路面构成放射状纹理。",
        ja: "真上から見下ろした渋谷のスクランブル交差点で、白い横断歩道が暗い路面へ放射状に伸びる。",
        en: "Seen from directly above, Shibuya Crossing forms a radial pattern of white crosswalks across the dark roadway.",
      },
      capturedOn: "2026-08-07",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 120,
      aperture: 4,
      shutter: "1/20 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-004",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/004.jpg",
      alt: {
        zh: "游客站在高空玻璃护栏旁，暮色中的东京灯火在斜向钢梁外延伸。",
        ja: "高層のガラス手すりに立つ人々の向こうで、斜めの鉄骨越しに夕暮れの東京の灯が広がる。",
        en: "Visitors stand beside a high glass railing as Tokyo's evening lights spread beyond a diagonal steel beam.",
      },
      capturedOn: "2026-08-07",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 1.2,
      shutter: "1/20 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-005",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/005.jpg",
      alt: {
        zh: "蓝调时刻的东京楼群亮起灯火，一条车流密集的道路穿过高楼伸向远方。",
        ja: "ブルーアワーの東京に灯がともり、車列の続く大通りが高層ビルのあいだを遠くへ伸びる。",
        en: "City lights appear across Tokyo at blue hour as a stream of traffic runs between the towers into the distance.",
      },
      capturedOn: "2026-08-07",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 1.2,
      shutter: "1/25 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-006",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/006.jpg",
      alt: {
        zh: "厚重云层覆盖东京，地平线残留一带晚霞，街区从观景台栏杆下延伸。",
        ja: "厚い雲が東京を覆い、地平線に夕焼けが残るなか、展望台の手すりの下から街が広がる。",
        en: "Heavy clouds cover Tokyo while a band of sunset remains on the horizon beyond the observation-deck railing.",
      },
      capturedOn: "2026-08-07",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 4,
      shutter: "1/20 s",
      iso: 125,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-007",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/007.jpg",
      alt: {
        zh: "夜幕初降，密集人流穿过涩谷十字路口，周围商厦的屏幕与招牌同时亮起。",
        ja: "夜の始まり、渋谷のスクランブル交差点を大勢の人が渡り、周囲のビルの画面と看板が輝く。",
        en: "Crowds cross Shibuya Crossing at nightfall beneath the glowing screens and signs of the surrounding buildings.",
      },
      capturedOn: "2026-08-07",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 1.2,
      shutter: "1/80 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-008",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/008.jpg",
      alt: {
        zh: "行人在涩谷路口两侧聚集，玻璃幕墙上的巨大灯箱照亮傍晚街道。",
        ja: "渋谷の交差点の両側に歩行者が集まり、ガラス張りのビルの大きな広告画面が夕方の街を照らす。",
        en: "Pedestrians gather on both sides of a Shibuya intersection as large screens illuminate the evening street.",
      },
      capturedOn: "2026-08-07",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 1.2,
      shutter: "1/80 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-009",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/009.jpg",
      alt: {
        zh: "涩谷站前人潮漫过路口，明亮广告屏映在深色楼体与傍晚天空之间。",
        ja: "渋谷駅前の交差点に人波が広がり、明るい広告画面が暗いビルと夕空のあいだに浮かぶ。",
        en: "A crowd fills the intersection outside Shibuya Station while bright screens glow between dark buildings and the evening sky.",
      },
      capturedOn: "2026-08-07",
      camera: "Nikon Z 8",
      lens: "Viltrox AF 35mm f/1.2 LAB Z",
      focalLengthMm: 35,
      aperture: 1.2,
      shutter: "1/80 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-010",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/010.jpg",
      alt: {
        zh: "盛夏晴空下，东京住宅区与楼群从近处一直延伸到蓝色地平线。",
        ja: "真夏の青空の下、東京の住宅地とビル群が手前から青い地平線まで続く。",
        en: "Under a clear summer sky, Tokyo's neighborhoods and towers extend from the foreground to the blue horizon.",
      },
      capturedOn: "2026-08-08",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 4,
      shutter: "1/400 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-011",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/011.jpg",
      alt: {
        zh: "东京塔立在城市中央，红白塔身从高楼与密集街区之间升起。",
        ja: "東京タワーが街の中心に立ち、赤白の塔身が高層ビルと密集した街並みのあいだから伸びる。",
        en: "Tokyo Tower rises at the center of the city, its red-and-white structure framed by high-rises and dense streets.",
      },
      capturedOn: "2026-08-08",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 4,
      shutter: "1/500 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-012",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/012.jpg",
      alt: {
        zh: "东京塔从近处楼群间升起，远方高楼与积云在明亮夏日中铺满视野。",
        ja: "東京タワーが手前のビル群から立ち上がり、遠い高層建築と夏雲が明るい景色を満たす。",
        en: "Tokyo Tower rises among nearby buildings, with distant towers and summer clouds filling the bright city view.",
      },
      capturedOn: "2026-08-08",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 44,
      aperture: 4,
      shutter: "1/1000 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
    {
      id: "tokyo-views-013",
      imagePath: "/src/assets/photos/tokyo/tokyo-views/013.jpg",
      alt: {
        zh: "阳光穿过云层照向东京，一条笔直道路从密集街区伸向远处的高楼。",
        ja: "雲間の光が東京を照らし、一本のまっすぐな道路が密集した街から遠い高層ビルへ伸びる。",
        en: "Sunlight filters through clouds above Tokyo as a straight road runs from dense neighborhoods toward distant towers.",
      },
      capturedOn: "2026-08-08",
      camera: "Nikon Z 8",
      lens: "NIKKOR Z 24-120mm f/4 S",
      focalLengthMm: 24,
      aperture: 4,
      shutter: "1/500 s",
      iso: 64,
      exposureCompensationEv: "0",
    },
  ],
  "tokyo-rainy-night": [],
  "kyoto-city": [],
  "northern-kyoto": [],
};

// Astro's documented dynamic-image pattern keeps local images available to
// astro:assets while allowing the data file to reference them by stable paths.
// Source: https://docs.astro.build/en/recipes/dynamically-importing-images/
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/photos/**/*.{jpeg,jpg,png}",
);

function validatePhoto(theme: ThemeSlug, photo: GalleryPhoto, ids: Set<string>) {
  if (!photo.id || ids.has(photo.id)) {
    throw new Error(`Gallery "${theme}" has a missing or duplicate photo id: "${photo.id}".`);
  }
  ids.add(photo.id);

  if (!/^[-a-z0-9]+$/.test(photo.id)) {
    throw new Error(`Gallery photo id "${photo.id}" must use lowercase letters, numbers, and hyphens.`);
  }

  if (!photo.imagePath.startsWith("/src/assets/photos/")) {
    throw new Error(`Gallery photo "${photo.id}" must use a sanitized image under /src/assets/photos/.`);
  }

  for (const locale of locales) {
    if (!photo.alt[locale]?.trim()) {
      throw new Error(`Gallery photo "${photo.id}" is missing ${locale} alternative text.`);
    }
  }
}

export async function loadGallery(theme: ThemeSlug): Promise<ResolvedGalleryPhoto[]> {
  const definitions = galleries[theme];
  const ids = new Set<string>();

  return Promise.all(
    definitions.map(async (photo) => {
      validatePhoto(theme, photo, ids);
      return resolvePhoto(photo);
    }),
  );
}

export async function loadGalleryPhoto(photoId: string): Promise<ResolvedGalleryPhoto> {
  const matches = Object.entries(galleries).flatMap(([theme, photos]) =>
    photos.filter((photo) => photo.id === photoId).map((photo) => ({ theme, photo })),
  );
  if (matches.length !== 1) {
    throw new Error(`Menu preview photo "${photoId}" must match exactly one gallery photo.`);
  }

  const [{ theme, photo }] = matches;
  validatePhoto(theme as ThemeSlug, photo, new Set<string>());
  return resolvePhoto(photo);
}

async function resolvePhoto(photo: GalleryPhoto): Promise<ResolvedGalleryPhoto> {
  const loadImage = imageModules[photo.imagePath];
  if (!loadImage) {
    throw new Error(
      `Gallery photo "${photo.id}" points to "${photo.imagePath}", but that file was not found.`,
    );
  }

  const { default: image } = await loadImage();
  if (Math.max(image.width, image.height) > 3840) {
    throw new Error(`Gallery photo "${photo.id}" exceeds the 3840px public long-edge limit.`);
  }

  return { ...photo, image };
}

const configuredThemes = Object.keys(galleries).sort();
const expectedThemes = [...themeSlugs].sort();
if (configuredThemes.join("|") !== expectedThemes.join("|")) {
  throw new Error("The gallery registry must contain exactly one entry for every theme slug.");
}
