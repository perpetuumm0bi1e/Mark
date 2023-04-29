window.onload = function() {
    let modal = document.getElementById('modal'),
        closeModalButton = document.getElementById('close-modal-button'),
        modalTriggers = document.querySelectorAll('[data-trigger]');
    
    let isModalOpen = false, pageYOffset = 0;

     modalTriggers.forEach(function(item) {
        item.addEventListener('click', function() {
            pageYOffset = window.pageYOffset;
            modal.classList.add('is-open');
            isModalOpen = true;
        });
    })
    
    document.addEventListener('scroll', function(e) {
        if (isModalOpen) {
            e.preventDefault();
            window.scrollTo(0, pageYOffset);
        }
    });

    closeModalButton.addEventListener('click', function() {
        modal.classList.remove('is-open');
        isModalOpen = false;
    });

    function onEntry(element) {
        element.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('appeared');
            }
        });
    }
    
    let options = { threshold: [0.5] };
    let observer = new IntersectionObserver(onEntry, options);

    if (location.pathname.includes('index') || location.pathname.split('').pop() == '/') { // главная страница 
        localStorage.clear();
        function changeElem(...args){ // elem, oldclass, newclass, newtext
            args[[0]].classList.remove(args[[1]]);
            if(args[[3]]){
                args[[0]].innerHTML = (args[[3]]);
            }
            args[[0]].classList.add(args[[2]]);
        }

        let startContainer = document.getElementById('start-container'),
            mainContainer = document.getElementById('main-container');
        
        let greeting = document.createElement('p');
            greeting.className = 'heading white-text smoothly-appearing';

        if (!localStorage.userName || localStorage.userName == undefined) {
            let  greetingContainer = document.getElementById('greeting-container');
            
            greeting.innerHTML = `Hi, stranger!`;
            startContainer.prepend(greeting);
            observer.observe(greeting);

           

            setTimeout(function(){
                changeElem(greeting, 'smoothly-appearing', 'disappearing');
                setTimeout(function(){
                    changeElem(greeting, 'disappearing', 'appearing', `I'm Mark - your personal task manager`);
                }, 1000)
                setTimeout(function(){
                    changeElem(greeting, 'appearing', 'disappearing');
                }, 3000)
                setTimeout(function(){
                    changeElem(greeting, 'disappearing', 'appearing', `It seems like we haven't met yet`);
                }, 4000)
                setTimeout(function(){
                    changeElem(greeting, 'appearing', 'disappearing');
                }, 6000)
                setTimeout(function(){
                    changeElem(greeting, 'disappearing', 'appearing', `Let's fix that:`);
                }, 7000)
                setTimeout(function(){
                    greetingContainer.classList.add('bottom-appearance');
                    observer.observe(greetingContainer);
                }, 8000)
            }, 2000)

            let nextButton = document.getElementById('next'),
                userName = document.getElementById('user-name');

            nextButton.onclick = function(){
                if(!userName.value){
                    let modalHeading = document.getElementById('modal-heading'),
                        modalText = document.getElementById('modal-text');

                    pageYOffset = window.pageYOffset;
                    modal.classList.add('is-open');
                    isModalOpen = true;

                    modalHeading.innerHTML = `Oops...`;
                    modalText.innerHTML = `Please introduce yourself to continue`;
                } else {
                    localStorage.setItem('userName', userName.value);

                    greeting.classList.add('top-disappearance');
                    greetingContainer.classList.add('bottom-disappearance');
                    greetingContainer.classList.remove('smoothly-appearing');
                    greetingContainer.classList.remove('bottom-appearance');
                    
                    setTimeout(function(){
                        greeting.remove();
                        greetingContainer.remove();
                        changeElem(greeting, 'top-disappearance', 'smoothly-appearing', `Welcome, ${localStorage.userName}!`);
                        startContainer.prepend(greeting);

                        setTimeout(function(){
                            changeElem(greeting, 'smoothly-appearing', 'disappearing');
                        }, 1000)
                        setTimeout(function(){
                            changeElem(greeting, 'disappearing', 'appearing', `Let's set up your planner`);
                        }, 2500)
                        setTimeout(function(){
                            changeElem(greeting, 'appearing', 'disappearing');
                            mainContainer.classList.add('appeared');
                            setTimeout(function(){ 
                                greeting.remove();
                                startContainer.classList.add('appeared');
                                setTimeout(function(){
                                    startContainer.remove(); 
                                }, 1500);
                             }, 900);
                        }, 5000)
                        
                    }, 900)
                    console.log(localStorage);
                }
            }
        } else {
            greeting.innerHTML = `Welcome back, ${localStorage.userName}!`;
            startContainer.prepend(greeting);
            observer.observe(greeting);
            
            setTimeout(function(){
                changeElem(greeting, 'smoothly-appearing', 'disappearing');
            }, 1000)
            setTimeout(function(){
                changeElem(greeting, 'disappearing', 'appearing', `Let's check your planner`);
            }, 2500)
            setTimeout(function(){
                changeElem(greeting, 'appearing', 'disappearing');
                mainContainer.classList.add('appeared');
                setTimeout(function(){ 
                    greeting.remove();
                    startContainer.classList.add('appeared');
                    setTimeout(function(){
                        startContainer.remove(); 
                    }, 1500);
                 }, 900);
            }, 5000)
        }
        let monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let date = new Date();

        document.getElementById('month-name').innerHTML = `${monthes[date.getMonth()]}`;
        document.getElementById('weekday').innerHTML = `${weekdays[date.getDay()]}`;
        document.getElementById('date').innerHTML = `${date.getDate()}`;

        let smoothlyAppearedElements = document.querySelectorAll('.smoothly-appearing'),
            topAppearedElements = document.querySelectorAll('.top-appearance'),
            bottomAppearedElements = document.querySelectorAll('.bottom-appearance');

        for (let element of smoothlyAppearedElements) { observer.observe(element); }
        for (let element of topAppearedElements) { observer.observe(element); }
        for (let element of bottomAppearedElements) { observer.observe(element); }

        let plannerBox = document.getElementById('planner'),
            moreBox = document.getElementById('more');

        plannerBox.style.minHeight = `${moreBox.offsetHeight}px`;
        
        let addButton = document.getElementById('add'),
            taskInput = document.getElementById('task'),
            listItems = document.querySelector('.lists');

            console.log(localStorage);
        let dataArr = [], index = 0;

        class TaskData{
            constructor(id, task, status){
                this.id = id,
                this.task = task,
                this.status = status
            }
        }
        if(localStorage['data']){
            dataArr = localStorage['data'];
            console.log(dataArr);
            index = dataArr.length;
            for(let i = 0; i < dataArr.length; i++){
                let li = document.createElement('li');
                li.className = 'medium-text';
                li.innerHTML = dataArr[i].task;
                li.checked = dataArr[i].status == 'checked' ? true :  false;
                listItems.appendChild(li);
                let span = document.createElement('span');
                li.appendChild(span);
            }
        }

        addButton.onclick = function(){
            console.log('before adding');
            console.log(localStorage);
            if(taskInput.value){
                let li = document.createElement('li');
                li.className = 'medium-text';
                li.innerHTML = taskInput.value;
                listItems.appendChild(li);
                console.log(new TaskData(index, `${taskInput.value}`, 'unchecked'));
                dataArr.push(JSON.stringify(`${new TaskData(index, `${taskInput.value}`, 'unchecked')}`));
                console.log(dataArr);
                index++;
                taskInput.value = '';
                let span = document.createElement('span');
                li.appendChild(span);
                localStorage.setItem("data", JSON.stringify(dataArr));
            }
            console.log('after adding');
            console.log(localStorage);
        }

        listItems.addEventListener("click", (e) => {
            let id = dataArr.find(item => item.task == e.target.value);
            if(e.target.tagName === "LI"){
                console.log('before checking');
                console.log(localStorage);
                e.target.classList.toggle("checked");
                dataArr[id].status = 'checked';
            } else if(e.target.tagName === "SPAN") {
                console.log('before deleting');
                console.log(localStorage);
                e.target.parentElement.remove();
                dataArr.sice(id, 1);
            }
            localStorage.setItem("data", data);
            console.log('after');
            console.log(localStorage);
        })
    }
}