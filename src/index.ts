import "dotenv/config";
import {
  notionCreatePageWithCommit,
  notionGetPagesTitles,
} from "./libs/notion";
import { githubGetCommits } from "./libs/github";
import { compareTitleAndCommit } from "./libs/common";

(async () => {
  const githubCommitData = await githubGetCommits();
  const notionPagesTitle = await notionGetPagesTitles();

  if (!compareTitleAndCommit(githubCommitData[0], notionPagesTitle)) {
    await notionCreatePageWithCommit(githubCommitData[0]);
  } else {
    console.log(`It's already exists!`);
  }
})();
