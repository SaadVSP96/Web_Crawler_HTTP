

function main(){
    // the reason we are checking to exceed length of 3 is
    // because it has some process.argv has some default 
    // argguments, first is the interpreter with its path,
    // the second argument is the name of our code / entry point file itself,
    // the third argument is what we are actually passing into our program.  
    if (process.argv.length < 3){
        console.log("no website provided")
        process.exit(1)
    }
    if (process.argv.length > 3){
        console.log("too many CLI arguments provided")
        process.exit(1)
    }
    const baseURL = process.argv[2]
    console.log(`starting crawl of ${baseURL}`)
}

main()
