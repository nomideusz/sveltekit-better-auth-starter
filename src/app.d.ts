declare global {
	namespace App {
		interface Locals {
			user: import('#lib/server/db/schema').User | null;
			locale: string;
		}
	}
}

export {};
