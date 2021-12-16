/**
 * 깃허브 커밋과 노션 페이지들, 그들 서로의 sha를 비교해 일치하는 게 있는지 확인함
 * @return boolean (true === 존재함, false === 존재하지 않음)
 */
export const compareTitleAndCommit = (
  commit: GithubType,
  titlesData: NotionType[]
): boolean => {
  const result = titlesData.some((title) => title.sha === commit.sha);
  return result;
};

/**
 * 여러 줄로 된 커밋을 \n을 기준으로 자른 다음 첫번째 줄을 반환함
 * @param commitMessage 커밋 메세지
 * @returns 커밋의 첫번째 줄
 */
export const splitCommitMessage = (commitMessage: string): string => {
  return commitMessage.split("\n")[0];
};
