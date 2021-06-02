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
普段自宅でPCを使ってリモートワークをしている女性。<br>
メインSNSはInstagramとPintarest。<br>
PCで使うToDoアプリを一度DLしてみたが、面倒なので開かなくなってしまったので、<br>
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
- UX
Ajaxでページ遷移を極力少なくし、ユーザーのストレス緩和を狙った。

- ローカルストレージによるお試し機能
PFにはゲストログイン機能をつけるのが一般的だが、ボタンをわざわざ押させないといけない。
ローカルストレージを使用し、アプリにアクセスしてすぐに機能が使えるようにした。(する予定)


# デザインツール
Figma

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/64563988/120413726-cead3a00-c393-11eb-8f77-16633139012d.png">
