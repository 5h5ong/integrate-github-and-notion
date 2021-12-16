import { Octokit } from "octokit";

/**
 * Get Commits from github
 */
export const githubGetCommits = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH,
  });

  const { data } = await octokit.rest.repos.listCommits({
    owner: process.env.GITHUB_TARGET_OWNER!,
    repo: process.env.GITHUB_TARGET_REPO!,
  });

  const commits = data.map<GithubType>((commitData: any) => {
    const createdAt = commitData?.commit?.committer?.date;

    // Commit 메세지는 'message' + '\n' + 의 형식이 쭉 이어져 있음. \n을 기준으로 나눠 가장 첫번째 메세지를 가져옴.
    const separatedMessage = commitData.commit.message.split("\n")[0];
    return {
      message: separatedMessage,
      sha: commitData.sha,
      createdAt: createdAt,
    };
  });

  return commits;
};
