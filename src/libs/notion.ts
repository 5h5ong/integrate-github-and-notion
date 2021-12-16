import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_INTEGRATION_AUTH,
});

/**
 * Get title & sha property from all pages
 * @returns {titles, sha}
 */
export const notionGetPagesTitles = async () => {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_TARGET_DATABASE_ID!,
  });

  const titles = results.map<NotionType>(({ properties }) => {
    const titleData = properties.이름;
    const shaData = properties.sha;
    const returnObject: NotionType = {
      title: "",
      sha: "",
    };

    // property type check
    // 이 과정으로 타입을 예측해 제공함. 없으면 타입이 제공되지 않아 property에 접근할 수 없음.
    if (titleData.type === "title") {
      returnObject.title = titleData.title[0].plain_text;
    }
    if (shaData.type === "rich_text") {
      returnObject.sha = shaData.rich_text[0].plain_text;
    }

    return {
      ...returnObject,
    };
  });

  return titles;
};

/**
 * 깃헙 커밋을 바탕으로 노션에 페이지를 생성함
 * @return boolean (true === 성공, false === 실패)
 */
export const notionCreatePageWithCommit = async (
  commit: GithubType
): Promise<boolean> => {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_TARGET_DATABASE_ID!,
      },
      properties: {
        이름: {
          title: [
            {
              text: { content: commit.message },
            },
          ],
        },
        sha: {
          rich_text: [
            {
              text: { content: commit.sha },
            },
          ],
        },
        createdAt: {
          date: { start: commit.createdAt },
        },
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    return false;
  }
};
