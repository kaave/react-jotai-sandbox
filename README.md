# jotai sandbox

original: https://github.com/laststance/react-typescript-todomvc-2022

## Abstract architecture

- `libs`: ドメインロジックを持たない。どこからでも使える。
- `common`: ドメインロジックを持つ。application, features から使える。
- `application`: 外部との接点、ならびにルーティングを受け持つ。外部には Web API, ブラウザ (Cookie, LocalStorage) などが含まれる。
- `features`: 各機能を担当する。

```mermaid
flowchart TD
  subgraph features
    NotFound
    TodoMvc
  end

  libs --> common
  libs --> application
  libs --> NotFound
  libs --> TodoMvc
  common --> application
  common --> NotFound
  common --> TodoMvc
  application --> NotFound
  application --> TodoMvc
```

## Todo

- [ ] Test 設計
- [ ] Error 設計
- [ ] Commit hook
- [ ] CI
- [ ] CSS refactoring
- [ ] docs
- [ ] LocalStorage schema
- [ ] Cookie schema
