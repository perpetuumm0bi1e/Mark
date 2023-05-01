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
//background-color: var(--${localStorage.appearanceId});
    function setApprearance() {
        let style = document.createElement('style');
        style.innerHTML = `
        body{
            background: ${localStorage.appearanceValue};
        }
        .button {
            cursor: pointer;
            padding: .5rem 6rem;
            border: 0.15rem solid var(--black);
            background-color: var(--${localStorage.appearanceId});
            transition: all .2s ease-in-out;
            color: var(--${localStorage.appearanceTheme});
        }
        .button:hover {
            box-shadow: .3rem .3rem var(--${localStorage.appearanceId});
            transform: translate(-0.143rem, -0.143rem);
            cursor: pointer;
        }
        .button:active {
            transform: translate(0.143rem, 0.143rem);
            box-shadow: none;
        }
        .subbox button{
            margin-top: 5rem;
            background-color: transparent;
            color: var(--black);
        }
        #start-container {
            background: var(--${localStorage.appearanceId});
        }
        .input-data .underline:before {
            background: var(--${localStorage.appearanceId});
        }
        #add {
            background-color: var(--${localStorage.appearanceId});
        }
        #add>div{
            background-image: url(../images/add-${localStorage.appearanceTheme}.svg)
        }
        ul li.checked::before {
            background: var(--${localStorage.appearanceId});
        }`;
        document.body.prepend(style);
    }
    let options = { threshold: [0.5] };
    let observer = new IntersectionObserver(onEntry, options);

    if (location.pathname.includes('index') || location.pathname.split('').pop() == '/') { // главная страница 
        //localStorage.clear();
        console.log(localStorage)

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

        if (!localStorage.user || localStorage.user == undefined || !localStorage.mark || localStorage.mark != 'true') {
            localStorage.setItem('appearanceId', 'orange');
            localStorage.setItem('appearanceValue', 'rgba(235, 135, 56, 0.08)');
            localStorage.setItem('appearanceTheme', 'black');
            setApprearance();
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
                    localStorage.setItem('user', userName.value);
                    localStorage.setItem('mark', true);

                    greeting.classList.add('top-disappearance');
                    greetingContainer.classList.add('bottom-disappearance');
                    greetingContainer.classList.remove('smoothly-appearing');
                    greetingContainer.classList.remove('bottom-appearance');

                    setTimeout(function() {
                        greeting.remove();
                        greetingContainer.remove();
                        changeElem(greeting, 'top-disappearance', 'smoothly-appearing', `Welcome, ${localStorage.user}!`);
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
                                    window.location.href = './public/main.html';
                                }, 1500);
                            }, 900);
                        }, 5000)
                    }, 900)
                }
            }
        } else {
            setApprearance();
            greeting.innerHTML = `Welcome back, ${localStorage.user}!`;
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
                        window.location.href = './public/main.html';
                    }, 1500);
                }, 900);
            }, 5000)
        }
    } else if (location.pathname.includes('main')) {
        setApprearance();
        let mainContainer = document.getElementById('main-container');
            markLink = document.getElementById('mark-link');

        mainContainer.classList.add('appeared');
        markLink.style.fontWeight = `bold`;

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
            completed = 0,
            liItems;

        completedPercent.innerHTML = `${completed}%`;

        function completeUpdate() {
            completedPercent.innerHTML = dataArr.length > 0 ? `${Math.round(completed / dataArr.length * 100)}%` : '0%';
            liItems = document.getElementsByClassName('li-item');
        }

        function addItem() {
            if (taskInput.value) {
                let li = document.createElement('li');
                li.className = 'medium-text li-item';
                li.id = index;
                li.innerHTML = taskInput.value;
                let span = document.createElement('span');
                span.innerHTML = '<div></div><div></div>';
                li.appendChild(span);
                ul.appendChild(li);
                dataArr.push({ "id": index, "task": taskInput.value, "status": 'unchecked' });
                index++;
                taskInput.value = '';
                localStorage.setItem("data", JSON.stringify(dataArr));
                completeUpdate();
                checkLi();
            }
        }

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
                let span = document.createElement('span');
                span.innerHTML = '<div></div><div></div>';
                li.appendChild(span);
                ul.appendChild(li);
            }
            completeUpdate();
            checkLi();
        }

        addButton.onclick = addItem;
        document.onkeydown = function(e) {
            if (e.which == 13) {
                addItem();
            }
        }

        function checkLi() {
            for (let i = 0; i < liItems.length; i++) {
                liItems[i].onclick = function(e) {
                    if (e.target.tagName === "LI") {
                        dataArr[dataArr.findIndex(y => y.id == e.target.id)].status == 'unchecked' ?
                            (e.target.classList.toggle("checked"),
                                dataArr[dataArr.findIndex(y => y.id == e.target.id)].status = 'checked',
                                completed++) :
                            (e.target.classList.remove("checked"),
                                dataArr[dataArr.findIndex(y => y.id == e.target.id)].status = 'unchecked',
                                completed--);
                    } else if (e.target.tagName === "SPAN") {
                        if (dataArr[dataArr.findIndex(y => y.id == e.target.parentNode.id)].status == 'checked') {
                            completed--;
                        }
                        e.target.parentElement.remove();
                        dataArr.splice(dataArr.findIndex(y => y.id == e.target.parentNode.id), 1);
                    }
                    localStorage.setItem("data", JSON.stringify(dataArr));
                    completeUpdate();
                };
            }
        }
        try {
            checkLi();
        } catch {
            console.log('no li elements');
        }

        let pomodoroButton = document.getElementById('pomodoro'),
            startTimerButton = document.getElementById('start');

        let rounds = [{ time: 1499, label: 'First working round' },
            { time: 299, label: 'Rest' },
            { time: 1499, label: 'Second working round' },
            { time: 299, label: 'Rest' },
            { time: 1499, label: 'Third working round' },
            { time: 299, label: 'Rest' },
            { time: 1499, label: 'Fourth working round' },
            { time: 299, label: 'Time for good rest' }
        ];
        let timer;
        let timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds'),
            modalText = document.getElementById('modal-text');

        pomodoroButton.onclick = function() {
            modalText.innerHTML = `Get ready for the first round, ${localStorage.user}`;
            timerMinutes.innerHTML = '25';
            timerSeconds.innerHTML = '00';
        }

        startTimerButton.onclick = function() {
            async function pomodoroRound(n) {
                let sec = rounds[0].time;

                let result = await new Promise((resolve, reject) => {
                    modalText.innerHTML = `${rounds[n].label}`;
                    timer = setInterval(() => {
                        timerMinutes.innerHTML = Math.floor(sec / 60) > 9 ? `${Math.floor(sec / 60)}` : `0${Math.floor(sec / 60)}`;
                        timerSeconds.innerHTML = sec % 60 > 9 ? `${sec % 60}` : `0${sec % 60}`;
                        sec--;
                        if (sec < 0) {
                            resolve(n);
                            clearInterval(timer);
                        };
                    }, 1000);
                });
                if (result == result.length - 1) {
                    return result;
                } else {
                    n++;
                    pomodoroRound(n);
                }
            }
            pomodoroRound(0);
        }
        closeModalButton.onclick = function() {
            clearInterval(timer);
        }

    } else if (location.pathname.includes('settings')) {
        setApprearance();
        let settingsContainer = document.getElementById('settings-container');
        settingsLink = document.getElementById('settings-link');

        settingsContainer.classList.add('appeared');
        settingsLink.style.fontWeight = `bold`;

        let appearedElements = document.querySelectorAll('.appearing'),
            bottomAppearedElements = document.querySelectorAll('.bottom-appearance'),
            topAppearedElements = document.querySelectorAll('.top-appearance'),
            rotateBottomAppearedElements = document.querySelectorAll('.rotate-bottom-appearance'),
            rotateBottomLeftAppearedElements = document.querySelectorAll('.rotate-bottom-appearance-left'),
            rotateBottomRightAppearedElements = document.querySelectorAll('.rotate-bottom-appearance-right');

        for (let element of appearedElements) { observer.observe(element); }
        for (let element of topAppearedElements) { observer.observe(element); }
        for (let element of bottomAppearedElements) { observer.observe(element); }
        for (let element of rotateBottomAppearedElements) { observer.observe(element); }
        for (let element of rotateBottomLeftAppearedElements) { observer.observe(element); }
        for (let element of rotateBottomRightAppearedElements) { observer.observe(element); }

        let selectColorButtons = document.getElementsByClassName('select-color-button');
        
        for (var i = 0; i < selectColorButtons.length; i++) {
            selectColorButtons[i].addEventListener("click", function(e) {
                let idParts = e.target.id.split(',');
                localStorage.setItem('appearanceId', idParts[0]);
                localStorage.setItem('appearanceValue', e.target.value);
                localStorage.setItem('appearanceTheme', idParts[1]);
                setApprearance();
                location.reload()
            });
        }
    } else if (location.pathname.includes('profile')) {
        setApprearance();
        let profileContainer = document.getElementById('profile-container');
        profileLink = document.getElementById('profile-link'),
            userName = document.getElementById('user-name'),
            setNewName = document.getElementById('set'),
            smoothlyAppearedElements = document.querySelectorAll('.appearing'),
            bottomAppearedElements = document.querySelectorAll('.bottom-appearance');

        profileContainer.classList.add('appeared');
        profileLink.style.fontWeight = `bold`;

        for (let element of smoothlyAppearedElements) { observer.observe(element); }
        for (let element of bottomAppearedElements) { observer.observe(element); }

        userName.value = `${localStorage.user}`;

        setNewName.onclick = function() {
            localStorage.setItem('user', userName.value);
            location.reload();
            console.log(localStorage);
        }
    }
}