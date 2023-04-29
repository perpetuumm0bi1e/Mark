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
    
    let smoothlyAppearedElements = document.querySelectorAll('.smoothly-appearing');
    for (let element of smoothlyAppearedElements) { observer.observe(element); }

    if (location.pathname.includes('index') || location.pathname.split('').pop() == '/') { // главная страница 
        let startContainer = document.getElementById('start-container'),
            mainContainer = document.getElementById('main-container');

        sessionStorage.clear();

        if (!localStorage.userName || localStorage.userName == undefined) {
            console.log('no user');
            let  greetingContainer = document.getElementById('greeting-container');
            // greetingContainer.innerHTML = `
            // <div class="input-data">
            //     <input type="'text" class="medium-text" name="user-name" id="user-name" required />
            //     <div class="underline"></div>
            //     <label class="medium-text" for="user-name">My name is...</label>
            // </div>
            // <button class="button medium-text" id="next">Next</button>`;
            let greeting = document.createElement('p');
            greeting.className = 'heading white-text smoothly-appearing';
            greeting.innerHTML = `Hi, stranger!`;
            startContainer.prepend(greeting);
            observer.observe(greeting);

            function changeElem(...args){ // elem, oldclass, newclass, newtext
                args[[0]].classList.remove(args[[1]]);
                if(args[[3]]){
                    args[[0]].innerHTML = (args[[3]]);
                }
                args[[0]].classList.add(args[[2]]);
            }

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
                    sessionStorage.setItem('userName', userName.value);

                    greeting.classList.add('top-disappearance');
                    greetingContainer.classList.add('bottom-disappearance');
                    
                    setTimeout(function(){
                        greeting.remove();
                        greetingContainer.remove();
                        changeElem(greeting, 'top-disappearance', 'smoothly-appearing', `Welcome, ${sessionStorage.userName}!`);
                        startContainer.prepend(greeting);

                        setTimeout(function(){
                            changeElem(greeting, 'smoothly-appearing', 'disappearing');
                        }, 1000)
                        setTimeout(function(){
                            changeElem(greeting, 'disappearing', 'appearing', `Let's set up your planner`);
                        }, 2500)
                        setTimeout(function(){
                            changeElem(greeting, 'appearing', 'disappearing');
                            setTimeout(function(){ 
                                greeting.remove();
                                mainContainer.classList.add('appeared');
                                console.log(startContainer);
                                startContainer.classList.add('appeared');
                                setTimeout(function(){
                                    startContainer.remove(); 
                                }, 1500);
                             }, 900);
                        }, 5000)
                        
                    }, 900)
                    console.log(sessionStorage);

                }
            }
        } else {

        }
    }
}