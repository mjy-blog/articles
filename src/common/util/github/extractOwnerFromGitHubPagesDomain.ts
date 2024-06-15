export function extractOwnerFromGitHubPagesDomain(domain: string) {
  const match = domain.match(/^(\w+)\.github\.io$/);
  if (!match) {
    throw new Error(`Invalid domain for GitHub Pages given: ${domain}`);
  }
  return match[1];
}
