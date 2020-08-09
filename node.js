let counterValue = 8; //the default size of array
let baseMarginLeft = 5 - (counterValue * 0.2); //this is the base margin between the bars i.e array_divs
let array = []; //array initializa as length 0
let arrDivIndexs; //div index intialization
let baseHeight = 20; //the base height of bars
let base_width;; //base width of bars
let clearI;
let speed = 0;
let breakTheLoop = false;
let isSortingOn = false;



//creating the array container div*************
let array_container = document.createElement('div');
array_container.className = "array_container";
array_container.id = "array_container";
document.getElementById("container").appendChild(array_container);
document.getElementById("counterValue").innerText = counterValue;
// *******************************************************

//  this is creating a random array of size n
function createArrayList(n) {
  for (let i = 0; i < n; i++) {
    let rndmarr = Math.floor(Math.random() * 100) + 1;
    array.push(rndmarr);
  }
}



// creating the bar of size n
function createArrayDivs(n) {
  base_width = 70 - counterValue;
  document.getElementById("counterValue").innerText = n; //it updates the text inside the counter

  if (base_width < 4) {
    base_width = 4
  }

  for (let i = 0; i < n; i++) {
    let div = document.createElement("div");
    div.className = "array_div";
    div.style.width = base_width + 'px';
    div.style.height = (array[i] * 4 + baseHeight) + 'px';
    div.style.marginLeft = baseMarginLeft + 'px';
    // this will hide the text inside the bars after size gtreater thet 40
    if (n < 40) {
      div.innerHTML = "<span>" + array[i] + "</span>";
    } else {
      div.innerHTML = "<span></span>";
    }
    array_container.appendChild(div); //it added the div in the array_container class
  }
  arrDivIndexs = document.querySelectorAll(".array_div");
  //  arrDivIndexs = document.getElementsByClassName("array_div");
}


function emptyArrayDiv() {
  while (array_container.firstChild) array_container.removeChild(array_container.firstChild);
}

/******************************for range slider*******************************************/
speedRange.addEventListener('input', function () {
  speedFunc(300 - speedRange.value);
});

/************************************************************ */


function arrayAndDiv(value) {
  document.getElementById("counterValue").innerText = counterValue;
  breakTheLoop = true;
  isSortingOn = false;
  animateValue(value, 0, 10, 1000);

}




function swap(array, leftIndex, rightIndex) {
  var temp = array[leftIndex];
  array[leftIndex] = array[rightIndex];
  array[rightIndex] = temp;
}

function partition(array, left, right) {
  var pivot = array[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  emptyArrayDiv();
  // arrDivIndexs[Math.floor((right + left) / 2)].style.backgroundColor="red";
  console.log(arrDivIndexs)

  createArrayDivs(counterValue); //creating bars


  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }
    while (array[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(array, left, right) {
  var index;
  if (array.length > 1) {
    index = partition(array, left, right); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      quickSort(array, left, index - 1);
    }
    if (index < right) { //more elements on the right side of the pivot
      quickSort(array, index, right);
    }
  }

}

function sort() {
  clearInterval(clearI);
  let choice = document.getElementsByClassName("select-selected")[0].innerText;
  if (choice == 'Quick Sort') {
    quickSort(array, 0, array.length - 1);
  }
  if (choice == "Bubble Sort") {
    // clearI = setInterval(function(){
    //   console.log("ClearI:"+clearI);
    bubble_Sort(array);
    //   emptyArrayDiv();
    //   createArrayDivs(counterValue);

    // }, 0.5)

  }

}


function animateValue(length, start, end, duration) {
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));

  var timer = setInterval(function () {
    current += increment;
    counterValue = length;
    array = [];
    emptyArrayDiv();
    createArrayList(counterValue);
    createArrayDivs(counterValue);
    console.log(array);
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

/*******************this  if for custom counter in size of array***** */
function counterChange(n) {
  breakTheLoop = true;
  isSortingOn = false;
  clearInterval(clearI);
  if (n == 1 && counterValue < 160) {
    counterValue++;
    document.getElementById("counterValue").innerText = counterValue;
  } else if (n == -1 && counterValue > 4) {
    counterValue--;
    document.getElementById("counterValue").innerText = counterValue;
  }

  array = [];
  createArrayList(counterValue);
  emptyArrayDiv();
  createArrayDivs(counterValue);
}
/*************************************************************************** */

/*******for select menu or select sort techniques********************* */

var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
      and the selected item:*/
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
    and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
/***************************************************************************************************** */


/*****************************bubble sort***************** */




function swap(array, first_Index, second_Index) {

  // array value swaping
  var temp = array[first_Index];
  array[first_Index] = array[second_Index];
  array[second_Index] = temp;

  // divs swaping with height
  arrDivIndexs[first_Index].style.height = (array[first_Index] * 4 + baseHeight) + 'px';
  arrDivIndexs[second_Index].style.height = (array[second_Index] * 4 + baseHeight) + 'px';
  //innerHTML
  let tempHTML = arrDivIndexs[first_Index].innerHTML;
  arrDivIndexs[first_Index].innerHTML = arrDivIndexs[second_Index].innerHTML;
  arrDivIndexs[second_Index].innerHTML = tempHTML;
}



function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function slowedCode() {
  console.log("Before Delay")
  await this.timeout(Math.random() * 2000 + 500) // Wait random amount of time between [0.5, 2.5] seconds
  console.log("After Delay")
}

// async function slowedForLoop() {
//   const data = ["1","2","3","4","5"]
//   for (let d of data) {
//       console.log(d)
//       await this.timeout(Math.random() * 100 + 500)
//   }
// }



async function bubble_Sort(array) {

  if (isSortingOn) return;
  else isSortingOn = true;
  breakTheLoop = false;


  var len = array.length,
    i, j, stop;

  for (i = 0; i < len; i++) {
    let left, right;
    for (j = 0; j < len - i; j++)

    {
      if (j < len - 1) {
        arrDivIndexs[j].style.backgroundColor = "red";
        await this.timeout(speed);
        arrDivIndexs[j + 1].style.backgroundColor = "green";
        await this.timeout(speed);
      }

      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
      if (j < len - 1) {
        // changing red and green to default color
        arrDivIndexs[j].style.backgroundColor = "rgb(175, 134, 83)";
        // await this.timeout(100);
        arrDivIndexs[j + 1].style.backgroundColor = "rgb(175, 134, 83)";
        // await this.timeout(100);
      }

      if (breakTheLoop) break;
      await this.timeout(speed);
    }
    for (let b = len - 1; b >= len - i - 1; b--) {
      //
      if (breakTheLoop) break;
      arrDivIndexs[b].style.backgroundColor = "rgb(138, 199, 135)";
    }
    if (breakTheLoop) break;
    await this.timeout(speed)


  }


}

/********************************* */

// to genarate default and bars at the first call
animateValue(counterValue, 0, 10, 1000);





// function animateSort( start, end, duration) {
//   var range = end - start;
//   var current = start;
//   var increment = end > start? 1 : -1;
//   var stepTime = Math.abs(Math.floor(duration / range));

//   let i = 0;

//   /**************************************** */
//   var timer = setInterval(function() {
//       current += increment;
//   /********** loop start  *************** */

//  let j = 0;

// /********************************************** */
//   var current1 = start;
//   var increment1 = end > start? 1 : -1;
//   var stepTime1 = Math.abs(Math.floor(duration / range));

//   var timer1 = setInterval(function() {
//       current1 += increment1;
//   /********** loop start 1 *************** */
//   if (array[j] < array[j+1]){
//     swap(array, j, j+1);
//     emptyArrayDiv();
//     createArrayDivs(counterValue);
//   }

//    j = j+1;
//    console.log("j"+j);
//   /******* loop1 end********************** */
//       if (j == end) {
//           clearInterval(timer1);
//       }
//   }, stepTime);
// /*************************************************** */

//   i = i+1;
//   console.log("i"+i);
//   /******* loop end********************** */
//       if (i == end) {
//           clearInterval(timer);
//       }
//   }, stepTime);
// }

let speedFunc = (a) => {
  speed = a;
}
speedFunc(25);

// animateSort( 0, counterValue, 1000);