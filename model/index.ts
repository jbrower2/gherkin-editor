export type Feature = {
	readonly tags?: readonly string[];
	readonly name: string;
	readonly description?: string;
	readonly background?: Background;
	readonly children: readonly (Rule | Scenario)[];
};

export type Background = {
	readonly name: string;
	readonly description?: string;
	readonly given: readonly Step[];
};

export type Rule = {
	readonly tags?: readonly string[];
	readonly name: string;
	readonly description?: string;
	readonly background?: Background;
	readonly children: readonly Scenario[];
};

export type Scenario = {
	readonly tags?: readonly string[];
	readonly name: string;
	readonly description?: string;
	readonly given: readonly Step[];
	readonly when: readonly Step[];
	readonly then: readonly Step[];
	readonly examples?: Examples;
};

export type Examples = {
	readonly tags?: readonly string[];
	readonly name: string;
	readonly description?: string;
	readonly header: readonly string[];
	readonly rows: readonly (readonly string[])[];
};

export type Step = {
	readonly text: string;
	readonly argument?: string | DataTable;
};

export type DataTable = {
	readonly header?: readonly string[];
	readonly rows: readonly (readonly string[])[];
};
