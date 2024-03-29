let days, hours, minutes, seconds;
let targetYear, targetMonth, targetDay, targetHours, targetMinutes, targetSeconds;

function setup() {
  canvas = createCanvas(1200, 600);
  canvas.parent("canvas-container");
}

function draw() {
  background(51);
  displayTime();
}

function displayTime(){
  setVariables(2021, 5, 12, 0, 0, 0);
  let acadtimeleft = getTimeLeft();
  setVariables(2021, 5, 29, 0, 0, 0);
  let gretimeleft = getTimeLeft();
  setVariables(2021, 9, 1, 0, 0, 0);
  let placementtimeleft = getTimeLeft();

  textFont('menlo');
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(20);
  text('For Acad Exam', 0, 0, 1200, 200);
  textSize(75);
  text(acadtimeleft, 0, 0, 1200, 300);

  textFont('menlo');
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(20);
  text('For GRE Exam', 0, 0, 1200, 500);
  textSize(75);
  text(gretimeleft, 0, 0, 1200, 600);

  textFont('menlo');
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(20);
  text('For Placement Exam', 0, 0, 1200, 800);
  textSize(75);
  text(placementtimeleft, 0, 0, 1200, 900);
}

function setVariables(year, month, day, hrs, mins, secs){
  targetYear = year;
  targetMonth = month;
  targetDay = day;
  targetHours = hrs;
  targetMinutes = mins;
  targetSeconds = secs;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
}

function getTimeLeft(){

  // getting days left
  days = daysLeft();

  //getting time left
  hours, minutes, seconds = getTime();
  return `${days}days:${hours}hrs:${minutes}min:${seconds}s`;
}

function daysLeft(){
  days = 0;
  if(year()<targetYear){
    days+=monthDiff(1, targetMonth, targetYear);
    if(month()<12){
      if(isFreep(month(), year())==3){
        days+=dayDiff(31, day());
      } else if(isFreep(month(), year())==2) {
        days+=dayDiff(30, day());
      } else if(isFreep(month(), year()==1)) {
        days+=dayDiff(29, day());
      } else {
        days+=dayDiff(28, day());
      }
      days+=monthDiff(month()+1, 12, year());
    } else if(month()==12){
      if(day()<31){
        days+=dayDiff(31, day());
      } else if(day()==31){
        days+=0;
      } else {
        return 'Something wrong with day()😅';
      }
    } else {
      return 'Something wrong with month()😅';
    }
  } else if(year()==targetYear){
    if(month()<targetMonth){
      if(day()<targetDay){
        days+=monthDiff(month(), targetMonth, year());
        days+=dayDiff(day(), targetDay);
      } else if(day()==targetDay){
        days+=monthDiff(month(), targetMonth, year());
      } else {
        days+=monthDiff(month(), targetMonth, year());
        days+=dayDiff(day(), targetDay);
      }
    } else if(month()==targetMonth){
      if(day()<targetDay){
        days+=0;
      } else if(day()==targetDay){
        days+=0;
      } else {
        return 'Naah😉 crossed the deadline';
      }
    } else {
      return 'Naah😉 crossed the deadline';
    }
  } else {
    return 'Naah😉 crossed the deadline';
  }
  return days;
}
function monthDiff(a, b, y){
  let interimDays = 0;
  for(let mon=a; mon<b; mon++){
    if(isFreep(mon, y)==3){
      interimDays+=31;
    } else if(isFreep(mon, y)==2){
      interimDays+=30;
    } else if(isFreep(mon, y)==1){
      interimDays+=29;
    } else {
      interimDays+=28;
    }
  }
  return interimDays;
}

function dayDiff(a, b){
  // a<=b
  return b-a;
}

function isLeap(a){
  return (((a % 4 == 0) && (a % 100 != 0)) || (a % 400 == 0));
}

function isFreep(a, y){
  if(a==1 || a==3 || a==5 || a==7 || a==8 || a==10 || a==12){
    // 31 days
    return 3;
  } else if(a==4 || a==6 || a==9 || a==11){
    // 30 days
    return 2;
  } else if(isLeap(y) && a==2){
    return 1;
  } else {
    return 0;
  }
}

function getTime(){
  seconds = 0;
  minutes = 0;
  hours = 0;
  if(second()==targetSeconds){
    seconds+=0;
    if(minute()==targetMinutes){
      minutes+=0;
      if(hour()==targetHours){
        hours+=0;
      } else if(hour()>targetHours){
        hours+=(24-hour());
      } else {
        return 'oops!!! missed this case😬';
      }
    } else if(minute()>targetMinutes){
      minutes+=(60-minute());
      if(hour()==targetHours){
        hours+=23;
      } else if(hour()>targetHours){
        hours+=(23-hour());
      } else {
        return 'oops!!! missed this case😬';
      }
    } else {
      return 'oops!!! missed this case😬';
    }
  } else if(second()>targetSeconds){
    seconds+=60-second();
    if(minute()==targetMinutes){
      minutes+=59;
      if(hour()==targetHours){
        hours+=23;
      } else if(hour()>targetHours){
        hours+=(23-hour());
      } else {
        return 'oops!!! missed this case😬';
      }
    } else if(minute()>targetMinutes){
      minutes+=(59-minute());
      if(hour()==targetHours){
        hours+=23;
      } else if(hour()>targetHours){
        hours+=(23-hour());
      } else {
        return 'oops!!! missed this case😬';
      }
    } else {
      return 'oops!!! missed this case😬';
    }
  } else {
    return 'oops!!! missed this case😬';
  }
  return hours, minutes, seconds;
}
