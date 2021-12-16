# integrate-github-and-notion

integrate-github-and-notion는 github과 notion의 연동을 위해 만들어졌습니다. 지정한 repo의 새롭게 생성된 commit의 정보를 기반으로 notion 데이터베이스에 새로운 페이지를 생성합니다.

이 프로젝트는 비슷한 기능을 서드파티 앱을 통해 사용해야 하는 점이 마음에 들지 않아 만들어졌습니다.

우리 모두 직접 만든 서버에서 돌아가는 앱에 대한 로망이 있지 않나요..? 내 손으로 직접 만드는 서비스에 대한 로망이 있지 않나요...?

# 설정

## 환경변수 설정

**환경 변수로 필요한 값들을 받습니다. 모두 입력해야 합니다.**

- GITHUB_AUTH
  - github의 personal access token
  - `Setting > Developer settings > Personal access tokens` 에서 찾을 수 있습니다
- GITHUB_TARGET_OWNER
  - github repo의 소유자 이름
- GITHUB_TARGET_REPO
  - github repo의 이름
- NOTION_INTEGRATION_AUTH
  - notion의 integration token
  - `https://developers.notion.com` 상단의 `My integrations` 에서 찾을 수 있습니다
- NOTION_TARGET_DATABASE_ID
  - notion의 페이지를 생성할 database id
  - 웹으로 접근해 url을 확인하세요. `https://www.notion.so/{database id}?v=...`에서 `database id`를 입력하세요

### 예시

```dosini
GITHUB_AUTH = "abcde.."
GITHUB_TARGET_OWNER = "superCoolUser"
GITHUB_TARGET_REPO = "repo-super-awesome"
NOTION_INTEGRATION_AUTH="secret_abcde..."
NOTION_TARGET_DATABASE_ID="abcde..."
```

## Github Webhook 설정

Github repo의 변경 사항을 가져오기 위해 Webhook을 사용합니다.

커밋을 반영하고 싶은 repo에 들어가 `Setting > Webhooks > Add Webhook`을 누르세요.

- Payload URL
  - `https://{Server url}/github/webhooks`를 입력해주세요. `Server url`은 만든 서버의 url을 넣으세요.
- Content Type
  - `application/json`으로 변경하세요.

그 후, `Add webhook`을 눌러주세요.

## Notion Database 설정

Table Database를 이용합니다.

```
| 이름 | sha | createdAt | ... |
-------------------------------
```

다음과 같이 만들어주세요. **`이름`과 `sha`, `createdAt`은 필수입니다.** 나머지는 마음대로 만들어도 상관 없습니다.

모두 끝내셨다면, 축하합니다. 이제 github의 commit 정보가 Notion Database에 표시될 겁니다.
