const request = require('supertest')
const mongoose = require('mongoose')
const { Example } = require('../../models/Example');
let server;
describe("/api/examples", () => {
    beforeEach(() => {
        server = require('../../app');
    })
    afterEach(async () => {
        await Example.remove({});
        await server.close()
    });
    describe('GET /', () => {
        it('should return all examples', async () => {
            await Example.insertMany([
                { name: 'Example1' },
                { name: 'Example2' },
            ])
            const res = await request(server).get('/api/examples');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(x => x.name === 'Example1')).toBeTruthy();
        })

    })
    describe('GET /:id', () => {
        it('should return genre with ID', async () => {
            const examples = new Example({
                name: 'Example1'
            })
            await examples.save();
            const res = await request(server).get(`/api/examples/${examples._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", examples.name);
        });

        it('should return 400 if ID not found', async () => {
            const res = await request(server).get(`/api/examples/1`);
            expect(res.status).toBe(400);
        })
    })
    describe('POST /', () => {
        it('should return 400 if invalid data', async () => {
            const res = await request(server).post('/api/examples').send({ name: 'g' });
            expect(res.status).toBe(400);
        })
        it('should return 400 if invalid data', async () => {
            const res = await request(server).post('/api/examples').send({ name: 'g' });
        })
        it('should save the genre if valid', async () => {
            const res = await request(server).post('/api/examples').send({ name: 'Example1' });
            expect(res.body).toHaveProperty("_id");
            expect(res.body).toHaveProperty("name","Example1");
        })
    })
})