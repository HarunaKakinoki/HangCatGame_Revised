const index_init = () => {
    View.showAppName();
    View.createNavBar();
    View.createPlayData();
    View.createHangImg();
    View.createRestartBtn();
    View.createHint("Hint: Cute cat Meow");
    View.createWord("mysql");
    View.createLetters();
    View.createSaveBtn();
    View.createSignUpModal();
    View.createLoginModal();
    View.createRestartModal();
    View.createGameOverModal();
} 

index_init();
playSound("sounds/moveToNext.mp3");


