const topleft=document.querySelector(".top-left");
const topright=document.querySelector(".top-right");
const bottomleft=document.querySelector(".bottom-left");
const bottomright=document.querySelector(".bottom-right");
const h2=document.querySelector("h2");

const sequences=[
    getrandompanel() ];

let sequenceguess=[...sequences];



function getrandompanel(){
    const panels=[topleft,topright,bottomleft,bottomright];

    return panels[parseInt(Math.random()*panels.length)];



}

function flash(panel){
    return new Promise((resolve, reject) => {
        panel.className+=' active';

        setTimeout(()=>{
            panel.className=panel.className.replace('active','');

            setTimeout(()=>{
                resolve();
                
            },250)
        },1000)
    });
};
let score=0;
let canclick;

function panelclicked(panel){
    if(!canclick)
    return;
    console.log(panel);
    const expectedpanel=sequenceguess.shift();
    if(panel==expectedpanel){
        if(sequenceguess.length===0){
            //start new round...
            sequences.push(getrandompanel());
            sequenceguess=[...sequences];
            startgame();
            score++;

        }
    }
        else{
            alert('game over');
            h2.innerText=`score: ${score}`;
            score=0;
        }

    };


const startgame=async()=>{
    canclick=false;
  h2.innerText="";
        for(let panel of sequences){
            await flash(panel);
        }
        canclick=true;
    

}


startgame();
