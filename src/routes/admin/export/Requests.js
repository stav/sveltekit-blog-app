/**
 * @param {Request} request
 * @returns {Promise<any[]>}
 */
export async function objectsFromRequestJson (request) {
  // Pull file from Request
  const data = await request.formData()
  const file = data?.get('file')
  // @ts-ignore
  const name = file?.name
  // @ts-ignore
  const text = await file?.text()

  // Parse file contents as JSON
  let objects = JSON.parse(text)
  if (objects.length === undefined) {
    objects = [objects]
  }
  console.log(objects.length, 'object')
  return objects
}
