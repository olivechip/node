const { default: axios } = require('axios');
const fs = require('fs')
const process = require('process')

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log(`Error reading ${path}: ${err}`)
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url){
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err){
        console.log(`Error fetching data from ${url}: ${err}`)
        process.exit(1)
    }
}

function echo(path, data){
    fs.writeFile(path, data + '\n', 'utf8', function(err){
        if (err){
            console.log(`Error writing to ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(`Successfully wrote data to file!`);
        }
    })
}

function append(path, data){
    fs.writeFile(path, data + '\n', {encoding: 'utf8', flag:'a'}, function(err){
        if (err){
            console.log(`Error writing to ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(`Successfully wrote data to file!`);
        }
    })
}

if (process.argv[2] === '--append'){
    for (let i=4; i < process.argv.length; i++){
        append(process.argv[3], process.argv[i]);
    }
} else if (process.argv[2] === '--echo'){
    let data = '';
    for (let i=4; i < process.argv.length; i++){
        data = data + process.argv[i] + ' ';
    }
    echo(process.argv[3], data);
} else if (process.argv[2].startsWith('http')) {
    webCat(process.argv[2]);
} else {
    cat(process.argv[2]);
}

