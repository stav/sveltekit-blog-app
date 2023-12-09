import { Job, Tag, Payment, e } from "$lib/server/database.js"

export function load({ locals }) {
  return {
    payments: Payment.select((/** @type { PaymentModel } */ payment) => ({
      id: true,
      job: { title: true, id: true, client: { full_name: true } },
      date: true,
      amount: true,
      description: true,
      order_by: payment.date,
      filter: e.op(payment.job.client.user.email, '=', locals.user.email),
    })),
    jobs: Job.select((/** @type {any} */ job) => ({
      id: true,
      title: true,
      client: { full_name: true },
      order_by: [job.client.full_name, job.title],
      filter: e.op(job.client.user.email, '=', locals.user.email),
    })),
  }
}

let getForm = (/** @type {FormData} */ data) => {
  return {
    job: data.get("job"),
    date: data.get("date"),
    amount: data.get("amount"),
    description: data.get("description"),
  }
}

let getPayment = (/** @type {FormData} */ data) => {
  let f = getForm(data)
  const job = Job.select_query({ filter_single: { id: f.job } })

  return {
    job,
    date: f.date,
    amount: f.amount,
    description: f.description,
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData()
    const payment = getPayment(data)
    try {
      await Payment.insert(payment)
    } catch (/** @type {any} */ error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    const id = data.get("id")
    try {
      await Payment.update(() => ({
        filter_single: { id },
        set: getPayment(data),
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
      result = await Payment.delete({ filter_single: { id } })
    } catch (/** @type {any} */ error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
