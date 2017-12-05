var b = require('./builder.js');

var expectation = {
    version: b.version(0, 18, 0),
    package: {
        user: 'shaman-sir',
        name: 'test-node-elm-repl'
    },
    imports: b.imports([
        [ 'Basics' ],
        [ 'Debug' ],
        [ 'List' ],
        [ 'Maybe' ],
        [ 'Platform' ],
        [ 'Platform', 'Cmd' ],
        [ 'Platform', 'Sub' ],
        [ 'Result' ],
        [ 'String' ],
        [ 'Tuple' ]
    ]),
    exports: b.exports([
        'income',
        'outcome'
    ]),
    types: [
        {
            name: '::',
            value: b.lambda(
                b.var('a'),
                b.lambda(
                    b.app(b.type('List'), [ b.var('a') ]),
                    b.app(b.type('List'), [ b.var('a') ])
                )
            )
        },
        {
            name: 'income',
            value: b.lambda(
                b.lambda(
                    b.type('Bool'),
                    b.var('msg')
                ),
                b.app(
                    b.complexType('elm-lang', 'core', [ 'Platform', 'Sub' ], 'Sub'),
                    [ b.var('msg') ]
                )
            )
        },
        {
            name: 'outcome',
            value: b.lambda(
                b.app(
                    b.type('List'),
                    [ b.type('String') ]
                ),
                b.app(
                    b.complexType('elm-lang', 'core', [ 'Platform', 'Cmd' ], 'Cmd'),
                    [ b.var('msg') ]
                )
            )
        }
    ],
    unions: []
};

module.exports = expectation;
