// @ts-nocheck
import { Job, Tag, Cost, e } from "$lib/server/database.js"
import { getBody } from '$lib/server/request.js'

export function load({ url }) {
  const job = url.searchParams.get("job")

  const costSelection = (cost) => {
    const selection = {
      id: true,
      job: { title: true, id: true},
      description: true,
      purchase_date: true,
      job_date: true,
      vendor: true,
      amount: true,
      tax: true,
      order_by: [cost.job, cost.job_date],
    }

    if (job) {
      selection.filter = e.op(cost.job.id, "=", e.uuid(job))
    }

    return selection
  }

  return {
    costs: Cost.select(costSelection),
    jobs: Job.select((job) => ({
      id: true,
      title: true,
      client: true,
      order_by: job.full_name,
    })),
    tags: Tag.select((tag) => ({
      id: true,
      name: true,
      order_by: tag.name,
    })),
    job,
  }
}

let getForm = (data) => {
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

let getCost = (data) => {
  let f = getForm(data)
  console.log('f.job', f.job)
  const job = Job.select_query({ filter_single: { id: f.job } })
  console.log({job})

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
    const data = await getBody(request)
    const cost = getCost(data)
    console.log({cost})
    try {
      await Cost.insert(cost)
    } catch (error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await getBody(request)
    const id = data.get("id")
    try {
      await Cost.update((job) => ({
        filter_single: { id },
        set: getCost(data),
      }))
    } catch (error) {
      let form = getForm(data)
      form.id = data.get("id")
      return { error: error.message, form: form }
    }
  },
  delete: async ({ request }) => {
    const data = await getBody(request)
    const id = data.get("id")
    console.info('jobs (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await Cost.delete({ filter_single: { id } })
    } catch (error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
