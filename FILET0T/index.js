const fsPromises = require('fs').promises;
const path = require('path')

const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data)
        

    }catch(err){
        console.error(err)
    }
}
fileOps()























// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), "Hi, it's nice to meet you!", (err)=>{
//     if(err) throw err;
//     console.log('writting is complete')

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\n\n Yes it is〽️', (err)=>{
//         if(err) throw err;
//         console.log('append complete')

//         fs.rename(path.join(__dirname, 'files', 'reply. txt' ), path.join(__dirname, 'files', 'response.txt'),(err)=>{
//         if(err) throw err;
//         console.log('rename complited')
//         })
//     })

    
// }) 

// Appending file


//Exit uncaught Error
process.on('uncaughtException', err => {
    console.error(`There was uncaught error: ${err}`)
    process.exit(1);
})