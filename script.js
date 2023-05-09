let regBtn= document.getElementById("regBtn");
let existingEmpBtn= document.getElementById("existingEmpBtn");
let form = document.getElementById("formBox");
let formContainer = document.getElementsByClassName('formContainer');
let employeesContainer = document.getElementsByClassName('employeesContainer');


regBtn.addEventListener('click',()=>{
    regBtn.classList.add("navListAni");
    existingEmpBtn.classList.remove("navListAni");
    employeesContainer[0].style.display="none";
    formContainer[0].style.display="flex";
})

existingEmpBtn.addEventListener('click',()=>{
    employeesContainer[0].style.display="flex";
    employeesContainer[0].style.flexDirection="column";
    employeesContainer[0].style.justifyContent="center";
    employeesContainer[0].style.alignItems="center";
    formContainer[0].style.display="none";
    regBtn.classList.remove("navListAni");
    existingEmpBtn.classList.add("navListAni");


})

// form validation.

    let empName= document.getElementById('empName');
    let empAddress= document.getElementById('empAddress');
    let empDept= document.getElementById('empDept');
    let empSalary= document.getElementById('empSalary');
    let empId= document.getElementById('empId');
    

//fetching random joke
async function fetchJoke (){
    const response =  await fetch("https://icanhazdadjoke.com/",{
        headers: {
            Accept: "application/json",
        },
    });
    const joke= await response.json();

    let jokes = localStorage.getItem("jokes");
    if(jokes==null)
    jokesArr = [];
    else {
        jokesArr = JSON.parse(jokes);
    }
        jokesArr.unshift(joke.joke);
        localStorage.setItem("jokes",JSON.stringify(jokesArr));
        // console.log(jokesArr);

        location.reload(); // This is done to reload the contents of localStorage in DOM (screen2).
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(empName.classList.contains('success')){
        document.querySelector('.alert').style.display="flex";
        fetchJoke();
        // console.log("joke has been fetched");

        //adding names to local storage
        let names = localStorage.getItem("names");
        if(names==null)
        namesArr = [];
        else {
        namesArr = JSON.parse(names);
        }
        namesArr.unshift(empName.value);
        localStorage.setItem("names",JSON.stringify(namesArr));

        //adding addresses to local storage
        let addrs = localStorage.getItem("addrs");
        if(addrs==null)
        addrsArr = [];
        else {
            addrsArr = JSON.parse(addrs);
        }
        addrsArr.unshift(empAddress.value);
        localStorage.setItem("addrs",JSON.stringify(addrsArr));

        //adding departments to local storage
        let depts = localStorage.getItem("depts");
        if(depts==null)
        deptsArr = [];
        else {
        deptsArr = JSON.parse(depts);
        }
        deptsArr.unshift(empDept.value);
        localStorage.setItem("depts",JSON.stringify(deptsArr));

        //adding salaries to local storage
        let sals = localStorage.getItem("sals");
        if(sals==null)
        salsArr = [];
        else {
        salsArr = JSON.parse(sals);
        }
        salsArr.unshift(empSalary.value);
        localStorage.setItem("sals",JSON.stringify(salsArr));

        //adding ids to local storage
        let ids = localStorage.getItem("ids");
        if(ids==null)
        idsArr = [];
        else {
        idsArr = JSON.parse(ids);
        }
        idsArr.unshift(empId.value);
        localStorage.setItem("ids",JSON.stringify(idsArr));

        empName.value="";
        empDept.value="";
        empAddress.value="";
        empId.value="";
        empSalary.value="";
        empName.classList.remove("success");

        // arrOfObj();
    }
})


empName.addEventListener('change',(e)=>{
    let regex = /^[A-Z a-z]+$/;
    if(regex.test(e.target.value)){
        empName.classList.add('success');
        empName.classList.remove('err');
    }
    else{
    empName.classList.add('err');
    empName.classList.remove('success');
    }
})

//generation of job id
 let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
 let length = char.length;
 let id = '';
 for(var i=0;i<6;i++){
    id+= char.charAt(Math.random()*length);
 } 
empId.value=id; 


// function to make array of objects from localStorage

let arrOfObj = () =>{
   let objArr=[];
    
   let obj = {
    "name": "",
    "address": "",
    "salary" :"",
    "id" : "",
    "department" : "",
    "joke" :""
   };
   
   let nameArr = JSON.parse(localStorage.getItem('names'));
   let addressArr = JSON.parse(localStorage.getItem('addrs'));
   let salaryArr = JSON.parse(localStorage.getItem('sals'));
   let deptArr = JSON.parse(localStorage.getItem('depts'));
   let idArr = JSON.parse(localStorage.getItem('ids'));
   let jokeArr = JSON.parse(localStorage.getItem('jokes'));

   for(let i=0;i<nameArr.length;i++){
    obj.name = nameArr[i];
    obj.address = addressArr[i];
    obj.salary = salaryArr[i];
    obj.id = idArr[i];
    obj.department = deptArr[i];
    obj.joke = jokeArr[i];
    objArr.push(obj);
    obj = {
     "name": "",
     "address": "",
     "salary" :"",
     "id" : "",
     "department" : "",
     "joke" :""
    };
   }

   //populating the cardContainer

   let temp="";
   objArr.forEach(ele => {
    temp += `
     <div class="employeeCard">
             <div class="empImage"><img src="https://picsum.photos/200/300" class="imageStyle"></div>
             <div class="dataInfo">
                 <h3 id="jobId">JobID : ${ele.id}</h3>
                 <h3 id="name">Name : ${ele.name}</h3>
                 <h3 id="bioJoke">BioJoke : ${ele.joke}</h3>
             </div>
             <div class="viewInfo" id="${ele.id}">View Data</div>
         </div>
     `
});
let details = document.getElementById('cardContainer');
details.innerHTML = temp;
}

if(localStorage.getItem('jokes')){
    arrOfObj();
}

let sortBtn = document.getElementById('sortBtn');
if(localStorage.getItem('names')==null)
sortBtn.innerHTML="Registered employees will be shown here";
else{
    sortBtn.innerHTML="Sort Employees by name";
    sortBtn.addEventListener('click',()=>{
        displaySortedDetails();
    });
}

let displaySortedDetails = () =>{
    let objArr=[];
     
    let obj = {
     "name": "",
     "address": "",
     "salary" :"",
     "id" : "",
     "department" : "",
     "joke" :""
    };
 
    let nameArr = JSON.parse(localStorage.getItem('names'));
    let addressArr = JSON.parse(localStorage.getItem('addrs'));
    let salaryArr = JSON.parse(localStorage.getItem('sals'));
    let deptArr = JSON.parse(localStorage.getItem('depts'));
    let idArr = JSON.parse(localStorage.getItem('ids'));
    let jokeArr = JSON.parse(localStorage.getItem('jokes'));
 
    for(let i=0;i<nameArr.length;i++){
     obj.name = nameArr[i];
     obj.address = addressArr[i];
     obj.salary = salaryArr[i];
     obj.id = idArr[i];
     obj.department = deptArr[i];
     obj.joke = jokeArr[i];
     objArr.push(obj);
     obj = {
      "name": "",
      "address": "",
      "salary" :"",
      "id" : "",
      "department" : "",
      "joke" :""
     };
    }
 
    //populating the cardContainer

    objArr.sort((a, b) => (a.name > b.name) ? 1: -1);
 
    let temp="";
    objArr.forEach(ele => {
     temp += `
     <div class="employeeCard">
             <div class="empImage"><img src="https://picsum.photos/200/300" class="imageStyle"></div>
             <div class="dataInfo">
                 <h3 id="jobId">JobID : ${ele.id}</h3>
                 <h3 id="name">Name : ${ele.name}</h3>
                 <h3 id="bioJoke">BioJoke : ${ele.joke}</h3>
             </div>
             <div class="viewInfo" id="${ele.id}">View Data</div>
         </div>
     `
 });
 let details = document.getElementById('cardContainer');
 details.innerHTML = temp;
 
Array.from(document.querySelectorAll(".viewInfo")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target.id);
        viewInformation(e.target.id);
    })
});
}

//modal window

Array.from(document.querySelectorAll(".viewInfo")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target.id);
        viewInformation(e.target.id);
    })
});

let viewInformation = (id) =>{
    // console.log(id);
    
    let nameArr = JSON.parse(localStorage.getItem('names'));
    let addressArr = JSON.parse(localStorage.getItem('addrs'));
    let salaryArr = JSON.parse(localStorage.getItem('sals'));
    let deptArr = JSON.parse(localStorage.getItem('depts'));
    let idArr = JSON.parse(localStorage.getItem('ids'));
    let jokeArr = JSON.parse(localStorage.getItem('jokes'));

    // console.log(idArr.indexOf(id));

    let index= idArr.indexOf(id);

    let modal = document.querySelector(".modal");

    let temp = `
    <div class="modalWindow" id="modalWindow"">
        <img src="https://picsum.photos/200/300" id="modalImg">
        <div ><span class="modalKey">JobID</span> : ${idArr[index]}</div>
        <div ><span class="modalKey">Name</span> : ${nameArr[index]}</div>
        <div ><span class="modalKey">Address</span> : ${addressArr[index]}</div>
        <div ><span class="modalKey">Department</span> : ${deptArr[index]}</div>
        <div ><span class="modalKey">BioJoke</span> : ${jokeArr[index]}</div>
        <div ><span class="modalKey">Salary</span> : ${salaryArr[index]}</div>
        <div id="dismiss">Dismiss</div>
      </div>
    `;

    modal.innerHTML = temp;
    document.querySelector(".modalWindow").classList.add("openModal");
    document.querySelector(".employeesContainer").style.opacity = "0.7";

    document.querySelector("#dismiss").addEventListener('click',()=>{
        document.querySelector(".modalWindow").classList.remove("openModal");
        document.querySelector(".employeesContainer").style.opacity = "1";
    })
}