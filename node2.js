

 
let counterValue = 4;
let baseMarginLeft = 5-(counterValue*0.2);
let arr_Value = [];
let arrDivIndexs = [];
let array_container = document.createElement('div');
array_container.className="array_container";
array_container.id="array_container";
document.getElementById("container").appendChild(array_container);
for(let i = 0;i<counterValue;i++)
    {
        let rndmarr = Math.floor(Math.random() * 100) + 1;

        arr_Value.push(rndmarr);
    }
function createSpan(n)
{
    
    
   
    let baseHeight =20;
    let base_width = 70-counterValue;
    // if(counterValue>18 && counterValue<24)
    // {
    //     base_width -=10;
    // }
    // if(counterValue>23 && counterValue<=34)
    // {
    //     base_width -=20;
    //     baseMarginLeft = 10;
    // }
    // if(counterValue>34 && counterValue<=60)
    // {
    //     base_width -=30;
    //     baseMarginLeft = 8;
    // }


    
    for(let i = 0;i<n;i++)
    {
        let div  = document.createElement("div");
        

        // div.style.padding = "10px";
        div.className="array_div";
        div.style.border="1px solid red";
        div.style.backgroundColor = "black";
        div.style.color="white";
        div.style.width=base_width+'px';
        div.style.height= (arr_Value[i]*4+baseHeight)+'px';
        
         
        div.style.marginLeft = baseMarginLeft+'px';
        if(n<35){
        div.innerHTML="<span>"+arr_Value[i]+"</span>";
       }
       else
       {
        div.innerHTML="<span></span>";
       }
         

        let array_div = document.getElementById("array_container");
     
        array_div.appendChild(div);

    // console.log(arr_Value.indexOf(25));

    }
    
    console.log(arr_Value);


}

function counterChange(n)
{
  if(n==1 && counterValue<34)
  {
    counterValue++;
  }
  else if(n==-1 && counterValue>2){
    counterValue--;
  }
  
  while (array_container.firstChild) array_container.removeChild(array_container.firstChild);
  createSpan(counterValue);
}

createSpan(counterValue);

const myRange = document.getElementById("myRange");
myRange.addEventListener('input', function(){
  counterValue = myRange.value;
  while (array_container.firstChild) array_container.removeChild(array_container.firstChild);
  arr_Value = [];
 
  createSpan(counterValue);

});
arrDivIndexs = document.getElementsByClassName("array_div");
function sorting(params) {
    arrDivIndexs = document.getElementsByClassName("array_div");
  // console.log(arrDivIndexs);
  // arrDivIndexs[0].style.backgroundColor="red";
  arr_Value.indexOf(25);


  
}

  
function swap(arr_Value, leftIndex, rightIndex){
  var temp = arr_Value[leftIndex];
  arr_Value[leftIndex] = arr_Value[rightIndex];
  arr_Value[rightIndex] = temp;
}
function partition(arr_Value, left, right) {
  var pivot   = arr_Value[Math.floor((right + left) / 2)], //middle element
      i       = left, //left pointer
      j       = right; //right pointer
      arrDivIndexs[Math.floor((right + left) / 2)].style.backgroundColor="red";
      setTimeout(100);
      createSpan(counterValue);
  while (i <= j) {
      while (arr_Value[i] < pivot) {
          i++;
      }
      while (arr_Value[j] > pivot) {
          j--;
      }
      if (i <= j) {
          swap(arr_Value, i, j); //sawpping two elements
          i++;
          j--;
      } 
  }
  return i;
}

function quickSort(arr_Value, left, right) {
  var index;
  if (arr_Value.length > 1) {
      index = partition(arr_Value, left, right); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
          quickSort(arr_Value, left, index - 1);
      }
      if (index < right) { //more elements on the right side of the pivot
          quickSort(arr_Value, index, right);
      }
  }
   
}



// sorting();
quickSort(arr_Value, 0, arr_Value.length - 1); 
console.log(arr_Value);



function animateValue(id, start, end, duration) {
    // assumes integer values for start and end
    
    var obj = document.getElementById(id);
    var range = end - start;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));
    
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);
    
    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}

animateValue("value", 100, 25, 5000);
#value {
    font-size: 50px;
}
<div id="value">100</div>