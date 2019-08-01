export default { get: jest.fn(() => Promise.resolve({ data: {} })) };

// response: {
//     data: { message: 'The username should only contain alphanumeric characters' },
//     status: 201
//   }
