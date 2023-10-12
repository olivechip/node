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

if (process.argv[2].startsWith('http')) {
    webCat(process.argv[2]);
} else {
    cat(process.argv[2]);
}