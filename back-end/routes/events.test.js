const express = require('express');
const request = require('supertest');
const {expect} = require('chai');
const eventsRoutes = require('./events');
const sinon = require('sinon');
const axios = require('axios');
const {EVENTS: FALLBACK_EVENTS, EVENTS} = require('../mock-data/events');

const stubAxios = (requestReturn) =>
    sinon.stub(axios, 'create').returns({request: requestReturn});

    describe('chat route', () => {
        let app;

        beforeEach(() => {
            app = express();
            app.use('/events', eventsRoutes);
        });

        afterEach(() => {
            sinon.restore();
        });

        describe('GET /events', () => {
            it('should fetch Mockaroo', async () => {
                stubAxios(() => Promise.resolve({data: EVENTS}));

                const response = await request(app).get('/events');

                expect(response.status).to.equal(200);
                expect(response.body).to.deep.equal(EVENTS);
            });

            it('should return data from mock data if Mockaroo is unavailable', async () => {
                stubAxios(() => Promise.reject('test error'));

                const response = await request(app).get('/events');

                expect(response.status).to.equal(200);
                expect(response.body).to.deep.equal(FALLBACK_EVENTS);
            });
        });

        describe('GET /events/pending', () => {
            it('should fetch Mockaroo', async () => {
                stubAxios(() => Promise.resolve({data: EVENTS}));

                const response = await request(app).get('/events/pending');

                expect(response.status).to.equal(200);
                expect(response.body).to.deep.equal(EVENTS);
            });

            it('should return data from mock data if Mockaroo is unavailable', async () => {
                stubAxios(() => Promise.reject('test error'));

                const response = await request(app).get('/events/pending');

                expect(response.status).to.equal(200);
                expect(response.body).to.deep.equal(FALLBACK_EVENTS);
            });
        })
    });