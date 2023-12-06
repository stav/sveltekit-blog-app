// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals { user: any }
	// interface PageData {}
	// interface Platform {}
}

type ClientFormItem = {
	id?: string;
  company_name: any;
  first_name: any;
  last_name: any;
  email: any;
  phone: any;
  status: any;
}

type LoadedClientData = {
  clients: any;
}

type JobFormItem = {
  id?: string;
  title: string;
  client: any;
  beg_date: string;
  end_date: string;
}

type LoadedJobData = {
  jobs: any;
  clients: any;
}
