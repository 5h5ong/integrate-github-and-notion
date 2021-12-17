import "dotenv/config";
import express from "express";
import { notionCreatePageWithCommit } from "./libs/notion";
import { splitCommitMessage } from "./libs/common";

// Check Enviroment Variable is Exists
// Github(Octokit)는 webhook으로 대체되어 없어도 됨
const {
  GITHUB_AUTH,
  GITHUB_TARGET_OWNER,
  GITHUB_TARGET_REPO,
  NOTION_INTEGRATION_AUTH,
  NOTION_TARGET_DATABASE_ID,
} = process.env;
if (NOTION_INTEGRATION_AUTH && NOTION_TARGET_DATABASE_ID) {
  const app = express();

  app.use(express.json());

  /**
   * Github Push Webhook 요청을 받음
   * 들어온 webhook 요청에서 commit들을 가져와 새로운 페이지를 생성함.
   */
  app.post("/github/webhooks", async (req, res) => {
    const commits = req.body.commits;

    if (commits) {
      console.log(`[info] git commits\n${commits}`);
      for (const { id, message, timestamp } of commits) {
        await notionCreatePageWithCommit({
          sha: id,
          message: splitCommitMessage(message),
          createdAt: timestamp,
        });
      }

      res.sendStatus(200).end();
    } else {
      res.sendStatus(400).end();
    }
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log(`[info] server listening on port ${process.env.PORT}.`);
  });
} else {
  console.log(`[ERROR] environment variable is not DEFINED!`);
}
