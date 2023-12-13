import { Job, Cost, e } from "$lib/server/database.js"

export function load({ locals, url }) {
  /**
   * @param {CostModel} cost
   */
  function costSelection(cost) {
    const filters = [e.op(true, '=', true)]

    // Filter based on user role (admin sees everything)
    if (locals.user.role !== 'admin') {
      const userFilter = e.op(cost.job.client.user.email, '=', locals.user.email)
      filters.push(userFilter)
    }
    // Filter based on selected job id
    const selectedJobId = url.searchParams.get("job")
    if (selectedJobId) {
      const jobIdFilter = e.op(cost.job.id, "=", e.uuid(selectedJobId))
      filters.push(jobIdFilter)
    }

    return {
      id: true,
      job: { title: true, id: true, client: { full_name: true } },
      description: true,
      purchase_date: true,
      job_date: true,
      vendor: true,
      amount: true,
      tax: true,
      order_by: [cost.job.client.full_name, cost.job.title, cost.job_date],
      filter: e.all( e.set(...filters) ),
    }
  }

  /**
   * @param {JobModel} job
   */
  function jobSelection (job) {
    return {
      id: true,
      title: true,
      client: { full_name: true },
      order_by: [job.client.full_name, job.title],
      filter: locals.user.role == 'admin' ? null : e.op(job.client.user.email, '=', locals.user.email),
    }
  }

  return {
    costs: Cost.select(costSelection),
    jobs: Job.select(jobSelection),
  }
}

/**
 * @param {FormData} data
 */
function getForm (data) {
  return {
    job: data.get("job"),
    description: data.get("description"),
    purchase_date: data.get("purchase_date"),
    job_date: data.get("job_date"),
    vendor: data.get("vendor"),
    amount: data.get("amount"),
    tax: data.get("tax"),
  }
}

/**
 * @param {FormData} data
 */
function getCost (data) {
  let f = getForm(data)
  const job = Job.select_query({ filter_single: { id: f.job } })
  return {
    description: f.description,
    purchase_date: f.purchase_date,
    job_date: f.job_date,
    vendor: f.vendor,
    amount: f.amount,
    tax: f.tax,
    job,
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData()
    const cost = getCost(data)
    try {
      await Cost.insert(cost)
    } catch (/** @type {any} */ error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    const id = data.get("id")
    try {
      await Cost.update(() => ({
        filter_single: { id },
        set: getCost(data),
      }))
    } catch (/** @type {any} */ error) {
      let form = getForm(data)
      // @ts-ignore
      form.id = data.get("id")
      return { error: error.message, form: form }
    }
  },
  delete: async ({ request }) => {
    const data = await request.formData()
    const id = data.get("id")
    console.info('jobs (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await Cost.delete({ filter_single: { id } })
    } catch (/** @type {any} */ error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
