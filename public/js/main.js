var config = {
    apiKey: "AIzaSyBzp6a2x2myNOBIuJpj0Y2U5MT6z7Tm2O4",
    authDomain: "skfro266-study.firebaseapp.com",
    databaseURL: "https://skfro266-study.firebaseio.com",
    projectId: "skfro266-study",
    storageBucket: "skfro266-study.appspot.com",
    messagingSenderId: "1073548376461"
};
firebase.initializeApp(config);

/***** 전역변수 *****/
var auth = firebase.auth();
var db = firebase.database();
var googleAuth = new firebase.auth.GoogleAuthProvider(); //새로운 Google인증을 받기위한 선언
var ref;
var user;
var key = '';

/***** 구글 로그인 클릭 *****/
$(".login button").on("click", function () {
    auth.signInWithPopup(googleAuth); //구글 인증을 받을 때 팝업창이 뜨면서 로그인
    // auth.signInWithRedirect(googleAuth);
});
auth.onAuthStateChanged(function (result) {
    if (result) init();
    else {
        $(".login").show();
        $(".wrap").hide();
    }
});

$(".logout").click(function () {
    auth.signOut();
});

/***** 구글 로그인 후 초기 셋팅 *****/
function init() {
    $(".login").hide();
    $(".wrap").show();
}
// $(".bts").click(function(){
//     $(location).attr('href','../main.html');
// });