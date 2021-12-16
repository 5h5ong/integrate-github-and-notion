import "dotenv/config";
import express from "express";
import { notionCreatePageWithCommit } from "./libs/notion";
import { splitCommitMessage } from "./libs/common";

const app = express();

app.use(express.json());

/**
 * Github Push Webhook 요청을 받음
 * 들어온 webhook 요청에서 commit들을 가져와 새로운 페이지를 생성함.
 */
app.post("/github/webhooks", async (req, res) => {
  const commits = req.body.commits;

  if (commits) {
    console.log(commits);
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

app.listen(process.env.PORT, () => {
  console.log(`[info] server listening on port ${process.env.PORT} `);
});
