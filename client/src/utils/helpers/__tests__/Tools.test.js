import Tools from  '../Tools';

test('cap', () => {
    let input = 'test';
    let eput = 'Test';
    let output = Tools.cap(input);
    expect(output).toBe(eput);

    input = 't';
    eput = 'T';
    output = Tools.cap(input);
    expect(output).toBe(eput);
});

test('formDataToObj', () => {
    let input = new FormData();
    input.set('key1', 'value1');
    input.set('key2', 'value2');
    input.set('key3', 123);

    let eput = {
        key1: 'value1',
        key2: 'value2',
        key3: '123',
    };
    let output = Tools.formDataToObj(input);
    expect(output).toEqual(eput);

    /*------------------------------------*/

    input = new FormData();
    input.set('key1', 'value1');
    input.set('key2', 'value2');
    input.set('key3', null);

    eput = {
        key1: 'value1',
        key2: 'value2',
        key3: null,
    };
    output = Tools.formDataToObj(input);
    expect(output).toEqual(eput);
});
