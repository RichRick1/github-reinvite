// Organization and assignment mappings
export const ORGANIZATIONS = {
  "McMasterQM": {
    name: "CHEM3PA3 winter26",
    owner: "McMasterQM", // GitHub organization/owner name
    assignments: {

      "🧑GitHub Fundamentals": "github-fundamentals",
      "Easy Moments": "easy-moments"
    }
  }
} as const;

export type OrganizationKey = keyof typeof ORGANIZATIONS;
