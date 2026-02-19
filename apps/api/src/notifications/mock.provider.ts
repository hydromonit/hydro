export type Batch = {
	id: string;
	name: string;
	status: "seeding" | "growing" | "harvested";
	days_since_last_log: number;
};

export type User = {
	id: string;
	email: string;
	full_name: string;
	receiveEmails: boolean;
	unsubscribeToken: string;
	batches: Batch[];
};

const users: User[] = [
	{
		id: "u1",
		email: "email.com",
		full_name: "Budi",
		receiveEmails: true,
		unsubscribeToken: "token-u1",
		batches: [
			{
				id: "b1",
				name: "Lettuce A",
				status: "growing",
				days_since_last_log: 3,
			},
		],
	},
];

export const getUsers = () => users;
