const request = require('request')
const cheerio=require('cheerio')
console.log('Before')
request("https://www.worldometers.info/coronavirus/",cb)

function cb(error, response, html) {
    if(error){
        console.log(error)
    }
    else{
        handleHtml(html)
    }
}
function handleHtml(html)
{
    let selTool = cheerio.load(html)
    let contentArr= selTool('.maincounter-number > span');
    // for(let i=0;i<contentArr.length;i++)
    // {
    //     let data=selTool(contentArr[i]).text()
    //     console.log('data',data)
    // }
    let totalCases=selTool(contentArr[0]).text()
    let totalDeaths=selTool(contentArr[1]).text()
    let totalRecoveries=selTool(contentArr[2]).text()
    console.log('Total Cases',totalCases)
    console.log('Total Deaths',totalDeaths)
    console.log('Total Recovered',totalRecoveries)
}
// "Shaheed Sthal", "Hindon", "Arthala", "Mohan Nagar", "Shyam Park" ,"Major Mohit Sharma", "Raj Bagh" ,