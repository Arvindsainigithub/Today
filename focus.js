const BoxList = document.querySelectorAll(".box")
const InputList = document.querySelectorAll(".goals")
const Error = document.querySelector('.error-lable')
const progress = document.querySelector('.progress-value')
const progressed = document.querySelector('#progress-lable')

const allMissions =[
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Wow! You just completed all the goals, time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem('allGoals'))||{
    first:{
        Name:'',
        completed:false,
    },
    second:{
        Name:'',
        completed:false,
    },
    third:{
        Name:'',
        completed:false,
    },
}
let GoalCount = Object.values(allGoals).filter((goals)=>goals.completed).length
progress.style.width = `${GoalCount/3*100}%`
progress.firstElementChild.innerText = `${GoalCount}/3 completed`

BoxList.forEach((result)=>{
    result.addEventListener('click',(e)=>{
        const Filed = [...InputList].every((info)=>{
            return info.value
        })
        if(Filed){
        result.parentElement.classList.toggle('completed')
        const InputId = result.nextElementSibling.id
        allGoals[InputId].completed = !allGoals[InputId].completed
        GoalCount = Object.values(allGoals).filter((goals)=>goals.completed).length
        progress.style.width = `${GoalCount/3*100}%`
        progress.firstElementChild.innerText = `${GoalCount}/3 completed`
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
        progressed.innerText=allMissions[GoalCount]
    }else{
        Error.parentElement.classList.add('completed')
    }
    })
})
InputList.forEach((liste)=>{
    liste.value = allGoals[liste.id].Name
    if(allGoals[liste.id].completed){
        liste.parentElement.classList.add('completed')
    }
    liste.addEventListener('focus',()=>{
    Error.parentElement.classList.remove('completed')
    })
     liste.addEventListener('input',(e)=>{
        if(allGoals[liste.id].completed){
            liste.value =allGoals[liste.id].Name
            return
        }
        allGoals[liste.id]={
            Name : liste.value,
            completed :false
        }
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
        liste.value = allGoals[liste.id].Name
    })
})