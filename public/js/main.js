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
    if (result) {
        user = result;
        init();
    } else {
        $(".login").show();
        $(".wrap").hide();
        $(".lists").empty();
    }
});

$(".logout").click(function () {
    auth.signOut();
});

/***** 구글 로그인 후 초기 셋팅 *****/
function init() {
    $(".login").hide();
    $(".wrap").show();
    $(".lists").empty();
    ref = db.ref("root/memos/");
    ref.on("child_added", onAdd);
    ref.on("child_removed", onRev);
}

function onAdd(data) {
    var id = data.key;
    var val = data.val();
    var html = '';
    html += '<li id="' + id + '">';
    html += '<h4>' + val.content + '</h4>';
    html += '<h5>' + val.email + '</h5>';
    html += '<button onclick="revData(this)"><i class="fa fa-trash"></i></button>';
    html += '</li>';
    $(".lists").prepend(html);
}

function onRev(data) {
    $("#" + data.key).remove();
}
$("#bt_wr").click(function () {
    var content = $("#content").val();
    if (content == "") {
        alert("내용을 입력하세요.");
        $("#content").focus();
    } else {
        ref = db.ref("root/memos/");
        ref.push({
            content: content,
            wdate: new Date().getTime(),
            email: user.email
        }).key
        $("#content").val("");
    }
});

function revData(obj) {
    var id = $(obj).parent().attr("id");
    if ($(obj).parent().find("h5").html() == user.email) {
        ref = db.ref("root/memos/" + id);
        ref.remove();
    } 
    else {
        alert("타인의 글은 삭제할 수 없습니다.")
    }
};
// $(".bts").click(function(){
//     $(location).attr('href','../main.html');
// });