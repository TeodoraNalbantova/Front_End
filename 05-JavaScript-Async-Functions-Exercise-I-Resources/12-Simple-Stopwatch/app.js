let stopWatchSeconds = 0;
let stopWatchInterval;
let savedTimeInterval;



function startStopwatch(){

stopWatchInterval = setInterval(function(){

stopWatchSeconds++;
console.log("Elapsed Time:" + stopWatchSeconds + " s")

},1000)

savedTimeInterval = setInterval(async function(){
    await saveTime(stopWatchSeconds)
}, 5000)

}



function stopStopwatch(){

clearInterval(stopWatchInterval)
stopWatchSeconds = 0;
clearInterval(savedTimeInterval)
}

function saveTime(saveTime)
{
    return new Promise(function(resolve,reject){
    console.log("Saved Time: " + saveTime + " s")
        resolve()
    })
}