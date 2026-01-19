// Organization and assignment mappings
export const ORGANIZATIONS = {
  "McMasterQM": {
    name: "CHEM3PA3 winter26",
    owner: "McMasterQM", // GitHub organization/owner name
    assignments: {

      "🧑GitHub Fundamentals": "github-fundamentals",
      "Moments Demo": "easy-moments",
      "Moment of PinBox": "pinbox-moments",
      "2 Particles in a Box": "2pinbox",
      "Effective 1d Systems": "effective-1d",
      "Gaussian Well": "gaussian-well",
      "Quiz: MultiD PinBox": "quiz-multidpinbox",
      "Quiz: Particle in 1D Box": "quiz-particle-in-1d-box",
      "Quiz: Postulations": "quiz-postulations",
      "Quiz: Schrodinger Equation": "quiz-schrodinger-equation",
      "Sudden Approximation": "sudden-approximation",
      "Sudden Approximation 2D": "sudden2d",
      "Tilted PinBox": "tilted-pinbox",
      "Quiz: Demo": "demo-quiz",
      "Grading": "grading",
      "Quiz: Introduction to Quantum Mechanics": "questions-introduction",
      "Schrodinger Cat": "schrodinger-cat",
      "Wavefunction Normalization": "wavefunction-normalization",
      "Hydrogenic Atoms": "hydrogenic-atoms",
      "Knowledge Test 1": "knowledge-test-1",
      "Knowledge Test 2": "knowledge-test-2",
      "Knowledge Test 3": "knowledge-test-3"
    }
  }
} as const;

export type OrganizationKey = keyof typeof ORGANIZATIONS;
