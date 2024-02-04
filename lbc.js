const request = require('request')
const cheerio=require('cheerio');

console.log('Before')
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
request(url,cb);
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
let inningsArr=$('.card.content-block.match-scorecard-table>.Collapsible')
console.log(inningsArr.length)
//let htmlStr=$(inningsArr[0]).html()
//console.log(htmlStr)
}
console.log('After')