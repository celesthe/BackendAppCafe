//create unit test for user.js with jest
const request = require('supertest')
const  { server, serverListener  } = require('../app');

describe('get /api/usuarios', () => {
    test('Should respon with a 200 status code', async() => {
        const response = await request(server).get('/api/usuarios').send();
        expect(response.statusCode).toBe(200);
        });
});

describe('post /api/usuarios', () => {
    let  UID = '';
    test('Should respon with a 200 status code', async() => {
        const response = await request(server).post('/api/usuarios').send({
            nombre: 'test',
            correo: 'correo@gmail.com',
            password: '123456',
            rol: 'ADMIN_ROLE',
            estado: true,
        });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('UID');

        UID = response.body.UID;
        });
});


describe('get /api/usuarios/:uid', () => {
    test('Should respon with a 200 status code', async() => {
        const response = await request(server).get('/api/usuarios/' + UID).send();
        expect(response.statusCode).toBe(200);
        });
});


describe('put /api/usuarios/:uid', () => {
    test('Should respon with a 200 status code', async() => {
        const response = await request(server).put('/api/usuarios/' + UID).send({
            nombre: 'Nuevo Test',
            correo: 'correwo@gmail.com',
            estado: false,
            _id: UID
           });
            expect(response.statusCode).toEqual(200);

    });
});


describe('delete /api/usuarios/:uid', () => {
    test('Should respon with a 200 status code', async() => {
        const response = await request(server).delete('/api/usuarios/' + UID ).send();
         expect(response.statusCode).toEqual(200);

    });
});