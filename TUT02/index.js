const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () =>{
    try{
        //READING FILE
        data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');

        console.log(data)

        //unlinking file (deleting file.)
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));


        // WRITING FILE
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);

        //APPENDING FILE
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n Nice to meet you! mucho gusto 🎊.')

        //RENAMING FILE
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'))

        //reading a new file
        newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');

        console.log(newData)
    }
    
    catch(err){
        console.error(err)
    }
}

fileOps()

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// });



//Writing file
/*
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), "hello, nice to meet you, I am lorenzo's code!", (err) => {
    if (err) throw err;
    console.log("write complete!")

    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), " \n\n yes it is. Mucho Gusto!", (err) => {
        if (err) throw err;
        console.log("append complete!")
    
        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newreply.txt'), (err) => {
            if (err) throw err;
            console.log("rename complete!")
        });
    });    
});  */


// append file



//exit on uncaught errors
process.on('uncaughtException', err =>{
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1)
})

