const request = require('request')
const cheerio=require('cheerio');

console.log('Before')
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
request(url,cb);
function cb(error, response, html) {
    if(error){
        console.log(error)
    }
    else{
        extractHtml(html)
    }
}
function extractHtml(html)
{   
    let $ = cheerio.load(html)
   // console.log(selTool)
let teamsArr= $('.match-info.match-info-MATCH.match-info-MATCH .team')
//  //console.log(elemArr.length)
//     let lbc=$(elemArr[0]).text()
//     console.log(`last ball commentary-> ${lbc}`)
let wTeamName;
//console.log(teamsArr.length);
for(let i=0;i<teamsArr.length;i++)
{
    let hasClass = $(teamsArr[i]).hasClass("team-gray");
    if(hasClass==false)
    {
        let teamNameElem=$(teamsArr[i]).find(".name")   
        wTeamName=teamNameElem.text()
    }
}
console.log(wTeamName)
let inningsArr = $('.card.content-block.match-scorecard-table>.Collapsible')
let htmlStr = ""
console.log(inningsArr.length);

for(let i=0; i<inningsArr.length; i++){
    let cHtml=$(inningsArr[i]).html()
    htmlStr+=cHtml
    let teamNameElem=$(inningsArr[i]).find('.header-title.label')
let teamName = teamNameElem.text()
console.log(teamName)
teamName=teamName.split('INNINGS')[0].trim()
console.log(teamName)
let hwtName=''
let hwt=0
if(wTeamName==teamName)
{
    let tableElem= $(inningsArr[i]).find(".table.bowler")
    let allBowlers=$(tableElem).find('tr')
    for(let j=0;j<allBowlers.length;j++)
    {
        let allColOfPlayers=$(allBowlers[j]).find('td')
        let playerName=$(allColOfPlayers[0]).text()
        let wickets=$(allColOfPlayers[4]).text()
        if(wickets>=hwt)
        {
            hwt=wickets;
            hwtName=playerName
        }

    }
    console.log(`higher wicketTaker is ${hwtName} wickets ${hwt} `)

}
}
//console.log(htmlStr)

// let inningsArr=$('.card.content-block.match-scorecard-table')
//     let htmlStr=''
//    for(let i=0;i<inningsArr.length;i++)
//    {
//        let cHtml=$(inningsArr[i]).html()
//        htmlStr+=cHtml
//    }
//    console.log(htmlStr)

//let htmlStr=$(inningsArr[0]).html()
//console.log(htmlStr)
}
console.log('After')
   