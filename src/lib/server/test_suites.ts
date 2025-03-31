import testSuitesJson from './test_suites.json';

export interface TestSuite {
    id: string;
    name: string;
    description: string;
    prompts: string[];
}

export const TEST_SUITES: Record<string, TestSuite> = testSuitesJson;
export type TestSuiteId = keyof typeof TEST_SUITES; 