module.exports = [
    '',
    'Node-Elm-REPL.',
    '',
    '',
    'Use `--from-module` parameter to extract types and values from any Elm module. Add `--json`' ,'flag if you need to get in JSON format.',
    '',
    'Run `./bin/cli --from-module <your-module-name>`, let\'s try it with a test sample:',
    '',
    '> ./bin/cli --from-module Anagram --work-dir ./test/samples/elm',
    ':: : a -> List a -> List a',
    'detect : String -> List String -> List String',
    'isAnagram : String -> String -> Maybe.Maybe String',
    'sortChars : String -> String',
    '> ./bin/cli --from-module Anagram --json --work-dir ./test/samples/elm',
    '{ "package": ..., imports": ..., "exports": ..., "types": ..., ... }',
    '',
    '',
    'Alternative way is to prepare a file and put the Elm expressions there, line by line',
    'If you need imports, list them in the first line starting with `;` and splitting them with `;`',
    '',
    'For example (the contents of `src/cli-example`):',
    '',
    ';List as L;Maybe exposing ( Maybe(..) );String',
    'L.map',
    'L.foldl',
    'Just',
    'Nothing',
    '1 + 1',
    '\\a b -> a + b',
    '',
    'Then run `./bin/cli --from <your-file-name>`, i.e. `./bin/cli --from ./src/cli-example`',
    '',
    'And you should get:',
    '',
    '(a -> b) -> List a -> List b',
    '(a -> b -> b) -> b -> List a -> b',
    'a -> Maybe.Maybe a',
    'Maybe.Maybe a',
    'number',
    'number -> number -> number',
    '',
    'Or, if you want to get JSON in response, add `--json` flag',
    '',
    '',
    'Examples: ',
    '',
    './bin/cli --from-module <module-name> --module-info',
    './bin/cli --from-module <module-name> --json',
    './bin/cli --from <file-with-expressions>',
    './bin/cli --from <file-with-expressions> --json',
    './bin/cli --from <file-with-expressions> --with-values',
    './bin/cli --from <file-with-expressions> --only-values --json',
    './bin/cli --from <file-with-expressions> --json --show-time',
    './bin/cli --from <file-with-expressions> --json --work-dir <some-path> --elm-ver 0.18.0',
    './bin/cli --from <file-with-expressions> --user my-username --package my-package --package-ver 1.0.0',
    '',
    '',
    'Possible options:',
    '--from — specify a file name to extract all the types, imports and exports from it (intended to be used as a replacement for --from-module)',
    '--from-module — specify a module name to extract all the types, imports and exports from it (intended to be used as a replacement for --from)',
    '--json — do not stringify the result, but output to JSON',
    '--work-dir — specify working directory for execution, for example where the `.elm` files you use are located',
    '--elm-ver — exact elm-version you use (default: 0.18.0), required to be known if you import your own modules',
    '--user — your username specified in elm-package.json (default: user), required to be known if you import your own modules',
    '--package — your project specified in elm-package.json (default: project), required to be known if you import your own modules',
    '--package-ver — your project version specified in elm-package.json (default: 1.0.0), required to be known if you import your own modules',
    '--module-info — show module information: imports, exports, when called with `--from-module` without `--json` flag',
    '--show-time — show how much time it took to convert everyting, works with `--from` only',
    '--with-values — include values into the output (takes more time to extract them), works with `--from` only',
    '--only-values — report and extract only values, not the types (overrides --with-values), works with `--from` only',
    '--values-below — has sense only when `--with-values` was used: instead of putting types and values in lines like `TYPE<TAB>VALUE`, put a list of values line-by-line below the list of types: could be useful for parsing (has no effect with JSON output), works with `--from` only',
    '--temp-file-name — specify file name of the generated Elm code',
    // console.log('--ksy — use Kaitai parser instead of binary one');
];
