export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	testEnvironment: "node",
	transform: {
		"^.+\\.js$": "babel-jest"
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1"
	},
	testMatch: ["**/__tests__/**/*.test.js"]
};