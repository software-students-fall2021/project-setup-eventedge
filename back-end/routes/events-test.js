const express = require('express');
const request = require('supertest');
const { expect } = require('chai');
const eventsRoutes = require('./events');
const sinon = require('sinon');
const axios = require('axios');
const generateRandomInt = require('../utils/generate-random-int');
const { EVENTS: FALLBACK_EVENTS = require('../mock-data/events');


const randID1 = generateRandomInt(0, 100);
const randID2 = generateRandomInt(0, 100)
const EVENTS = [
    {
        id: randID1,
        chatID: randID1,
        eventName: 'Review Session',
        mdy: '2008-9-04',
        eventTime: '09:53:32',
        location: 'NY',
        eventDescription: 'REview for upcoming exam',
    },

    {
        id: randID2,
        chatID: randID2,
        eventName: 'Trip to space',
        mdy: '2018-9-04',
        eventTime: '09:53:32',
        location: 'NY',
        eventDescription: 'Prepare to travel to space',
    },


];

const stubAxios = (requestReturn) =>
    sinon.stub(axios, 'create').returns({ request: requestReturn });

describe('events route', () => {
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
            stubAxios(() => Promise.resolve({ data: EVENTS }));

            const response = await request(app).get('/events');

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(EVENTS);
        });

        it('should return data from mocks if Mockaroo is unavailable', async () => {
            stubAxios(() => Promise.reject('test error'));

            const response = await request(app).get('/events');

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(FALLBACK_EVENTS);
        });
    });
});
