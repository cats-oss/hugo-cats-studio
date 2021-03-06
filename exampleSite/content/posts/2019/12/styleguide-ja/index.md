---
title: スタイルガイド (日本語版)
date: 2019-12-29
authors: ['wadackel']
---

# 見出しレベル 1 は使用しない

記見出しレベル 1 (`<h1>`) は記事のタイトルに使用しているため、事本文内では基本的に使用しないことを想定しています。見出しを使用する場合は以下に使用する見出しレベル 2 (`<h2>`) を使用してください。(見出しレベル 2 と同じスタイルが適用されます)

## サポートしているスタイル

このテーマでは以下の **スタイルをサポート** します。Markdown でよく使用する構文は概ね _カバー_ しているため、記事の執筆に集中することができます。

- 強調
  - `<em>`
  - `<strong>`
- ~~打ち消し~~
- [リンク](#)
- 水平線
- リスト
  - 順序あり(`<ol>`)
  - 順序なし(`<ul>`)
- テーブル
- コード表示
  - コードブロック
  - コード
- 引用
- 注釈 [^1]
- 画像 (カスタムショートコード提供)
- ツイート表示

[^1]: 注釈はこのように表示されます。

### リスト

順序あり、順序なしそれぞれのリストを使用することができます。

#### 順序あり

1. これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。
1. これはダミーテキストです。これはダミーテキストです。
1. これはダミーテキストです。これはダミーテキストです。
1. これはダミーテキストです。これはダミーテキストです。
   1. これはネストしたダミーテキストです。
   1. これはネストしたダミーテキストです。
   1. これはネストしたダミーテキストです。
1. これはダミーテキストです。これはダミーテキストです。

#### 順序なし

- これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。これはダミーテキストです。
- これはダミーテキストです。これはダミーテキストです。
- これはダミーテキストです。これはダミーテキストです。
- これはダミーテキストです。これはダミーテキストです。
  - これはネストしたダミーテキストです。
  - これはネストしたダミーテキストです。
  - これはネストしたダミーテキストです。
- これはダミーテキストです。これはダミーテキストです。

### 引用

> 私は失敗したことがない。  
> ただ、1 万通りの、うまく行かない方法を見つけただけだ。
>
> トーマス・エジソン

### コードブロック

```shell:1行のコードブロック
$ echo "Hello World" >> hello.txt
```

1 行のコードブロックは上記のように表示されます。複数行になると以下のような表示です。

```typescript:複数行のコードブロック
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const canUseHistory = !canUseDOM
  ? false
  : window.history &&
    'pushState' in window.history &&
    window.location.protocol !== 'file:';

export const canUsePassiveOption = (() => {
  let support = false;

  if (!canUseDOM) {
    return support;
  }

  /* tslint:disable:no-empty */
  try {
    const win = window;
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        support = true;
      },
    });

    win.addEventListener('test', null as any, opts);
    win.removeEventListener('test', null as any, opts);
  } catch (e) {}
  /* tslint:enable */

  return support;
})();
```

ハイライトする言語の設定に加えて次の構文で、コードブロックに対して文を追加することができます。

````
```<lang>:<空白なしの文>
````

### テーブル

| Left align | Right align | Center align |
| :--------- | ----------: | :----------: |
| This       |        This |     This     |
| column     |      column |    column    |
| will       |        will |     will     |
| be         |          be |      be      |
| left       |       right |    center    |
| aligned    |     aligned |   aligned    |

### 画像埋め込み

名前付きパラメータ、名前なしパラメータ、それぞれの形式に対応したショートコードを提供します。

```
image "example.png" "example image"
```

**Output:**

{{< image "example.png" "example image" >}}

```
image src="example.png" alt="example image"
```

**Output:**

{{< image src="example.png" alt="example image" >}}

### ツイート

Hugo が提供するビルトインのショートコードです。

```
tweet "1199218445503488001"
```

**Output:**

{{< tweet "1199218445503488001" >}}

---

以下、ダミーテキストを使って、見出しレベルのスタイルを示します。

#### 見出しレベル 4

もし張さんから建設去就こう記念の押しだ引込その義務私かお話をというお経験ありうでですと、その今日もいつかいくら力のありながら、大森さんのので先生のそれの勢いご乱暴とありからこちら国家をお遠慮をありようとあたかもご仕事に思っないだろて、毫ももちろん沙汰を云うたて始めましのを考えたな。ただただお順序をあれ訳はとてもむやみと移ろでて、その他人には行かましでという文学が繰り返しから行くたませ。この中精神の以上この自分は私末をなったかと岡田さんで至るだろある、自己の事実たというご反対なんでしょて、眼の以上で会員に今までの金力から今あるからみて、一応の九月をなるとそのうちに無論受けるなないと繰返しですのずて、ないなだとどうご無理矢理するたのなけれですた。しかし知識か横着か発展を云いでて、十月上人の行きておりで所がご真似の今日をありありあり。直接にはいよいよ聴いからしますたたですて、とにかくきっと用いから意味も元々なくんものな。

##### 見出しレベル 5

そうしてご利用と云ってはいたのですから、圏外をは、けっして何かなってなるられなけれなけれされたますと繰りて、会はなりてやりなくなけれ。

きっともちろんももう自己とかいうみでしょから、私のも時間中かも私のご講演はありがたくしみるんなけれ。私は同時に演説のはずを同創作もしているななですましながら、幾十の筋が多少いるましという学習でして、もしくはその社の自身をあっれば、そこかが私の通りに生活をしからしまえな事たでと卒業出て譴責行か来ありな。一つにたとえば嘉納さんをただ多少あろなのたですで。岡田君もどう個人をあっのに気がついたのたないる。（ただ右にすま以上ないなかっないてですはあらたですば、）いっそいます獄が、duty の自分なりあるてさとして、文学の応用は十月の中じゃさ出方を思わたから病気家始めて行くますというご錐ですので。
