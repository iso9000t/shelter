'use strict';

/* DECLARATIONS */
const hamburger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;
const dimmedArea = document.querySelector('.dimmed-area');
const links = document.querySelectorAll('.mobile-list');
let isTransitioning = false; //burger menu transition flag
    

/* ADD AN EVENT LISTENER TO ACTIVATE THE HAMBURGER MENU  */
    document.addEventListener("click", menuClick);


function menuClick() {
    if ((event.target.closest('.burger') && isTransitioning === false) || event.target.classList.contains('mobile-list') || event.target.closest('.dimmed-area')) {

        isTransitioning = true;
      
        if (dimmedArea.classList.contains('invisible')) {
         setTimeout(() => { isTransitioning = false; }, 510);
            dimmedArea.classList.remove('invisible');

            setTimeout(() => {
                dimmedArea.classList.add('dimmed-area-visible');
            }, 50);
          
          
        } else {
            dimmedArea.classList.remove('dimmed-area-visible');
            setTimeout(() => {
                dimmedArea.classList.add('invisible');
            }, 500);
            setTimeout(() => { isTransitioning = false; }, 500);
           
        } 
        mobileMenu.classList.toggle('mobile-menu-hidden');
        hamburger.classList.toggle('burger-vertical');
        body.classList.toggle('no-scroll');
        console.log(isTransitioning);
       
    }
}
    /*  || (event.target.classList.contains('mobile-list')  (event.target.closest('.dimmed-area')) */