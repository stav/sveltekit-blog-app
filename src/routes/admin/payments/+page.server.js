// @ts-nocheck
import { Job, Tag, Payment } from "$lib/server/database.js"
import { getBody } from '$lib/server/request.js'

export function load({ cookies }) {
  return {
    items: Payment.select((/** @type { Payment } */ payment) => ({
      id: true,
      job: { title: true, id: true, client: { full_name: true } },
      description: true,
      date: true,
      amount: true,
      order_by: payment.date,
    })),
    jobs: Job.select((job) => ({
      id: true,
      title: true,
      client: { full_name: true },
      order_by: [job.client.full_name, job.title],
    })),
    tags: Tag.select((tag) => ({
      id: true,
      name: true,
      order_by: tag.name,
    })),
  }
}

let getForm = (data) => {
  return {
    job: data.get("job"),
    description: data.get("description"),
    date: data.get("date"),
    amount: data.get("amount"),
  }
}

let getPayment = (data) => {
  let f = getForm(data)
  console.log('f.job', f.job)
  const job = Job.select_query({ filter_single: { id: f.job } })
  console.log({job})

  return {
    description: f.description,
    date: f.date,
    amount: f.amount,
    job,
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await getBody(request)
    const payment = getPayment(data)
    console.log({payment})
    try {
      await Payment.insert(payment)
    } catch (error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await getBody(request)
    const id = data.get("id")
    try {
      await Payment.update((job) => ({
        filter_single: { id },
        set: getPayment(data),
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
      result = await Payment.delete({ filter_single: { id } })
    } catch (error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
