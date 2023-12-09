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
  clients: any[];
}

type JobFormItem = {
  id?: string;
  title: string;
  client: any;
  beg_date: string;
  end_date: string;
}

type LoadedJobData = {
  jobs: any[];
  clients: any[];
}

type EdgedbModel = {
  id: uuid;
  created_at: datetime;
}

type ClientModel = {
  email: string;
  phone: string;
  last_name: string;
  first_name: string;
  full_name: string;
  company_name: string;
  status: string;
  jobs: string;
  user: UserModel;
} & EdgedbModel

type JobModel = {
  client: ClientModel;
  tags: TagModel[];
  costs: CostModel[];
  payments: PaymentModel[];
  total_cost: string;
  total_earn: string;
  beg_date: string;
  end_date: string;
  title: string;
} & EdgedbModel

type CostModel = {
  job: JobModel;
  tags: TagModel[];
  description: string;
  purchase_date: string;
  job_date: string;
  vendor: string;
  amount: string;
  tax: string;
} & EdgedbModel

type PaymentModel = {
  job: JobModel;
  tags: TagModel[];
  description: string;
  amount: string;
  date: string;
} & EdgedbModel
