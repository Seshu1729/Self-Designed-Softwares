var questions = [
    [ "Question 1","which city is called land of rasing sun?","India","Russia","Japan","America","Japan" ],
    [ "Question 2","Que2?","Opt1","Opt2","Opt3","Opt4","Opt2" ],
    [ "Question 3","Que3?","Opt1","Opt2","Opt3","Opt4","Opt3" ],
    [ "Question 4","Que4?","Opt1","Opt2","Opt3","Opt4","Opt4" ],
    [ "Question 5","Que5?","Opt1","Opt2","Opt3","Opt4","Opt1" ],
    [ "Question 6","Que6?","Opt1","Opt2","Opt3","Opt4","Opt2" ],
    [ "Question 7","Que7?","Opt1","Opt2","Opt3","Opt4","Opt3" ],
    [ "Question 8","Que8?","Opt1","Opt2","Opt3","Opt4","Opt4" ],
    [ "Question 9","Que9?","Opt1","Opt2","Opt3","Opt4","Opt1" ],
    [ "Question 10","Que10?","Opt1","Opt2","Opt3","Opt4","Opt2" ],
    [ "Question 11","Que11?","Opt1","Opt2","Opt3","Opt4","Opt3" ],
    [ "Question 12","Que12?","Opt1","Opt2","Opt3","Opt4","Opt4" ],
    [ "Question 13","Que13?","Opt1","Opt2","Opt3","Opt4","Opt1" ],
    [ "Question 14","Que14?","Opt1","Opt2","Opt3","Opt4","Opt2" ],
    [ "Question 15","Que15?","Opt1","Opt2","Opt3","Opt4","Opt3" ]
];
var amount = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var position=0,LL2=0,LL3=0,temp,finalmark=1,EndOnStop=0;
var audio1 = new Audio('music/Question start.mp3');
var audio2 = new Audio('music/First round.mp3');
var audio3 = new Audio('music/Second round.mp3');
var audio4 = new Audio('music/Final round.mp3');
var audio5 = new Audio('music/Correct.mp3');
var audio6 = new Audio('music/Lose.mp3');
var audio7 = new Audio('music/Quit.mp3');
audio1.play();
audio2.play();
document.getElementById("lifeline1").disabled = false;
document.getElementById("lifeline2").disabled = false;
document.getElementById("lifeline3").disabled=false;
document.getElementById("cho1").disabled = false;
document.getElementById("cho2").disabled = false;
document.getElementById("cho3").disabled = false;
document.getElementById("cho4").disabled = false;
document.getElementById("iquit").disabled = false;
document.getElementById("lab").value = questions[position][0];
document.getElementById("que").value = questions[position][1];
document.getElementById("cho1").value = questions[position][2];
document.getElementById("cho2").value = questions[position][3];
document.getElementById("cho3").value = questions[position][4];
document.getElementById("cho4").value = questions[position][5];
document.getElementById("money").value = 0;
document.getElementById("m1").value = amount[0];
document.getElementById("m2").value = amount[1];
document.getElementById("m3").value = amount[2];
document.getElementById("m4").value = amount[3];
document.getElementById("m5").value = amount[4];
document.getElementById("m6").value = amount[5];
document.getElementById("m7").value = amount[6];
document.getElementById("m8").value = amount[7];
document.getElementById("m9").value = amount[8];
document.getElementById("m10").value = amount[9];
document.getElementById("m11").value = amount[10];
document.getElementById("m12").value = amount[11];
document.getElementById("m13").value = amount[12];
document.getElementById("m14").value = amount[13];
document.getElementById("m15").value = amount[14];
function closeViewOptions()
{
    document.getElementById("cho1").style.display = "none";
    document.getElementById("cho2").style.display = "none";
    document.getElementById("cho3").style.display = "none";
    document.getElementById("cho4").style.display = "none";
    document.getElementById("countdown").style.display = "none";
    document.getElementById("showoptions").style.display = "block";
    EndOnStop=0;
}
function closeQuestion()
{
    document.getElementById("next").style.display = "block";
    document.getElementById("questions").style.display = "none";
    document.getElementById("iquit").style.display = "none";
    divblue = document.getElementsByClassName("blue");
    for(ele=0;ele<divblue.length;ele++)
    	divblue[ele].style.boxShadow = "0px 0px 10px 10px rgba(0,255,0,0.9)";
}
function showQuestion()
{
    document.getElementById("next").style.display = "none";
    document.getElementById("questions").style.display = "block";
    document.getElementById("iquit").style.display = "block";
    divblue = document.getElementsByClassName("blue");
    for(ele=0;ele<divblue.length;ele++)
    	divblue[ele].style.boxShadow = "0px 0px 10px 10px rgba(255,255,255,0.9)";
    musicupdate();
}
function showoptions()
{
    document.getElementById("cho1").style.display = "block";
    document.getElementById("cho2").style.display = "block";
    document.getElementById("cho3").style.display = "block";
    document.getElementById("cho4").style.display = "block";
    document.getElementById("countdown").style.display = "block";
    document.getElementById("showoptions").style.display = "none";
    EndOnStop=1;
    countdown.start();
    musicupdate();
}
function stopallmusic()
{
    audio1.pause();
    audio1.currentTime = 0.0;
    audio2.pause();
    audio2.currentTime = 0.0;
    audio3.pause();
    audio3.currentTime = 0.0;
    audio4.pause();
    audio4.currentTime = 0.0;
}
function musicupdate()
{
    if(position<5)
    {
        stopallmusic();
        audio1.play();
        audio2.play();
    }
    else if(position<10)
    {
        stopallmusic();
        audio1.play();
        audio3.play();
    }
    else if(position<15)
    {
        stopallmusic();
        audio1.play();
        audio4.play();
    }
}
function disableallkeys()                                      //function to complect game
{
    document.getElementById("lifeline1").disabled = true;
    document.getElementById("lifeline2").disabled = true;
    document.getElementById("lifeline3").disabled = true;
    document.getElementById("cho1").disabled = true;
    document.getElementById("cho2").disabled = true;
    document.getElementById("cho3").disabled = true;
    document.getElementById("cho4").disabled = true;
    document.getElementById("iquit").disabled = true;
    document.getElementById("money").className = "btn btn-success col-xs-offset-2 col-xs-3";
}
function getCorrectAnswer(id)
{
    if(id==document.getElementById("cho1")||id==document.getElementById("cho3"))
        id.className = "btn btn-danger col-xs-4 col-xs-offset-1 opt";
    else if(id==document.getElementById("cho2")||id==document.getElementById("cho4"))
        id.className = "col-xs-offset-2 btn btn-danger col-xs-4 opt";
    if(questions[position-1][6]==questions[position-1][2])
        document.getElementById("cho1").className = "btn btn-success col-xs-4 col-xs-offset-1 opt";
    else if(questions[position-1][6]==questions[position-1][3])
        document.getElementById("cho2").className = "col-xs-offset-2 btn btn-success col-xs-4 opt";
    else if(questions[position-1][6]==questions[position-1][4])
        document.getElementById("cho3").className = "btn btn-success col-xs-4 col-xs-offset-1 opt";
    else
        document.getElementById("cho4").className = "col-xs-offset-2 btn btn-success col-xs-4 opt";
}
var countdown =  $("#countdown").countdown360({                 //function for timer
                        radius      : 30,
                        seconds     : 30,
                        fontColor   : '#0000FF',
                        autostart   : false,
                        onComplete  : function ()
                                    {
                                        stopallmusic();
                                        if(finalmark==1&&EndOnStop==1)
                                        {
                                            audio6.play();
                                            finalmark=0;
                                        }
                                        if(EndOnStop==1)
                                            disableallkeys();
                                    }
                       });
                       console.log('countdown360 ',countdown);
function updatequestions()                                     //function for update questions
{
    document.getElementById("lab").value = questions[position][0];
    document.getElementById("que").value = questions[position][1];
    document.getElementById("money").value = amount[position-1];
    document.getElementById("cho1").value = questions[position][2];
    document.getElementById("cho2").value = questions[position][3];
    document.getElementById("cho3").value = questions[position][4];
    document.getElementById("cho4").value = questions[position][5];
    closeViewOptions();
    closeQuestion();
}
function correctioninclasses()                                  //set class names as before
{
    document.getElementById("cho1").disabled = false;
    document.getElementById("cho2").disabled = false;
    document.getElementById("cho3").disabled = false;
    document.getElementById("cho4").disabled = false;
    document.getElementById("cho1").className = "btn btn-primary col-xs-4 col-xs-offset-1 opt";
    document.getElementById("cho2").className = "col-xs-offset-2 btn btn-primary col-xs-4 opt";
    document.getElementById("cho3").className = "btn btn-primary col-xs-4 col-xs-offset-1 opt";
    document.getElementById("cho4").className = "col-xs-offset-2 btn btn-primary col-xs-4 opt";
}
function updatemoney(classname)                                          //function to update money
{
    if(position==1)
        document.getElementById("m1").className = classname;
    else if(position==2)
        document.getElementById("m2").className = classname;
    else if(position==3)
        document.getElementById("m3").className = classname;
    else if(position==4)
        document.getElementById("m4").className = classname;
    else if(position==5)
        document.getElementById("m5").className = classname;
    else if(position==6)
        document.getElementById("m6").className = classname;
    else if(position==7)
        document.getElementById("m7").className = classname;
    else if(position==8)
        document.getElementById("m8").className = classname;
    else if(position==9)
        document.getElementById("m9").className = classname;
    else if(position==10)
        document.getElementById("m10").className = classname;
    else if(position==11)
        document.getElementById("m11").className = classname;
    else if(position==12)
        document.getElementById("m12").className = classname;
    else if(position==13)
        document.getElementById("m13").className = classname;
    else if(position==14)
        document.getElementById("m14").className = classname;
    else if(position==15)
        document.getElementById("m15").className = classname;
}
function nextQuestion(id)                                      //function to validation for next question
{
    correctioninclasses();
    if(LL3)
    {
        countdown.addSeconds(-15+temp+countdown.getElapsedTime());
        LL3=0;
    }
    if(questions[position][6]==id.value)
    {
        position++;
        if(position<15)
        {
            if(position==5||position==10)
                updatemoney("btn safepoint");
            else
                updatemoney("btn btn-success");
            updatequestions();
            if(position==5)
                countdown.addSeconds(30+countdown.getElapsedTime());
            else if(position==10)
                countdown.addSeconds(60+countdown.getElapsedTime());
            console.log('countdown360 ',countdown);
        }
        else
        {
            countdown.stop();
            updatemoney("btn btn-link");
            document.getElementById("money").value = 15;
            disableallkeys();
        }
        audio5.play();
    }
    else
    {  
        document.getElementById("countdown").style.display = "none";
        divblue = document.getElementsByClassName("blue");
        for(ele=0;ele<divblue.length;ele++)
        	divblue[ele].style.boxShadow = "0px 0px 10px 10px rgba(255,0,0,0.9)";
        EndOnStop=0;
        stopallmusic();
        audio6.play();
        position++;
        updatemoney("btn btn-danger");
        getCorrectAnswer(id);
        if(position<6)
        	document.getElementById("money").value = 0;
        else
        {
            if(position<10)
                position=5;
            else
                position=10;
            document.getElementById("money").value = amount[position-1];
        }
        countdown.stop();
        disableallkeys();
    }
}
function activateLifeline1(id)                                      //function to activate first lifeline
{
    if(LL3)
    {
        countdown.addSeconds(-15+temp+countdown.getElapsedTime());
        LL3=0;
    }
    position++;
    if(position==5||position==10)
    {
        updatemoney("btn btn-link");
        position--;
    }
    else
        updatemoney("btn btn-success");
    updatequestions();
    correctioninclasses();
    if(position==5)
        countdown.addSeconds(30+countdown.getElapsedTime());
    else if(position==10)
        countdown.addSeconds(60+countdown.getElapsedTime());
    countdown.start();
    console.log('countdown360 ',countdown);
    id.disabled=true;
}
function activateLifeline2(id)                                      //function to activate second lifeline
{
    var count=2,value,val1=1,val2=1,val3=1,val4=1;
    while(count)
    {
        value=Math.floor((Math.random() * 4) + 1);
        if(value<=4&&value>=1)
        {
            if(!(questions[position][6]==questions[position][value+1]))
            {
                if(value==1&&val1==1)
                {
                    document.getElementById("cho1").className = "btn btn-warning col-xs-4 col-xs-offset-1 opt";
                    document.getElementById("cho1").disabled = true;
                    count--;val1=0;
                }
                else if(value==2&&val2==1)
                {
                    document.getElementById("cho2").className = "col-xs-offset-2 btn btn-warning col-xs-4 opt";
                    document.getElementById("cho2").disabled = true;
                    count--;val2=0;
                }
                else if(value==3&&val3==1)
                {
                    document.getElementById("cho3").className = "btn btn-warning col-xs-4 col-xs-offset-1 opt";
                    document.getElementById("cho3").disabled = true;
                    count--;val3=0;
                }
                else if(value==4&&val4==1)
                {
                    document.getElementById("cho4").className = "col-xs-offset-2 btn btn-warning col-xs-4 opt";
                    document.getElementById("cho4").disabled = true;
                    count--;val4=0;
                }
            }
        }
    }
    LL2=1;
    id.disabled=true;
}
function activateLifeline3(id)                                      //function to activate third lifeline
{
    LL3=1;
    temp=countdown.getElapsedTime();
    countdown.addSeconds(15);
    id.disabled=true;
}
function quit(id)
{   
    document.getElementById("countdown").style.display = "none";
    EndOnStop=0;
    position++;
    getCorrectAnswer(id);
    position--;
    stopallmusic();
    audio7.play();
    finalmark=0;
    disableallkeys();
    id.disabled = true;
    if(position!=0)
        document.getElementById("money").value = amount[position-1];
    else
        document.getElementById("money").value = 0;
    countdown.stop();
    disableallkeys();
}
location.hash = 'blah';