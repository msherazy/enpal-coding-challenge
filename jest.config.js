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
	}
};