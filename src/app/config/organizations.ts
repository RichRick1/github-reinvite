// Organization and assignment mappings
export const ORGANIZATIONS = {
  "McMasterQM": {
    name: "CHEM3PA3 winter26",
    owner: "McMasterQM", // GitHub organization/owner name
    assignments: {

      "🧑GitHub Fundamentals": "github-fundamentals",
      "Moments Demo": "easy-moments",
      "Moment of PinBox": "pinbox-moments",
      "2 Particles in a Box": "2pinbox"
    }
  }
} as const;

export type OrganizationKey = keyof typeof ORGANIZATIONS;
