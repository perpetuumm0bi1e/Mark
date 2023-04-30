window.onload = function() {
    let modal = document.getElementById('modal'),
        closeModalButton = document.getElementById('close-modal-button'),
        modalTriggers = document.querySelectorAll('[data-trigger]');

    let isModalOpen = false,
        pageYOffset = 0;

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
        //localStorage.clear();

        function changeElem(...args) { // elem, oldclass, newclass, newtext
            args[[0]].classList.remove(args[[1]]);
            if (args[[3]]) {
                args[[0]].innerHTML = (args[[3]]);
            }
            args[[0]].classList.add(args[[2]]);
        }

        let startContainer = document.getElementById('start-container');

        let greeting = document.createElement('p');
        greeting.className = 'heading white-text smoothly-appearing';

        if (!localStorage.userName || localStorage.userName == undefined) {
            let greetingContainer = document.getElementById('greeting-container');

            greeting.innerHTML = `Hi, stranger!`;
            startContainer.prepend(greeting);
            observer.observe(greeting);

            setTimeout(function() {
                changeElem(greeting, 'smoothly-appearing', 'disappearing');
                setTimeout(function() {
                    changeElem(greeting, 'disappearing', 'appearing', `I'm Mark - your personal task manager`);
                }, 1000)
                setTimeout(function() {
                    changeElem(greeting, 'appearing', 'disappearing');
                }, 3000)
                setTimeout(function() {
                    changeElem(greeting, 'disappearing', 'appearing', `It seems like we haven't met yet`);
                }, 4000)
                setTimeout(function() {
                    changeElem(greeting, 'appearing', 'disappearing');
                }, 6000)
                setTimeout(function() {
                    changeElem(greeting, 'disappearing', 'appearing', `Let's fix that:`);
                }, 7000)
                setTimeout(function() {
                    greetingContainer.classList.add('bottom-appearance');
                    observer.observe(greetingContainer);
                }, 8000)
            }, 2000)

            let nextButton = document.getElementById('next'),
                userName = document.getElementById('user-name');

            nextButton.onclick = function() {
                if (!userName.value) {
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

                    setTimeout(function() {
                        greeting.remove();
                        greetingContainer.remove();
                        changeElem(greeting, 'top-disappearance', 'smoothly-appearing', `Welcome, ${localStorage.userName}!`);
                        startContainer.prepend(greeting);

                        setTimeout(function() {
                            changeElem(greeting, 'smoothly-appearing', 'disappearing');
                        }, 1000)
                        setTimeout(function() {
                            changeElem(greeting, 'disappearing', 'appearing', `Let's set up your planner`);
                        }, 2500)
                        setTimeout(function() {
                            changeElem(greeting, 'appearing', 'disappearing');
                            setTimeout(function() {
                                greeting.remove();
                                startContainer.classList.add('appeared');
                                setTimeout(function() {
                                    startContainer.remove();
                                    window.location.href = 'main.html';
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

            setTimeout(function() {
                changeElem(greeting, 'smoothly-appearing', 'disappearing');
            }, 1000)
            setTimeout(function() {
                changeElem(greeting, 'disappearing', 'appearing', `Let's check your planner`);
            }, 2500)
            setTimeout(function() {
                changeElem(greeting, 'appearing', 'disappearing');
                setTimeout(function() {
                    greeting.remove();
                    startContainer.classList.add('appeared');
                    setTimeout(function() {
                        startContainer.remove();
                        window.location.href = 'main.html';
                    }, 1500);
                }, 900);
            }, 5000)
        }

    } else if (location.pathname.includes('main')) {
        let mainContainer = document.getElementById('main-container');
        mainContainer.classList.add('appeared');

        let smoothlyAppearedElements = document.querySelectorAll('.smoothly-appearing'),
            topAppearedElements = document.querySelectorAll('.top-appearance'),
            bottomAppearedElements = document.querySelectorAll('.bottom-appearance');

        for (let element of smoothlyAppearedElements) { observer.observe(element); }
        for (let element of topAppearedElements) { observer.observe(element); }
        for (let element of bottomAppearedElements) { observer.observe(element); }

        let monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let date = new Date();

        document.getElementById('month-name').innerHTML = `${monthes[date.getMonth()]}`;
        document.getElementById('weekday').innerHTML = `${weekdays[date.getDay()]}`;
        document.getElementById('date').innerHTML = `${date.getDate()}`;

        let plannerBox = document.getElementById('planner'),
            moreBox = document.getElementById('more'),
            addButton = document.getElementById('add'),
            taskInput = document.getElementById('task'),
            ul = document.getElementById('tasks'),
            completedPercent = document.getElementById('completed-percent');

        plannerBox.style.minHeight = `${moreBox.offsetHeight}px`;

        let dataArr = [],
            index = 0,
            completed = 0;

        completedPercent.innerHTML = `${completed}%`;

        function completeUpdate() {
            completedPercent.innerHTML = `${Math.round(completed / dataArr.length * 100)}%`;
        }
        console.log(localStorage);
        if (localStorage['data'] && localStorage['data'].length > 2) {
            dataArr = JSON.parse(localStorage.getItem('data'));
            index = dataArr[dataArr.length - 1].id + 1;
            for (let i = 0; i < dataArr.length; i++) {
                let li = document.createElement('li');
                li.className = 'medium-text li-item';
                li.id = dataArr[i].id;
                li.innerHTML = dataArr[i].task;
                if (dataArr[i].status == 'checked') {
                    li.classList.toggle("checked");
                    completed++;
                }
                li.appendChild(document.createElement('span'));
                ul.appendChild(li);
            }
            completeUpdate();
        }
        addButton.onclick = addItem;
        document.onkeydown = function(e) {
            if (e.which == 13) {
                addItem();
            }
        }

        function addItem() {
            console.log('before adding');
            console.log(localStorage);
            if (taskInput.value) {
                let li = document.createElement('li');
                li.className = 'medium-text li-item';
                li.id = index;
                li.innerHTML = taskInput.value;
                li.appendChild(document.createElement('span'));
                ul.appendChild(li);
                dataArr.push({ "id": index, "task": taskInput.value, "status": 'unchecked' });
                index++;
                taskInput.value = '';
                localStorage.setItem("data", JSON.stringify(dataArr));
                completeUpdate();
            }
        }

        let liItems = document.getElementsByClassName('li-item');
        for (var i = 0; i < liItems.length; i++) {
            liItems[i].addEventListener("click", function(e) {
                if (e.target.tagName === "LI") {
                    console.log(e.target.id)
                    e.target.classList.toggle("checked");
                    dataArr[dataArr.findIndex(y => y.id == e.target.id)].status = 'checked';
                    completed++;
                } else if (e.target.tagName === "SPAN") {
                    if (dataArr[dataArr.findIndex(y => y.id == e.target.parentNode.id)].status == 'checked') {
                        completed--;
                    }
                    e.target.parentElement.remove();
                    dataArr.splice(dataArr.findIndex(y => y.id == e.target.parentNode.id), 1);
                }
                localStorage.setItem("data", JSON.stringify(dataArr));
                completeUpdate();
            });
        }
    }
}