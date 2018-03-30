# Expert Task

エキスパートタスク

## Install and Run

```bash
git clone git@github.com:crowd-chair/expert-task
yarn install
yarn run start
```

If you have not installed `yarn` yet, you can get it by `brew install yarn` command.

## The Way to Deploy for crowd4u

* (1) 画像を`deploy/assets`フォルダに入れる.(このとき，画像のパスを oahu server に変える)
* (2) `yarn build`の生成物を`deploy/main.(js|css)`と Rename して入れる．
* (3) `scp -r deploy/* oahu:/var/www/crowd4u/public/nkobayashi/feedback`
