# Pomodnair(ポモドネア)
(ここに動作のGIFを入れます)

### URL
https://pomodnair.herokuapp.com/

### サービス概要
ポモドーロタイマーがついたデイリーToDoタスク管理アプリ

### 機能要件一覧
https://docs.google.com/spreadsheets/d/1MWpFU1MRcXEDjHoPqI3LRbRgAVC1wrFdChSu7YZX3Eg/edit?usp=sharing

### 解決したい課題
ポモドーロとToDoタスク管理ができて、かつWebブラウザで完結するサービスが少ない。<br>
またあってもデザイン性が低く、女性向けの物が少ない。

### ターゲットペルソナ
普段PCを使って在宅業務をしている女性。<br>
メインSNSはInstagramとPintarest。<br>
PCで使うToDoアプリを一度DLしてみたが、面倒で開かなくなってしまったので、<br>
ブラウザで完結するToDo管理アプリを探している。<br>
日々もっと効率的に作業をこなしたいので、できればポモドーロタイマーがついていたら嬉しいと考えている。<br>

# 使用技術

- Ruby 3.0.1
- Rails 6.1.3
- MYSQL8
- Heroku
- RSpec
- LocalStrage(機能試用)
- Firebase Storage(mp3ファイル管理)

# ER図

# インフラ構造

# 気をつけたこと
### ・無駄に「触れるだけ」の技術を増やさず堅実に。
Docker, Vue, AWSなど、使ったことはあるが、使いこなせるというレベルではなく、
問題の切り分けが難しくなると考えた為、今回は使用しないことにした。

### ・ UXを徹底的に考えた実装
Ajaxでページ遷移を極力少なくし、ユーザーのストレス緩和を狙った。
また、PFにはゲストログイン機能をつけるのが一般的だが、ボタンをわざわざ押させないといけない。
ローカルストレージを使用し、アプリにアクセスしてすぐに機能が使えるようにした。(する予定)

### ・ シンプルなアプリだからこそテストはしっかり
今のところ機能面はとてもシンプルで、テーブルも2つしかない。
その分しっかりとRspecでテストを書きました。(書く予定)

### ・実務と同様にGitを扱う
mainブランチ、開発ブランチ、各チケットブランチに分ける。
addする前にdiffやstatusで変更箇所を確認 => プルリク => マージのステップを踏みました。


# デザインツール
Figma

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/64563988/120413726-cead3a00-c393-11eb-8f77-16633139012d.png">
