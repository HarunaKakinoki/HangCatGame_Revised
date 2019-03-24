const index_init = () => {
    View.showAppName();
    View.createNavBar();
    View.createPlayData();
    View.createHangImg();
    View.createResetBtn();
    View.createHint("Hint: Cute cat Meow");
    View.createWord("mysql");
    View.createLetters();
    View.createSaveBtn();
    View.createSignUpModal();
} 

index_init();
playSound("sounds/moveToNext.mp3");


