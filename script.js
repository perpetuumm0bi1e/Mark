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
        let contentContainer = document.getElementById('content-container');

        sessionStorage.clear();

        if (!localStorage.userName || localStorage.userName == undefined) {
            console.log('no user');
            let greetingContainer = document.getElementById('greeting-container'),
                greeting = document.createElement('p');
            greeting.className = 'heading white-text smoothly-appearing';
            greeting.innerHTML = `Hi, stranger!`;
            contentContainer.prepend(greeting);
            observer.observe(greeting);
            setTimeout(function(){
                greeting.classList.remove('smoothly-appearing');
                greeting.classList.add('disappearing');
                observer.observe(greeting);
            }, 2000)
            setTimeout(function(){
                greeting.classList.remove('disappearing');
                greeting.innerHTML = `I'm Mark - your personal task manager`;
                greeting.classList.add('appearing');
                observer.observe(greeting);
            }, 3000)
            setTimeout(function(){
                greeting.classList.remove('appearing');
                greeting.classList.add('disappearing');
                observer.observe(greeting);
            }, 5000)
            setTimeout(function(){
                greeting.classList.remove('disappearing');
                greeting.innerHTML = `It seems like we haven't met yet`;
                greeting.classList.add('appearing');
                observer.observe(greeting);
            }, 6000)
            setTimeout(function(){
                greeting.classList.remove('appearing');
                greeting.classList.add('disappearing');
                observer.observe(greeting);
            }, 8000)
            setTimeout(function(){
                greeting.classList.remove('disappearing');
                greeting.innerHTML = `Let's fix that:`;
                greeting.classList.add('appearing');
                observer.observe(greeting);
            }, 9000)

            setTimeout(function(){
                observer.observe(greetingContainer);
            }, 10000)

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
                    greeting.classList.add('top-disappearance');
                    greetingContainer.classList.add('bottom-disappearance');
                    observer.observe(greeting);
                    observer.observe(greetingContainer);
                    setTimeout(function(){
                        greeting.remove();
                        greetingContainer.remove();
                    }, 1000)
                    sessionStorage.setItem('userName', userName.value);
                    console.log(sessionStorage);
                }
            }

        } else {

        }
    }
}