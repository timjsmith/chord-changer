const request = require('supertest')
const createServer = require('../index')

test('serves index.html on /', async () => {
  const app = await createServer()
  const res = await request(app).get('/').expect(200)
  expect(res.text).toMatch(/html/)
})
