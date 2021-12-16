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
