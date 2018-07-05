const fs = require('fs');

const input = process.argv[2];

const delimiter = '\t';

//- main
try {
    validateCommand();
    parse(input);
} catch(e) {
    errExit(e);
}

//- functions
function parse(file) {
    fs.readFile(file, 'utf8', parsingHandler);
}

function parsingHandler(err, data) {
    if (err) errExit(error);

    const lines = data.split('\r\n');
    const languages = lines.
        splice(0, 1)[0].
        split(delimiter).
        slice(1);
    const contents = languages.map(_ => []);
    
    lines.forEach(line => {
        const fields = line.split(delimiter);
        const key = fields.splice(0, 1);
        fields.forEach((field, i) => {
            const safeField = safeString(field);
            contents[i].push(`"${key}": "${safeField}"`);
        });
    });

    contents.forEach((content, i) => {
        const filename = `localized-${languages[i]}.json`;
        const body = content.join(',\n');
        fs.writeFile(filename, '{\n' + body + '\n}', 'utf8', function () {
            if (err) errExit(err);
            console.log(`created: ${filename}`);
        });
    });
}

function validateCommand() {
    const res = !input;
    if (res) {
        errExit(`usage: node ${process.argv[1]} FILE.tsv`); 
    }
}

function errExit(msg) {
    console.log(msg);
    process.exit(1);
}

function safeString(str) {
    return (str + '').replace(/["]/g, '\\$&').replace(/\u0000/g, '\\0');
}
