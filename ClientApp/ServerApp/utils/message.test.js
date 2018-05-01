var expect = require('expect');
const assert = require('assert');
var { generateMessage} = require('./message');

describe('generateMessage', () => {
  it('Should generate correct message object', ()=> {
    var from = 'Tom';
    var text = 'Hello';
    var message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text});

    assert(message.from === 'Tom');
    assert(message.text === 'Hello');
    // store res in variable
    // assert from match
    // assert text match
    // assert createdAt
  });
});