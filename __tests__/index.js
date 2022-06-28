const request = require('supertest');
const express = require('express');
const router = require('../routes.js');

const app = new express();
app.use(express.json())
app.use(express.urlencoded())
app.use('/', router);

describe('Create purchase', function () {

  test('responds to /create_purchases/:productId', async () => {
    const res = await request(app).post('/create_purchases/cf221130-13b3-4271-acaf-eaad233e1426').set('Accept', 'application/json').send({
      quantity: 2,
      pricePerPiece: 12.6
    });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual(JSON.stringify({
      status: true,
      message: "Successfully created!"
    }));
  });

  test('responds to /get_all_product_details', async () => {
    const res = await request(app).post('/get_all_product_details').send({'startPosition': 0, 'maxResults': 2})
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  
});